import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ChildrenService } from '../../services/children.service';

@Component({
  standalone: false,
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrl: './children-list.component.scss',
  providers: [MessageService],
})
export class ChildrenListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(ChildrenService);

  ngOnInit(): void {
    this.service.getAll(1).subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
