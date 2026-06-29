import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EventService } from '../../services/event.service';

@Component({
  standalone: false,
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class EventsListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(EventService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.service.getAll().subscribe({
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể tải danh sách Sự kiện',
        }),
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }

  confirmDelete(event: Event, item: any, nameField: string): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Bạn có chắc muốn xóa "${item[nameField]}"?`,
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // TODO: implement actual delete
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa' });
      },
    });
  }
}
