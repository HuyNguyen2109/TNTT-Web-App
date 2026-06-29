import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, tap, catchError, of } from 'rxjs';
import { FundEntry, FundSummary } from '../models/fund-entry.model';

@Injectable({ providedIn: 'root' })
export class FundService {
  private http = inject(HttpClient);

  childrenFund = signal<FundEntry[]>([]);
  internalFund = signal<FundEntry[]>([]);
  loading      = signal(false);

  getAll(): Observable<FundSummary> {
    this.loading.set(true);
    return forkJoin({
      childrenFund: this.http.get<FundEntry[]>('/api/childrenFund').pipe(catchError(() => of([]))),
      internalFund: this.http.get<FundEntry[]>('/api/internalFund').pipe(catchError(() => of([]))),
    }).pipe(
      tap(({ childrenFund, internalFund }) => {
        this.childrenFund.set(childrenFund);
        this.internalFund.set(internalFund);
        this.loading.set(false);
      }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }
}
