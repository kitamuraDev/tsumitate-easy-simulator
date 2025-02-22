import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matEquals } from '@ng-icons/material-icons/baseline';
import { TsumitateDatabaseService } from '../../core/tsumitate-database.service';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';
import { ValidationWarningMessageComponent } from '../../shared/components/validation-warning-message/validation-warning-message.component';
import { CalculateService } from '../../shared/services/calculate.service';
import { ValidationService } from '../../shared/services/validation.service';
import type { Input } from '../../shared/types/tsumitate';
import { DecrementButtonComponent } from './decrement-button/decrement-button.component';
import { DisplayAmountValueComponent } from './display-amount-value/display-amount-value.component';
import { IncrementButtonComponent } from './increment-button/increment-button.component';
import { LabelTextComponent } from './label-text/label-text.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';

@Component({
  selector: 'app-simulation',
  imports: [
    ReactiveFormsModule,
    HeadContentComponent,
    ValidationWarningMessageComponent,
    DecrementButtonComponent,
    IncrementButtonComponent,
    LabelTextComponent,
    DisplayAmountValueComponent,
    ToggleButtonComponent,
    NgIcon,
  ],
  viewProviders: provideIcons({ matEquals }),
  templateUrl: './simulation.component.html',
})
export default class SimulationComponent {
  private readonly calcService = inject(CalculateService);
  private readonly dbService = inject(TsumitateDatabaseService);
  private readonly validationService = inject(ValidationService);

  compoundInterestCalcResult = signal<number>(0);
  isAbnormalInput = false;
  isOpenAnyInputsBlock = false;

  toggleOpenAnyInputsBlock() {
    this.isOpenAnyInputsBlock = !this.isOpenAnyInputsBlock;
  }

  // biome-ignore format: 一行にまとめたいため
  inputs = new FormGroup({
    initialAsset: new FormControl(this.getInitialAssetInSessionStorage(), [Validators.required, Validators.min(0), Validators.max(1800)]),
    amountRequired: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(30)]),
    yearRequired: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(40), this.validationService.integerValueValidator()]),
    amountAny1: new FormControl(null, [Validators.min(1), Validators.max(30)]),
    yearAny1: new FormControl(null, [Validators.min(1), Validators.max(40), this.validationService.integerValueValidator()]),
    amountAny2: new FormControl(null, [Validators.min(1), Validators.max(30)]),
    yearAny2: new FormControl(null, [Validators.min(1), Validators.max(40), this.validationService.integerValueValidator()]),
    amountAny3: new FormControl(null, [Validators.min(1), Validators.max(30)]),
    yearAny3: new FormControl(null, [Validators.min(1), Validators.max(40), this.validationService.integerValueValidator()]),
    rate: new FormControl(5, [Validators.required, Validators.min(0), Validators.max(20)])
  });

  // インクリメント/デクリメント
  increment(input: number | null | undefined, inputName: string) {
    const currentValue = input ? input : 0;
    this.inputs.get(inputName)?.setValue(currentValue + 1);

    this.updateFormValidState();
  }
  decrement(input: number | null | undefined, inputName: string) {
    const currentValue = input ? input : 0;
    this.inputs.get(inputName)?.setValue(currentValue - 1);

    this.updateFormValidState();
  }

  // フォームのバリデーション状態を見て、「計算」ボタンの活性と非活性の状態を切り替える
  updateFormValidState() {
    const input = this.inputs.value;
    const resultAnyInput1 = this.validationService.isOneInputEmptyValidator(input.amountAny1, input.yearAny1);
    const resultAnyInput2 = this.validationService.isOneInputEmptyValidator(input.amountAny2, input.yearAny2);
    const resultAnyInput3 = this.validationService.isOneInputEmptyValidator(input.amountAny3, input.yearAny3);

    // `this.inputs.valid`は全てのフォームのバリデーションが通れば`true`が返る
    // `[disabled]=""`をfalseにするとボタン押下できるようになる。つまり、`&&`で繋いだ全ての条件を満たしたときにボタン押下できるようになる
    // `!(boolean)`は、すべてtrueなら反転してfalseを返すということ
    this.isAbnormalInput = !(this.inputs.valid && resultAnyInput1 && resultAnyInput2 && resultAnyInput3);
  }

  private getTsumitateInput(): Input {
    const input = this.inputs.value;
    const initialAsset = input.initialAsset ?? 0;
    const amounts = this.filterNull([input.amountRequired, input.amountAny1, input.amountAny2, input.amountAny3]);
    const years = this.filterNull([input.yearRequired, input.yearAny1, input.yearAny2, input.yearAny3]);
    const rate = input.rate ?? 5;

    return { initialAsset, amounts, years, rate };
  }

  async onCalculate() {
    // Inputの取得
    const tsumitateInput = this.getTsumitateInput();

    // 計算
    const tsumitateOutput = this.calcService.tsumitateEasyCalculate(tsumitateInput);

    // compoundInterestCalcResult を更新
    this.compoundInterestCalcResult.update(() => tsumitateOutput.compoundInterestCalcResult);

    // 初期資産額をセッションストレージに保存
    this.setInitialAssetInSessionStorage(tsumitateInput.initialAsset);

    // DB登録
    await this.dbService.add({ input: tsumitateInput, output: tsumitateOutput });
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
}
