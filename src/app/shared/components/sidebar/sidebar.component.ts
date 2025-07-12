import { Component } from '@angular/core';
import { SidebarLinkComponent } from './sidebar-link/sidebar-link.component';

export type SidebarLinkPath = '/simulation' | '/history' | '/setting';
export type SidebarName = 'シュミレーション' | '履歴' | 'アプリ設定';
export type SidebarIcon = 'simulation' | 'history' | 'setting';

type SidebarLinkInfoType = {
  id: number;
  path: SidebarLinkPath;
  name: SidebarName;
  icon: SidebarIcon;
};

@Component({
  selector: 'app-sidebar',
  imports: [SidebarLinkComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly sidebarLinkInfomations: SidebarLinkInfoType[] = [
    {
      id: 1,
      path: '/simulation',
      name: 'シュミレーション',
      icon: 'simulation',
    },
    {
      id: 2,
      path: '/history',
      name: '履歴',
      icon: 'history',
    },
    {
      id: 3,
      path: '/setting',
      name: 'アプリ設定',
      icon: 'setting',
    },
  ];
}
