import { render, screen } from '@testing-library/angular';
import type { SidebarIcon } from '../sidebar.component';
import { SidebarLinkComponent } from './sidebar-link.component';

type InputType = {
  name: string;
  icon: SidebarIcon;
  selector: string;
};

describe('SidebarLinkComponent', () => {
  it.each([
    { name: 'はじめに', icon: 'overview', selector: 'app-overview-icon' },
    { name: 'シュミレーション', icon: 'simulation', selector: 'app-simulation-icon' },
    { name: '履歴', icon: 'history', selector: 'app-history-icon' },
  ] as InputType[])('入力の値に応じた name,icon が表示されるか', async ({ name, icon, selector }) => {
    const { container } = await render(SidebarLinkComponent, { inputs: { name, icon } });

    expect(screen.getAllByText(name)).toBeTruthy();
    expect(container.querySelector(selector)).toBeTruthy();
  });
});
