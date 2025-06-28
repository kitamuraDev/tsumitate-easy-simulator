import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SidebarIcon } from '../sidebar.component';
import { SidebarLinkComponent } from './sidebar-link.component';

type InputType = {
  name: string;
  icon: SidebarIcon;
  selector: string;
};

describe('SidebarLinkComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {}); // ng-iconのエラーを無視
  });

  it.each([
    { name: 'はじめに', icon: 'overview', selector: 'ng-icon[name="matHome"]' },
    { name: 'シュミレーション', icon: 'simulation', selector: 'ng-icon[name="matCalculate"]' },
    { name: '履歴', icon: 'history', selector: 'ng-icon[name="matStorage"]' },
    { name: 'アプリ設定', icon: 'setting', selector: 'ng-icon[name="matSettings"]' },
  ] as InputType[])('入力の値に応じた name,icon が表示されるか', async ({ name, icon, selector }) => {
    const { container } = await render(SidebarLinkComponent, { inputs: { name, icon } });

    expect(screen.getAllByText(name)[0]).toBeVisible(); // 同じ要素が2つ取得されてしまうため、`getAllByText()[0]`で先頭だけ確認してます
    expect(container.querySelector(selector)).toBeVisible();
  });
});
