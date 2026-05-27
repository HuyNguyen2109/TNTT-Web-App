import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, tap, catchError, of } from 'rxjs';
import { DashboardStats } from '../models/dashboard-stats.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  private readonly _stats = signal<DashboardStats | null>(null);
  readonly stats = this._stats.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  loadStats(): Observable<DashboardStats> {
    this._loading.set(true);
    return forkJoin({
      childrenFund: this.http.get<{ total?: number } | null>('/api/childrenFund').pipe(catchError(() => of(null))),
      internalFund: this.http.get<{ total?: number } | null>('/api/internalFund').pipe(catchError(() => of(null))),
      members:      this.http.get<unknown[]>('/api/user/all').pipe(catchError(() => of([]))),
      children:     this.http.get<{ count?: number } | null>('/api/children/count').pipe(catchError(() => of(null))),
    }).pipe(
      map(({ childrenFund, internalFund, members, children }) => ({
        generalFund:   childrenFund?.total  ?? 0,
        orgFund:       internalFund?.total  ?? 0,
        memberCount:   Array.isArray(members) ? members.length : 0,
        childrenCount: (children as { count?: number } | null)?.count ?? 0,
      })),
      tap(stats => { this._stats.set(stats); this._loading.set(false); }),
      catchError(err => { this._loading.set(false); throw err; }),
    );
  }
}
