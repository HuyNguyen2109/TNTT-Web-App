import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  return auth.checkSession().pipe(
    map(() => true),
    catchError(() => {
      window.location.href = '/auth/login';
      return of(false);
    }),
  );
};
