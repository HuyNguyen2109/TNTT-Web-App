import { Component, inject, OnInit, ViewChild, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  protected readonly service = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.service.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
