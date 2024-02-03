import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview.component'),
  },
  {
    path: 'simulation',
    loadComponent: () => import('./features/simulation/simulation.component'),
  },
];
