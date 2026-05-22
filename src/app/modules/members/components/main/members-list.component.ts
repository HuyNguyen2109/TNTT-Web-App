import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
  providers: [MessageService],
})
export class MembersListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(UserService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
