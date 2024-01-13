import { Injectable } from '@angular/core';

// prettier-ignore
@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  /**
   * 積立投資の複利計算
   *
   * ユースケース
   * 「n年はxx万円を積立てて、n年はxx万円を積立てる」ような、後から積立投資額を変更するケースに対応した複利計算
   *
   * @param monthlyAmounts 月間積立投資額
   * @param years 積立期間
   * @param rate 想定利回り（年率）
   * @returns { 複利計算の結果, 単利計算の結果, 差分 }
   */
  public tsumitateEasyCalculate = (monthlyAmounts: number[], years: number[], rate: number): {
    compoundInterestCalcResult: number;
    simpleInterestCalcResult: number;
    diff: number;
  } => {
    const yearlyAmounts = this.convertToYearlyAmounts(monthlyAmounts);
    const convertedRate = this.convertRate(rate);

    const compoundInterestCalcResult = this.compoundInterestCalc(yearlyAmounts, years, convertedRate);
    const simpleInterestCalcResult = this.simpleInterestCalc(yearlyAmounts, years);
    const diff = compoundInterestCalcResult - simpleInterestCalcResult;

    return { compoundInterestCalcResult, simpleInterestCalcResult, diff }
  };

  // 複利計算
  private compoundInterestCalc(yearlyAmounts: number[], years: number[], rate: number): number {
    return yearlyAmounts.reduce((acc, curr, i) => (
      Array.from({ length: years[i] })
        .reduce<number>((prev) => (prev + curr) * rate, acc)
    ), 0);
  }

  // 単利計算
  private simpleInterestCalc(yearlyAmounts: number[], years: number[]): number {
    return yearlyAmounts.reduce((acc, curr, i) => (
      Array.from({ length: years[i] })
        .reduce<number>((prev) => prev + curr, acc)
    ), 0);
  }

  /**
   * 配列の中の「月間積立投資額」を「年間積立投資額」に変換
   *
   * @param monthlyAmounts 月間積立投資額
   * @returns 年間積立投資額
   */
  private convertToYearlyAmounts(monthlyAmounts: number[]): number[] {
    return monthlyAmounts.map(amount => amount * 12);
  }

  /**
   * 整数の年率を小数の年率に変換
   *
   * @param rate 整数の年率
   * @returns 小数の年率
   */
  private convertRate(rate: number): number {
    return (rate / 100) + 1;
  }
}
