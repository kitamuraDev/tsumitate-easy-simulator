import { Location } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { routes } from '../../../app.routes';
import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  it.each([
    { path: '/simulation', name: /シュミレーション/i },
    { path: '/history', name: /履歴/i },
    { path: '/setting', name: /アプリ設定/i },
  ])('リンククリックで設定したルーティングに遷移すること', async ({ path, name }) => {
    const user = userEvent.setup();
    const { fixture } = await render(NavigationBarComponent, {
      providers: [provideRouter(routes), provideZonelessChangeDetection()],
    });
    const location = fixture.debugElement.injector.get(Location);

    const link = screen.getByRole('link', { name });
    await user.click(link);
    await fixture.whenStable();

    expect(location.path()).toBe(path);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(link).toHaveClass('bg-blue-100');
  });
});
