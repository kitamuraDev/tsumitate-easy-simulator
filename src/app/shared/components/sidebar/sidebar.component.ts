import { Component } from '@angular/core';
import { SidebarLinkComponent } from './sidebar-link/sidebar-link.component';

export type SidebarLinkPath = '/overview' | '/simulation' | '/history' | '/setting';
export type SidebarName = 'はじめに' | 'シュミレーション' | '履歴' | 'アプリ設定';
export type SidebarIcon = 'overview' | 'simulation' | 'history' | 'setting';

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
      path: '/overview',
      name: 'はじめに',
      icon: 'overview',
    },
    {
      id: 2,
      path: '/simulation',
      name: 'シュミレーション',
      icon: 'simulation',
    },
    {
      id: 3,
      path: '/history',
      name: '履歴',
      icon: 'history',
    },
    {
      id: 4,
      path: '/setting',
      name: 'アプリ設定',
      icon: 'setting',
    },
  ];
}
