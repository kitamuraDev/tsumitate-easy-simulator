import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SettingDatabaseService } from '../../core/setting-database.service';
import SettingComponent from './setting.component';

describe('SettingComponent', () => {
  it('「積立無しの期間を含めるかどうかのフラグ」がtrueの場合、セレクトボックスが操作できること', async () => {
    await render(SettingComponent, {
      componentProperties: {
        isNoInvestmentPeriodIncluded: true,
        selectedCurrentAge: '25',
        selectedEndAge: '65',
      },
      providers: [
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

    const selectOfCurrentAge = screen.getByLabelText('現在の年齢') as HTMLSelectElement;
    const selectOfEndAge = screen.getByLabelText('運用終了年齢') as HTMLSelectElement;

    expect(selectOfCurrentAge).toBeEnabled();
    expect(selectOfEndAge).toBeEnabled();
  });

  it('「積立無しの期間を含めるかどうかのフラグ」がfalseの場合、セレクトボックスが操作できないこと', async () => {
    await render(SettingComponent, {
      componentProperties: {
        isNoInvestmentPeriodIncluded: false,
        selectedCurrentAge: '25',
        selectedEndAge: '65',
      },
      providers: [
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

    const selectOfCurrentAge = screen.getByLabelText('現在の年齢') as HTMLSelectElement;
    const selectOfEndAge = screen.getByLabelText('運用終了年齢') as HTMLSelectElement;

    expect(selectOfCurrentAge).toBeDisabled();
    expect(selectOfEndAge).toBeDisabled();
  });

  it('無操作であれば保存ボタンが押下できないこと。また、操作すれば保存ボタンが押下できるようになること', async () => {
    const user = userEvent.setup();

    await render(SettingComponent, {
      componentProperties: {
        isFormEdited: false,
        isNoInvestmentPeriodIncluded: true,
        selectedCurrentAge: '25',
        selectedEndAge: '65',
      },
      providers: [
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

    const saveButton = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement;
    expect(saveButton).toBeDisabled();

    // 何かしらの操作を行う
    const checkbox = screen.getByRole('checkbox', { name: '積立無しの期間を含める' }) as HTMLInputElement;
    await user.click(checkbox);

    expect(saveButton).toBeEnabled();
  });

  it('保存ボタン押下で、設定値が保存されること', async () => {
    const user = userEvent.setup();
    const mockUpdateNoInvestmentPeriodIncluded = jest.fn();

    await render(SettingComponent, {
      componentProperties: {
        isFormEdited: false,
        isNoInvestmentPeriodIncluded: false,
        selectedCurrentAge: '20',
        selectedEndAge: '50',
      },
      providers: [
        {
          provide: SettingDatabaseService,
          useValue: {
            getNoInvestmentPeriodIncluded: () =>
              Promise.resolve({
                isNoInvestmentPeriodIncluded: false,
                selectedCurrentAge: '20',
                selectedEndAge: '50',
              }),
            updateNoInvestmentPeriodIncluded: mockUpdateNoInvestmentPeriodIncluded,
          },
        },
      ],
    });

    const checkbox = screen.getByRole('checkbox', { name: '積立無しの期間を含める' }) as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox); // false -> true
    expect(checkbox).toBeChecked();

    const selectOfCurrentAge = screen.getByLabelText('現在の年齢') as HTMLSelectElement;
    expect(selectOfCurrentAge.value).toBe('20');
    await user.selectOptions(selectOfCurrentAge, '25'); // 20 -> 25
    expect(selectOfCurrentAge.value).toBe('25');

    const selectOfEndAge = screen.getByLabelText('運用終了年齢') as HTMLSelectElement;
    expect(selectOfEndAge.value).toBe('50');
    await user.selectOptions(selectOfEndAge, '65'); // 50 -> 65
    expect(selectOfEndAge.value).toBe('65');

    const saveButton = screen.getByRole('button', { name: '保存' }) as HTMLButtonElement;
    await user.click(saveButton);

    expect(mockUpdateNoInvestmentPeriodIncluded).toHaveBeenCalledWith({
      isNoInvestmentPeriodIncluded: true,
      selectedCurrentAge: '25',
      selectedEndAge: '65',
    });
    expect(saveButton).toBeDisabled();
  });
});
