import { provideZonelessChangeDetection, signal } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { type AmountChangeSetting, SettingDatabaseService } from '../../core/setting-database.service';
import SettingComponent from './setting.component';

describe('SettingComponent', () => {
  it('「積立無しの期間を含めるかどうかのフラグ」がtrueの場合、セレクトボックスが操作できること', async () => {
    await render(SettingComponent, {
      componentProperties: {
        isNoInvestmentPeriodIncluded: signal(true),
        selectedCurrentAge: signal('25'),
        selectedEndAge: signal('65'),
      },
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

    const selectOfCurrentAge = screen.getByLabelText('現在の年齢') as HTMLSelectElement;
    const selectOfEndAge = screen.getByLabelText('運用終了年齢') as HTMLSelectElement;

    expect(selectOfCurrentAge).toBeEnabled();
    expect(selectOfEndAge).toBeEnabled();
  });

  it('「積立無しの期間を含めるかどうかのフラグ」がfalseの場合、セレクトボックスが操作できないこと', async () => {
    await render(SettingComponent, {
      componentProperties: {
        isNoInvestmentPeriodIncluded: signal(false),
        selectedCurrentAge: signal('25'),
        selectedEndAge: signal('65'),
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
                isAmountChangeEnabled: false,
                selectedAmountChangeCount: '1',
              }),
          },
        },
      ],
    });

    const selectOfCurrentAge = screen.getByLabelText('現在の年齢') as HTMLSelectElement;
    const selectOfEndAge = screen.getByLabelText('運用終了年齢') as HTMLSelectElement;

    expect(selectOfCurrentAge).toBeDisabled();
    expect(selectOfEndAge).toBeDisabled();
  });

  it('無操作であれば保存ボタンが押下できないこと。また、積立無し期間フラグを操作すれば保存ボタンが押下できるようになること', async () => {
    const user = userEvent.setup();

    await render(SettingComponent, {
      componentProperties: {
        isFormEdited: signal(false),
        isNoInvestmentPeriodIncluded: signal(true),
        selectedCurrentAge: signal('25'),
        selectedEndAge: signal('65'),
      },
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

    const saveButton = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement;
    expect(saveButton).toBeDisabled();

    // 何かしらの操作を行う
    const checkbox = screen.getByRole('checkbox', { name: '積立無しの期間を含める' }) as HTMLInputElement;
    await user.click(checkbox);

    expect(saveButton).toBeEnabled();
  });

  it('保存ボタン押下で、積立無し期間設定の設定値が保存されること', async () => {
    const user = userEvent.setup();
    const mockUpdateNoInvestmentPeriodIncludedSetting = vi.fn();
    const mockUpdateAmountChangeSetting = vi.fn();

    await render(SettingComponent, {
      componentProperties: {
        isFormEdited: signal(false),
        isNoInvestmentPeriodIncluded: signal(false),
        selectedCurrentAge: signal('25'),
        selectedEndAge: signal('65'),
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
            updateNoInvestmentPeriodIncludedSetting: mockUpdateNoInvestmentPeriodIncludedSetting,
            getAmountChangeSetting: () =>
              Promise.resolve({
                isAmountChangeEnabled: false,
                selectedAmountChangeCount: '1',
              }),
            updateAmountChangeSetting: mockUpdateAmountChangeSetting,
          },
        },
      ],
    });

    const checkbox = screen.getByRole('checkbox', { name: '積立無しの期間を含める' }) as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox); // false -> true
    expect(checkbox).toBeChecked();

    const selectOfCurrentAge = screen.getByLabelText('現在の年齢') as HTMLSelectElement;
    expect(selectOfCurrentAge.value).toBe('25');
    await user.selectOptions(selectOfCurrentAge, '26'); // 25 -> 26
    expect(selectOfCurrentAge.value).toBe('26');

    const selectOfEndAge = screen.getByLabelText('運用終了年齢') as HTMLSelectElement;
    expect(selectOfEndAge.value).toBe('65');
    await user.selectOptions(selectOfEndAge, '55'); // 65 -> 55
    expect(selectOfEndAge.value).toBe('55');

    const saveButton = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement;
    await user.click(saveButton);

    expect(mockUpdateNoInvestmentPeriodIncludedSetting).toHaveBeenCalledWith({
      isNoInvestmentPeriodIncluded: true,
      selectedCurrentAge: '26',
      selectedEndAge: '55',
    });
    expect(saveButton).toBeDisabled();
  });

  it('「積立額を変更するかどうかのフラグ」がtrueの場合、セレクトボックスが操作できること', async () => {
    await render(SettingComponent, {
      componentProperties: {
        isAmountChangeEnabled: signal(true),
        selectedAmountChangeCount: signal<AmountChangeSetting['selectedAmountChangeCount']>('1'),
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
                selectedAmountChangeCount: '1',
              }),
          },
        },
      ],
    });

    const selectOfAmountChangeCount = screen.getByLabelText('変更回数') as HTMLSelectElement;
    expect(selectOfAmountChangeCount).toBeEnabled();
  });

  it('「積立額を変更するかどうかのフラグ」がfalseの場合、セレクトボックスが操作できないこと', async () => {
    await render(SettingComponent, {
      componentProperties: {
        isAmountChangeEnabled: signal(false),
        selectedAmountChangeCount: signal<AmountChangeSetting['selectedAmountChangeCount']>('1'),
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
                isAmountChangeEnabled: false,
                selectedAmountChangeCount: '1',
              }),
          },
        },
      ],
    });

    const selectOfAmountChangeCount = screen.getByLabelText('変更回数') as HTMLSelectElement;
    expect(selectOfAmountChangeCount).toBeDisabled();
  });

  it('無操作であれば保存ボタンが押下できないこと。また、積立額変更フラグを操作すれば保存ボタンが押下できるようになること', async () => {
    const user = userEvent.setup();

    await render(SettingComponent, {
      componentProperties: {
        isFormEdited: signal(false),
        isAmountChangeEnabled: signal(false),
        selectedAmountChangeCount: signal<AmountChangeSetting['selectedAmountChangeCount']>('1'),
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
                isAmountChangeEnabled: false,
                selectedAmountChangeCount: '1',
              }),
          },
        },
      ],
    });

    const saveButton = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement;
    expect(saveButton).toBeDisabled();

    // 何かしらの操作を行う
    const checkbox = screen.getByRole('checkbox', { name: '積立額を変更する' }) as HTMLInputElement;
    await user.click(checkbox);

    expect(saveButton).toBeEnabled();
  });

  it('保存ボタン押下で、積立額変更設定の設定値が保存されること', async () => {
    const user = userEvent.setup();
    const mockUpdateNoInvestmentPeriodIncludedSetting = vi.fn();
    const mockUpdateAmountChangeSetting = vi.fn();

    await render(SettingComponent, {
      componentProperties: {
        isFormEdited: signal(false),
        isAmountChangeEnabled: signal(false),
        selectedAmountChangeCount: signal<AmountChangeSetting['selectedAmountChangeCount']>('1'),
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
            updateNoInvestmentPeriodIncludedSetting: mockUpdateNoInvestmentPeriodIncludedSetting,
            getAmountChangeSetting: () =>
              Promise.resolve({
                isAmountChangeEnabled: false,
                selectedAmountChangeCount: '1',
              }),
            updateAmountChangeSetting: mockUpdateAmountChangeSetting,
          },
        },
      ],
    });

    const checkbox = screen.getByRole('checkbox', { name: '積立額を変更する' }) as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox); // false -> true
    expect(checkbox).toBeChecked();

    const selectOfAmountChangeCount = screen.getByLabelText('変更回数') as HTMLSelectElement;
    expect(selectOfAmountChangeCount.value).toBe('1');
    await user.selectOptions(selectOfAmountChangeCount, '2'); // 1 -> 2
    expect(selectOfAmountChangeCount.value).toBe('2');

    const saveButton = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement;
    await user.click(saveButton);

    expect(mockUpdateAmountChangeSetting).toHaveBeenCalledWith({
      isAmountChangeEnabled: true,
      selectedAmountChangeCount: '2',
    });
    expect(saveButton).toBeDisabled();
  });
});
