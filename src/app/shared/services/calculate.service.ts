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
    const { initialAsset, amounts, years, rate } = input;

    const initialAssetManYen = initialAsset * 10000;              // 初期資産を万単位に変換
    const monthlyAmounts = amounts.map(amount => amount * 10000); // 月間積立投資額を万単位に変換
    const monthlyYears = years.map(year => year * 12);            // 年数を月数に変換
    const monthlyRate = ((rate / 100) + 1) ** (1 / 12);           // 年利を月利に変換 ※年利(%) ** (1/12)で月利に変換できる

    const compoundInterestCalcResult = this.compoundInterestCalc(initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);
    const simpleInterestCalcResult = this.simpleInterestCalc(initialAssetManYen, monthlyAmounts, monthlyYears);
    const diff = compoundInterestCalcResult - simpleInterestCalcResult;

    return { compoundInterestCalcResult, simpleInterestCalcResult, diff };
  };

  // 複利計算
  private compoundInterestCalc(initialAssetManYen: number, monthlyAmounts: number[], monthlyYears: number[], monthlyRate: number): number {
    return monthlyAmounts.reduce(
      (acc, curr, i) => Array.from({ length: monthlyYears[i] }).reduce<number>((prev) => prev * monthlyRate + curr, acc),
      initialAssetManYen
    );
  }

  // 合算
  private simpleInterestCalc(initialAssetManYen: number, monthlyAmounts: number[], monthlyYears: number[]): number {
    return monthlyAmounts.reduce(
      (acc, curr, i) => Array.from({ length: monthlyYears[i] }).reduce<number>(prev => prev + curr, acc),
      initialAssetManYen,
    );
  }
}
