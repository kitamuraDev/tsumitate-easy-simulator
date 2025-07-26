import { provideZonelessChangeDetection, signal } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { DeferBlockState } from '@angular/core/testing';
import { type AmountChangeSetting, SettingDatabaseService } from '../../core/setting-database.service';
import { TruncateToTenThousandsPipe } from '../../shared/pipes/truncate-to-ten-thousands.pipe';
import { CalculateService } from '../../shared/services/calculate.service';
import SimulationComponent from './simulation.component';

describe('SimulationComponent', () => {
  describe('任意入力エリア', () => {
    it('「積立額を変更するかどうかのフラグ」がfalseの場合、任意入力エリアが表示されないこと', async () => {
      await render(SimulationComponent, {
        componentProperties: {
          amountChangeSetting: signal<AmountChangeSetting>({
            isAmountChangeEnabled: false,
            selectedAmountChangeCount: '1',
          }),
        },
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: false,
                  selectedAmountChangeCount: '1',
                }),
            },
          },
        ],
      });

      expect(screen.queryByTestId('any-inputs-container')).toBeNull();
    });

    it('「積立額を変更するかどうかのフラグ」がtrueの場合、任意入力エリアが表示されること', async () => {
      const { renderDeferBlock } = await render(SimulationComponent, {
        componentProperties: {
          amountChangeSetting: signal<AmountChangeSetting>({
            isAmountChangeEnabled: true,
            selectedAmountChangeCount: '1',
          }),
        },
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: true,
                  selectedAmountChangeCount: '1',
                }),
            },
          },
        ],
      });
      await renderDeferBlock(DeferBlockState.Complete);

      expect(screen.getByTestId('any-inputs-container')).toBeVisible();
    });

    it('「変更回数」が1回の場合、任意入力エリアが1つ表示されること', async () => {
      const { renderDeferBlock } = await render(SimulationComponent, {
        componentProperties: {
          amountChangeSetting: signal<AmountChangeSetting>({
            isAmountChangeEnabled: true,
            selectedAmountChangeCount: '1',
          }),
        },
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: true,
                  selectedAmountChangeCount: '1',
                }),
            },
          },
        ],
      });
      await renderDeferBlock(DeferBlockState.Complete);

      expect(screen.getByTestId('any-inputs-container')).toBeVisible();
      expect(screen.getByTestId('amount-any-1-container')).toBeVisible();
      expect(screen.queryByTestId('amount-any-2-container')).toBeNull();
      expect(screen.queryByTestId('amount-any-3-container')).toBeNull();
    });

    it('「変更回数」が2回の場合、任意入力エリアが2つ表示されること', async () => {
      const { renderDeferBlock } = await render(SimulationComponent, {
        componentProperties: {
          amountChangeSetting: signal<AmountChangeSetting>({
            isAmountChangeEnabled: true,
            selectedAmountChangeCount: '2',
          }),
        },
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: true,
                  selectedAmountChangeCount: '2',
                }),
            },
          },
        ],
      });
      await renderDeferBlock(DeferBlockState.Complete);

      expect(screen.getByTestId('any-inputs-container')).toBeVisible();
      expect(screen.getByTestId('amount-any-1-container')).toBeVisible();
      expect(screen.getByTestId('amount-any-2-container')).toBeVisible();
      expect(screen.queryByTestId('amount-any-3-container')).toBeNull();
    });

    it('「変更回数」が3回の場合、任意入力エリアが3つ表示されること', async () => {
      const { renderDeferBlock } = await render(SimulationComponent, {
        componentProperties: {
          amountChangeSetting: signal<AmountChangeSetting>({
            isAmountChangeEnabled: true,
            selectedAmountChangeCount: '3',
          }),
        },
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: true,
                  selectedAmountChangeCount: '3',
                }),
            },
          },
        ],
      });
      await renderDeferBlock(DeferBlockState.Complete);

      expect(screen.getByTestId('any-inputs-container')).toBeVisible();
      expect(screen.getByTestId('amount-any-1-container')).toBeVisible();
      expect(screen.getByTestId('amount-any-2-container')).toBeVisible();
      expect(screen.getByTestId('amount-any-3-container')).toBeVisible();
    });
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
      await render(SimulationComponent, {
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncludedSetting: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: false,
                  selectedAmountChangeCount: '1',
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
      await user.click(screen.getByRole('button', { name: '計算' }));

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
              getNoInvestmentPeriodIncludedSetting: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: false,
                  selectedAmountChangeCount: '1',
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
              getNoInvestmentPeriodIncludedSetting: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: false,
                  selectedAmountChangeCount: '1',
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
              getNoInvestmentPeriodIncludedSetting: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: false,
                  selectedAmountChangeCount: '1',
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
              getNoInvestmentPeriodIncludedSetting: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
              getAmountChangeSetting: () =>
                Promise.resolve({
                  isAmountChangeEnabled: false,
                  selectedAmountChangeCount: '1',
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
