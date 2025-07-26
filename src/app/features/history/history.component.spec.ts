import { provideZonelessChangeDetection, signal } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';

import HistoryComponent from './history.component';

describe('NavigationBarComponent', () => {
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

  it('履歴データが1件以上の場合、履歴テーブルが表示されること', async () => {
    const { renderDeferBlock } = await render(HistoryComponent, {
      providers: [provideZonelessChangeDetection()],
      componentProperties: { tsumitateList: signal(mockTsumitateList) },
    });

    await renderDeferBlock(DeferBlockState.Complete);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('履歴データが1件未満の場合、「履歴データがありません」というメッセージが表示されること', async () => {
    await render(HistoryComponent, {
      providers: [provideZonelessChangeDetection()],
      componentProperties: { tsumitateList: signal([]) },
    });

    expect(screen.getByText('履歴データがありません')).toBeInTheDocument();
  });
});
