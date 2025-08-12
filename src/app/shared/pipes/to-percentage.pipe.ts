import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPercentage',
})
export class ToPercentagePipe implements PipeTransform {
  /**
   * 評価損益率を計算して返す
   *
   * @param simpleInterestCalcResult 投資元本
   * @param compoundInterestCalcResult 最終評価額
   * @returns 評価損益率
   */
  transform(simpleInterestCalcResult: number, compoundInterestCalcResult: number): string {
    const percentage = ((compoundInterestCalcResult - simpleInterestCalcResult) / simpleInterestCalcResult) * 100;

    return `+${percentage.toFixed(2)}%`;
  }
}
