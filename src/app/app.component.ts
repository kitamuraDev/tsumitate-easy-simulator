import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalculateService } from './shared/services/calculate.service';
import type { Tsumitate, Output } from './shared/types/tsumitate';
import { TsumitateDatabaseService } from './core/tsumitate-database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly calcService = inject(CalculateService);
  private readonly dbService = inject(TsumitateDatabaseService);
  tsumitate!: Tsumitate;

  inputs = new FormGroup({
    amountReqired: new FormControl(30000), // 必須。max: 100000。min: 100。小数点は入力できない。
    yearRequired: new FormControl(3), // 必須。max: 40。min: 1。小数点は入力できない。
    rate: new FormControl(5), // 必須。max: 20。min: 0。小数点は入力できない。
  });

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
