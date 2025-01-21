import type { Routes } from '@angular/router';

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
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component'),
    data: { title: '404 Not Found' },
  },
];
