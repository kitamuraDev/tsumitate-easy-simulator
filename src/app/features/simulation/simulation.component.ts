import { Component, type OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type AmountChangeSetting, SettingDatabaseService } from '../../core/setting-database.service';
import { TsumitateDatabaseService } from '../../core/tsumitate-database.service';
import { BaseButtonComponent } from '../../shared/components/base-button/base-button.component';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';
import { CalculateService } from '../../shared/services/calculate.service';
import { ValidationService } from '../../shared/services/validation.service';
import type { Input, Tsumitate } from '../../shared/types/tsumitate';
import { DisplayRangeInputValueComponent } from './display-range-input-value/display-range-input-value.component';
import { DisplaySimulationResultComponent } from './display-simulation-result/display-simulation-result.component';
import { LabelTextComponent } from './label-text/label-text.component';

@Component({
  selector: 'app-simulation',
  imports: [
    ReactiveFormsModule,
    HeadContentComponent,
    LabelTextComponent,
    DisplaySimulationResultComponent,
    DisplayRangeInputValueComponent,
    BaseButtonComponent,
  ],
  templateUrl: './simulation.component.html',
})
export default class SimulationComponent implements OnInit {
  private readonly calcService = inject(CalculateService);
  private readonly tsumitateDatabaseService = inject(TsumitateDatabaseService);
  private readonly settingDatabaseService = inject(SettingDatabaseService);
  private readonly validationService = inject(ValidationService);

  tsumitateSimulationResult = signal<Tsumitate>({
    input: { initialAsset: 0, rate: 5, amounts: [3], years: [1] },
    output: { simpleInterestCalcResult: 368177, diff: 8177, compoundInterestCalcResult: 360000 },
  });
  isAbnormalInput = signal(false);
  amountChangeSetting = signal<AmountChangeSetting>({ isAmountChangeEnabled: false, selectedAmountChangeCount: '1' });

  async ngOnInit() {
    this.amountChangeSetting.set(await this.settingDatabaseService.getAmountChangeSetting());
  }

  // biome-ignore format: 一行にまとめたいため
  inputs = new FormGroup({
    initialAsset: new FormControl(this.getInitialAssetInSessionStorage(), [Validators.required, Validators.min(0), Validators.max(1800)]),
    amountRequired: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(30)]),
    yearRequired: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(15), this.validationService.integerValueValidator()]),
    amountAny1: new FormControl(0, [Validators.min(0), Validators.max(30)]),
    yearAny1: new FormControl(0, [Validators.min(0), Validators.max(15), this.validationService.integerValueValidator()]),
    amountAny2: new FormControl(0, [Validators.min(0), Validators.max(30)]),
    yearAny2: new FormControl(0, [Validators.min(0), Validators.max(15), this.validationService.integerValueValidator()]),
    amountAny3: new FormControl(0, [Validators.min(0), Validators.max(30)]),
    yearAny3: new FormControl(0, [Validators.min(0), Validators.max(15), this.validationService.integerValueValidator()]),
    rate: new FormControl(5, [Validators.required, Validators.min(0), Validators.max(15)])
  });

  // フォームのバリデーション状態を見て、「計算」ボタンの活性と非活性の状態を切り替える
  updateFormValidState() {
    const input = this.inputs.value;
    const resultAnyInput1 = this.validationService.isOneInputEmptyValidator(input.amountAny1, input.yearAny1);
    const resultAnyInput2 = this.validationService.isOneInputEmptyValidator(input.amountAny2, input.yearAny2);
    const resultAnyInput3 = this.validationService.isOneInputEmptyValidator(input.amountAny3, input.yearAny3);

    // `this.inputs.valid`は全てのフォームのバリデーションが通れば`true`が返る
    // `[disabled]=""`をfalseにするとボタン押下できるようになる。つまり、`&&`で繋いだ全ての条件を満たしたときにボタン押下できるようになる
    // `!(boolean)`は、すべてtrueなら反転してfalseを返すということ
    this.isAbnormalInput.set(!(this.inputs.valid && resultAnyInput1 && resultAnyInput2 && resultAnyInput3));
  }

  // biome-ignore format: 一行にまとめたいため
  private async getTsumitateInput(): Promise<Input> {
    const input = this.inputs.value;

    const initialAsset = input.initialAsset ?? 0;
    const filteredAmounts = this.filterNull([input.amountRequired, input.amountAny1, input.amountAny2, input.amountAny3]);
    const filteredYears = this.filterNull([input.yearRequired, input.yearAny1, input.yearAny2, input.yearAny3]);
    const { amounts, years } = await this.adjustForNoInvestmentPeriod(filteredAmounts, filteredYears);
    const rate = input.rate ?? 5;

    return { initialAsset, amounts, years, rate };
  }

  async onCalculate() {
    // Inputの取得
    const tsumitateInput = await this.getTsumitateInput();

    // 計算
    const tsumitateOutput = this.calcService.tsumitateEasyCalculate(tsumitateInput);

    // シュミレーション結果を更新
    this.tsumitateSimulationResult.set({ input: tsumitateInput, output: tsumitateOutput });

    // 初期資産額をセッションストレージに保存
    this.setInitialAssetInSessionStorage(tsumitateInput.initialAsset);

    // DB登録
    await this.tsumitateDatabaseService.add({ input: tsumitateInput, output: tsumitateOutput });
  }

  // 初期資産額をセッションストレージに保存
  private setInitialAssetInSessionStorage(initialAsset: number): void {
    sessionStorage.setItem('initial-asset', initialAsset.toString());
  }
  // 初期資産額をセッションストレージから取得
  private getInitialAssetInSessionStorage(): number {
    return Number(sessionStorage.getItem('initial-asset'));
  }

  // 配列からnullを除外する
  private filterNull(array: (number | null | undefined)[]): number[] {
    return array.filter((v) => v !== null) as number[];
  }

  // 積立無しの期間を考慮した配列の調整
  private async adjustForNoInvestmentPeriod(amounts: number[], years: number[]) {
    const result = await this.settingDatabaseService.getNoInvestmentPeriodIncludedSetting();
    const currentAge = Number(result.selectedCurrentAge);
    const endAge = Number(result.selectedEndAge);
    const noInvestmentPeriodYear = endAge - currentAge - years.reduce((acc, cur) => acc + cur, 0); // 積立無しの期間

    // 積立無しの期間を含めない場合は、引数の配列をそのまま返す
    if (!result.isNoInvestmentPeriodIncluded) return { amounts, years };
    // 積立無しの期間が0以下の場合は、引数の配列をそのまま返す
    if (noInvestmentPeriodYear <= 0) return { amounts, years };

    // 積立無しの期間を含める場合
    return { amounts: [...amounts, 0], years: [...years, noInvestmentPeriodYear] };
  }
}
