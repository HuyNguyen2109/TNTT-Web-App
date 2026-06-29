import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { forkJoin, catchError, of } from 'rxjs';
import { DashboardStats } from '../../models/dashboard-stats.model';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  loading = signal(true);
  stats = signal<DashboardStats | null>(null);

  private sumFund(data: unknown): number {
    if (!data) return 0;
    if (Array.isArray(data)) return data.reduce((sum, e) => sum + (e.amount ?? 0), 0);
    if (typeof data === 'object' && 'total' in (data as any)) return (data as any).total;
    return 0;
  }

  ngOnInit(): void {
    forkJoin({
      childrenFund: this.http.get<any>('/api/childrenFund').pipe(catchError(() => of(null))),
      internalFund: this.http.get<any>('/api/internalFund').pipe(catchError(() => of(null))),
      members:      this.http.get<any[]>('/api/user/all').pipe(catchError(() => of([]))),
      children:     this.http.get<any>('/api/children/count').pipe(catchError(() => of(null))),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ childrenFund, internalFund, members, children }) => {
      this.stats.set({
        generalFund:   this.sumFund(childrenFund),
        orgFund:       this.sumFund(internalFund),
        memberCount:   Array.isArray(members) ? members.length : 0,
        childrenCount: children?.count      ?? 0,
      });
      this.loading.set(false);
    });
  }
}
