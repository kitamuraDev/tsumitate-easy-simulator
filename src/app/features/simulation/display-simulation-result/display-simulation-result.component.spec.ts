import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';

import { ToPercentagePipe } from '../../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import type { Tsumitate } from '../../../shared/types/tsumitate';
import { DisplaySimulationResultComponent } from './display-simulation-result.component';

describe('DisplaySimulationResultComponent', () => {
  const { transform: truncate } = new TruncateToTenThousandsPipe();
  const { transform: toPercentage } = new ToPercentagePipe();

  const mockTsumitateList: Tsumitate[] = [
    {
      input: { initialAsset: 0, rate: 5, amounts: [5], years: [1] },
      output: { compoundInterestCalcResult: 613628, diff: 13628, simpleInterestCalcResult: 600000 },
    },
    {
      input: { initialAsset: 0, rate: 5, amounts: [5, 6], years: [1, 2] },
      output: { compoundInterestCalcResult: 2186052, diff: 146052, simpleInterestCalcResult: 2040000 },
    },
    {
      input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7], years: [1, 2, 3] },
      output: { compoundInterestCalcResult: 5238880, diff: 678880, simpleInterestCalcResult: 4560000 },
    },
    {
      input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7, 8], years: [1, 2, 3, 4] },
      output: { compoundInterestCalcResult: 10599599, diff: 2199599, simpleInterestCalcResult: 8400000 },
    },
    {
      input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7, 8, 0], years: [1, 2, 3, 4, 30] },
      output: { compoundInterestCalcResult: 45810858, diff: 37410858, simpleInterestCalcResult: 8400000 },
    },
  ];

  // biome-ignore format: 一行にまとめたいため
  it.each(mockTsumitateList)('シミュレーション結果が画面に表示されること', async ({ input, output }) => {
    await render(DisplaySimulationResultComponent, {
      providers: [provideZonelessChangeDetection()],
      imports: [TruncateToTenThousandsPipe, ToPercentagePipe],
      inputs: { tsumitateSimulationResult: { input, output } },
    });

    // 最終評価額
    expect(screen.getByText(`${truncate(output.compoundInterestCalcResult)}`)).toBeInTheDocument();
    // 評価損益
    expect(screen.getByText(`+${truncate(output.diff)}万円 (${toPercentage(output.simpleInterestCalcResult, output.compoundInterestCalcResult)})`)).toBeInTheDocument();
    // 投資元本
    expect(screen.getByText(`${truncate(output.simpleInterestCalcResult)}万円`)).toBeInTheDocument();

    // 初期投資額
    expect(screen.getByText(`${input.initialAsset}`)).toBeInTheDocument();
    // 年率
    expect(screen.getByText(`${input.rate}`)).toBeInTheDocument();
    // 積立詳細
    input.amounts.forEach((amount, index) => {
      expect(screen.getByText(`${amount}万円`)).toBeInTheDocument();
      expect(screen.getByText(`を ${input.years[index]}年間`)).toBeInTheDocument();
    });
  });
});
