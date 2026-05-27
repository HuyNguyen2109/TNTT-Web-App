import { Component, inject, OnInit, ViewChild, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table } from 'primeng/table';
import { DocumentService } from '../../services/document.service';

@Component({
  standalone: false,
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  protected readonly service = inject(DocumentService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.service.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
