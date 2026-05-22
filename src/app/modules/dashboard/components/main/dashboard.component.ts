import { Component, inject, signal, OnInit } from '@angular/core';
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

  loading = signal(true);
  stats = signal<DashboardStats | null>(null);

  ngOnInit(): void {
    forkJoin({
      childrenFund: this.http.get<any>('/api/childrenFund').pipe(catchError(() => of(null))),
      internalFund: this.http.get<any>('/api/internalFund').pipe(catchError(() => of(null))),
      members:      this.http.get<any[]>('/api/user/all').pipe(catchError(() => of([]))),
      children:     this.http.get<any>('/api/children/count').pipe(catchError(() => of(null))),
    }).subscribe(({ childrenFund, internalFund, members, children }) => {
      this.stats.set({
        generalFund:   childrenFund?.total  ?? 0,
        orgFund:       internalFund?.total  ?? 0,
        memberCount:   Array.isArray(members) ? members.length : 0,
        childrenCount: children?.count      ?? 0,
      });
      this.loading.set(false);
    });
  }
}
