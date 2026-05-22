import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ClassService } from '../../services/class.service';

@Component({
  standalone: false,
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss',
  providers: [MessageService],
})
export class ClassesListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(ClassService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
