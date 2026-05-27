import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  protected readonly dashboardService = inject(DashboardService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.dashboardService.loadStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
