import { Component, inject, OnInit, ViewChild, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table } from 'primeng/table';
import { ClassService } from '../../services/class.service';

@Component({
  standalone: false,
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss',
})
export class ClassesListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  protected readonly service = inject(ClassService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.service.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
