import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/simulation', pathMatch: 'full' },
  {
    path: 'simulation',
    loadComponent: () => import('./features/simulation/simulation.component'),
    data: { title: 'シュミレーション' },
  },
  {
    path: 'history',
    loadComponent: () => import('./features/history/history.component'),
    data: { title: '履歴' },
  },
  {
    path: 'setting',
    loadComponent: () => import('./features/setting/setting.component'),
    data: { title: 'アプリ設定' },
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component'),
    data: { title: '404 Not Found' },
  },
];
