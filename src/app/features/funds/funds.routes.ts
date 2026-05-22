import { Routes } from '@angular/router';

export const FUNDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./funds-list.component').then(m => m.FundsListComponent),
  },
];
