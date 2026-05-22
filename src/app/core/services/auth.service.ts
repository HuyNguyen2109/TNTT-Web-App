import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);

  /**
   * Called by AuthGuard on every protected route activation.
   * Hits BFF /auth/user — returns the user on 200, throws on 401.
   */
  checkSession(): Observable<User> {
    return this.http.get<{ user: User }>('/auth/user').pipe(
      map(res => res.user),
      tap(user => this.currentUser.set(user)),
    );
  }

  logout(): void {
    window.location.href = '/auth/logout';
  }
}
