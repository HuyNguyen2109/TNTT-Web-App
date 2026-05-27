import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FundService } from '../../services/fund.service';

@Component({
  standalone: false,
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrl: './funds-list.component.scss',
})
export class FundsListComponent implements OnInit {
  protected readonly service = inject(FundService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.service.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
