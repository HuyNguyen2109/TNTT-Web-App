import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ShellComponent } from './shared/layout/shell/shell.component';

export const routes: Routes = [
  // Public — BFF handles real OIDC callback, this just shows a spinner
  {
    path: 'callback',
    loadComponent: () =>
      import('./core/auth-callback/auth-callback.component').then(
        m => m.AuthCallbackComponent,
      ),
  },

  // All authenticated routes rendered inside the Shell layout
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'children',
        loadChildren: () =>
          import('./features/children/children.routes').then(m => m.CHILDREN_ROUTES),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./features/members/members.routes').then(m => m.MEMBERS_ROUTES),
      },
      {
        path: 'funds',
        loadChildren: () =>
          import('./features/funds/funds.routes').then(m => m.FUNDS_ROUTES),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('./features/classes/classes.routes').then(m => m.CLASSES_ROUTES),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./features/events/events.routes').then(m => m.EVENTS_ROUTES),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./features/documents/documents.routes').then(m => m.DOCUMENTS_ROUTES),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
