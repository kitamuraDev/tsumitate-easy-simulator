import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TsumitateDatabaseService } from '../../core/tsumitate-database.service';
import { BaseButtonComponent } from '../../shared/components/base-button/base-button.component';
import { DecrementButtonComponent } from '../../shared/components/decrement-button/decrement-button.component';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';
import { IncrementButtonComponent } from '../../shared/components/increment-button/increment-button.component';
import { ValidationWarningMessageComponent } from '../../shared/components/validation-warning-message/validation-warning-message.component';
import { CalculateService } from '../../shared/services/calculate.service';
import { ValidationService } from '../../shared/services/validation.service';
import type { Output, Tsumitate } from '../../shared/types/tsumitate';
import { DescriptiveTextComponent } from './descriptive-text/descriptive-text.component';
import { DisplayAmountValueComponent } from './display-amount-value/display-amount-value.component';
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
    DescriptiveTextComponent,
    BaseButtonComponent,
    DisplayAmountValueComponent,
    ToggleButtonComponent,
  ],
  templateUrl: './simulation.component.html',
})
export default class SimulationComponent {
  private readonly calcService = inject(CalculateService);
  private readonly dbService = inject(TsumitateDatabaseService);
  private readonly validationService = inject(ValidationService);

  tsumitate!: Tsumitate;
  isAbnormalInput = false;
  isOpenAnyInputsBlock = false;

  toggleOpenAnyInputsBlock() {
    this.isOpenAnyInputsBlock = !this.isOpenAnyInputsBlock;
  }

  inputs = new FormGroup({
    initialAsset: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1800)]),
    amountRequired: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(30)]),
    yearRequired: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    amountAny1: new FormControl(null, [Validators.min(1), Validators.max(30)]),
    yearAny1: new FormControl(null, [
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    amountAny2: new FormControl(null, [Validators.min(1), Validators.max(30)]),
    yearAny2: new FormControl(null, [
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    amountAny3: new FormControl(null, [Validators.min(1), Validators.max(30)]),
    yearAny3: new FormControl(null, [
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    rate: new FormControl(5, [Validators.required, Validators.min(0), Validators.max(20)]),
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
    const resultAnyInput1 = this.validationService.isOneInputEmptyValidator(
      this.inputs.value.amountAny1,
      this.inputs.value.yearAny1,
    );

    const resultAnyInput2 = this.validationService.isOneInputEmptyValidator(
      this.inputs.value.amountAny2,
      this.inputs.value.yearAny2,
    );

    const resultAnyInput3 = this.validationService.isOneInputEmptyValidator(
      this.inputs.value.amountAny3,
      this.inputs.value.yearAny3,
    );

    // `this.inputs.valid`は全てのフォームのバリデーションが通れば`true`が返る
    // `[disabled]=""`をfalseにするとボタン押下できるようになる。つまり、`&&`で繋いだ全ての条件を満たしたときにボタン押下できるようになる
    // `!(boolean)`は、すべてtrueなら反転してfalseを返すということ
    this.isAbnormalInput = !(this.inputs.valid && resultAnyInput1 && resultAnyInput2 && resultAnyInput3);
  }

  setTsumitateInput() {
    const input = this.inputs.value;

    this.tsumitate = {
      input: {
        // biome-ignore lint/style/noNonNullAssertion: 一旦無視。TODO: 後で修正
        initialAsset: input.initialAsset!,
        // biome-ignore lint/style/noNonNullAssertion: 一旦無視。TODO: 後で修正
        amounts: [input.amountRequired!, input.amountAny1!, input.amountAny2!, input.amountAny3!],
        // biome-ignore lint/style/noNonNullAssertion: 一旦無視。TODO: 後で修正
        years: [input.yearRequired!, input.yearAny1!, input.yearAny2!, input.yearAny3!],
        // biome-ignore lint/style/noNonNullAssertion: 一旦無視。TODO: 後で修正
        rate: input.rate!,
      },
      output: {
        compoundInterestCalcResult: 0,
        simpleInterestCalcResult: 0,
        diff: 0,
      },
    };
  }

  setTsumitateOutput(output: Output) {
    const { input } = this.tsumitate;

    this.tsumitate = {
      input,
      output,
    };
  }

  async onCalculate() {
    // Inputのセット
    await this.setTsumitateInput();

    // 計算
    const output = await this.calcService.tsumitateEasyCalculate(this.tsumitate.input);

    // Outputのセット
    await this.setTsumitateOutput(output);

    // DB登録
    this.dbService.add(this.tsumitate);
  }
}
