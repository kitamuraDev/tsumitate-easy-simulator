import { Injectable } from '@angular/core';
import type { Input, Output } from '../types/tsumitate';

// biome-ignore format: off
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
   * @param input 入力
   * @returns 出力
   */
  public tsumitateEasyCalculate = (input: Input): Output => {
    const { initialAsset, amounts: monthlyAmounts, years, rate } = input;

    const convertedInitialAsset = this.convertToManen(initialAsset);
    const yearlyAmounts = this.convertToYearlyAmounts(monthlyAmounts);
    const convertedRate = this.convertRate(rate);

    const compoundInterestCalcResult = this.compoundInterestCalc(convertedInitialAsset, yearlyAmounts, years, convertedRate);
    const simpleInterestCalcResult = this.simpleInterestCalc(convertedInitialAsset, yearlyAmounts, years);
    const diff = compoundInterestCalcResult - simpleInterestCalcResult;

    return { compoundInterestCalcResult, simpleInterestCalcResult, diff };
  };

  // 複利計算
  private compoundInterestCalc(initialAsset: number, yearlyAmounts: number[], years: number[], rate: number): number {
    return yearlyAmounts.reduce(
      (acc, curr, i) => Array.from({ length: years[i] }).reduce<number>(prev => (prev + curr) * rate, acc),
      initialAsset,
    );
  }

  // 合算
  private simpleInterestCalc(initialAsset: number, yearlyAmounts: number[], years: number[]): number {
    return yearlyAmounts.reduce(
      (acc, curr, i) => Array.from({ length: years[i] }).reduce<number>(prev => prev + curr, acc),
      initialAsset,
    );
  }

  /**
   * 正の整数を万単位に変換
   *
   * @param initialAsset 初期資産
   * @returns 万円
   */
  private convertToManen(initialAsset: number): number {
    return initialAsset * 10000;
  }

  /**
   * 配列の中の「月間積立投資額」を「年間積立投資額」に変換
   *
   * @param monthlyAmounts 月間積立投資額
   * @returns 年間積立投資額
   */
  private convertToYearlyAmounts(monthlyAmounts: number[]): number[] {
    return monthlyAmounts.map(amount => amount * 10000 * 12);
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
