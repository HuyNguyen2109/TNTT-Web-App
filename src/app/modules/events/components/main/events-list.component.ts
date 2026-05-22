import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { EventService } from '../../services/event.service';

@Component({
  standalone: false,
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss',
  providers: [MessageService],
})
export class EventsListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(EventService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
