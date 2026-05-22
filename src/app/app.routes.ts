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
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'children',
        loadChildren: () =>
          import('./modules/children/children.module').then(m => m.ChildrenModule),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./modules/members/members.module').then(m => m.MembersModule),
      },
      {
        path: 'funds',
        loadChildren: () =>
          import('./modules/funds/funds.module').then(m => m.FundsModule),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('./modules/classes/classes.module').then(m => m.ClassesModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./modules/events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./modules/documents/documents.module').then(m => m.DocumentsModule),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
