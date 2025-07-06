import { provideZonelessChangeDetection } from '@angular/core';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SidebarIcon, SidebarLinkPath, SidebarName } from '../sidebar.component';
import { SidebarLinkComponent } from './sidebar-link.component';

type InputType = {
  path: SidebarLinkPath;
  name: SidebarName;
  icon: SidebarIcon;
  selector: string;
};

const sidebarLinkTestData: InputType[] = [
  { path: '/overview', name: 'はじめに', icon: 'overview', selector: 'ng-icon[name="matHome"]' },
  { path: '/simulation', name: 'シュミレーション', icon: 'simulation', selector: 'ng-icon[name="matCalculate"]' },
  { path: '/history', name: '履歴', icon: 'history', selector: 'ng-icon[name="matStorage"]' },
  { path: '/setting', name: 'アプリ設定', icon: 'setting', selector: 'ng-icon[name="matSettings"]' },
];

describe('SidebarLinkComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {}); // ng-iconのエラーを無視
  });

  it.each(sidebarLinkTestData)('入力の値に応じた name,icon が表示されるか', async ({ path, name, icon, selector }) => {
    const { container } = await render(SidebarLinkComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { path, name, icon },
    });

    expect(screen.getAllByText(name)[0]).toBeVisible(); // 同じ要素が2つ取得されてしまうため、`getAllByText()[0]`で先頭だけ確認してます
    expect(container.querySelector(selector)).toBeVisible();
  });
});
