import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, tap, catchError } from 'rxjs';
import { FundEntry, FundSummary } from '../models/fund-entry.model';

@Injectable({ providedIn: 'root' })
export class FundService {
  private readonly http = inject(HttpClient);

  private readonly _childrenFund = signal<FundEntry[]>([]);
  readonly childrenFund = this._childrenFund.asReadonly();

  private readonly _internalFund = signal<FundEntry[]>([]);
  readonly internalFund = this._internalFund.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  getAll(): Observable<FundSummary> {
    this._loading.set(true);
    return forkJoin({
      childrenFund: this.http.get<FundEntry[]>('/api/childrenFund'),
      internalFund: this.http.get<FundEntry[]>('/api/internalFund'),
    }).pipe(
      tap(({ childrenFund, internalFund }) => {
        this._childrenFund.set(childrenFund);
        this._internalFund.set(internalFund);
        this._loading.set(false);
      }),
      catchError(err => { this._loading.set(false); throw err; }),
    );
  }
}
