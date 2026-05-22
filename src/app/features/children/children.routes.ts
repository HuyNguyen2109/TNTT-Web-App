import { Routes } from '@angular/router';

export const CHILDREN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./children-list.component').then(m => m.ChildrenListComponent),
  },
];
