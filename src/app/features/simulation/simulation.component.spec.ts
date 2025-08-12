import { provideZonelessChangeDetection, signal } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';

import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { type AmountChangeSetting, SettingDatabaseService } from '../../core/setting-database.service';
import { ToPercentagePipe } from '../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../shared/pipes/truncate-to-ten-thousands.pipe';
import type { Tsumitate } from '../../shared/types/tsumitate';
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
      expect(screen.getByTestId('slider-amount-any-1')).toBeVisible();
      expect(screen.queryByTestId('slider-amount-any-2')).toBeNull();
      expect(screen.queryByTestId('slider-amount-any-3')).toBeNull();
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
      expect(screen.getByTestId('slider-amount-any-1')).toBeVisible();
      expect(screen.getByTestId('slider-amount-any-2')).toBeVisible();
      expect(screen.queryByTestId('slider-amount-any-3')).toBeNull();
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
      expect(screen.getByTestId('slider-amount-any-1')).toBeVisible();
      expect(screen.getByTestId('slider-amount-any-2')).toBeVisible();
      expect(screen.getByTestId('slider-amount-any-3')).toBeVisible();
    });
  });

  // biome-ignore format: 一行にまとめたいため
  describe('シミュレーション結果モーダル', () => {
    const { transform: truncate } = new TruncateToTenThousandsPipe();
    const { transform: toPercentage } = new ToPercentagePipe();

    const changeSliderValue = (testId: string, roleName: string, value: number) => {
      const slider = within(screen.getByTestId(testId)).getByRole('slider', {name: new RegExp(roleName)}) as HTMLInputElement;
      fireEvent.change(slider, { target: { value } });
    };

    const mockTsumitateList: Tsumitate[] = [
      {
        input: { initialAsset: 0, rate: 5, amounts: [5, 0, 0, 0], years: [1, 0, 0, 0] },
        output: { compoundInterestCalcResult: 613628, diff: 13628, simpleInterestCalcResult: 600000 },
      },
      {
        input: { initialAsset: 0, rate: 5, amounts: [5, 6, 0, 0], years: [1, 2, 0, 0] },
        output: { compoundInterestCalcResult: 2186052, diff: 146052, simpleInterestCalcResult: 2040000 },
      },
      {
        input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7, 0], years: [1, 2, 3, 0] },
        output: { compoundInterestCalcResult: 5238880, diff: 678880, simpleInterestCalcResult: 4560000 },
      },
      {
        input: { initialAsset: 0, rate: 5, amounts: [5, 6, 7, 8], years: [1, 2, 3, 4] },
        output: { compoundInterestCalcResult: 10599599, diff: 2199599, simpleInterestCalcResult: 8400000 },
      },
    ];

    it.each(mockTsumitateList)('「計算」ボタン押下で、input/outputの値がシュミレーション結果モーダルに反映されること', async ({ input, output }) => {
      const user = userEvent.setup();
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
              getNoInvestmentPeriodIncludedSetting: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
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

      // 各スライダーの値変更
      changeSliderValue('slider-initial-asset', '初期投資額', input.initialAsset);
      changeSliderValue('slider-rate', '年率', input.rate);
      changeSliderValue('slider-amount-required', '毎月積立額', input.amounts[0]);
      changeSliderValue('slider-year-required', '積立期間', input.years[0]);
      changeSliderValue('slider-amount-any-1', '毎月積立額', input.amounts[1]);
      changeSliderValue('slider-year-any-1', '積立期間', input.years[1]);
      changeSliderValue('slider-amount-any-2', '毎月積立額', input.amounts[2]);
      changeSliderValue('slider-year-any-2', '積立期間', input.years[2]);
      changeSliderValue('slider-amount-any-3', '毎月積立額', input.amounts[3]);
      changeSliderValue('slider-year-any-3', '積立期間', input.years[3]);

      // 計算ボタン押下
      await user.click(screen.getByRole('button', { name: '計算' }));

      const mo = within(screen.getByTestId('modal-output'))
      // 最終評価額
      expect(mo.getByText(`${truncate(output.compoundInterestCalcResult)}`)).toBeVisible();
      // 評価損益
      expect(mo.getByText(`+${truncate(output.diff)}万円 (${toPercentage(output.simpleInterestCalcResult, output.compoundInterestCalcResult)})`),).toBeVisible();
      // 投資元本
      expect(mo.getByText(`${truncate(output.simpleInterestCalcResult)}万円`)).toBeVisible();

      const mi = within(screen.getByTestId('modal-input'))
      // 初期投資額
      expect(mi.getByText(`${input.initialAsset}`)).toBeVisible();
      // 年率
      expect(mi.getByText(`${input.rate}`)).toBeVisible();
      // 積立詳細
      input.years.forEach((year, index) => {
        if (year > 0) {
          expect(mi.getByText(`${input.amounts[index]}万円`)).toBeVisible();
          expect(mi.getByText(`を ${year}年間`)).toBeVisible();
        }
      });
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
