import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  checkSession(): Observable<User> {
    return this.http.get<{ user: User }>('/auth/user').pipe(
      map(res => res.user),
      tap(user => this._currentUser.set(user)),
    );
  }

  logout(): void {
    window.location.href = '/auth/logout';
  }
}
