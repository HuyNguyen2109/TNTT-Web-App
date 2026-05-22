import { Routes } from '@angular/router';

export const DOCUMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./documents-list.component').then(m => m.DocumentsListComponent),
  },
];
