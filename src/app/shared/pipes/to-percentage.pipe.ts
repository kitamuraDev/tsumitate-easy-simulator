import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPercentage',
  standalone: true,
})
export class ToPercentagePipe implements PipeTransform {
  /**
   * 評価損益率を計算して返す
   *
   * @param simpleInterestCalcResult 運用金額
   * @param compoundInterestCalcResult 最終評価額
   * @returns 評価損益率
   */
  transform(simpleInterestCalcResult: number, compoundInterestCalcResult: number): string {
    const percentage = ((compoundInterestCalcResult - simpleInterestCalcResult) / simpleInterestCalcResult) * 100;

    return `+${percentage.toFixed(2)}%`;
  }
}
