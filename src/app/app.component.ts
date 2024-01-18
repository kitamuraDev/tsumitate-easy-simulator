import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalculateService } from './shared/services/calculate.service';
import type { Tsumitate, Output } from './shared/types/tsumitate';
import { TsumitateDatabaseService } from './core/tsumitate-database.service';
import { ValidationService } from './shared/services/validation.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly calcService = inject(CalculateService);
  private readonly dbService = inject(TsumitateDatabaseService);
  private readonly validationService = inject(ValidationService);

  tsumitate!: Tsumitate;
  isAbnormalInput = true;

  ngOnInit(): void {
    initFlowbite();
  }

  inputs = new FormGroup({
    amountReqired: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(10)]),
    yearRequired: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(40),
      this.validationService.integerValueValidator(),
    ]),
    rate: new FormControl(5, [Validators.required, Validators.min(0), Validators.max(20)]),
  });

  onInput() {
    // FormGroupにある全てのフォームのバリデーションが通れば `true` が返る
    // [disabled]="" <- をfalseにするとボタン押下できるようになるため、`isAbnormalInput`に代入する際に反転させてる
    this.isAbnormalInput = !this.inputs.valid;
  }

  setTsumitateInput() {
    this.tsumitate = {
      input: {
        amounts: [this.inputs.value.amountReqired!],
        years: [this.inputs.value.yearRequired!],
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

    // DB登録
    this.dbService.add(this.tsumitate);
  }
}
