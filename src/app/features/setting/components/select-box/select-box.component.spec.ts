import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SelectBoxComponent } from './select-box.component';

describe('SelectBoxComponent', () => {
  const baseInputs = {
    id: 'id',
    disabled: false,
    selectedValue: 'option1',
    selectList: ['option1', 'option2', 'option3'],
    optionalTrailing: 'optional',
  };

  it('disabled が false の場合、セレクトボックスが活性状態であること', async () => {
    await render(SelectBoxComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { ...baseInputs, disabled: false },
    });

    const selectBox = screen.getByRole('combobox');

    expect(selectBox).toBeEnabled();
  });

  it('disabled が true の場合、セレクトボックスが非活性状態であること', async () => {
    await render(SelectBoxComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { ...baseInputs, disabled: true },
    });

    const selectBox = screen.getByRole('combobox');

    expect(selectBox).toBeDisabled();
  });

  it('セレクトボックスのオプションを選択したときに、選択した値でselectedValueの値が更新されること', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(SelectBoxComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { ...baseInputs },
    });
    const newSelectedValue = 'option2';

    const selectBox = screen.getByRole('combobox');
    await user.selectOptions(selectBox, newSelectedValue);

    expect(fixture.componentInstance.selectedValue()).toBe(newSelectedValue);
  });
});
