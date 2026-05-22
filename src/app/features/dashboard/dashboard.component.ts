import { Component, inject, signal, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, catchError, of } from 'rxjs';

import { DecimalPipe } from '@angular/common';

interface DashboardStats {
  generalFund: number;
  orgFund: number;
  memberCount: number;
  childrenCount: number;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CardModule, ProgressSpinnerModule, TranslateModule, DecimalPipe],
  template: `
    @if (loading()) {
      <div class="dashboard__loading">
        <p-progressSpinner />
      </div>
    } @else {
      <div class="dashboard__grid">
        <p-card>
          <ng-template pTemplate="header">
            <span class="pi pi-wallet stat-icon"></span>
          </ng-template>
          <div class="stat-value">{{ stats()?.generalFund | number }}</div>
          <div class="stat-label">{{ 'DASHBOARD.GENERAL_FUND' | translate }}</div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <span class="pi pi-building stat-icon"></span>
          </ng-template>
          <div class="stat-value">{{ stats()?.orgFund | number }}</div>
          <div class="stat-label">{{ 'DASHBOARD.ORG_FUND' | translate }}</div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <span class="pi pi-id-card stat-icon"></span>
          </ng-template>
          <div class="stat-value">{{ stats()?.memberCount }}</div>
          <div class="stat-label">{{ 'DASHBOARD.MEMBER_COUNT' | translate }}</div>
        </p-card>

        <p-card>
          <ng-template pTemplate="header">
            <span class="pi pi-users stat-icon"></span>
          </ng-template>
          <div class="stat-value">{{ stats()?.childrenCount }}</div>
          <div class="stat-label">{{ 'DASHBOARD.CHILDREN_COUNT' | translate }}</div>
        </p-card>
      </div>
    }
  `,
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
        generalFund:  childrenFund?.total   ?? 0,
        orgFund:      internalFund?.total   ?? 0,
        memberCount:  Array.isArray(members) ? members.length : 0,
        childrenCount: children?.count      ?? 0,
      });
      this.loading.set(false);
    });
  }
}
