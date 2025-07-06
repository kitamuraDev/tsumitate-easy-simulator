import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { DeferBlockState } from '@angular/core/testing';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SettingDatabaseService } from '../../core/setting-database.service';
import { TruncateToTenThousandsPipe } from '../../shared/pipes/truncate-to-ten-thousands.pipe';
import { CalculateService } from '../../shared/services/calculate.service';
import SimulationComponent from './simulation.component';

describe('SimulationComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {}); // ng-iconのエラーを無視
  });

  it('任意入力エリアがトグルされるか', async () => {
    const user = userEvent.setup();
    const { container } = await render(SimulationComponent, {
      providers: [provideZonelessChangeDetection()],
    });

    const toggleButton = container.querySelector('app-toggle-button button') as HTMLButtonElement;
    const anyInputsContainer = screen.getByTestId('any-inputs-container');

    // 任意入力エリアが非表示であること（初期表示時）
    expect(anyInputsContainer).toHaveClass('hidden');

    await user.click(toggleButton);
    expect(anyInputsContainer).toHaveClass('block');

    await user.click(toggleButton);
    expect(anyInputsContainer).toHaveClass('hidden');
  });

  describe('最終評価額', () => {
    const { tsumitateEasyCalculate } = new CalculateService();
    const { transform } = new TruncateToTenThousandsPipe();

    it('初期表示時は、計算結果を表示するコンポーネントは非表示であるか', async () => {
      const { container } = await render(SimulationComponent, {
        providers: [provideZonelessChangeDetection()],
      });
      const displayAmountValueComponent = container.querySelector('app-display-amount-value');

      expect(displayAmountValueComponent).toBeFalsy();
    });

    it('「計算」ボタンを押下で、計算結果が表示されるか', async () => {
      const user = userEvent.setup();
      const { renderDeferBlock } = await render(SimulationComponent, {
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });

      const iac = within(screen.getByTestId('initial-asset-container'));
      const initialAsset = Number((iac.getByRole('slider', { name: /初期資産額/ }) as HTMLInputElement).value);
      const rc = within(screen.getByTestId('rate-container'));
      const rate = Number((rc.getByRole('slider', { name: /想定利回り/ }) as HTMLInputElement).value);
      const arc = within(screen.getByTestId('amount-required-container'));
      const amount = Number((arc.getByRole('slider', { name: /毎月積立額/ }) as HTMLInputElement).value);
      const yrc = within(screen.getByTestId('year-required-container'));
      const year = Number((yrc.getByRole('slider', { name: /積立期間/ }) as HTMLInputElement).value);

      const calcResult = tsumitateEasyCalculate({ initialAsset, amounts: [amount], years: [year], rate });
      const expectedCalcResult = transform(calcResult.compoundInterestCalcResult);

      // 計算ボタン押下
      await user.click(screen.getByTestId('calculate-button'));

      // 計算ボタン押下後、値が0から更新されるのを契機に、`DisplayAmountValueComponent`が初めて表示されるため、`DeferBlockState.Complete`とする
      await renderDeferBlock(DeferBlockState.Complete);
      expect(await screen.findByText(expectedCalcResult)).toBeVisible();
    });
  });

  describe('adjustForNoInvestmentPeriod()', () => {
    it('積立無しの期間を含めない設定にしている場合は、元の配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [1, 2, 3];
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts, years });
    });

    it('積立無しの期間を含める設定にしている場合は、元の配列に積立無しの期間を追加した配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [1, 2, 3]; // 運用終了年齢を超えない積立年数（65 - 25 - 1 - 2 - 3 ... 34となる）
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts: [1, 2, 3, 0], years: [1, 2, 3, 34] });
    });

    it('積立無しの期間が0未満の場合は、元の配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [10, 20, 30]; // 運用終了年齢を超える積立年数（65 - 25 - 10 - 20 - 30 ... 0未満となる）
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts, years });
    });

    it('積立無しの期間が0の場合は、元の配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [10, 20, 10]; // 運用終了年齢と差引0の積立年数（65 - 25 - 10 - 20 - 10 ... 0）
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts, years });
    });
  });
});
