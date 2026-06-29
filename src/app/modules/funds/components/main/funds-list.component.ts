import { Component, inject, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FundService } from '../../services/fund.service';

@Component({
  standalone: false,
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrl: './funds-list.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class FundsListComponent implements OnInit {
  service = inject(FundService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.service.getAll().subscribe({
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể tải danh sách Quỹ',
        }),
    });
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
