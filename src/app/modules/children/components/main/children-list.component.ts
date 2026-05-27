import { Component, inject, OnInit, ViewChild, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table } from 'primeng/table';
import { ChildrenService } from '../../services/children.service';

@Component({
  standalone: false,
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrl: './children-list.component.scss',
})
export class ChildrenListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  protected readonly service = inject(ChildrenService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.service.getAll(1).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
