import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ChildrenService } from '../../services/children.service';

@Component({
  standalone: false,
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrl: './children-list.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ChildrenListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(ChildrenService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.service.getAll(1).subscribe({
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể tải danh sách Thiếu Nhi',
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
