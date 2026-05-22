import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DocumentService } from '../../services/document.service';

@Component({
  standalone: false,
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
  providers: [MessageService],
})
export class DocumentsListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(DocumentService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
