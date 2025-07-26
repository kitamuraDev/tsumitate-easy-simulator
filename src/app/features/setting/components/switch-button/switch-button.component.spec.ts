import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SwitchButtonComponent } from './switch-button.component';

describe('SwitchButtonComponent', () => {
  it('スイッチボタンがクリックされたときに、selectedValueの値が更新されること', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(SwitchButtonComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { value: false },
    });

    const switchButton = screen.getByRole('checkbox');

    await user.click(switchButton); // false -> true
    expect(fixture.componentInstance.value()).toBeTruthy();

    await user.click(switchButton); // true -> false
    expect(fixture.componentInstance.value()).toBeFalsy();
  });
});
