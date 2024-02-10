import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview.component'),
    data: { title: 'はじめに' },
  },
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
];
