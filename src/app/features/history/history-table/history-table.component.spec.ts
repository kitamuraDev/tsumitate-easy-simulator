import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ToPercentagePipe } from '../../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import { HistoryTableComponent } from './history-table.component';

describe('HistoryTableComponent', () => {
  const mockTsumitateList = [
    {
      id: 1,
      input: {
        initialAsset: 210,
        amounts: [20, 10, 0, 0],
        years: [2, 5, 0, 0],
        rate: 5,
      },
      output: {
        compoundInterestCalcResult: 16158223.093541713,
        simpleInterestCalcResult: 12900000,
        diff: 3258223.0935417134,
      },
    },
  ];

  it('履歴データが履歴テーブルに表示されること', async () => {
    const { transform: truncateTransform } = new TruncateToTenThousandsPipe();
    const { transform: percentageTransform } = new ToPercentagePipe();
    const expectedHistory = mockTsumitateList[0];

    const { fixture } = await render(HistoryTableComponent, {
      providers: [provideZonelessChangeDetection()],
      imports: [TruncateToTenThousandsPipe, ToPercentagePipe],
      inputs: { tsumitateList: mockTsumitateList },
    });

    // テーブルヘッダー
    const expectedHeaderNames = fixture.componentInstance.tableHeaderNames;
    for (const header of expectedHeaderNames) {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    }

    // 初期投資額
    const initialAsset = `${expectedHistory.input.initialAsset}万円`;
    expect(screen.getByText(initialAsset)).toBeInTheDocument();

    // 年率
    const rate = `${expectedHistory.input.rate}%`;
    expect(screen.getByText(rate)).toBeInTheDocument();

    // 毎月積立額 (積立期間)
    const amountsAndYears = `${expectedHistory.input.amounts[0]}万円 (${expectedHistory.input.years[0]}年) ${expectedHistory.input.amounts[1]}万円 (${expectedHistory.input.years[1]}年)`;
    expect(screen.getByText(amountsAndYears)).toBeInTheDocument();

    // 投資元本
    const simpleInterestCalcResult = `${truncateTransform(expectedHistory.output.simpleInterestCalcResult)}万円`;
    expect(screen.getByText(simpleInterestCalcResult)).toBeInTheDocument();

    // 評価損益
    const diff = `${truncateTransform(expectedHistory.output.diff)}万円 (${percentageTransform(expectedHistory.output.simpleInterestCalcResult, expectedHistory.output.compoundInterestCalcResult)})`;
    expect(screen.getByText(diff)).toBeInTheDocument();

    // 最終評価額
    const compoundInterestCalcResult = `${truncateTransform(expectedHistory.output.compoundInterestCalcResult)}万円`;
    expect(screen.getByText(compoundInterestCalcResult)).toBeInTheDocument();

    // 削除ボタン
    expect(screen.getByRole('button', { name: '履歴削除ボタン' })).toBeInTheDocument();
  });

  it('削除アイコンのボタン押下で履歴データの削除メソッドが呼ばれること', async () => {
    const user = userEvent.setup();
    const deleteTsumitateSpy = vi.fn();

    const { fixture } = await render(HistoryTableComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { tsumitateList: mockTsumitateList },
      on: { deleteTsumitate: deleteTsumitateSpy },
    });

    expect(fixture.componentInstance.tsumitateList()).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: '履歴削除ボタン' }));

    expect(deleteTsumitateSpy).toHaveBeenCalled();
    expect(deleteTsumitateSpy).toHaveBeenCalledTimes(1);
    expect(deleteTsumitateSpy).toHaveBeenCalledWith(mockTsumitateList[0].id);
  });
});
