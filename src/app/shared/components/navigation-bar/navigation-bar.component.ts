import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCalculate, matSettings, matStorage } from '@ng-icons/material-icons/baseline';

type RoutingInfoType = {
  id: number;
  path: '/simulation' | '/history' | '/setting';
  name: 'シュミレーション' | '履歴' | 'アプリ設定';
  icon: 'simulation' | 'history' | 'setting';
};

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, NgIcon],
  viewProviders: provideIcons({ matCalculate, matSettings, matStorage }),
  template: `
    <nav class="fixed bottom-0 z-50 w-full flex items-center justify-around bg-white border border-gray-100">
      @for (routingInfo of routingInfos; track routingInfo.id) {
        @let activePathBg = isActivePath(routingInfo.path) ? 'bg-blue-100' : '';

        <a
          [routerLink]="routingInfo.path"
          class="inline-flex items-center justify-center w-1/3 p-4 transition-colors {{ activePathBg }}"
        >
          @switch (routingInfo.icon) {
            @case ('simulation') {
              <ng-icon name="matCalculate" size="24" />
            }
            @case ('history') {
              <ng-icon name="matStorage" size="24" />
            }
            @case ('setting') {
              <ng-icon name="matSettings" size="24" />
            }
          }
        </a>
      }
    </nav>
  `,
})
export class NavigationBarComponent {
  private readonly router = inject(Router);

  readonly routingInfos: RoutingInfoType[] = [
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

  isActivePath(path: string): boolean {
    return this.router.url === path;
  }
}
