import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalculateService } from '../../shared/services/calculate.service';
import { TsumitateDatabaseService } from '../../core/tsumitate-database.service';
import { ValidationService } from '../../shared/services/validation.service';
import { Output, Tsumitate } from '../../shared/types/tsumitate';
import { ValidationWarningMessageComponent } from '../../shared/components/validation-warning-message/validation-warning-message.component';
import { DecrementButtonComponent } from '../../shared/components/decrement-button/decrement-button.component';
import { IncrementButtonComponent } from '../../shared/components/increment-button/increment-button.component';
import { DescriptiveTextComponent } from './descriptive-text/descriptive-text.component';
import { LabelTextComponent } from './label-text/label-text.component';
import { DisplayAmountValueComponent } from './display-amount-value/display-amount-value.component';
import { BaseButtonComponent } from '../../shared/components/base-button/base-button.component';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';

@Component({
  selector: 'app-simulation',
  standalone: true,
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
  ],
  templateUrl: './simulation.component.html',
})
export default class SimulationComponent {
  private readonly calcService = inject(CalculateService);
  private readonly dbService = inject(TsumitateDatabaseService);
  private readonly validationService = inject(ValidationService);

  tsumitate!: Tsumitate;
  isAbnormalInput = true;

  inputs = new FormGroup({
    amountRequired: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(10)]),
    yearRequired: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    amountAny1: new FormControl(null, [Validators.min(1), Validators.max(10)]),
    yearAny1: new FormControl(null, [
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    amountAny2: new FormControl(null, [Validators.min(1), Validators.max(10)]),
    yearAny2: new FormControl(null, [
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

    // `this.inputs.valid`は全てのフォームのバリデーションが通れば`true`が返る
    // `[disabled]=""`をfalseにするとボタン押下できるようになる。つまり、`&&`で繋いだ全ての条件を満たしたときにボタン押下できるようになる
    this.isAbnormalInput = this.inputs.valid && resultAnyInput1 && resultAnyInput2 ? false : true;
  }

  setTsumitateInput() {
    this.tsumitate = {
      input: {
        amounts: [this.inputs.value.amountRequired!, this.inputs.value.amountAny1!, this.inputs.value.amountAny2!],
        years: [this.inputs.value.yearRequired!, this.inputs.value.yearAny1!, this.inputs.value.yearAny2!],
        rate: this.inputs.value.rate!,
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
    const output = await this.calcService.tsumitateEasyCalculate(
      this.tsumitate.input.amounts,
      this.tsumitate.input.years,
      this.tsumitate.input.rate,
    );

    // Outputのセット
    await this.setTsumitateOutput(output);
    console.log(this.tsumitate);

    // DB登録
    this.dbService.add(this.tsumitate);
  }
}
