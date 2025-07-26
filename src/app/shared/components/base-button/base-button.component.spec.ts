import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BaseButtonComponent } from './base-button.component';

describe('BaseButtonComponent', () => {
  it('disabled が false の場合、ボタンが活性状態であること', async () => {
    await render(BaseButtonComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { disabled: false },
    });

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
    expect(button).toHaveClass('hover:opacity-70');
    expect(button).not.toHaveClass('cursor-not-allowed');
  });

  it('disabled が true の場合、ボタンが非活性状態であること', async () => {
    await render(BaseButtonComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { disabled: true },
    });

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
    expect(button).not.toHaveClass('hover:opacity-70');
  });

  it('活性状態のボタンをクリックした際、clickEvent が1回発行されること', async () => {
    const user = userEvent.setup();
    const clickEventSpy = vi.fn();

    await render(BaseButtonComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { disabled: false },
      on: { clickEvent: clickEventSpy },
    });

    const button = screen.getByRole('button');
    await user.click(button);

    expect(clickEventSpy).toHaveBeenCalled();
    expect(clickEventSpy).toHaveBeenCalledTimes(1);
  });

  it('非活性状態のボタンをクリックしても、clickEvent が発行されないこと', async () => {
    const user = userEvent.setup();
    const clickEventSpy = vi.fn();

    await render(BaseButtonComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { disabled: true },
      on: { clickEvent: clickEventSpy },
    });

    const button = screen.getByRole('button');
    await user.click(button);

    expect(clickEventSpy).not.toHaveBeenCalled();
    expect(clickEventSpy).toHaveBeenCalledTimes(0);
  });
});
