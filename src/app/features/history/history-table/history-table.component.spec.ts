import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ToPercentagePipe } from '../../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import type { Tsumitate } from '../../../shared/types/tsumitate';
import { HistoryTableComponent } from './history-table.component';

describe('HistoryTableComponent', () => {
  const mockTsumitateList: Tsumitate[] = [
    {
      id: 1,
      input: { initialAsset: 0, rate: 5, amounts: [5], years: [1] },
      output: { compoundInterestCalcResult: 613628, diff: 13628, simpleInterestCalcResult: 600000 },
    },
    {
      id: 2,
      input: { initialAsset: 0, rate: 5, amounts: [5, 6], years: [1, 2] },
      output: { compoundInterestCalcResult: 2186052, diff: 146052, simpleInterestCalcResult: 2040000 },
    },
    {
      id: 3,
      input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7], years: [1, 2, 3] },
      output: { compoundInterestCalcResult: 5238880, diff: 678880, simpleInterestCalcResult: 4560000 },
    },
    {
      id: 4,
      input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7, 8], years: [1, 2, 3, 4] },
      output: { compoundInterestCalcResult: 10599599, diff: 2199599, simpleInterestCalcResult: 8400000 },
    },
    {
      id: 5,
      input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7, 8, 0], years: [1, 2, 3, 4, 30] },
      output: { compoundInterestCalcResult: 45810858, diff: 37410858, simpleInterestCalcResult: 8400000 },
    },
  ];

  it.each(mockTsumitateList)('履歴データが履歴テーブルに表示されること', async ({ id, input, output }) => {
    const { transform: truncateTransform } = new TruncateToTenThousandsPipe();
    const { transform: percentageTransform } = new ToPercentagePipe();

    const { fixture } = await render(HistoryTableComponent, {
      providers: [provideZonelessChangeDetection()],
      imports: [TruncateToTenThousandsPipe, ToPercentagePipe],
      inputs: { tsumitateList: [{ id, input, output }] },
    });

    // テーブルヘッダー
    const expectedHeaderNames = fixture.componentInstance.tableHeaderNames;
    for (const header of expectedHeaderNames) {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    }

    // 初期投資額
    const initialAsset = `${input.initialAsset}万円`;
    expect(screen.getByText(initialAsset)).toBeInTheDocument();

    // 年率
    const rate = `${input.rate}%`;
    expect(screen.getByText(rate)).toBeInTheDocument();

    // 毎月積立額 (積立期間)
    const amountsAndYears = input.amounts
      .map((amount, index) => {
        const year = input.years[index];
        return year ? `${amount}万円 (${year}年)` : '';
      })
      .filter(Boolean)
      .join(' ');
    expect(screen.getByText(amountsAndYears)).toBeInTheDocument();

    // 投資元本
    const simpleInterestCalcResult = `${truncateTransform(output.simpleInterestCalcResult)}万円`;
    expect(screen.getByText(simpleInterestCalcResult)).toBeInTheDocument();

    // 評価損益
    const diff = `${truncateTransform(output.diff)}万円 (${percentageTransform(output.simpleInterestCalcResult, output.compoundInterestCalcResult)})`;
    expect(screen.getByText(diff)).toBeInTheDocument();

    // 最終評価額
    const compoundInterestCalcResult = `${truncateTransform(output.compoundInterestCalcResult)}万円`;
    expect(screen.getByText(compoundInterestCalcResult)).toBeInTheDocument();

    // 削除ボタン
    expect(screen.getByRole('button', { name: '履歴削除ボタン' })).toBeInTheDocument();
  });

  // biome-ignore format: 一行にまとめたいため
  it.each(mockTsumitateList)('削除アイコンのボタン押下で履歴データの削除メソッドが呼ばれること', async ({ id, input, output }) => {
    const user = userEvent.setup();
    const deleteTsumitateSpy = vi.fn();

    const { fixture } = await render(HistoryTableComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { tsumitateList: [{ id, input, output }] },
      on: { deleteTsumitate: deleteTsumitateSpy },
    });

    expect(fixture.componentInstance.tsumitateList()).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: '履歴削除ボタン' }));

    expect(deleteTsumitateSpy).toHaveBeenCalled();
    expect(deleteTsumitateSpy).toHaveBeenCalledTimes(1);
    expect(deleteTsumitateSpy).toHaveBeenCalledWith(id);
  });
});
