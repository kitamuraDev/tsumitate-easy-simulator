import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {}); // ng-iconのエラーを無視
  });

  it('data-drawer-target="logo-sidebar" 属性を持つボタンがあるか', async () => {
    await render(HeaderComponent);

    const button = screen.getByRole('button', { name: 'open sidebar' });

    expect(button).toHaveAttribute('data-drawer-target', 'logo-sidebar');
  });

  it('data-drawer-toggle="logo-sidebar" 属性を持つボタンがあるか', async () => {
    await render(HeaderComponent);

    const button = screen.getByRole('button', { name: 'open sidebar' });

    expect(button).toHaveAttribute('data-drawer-toggle', 'logo-sidebar');
  });
});
