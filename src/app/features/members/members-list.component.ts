import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
  standalone: true,
  selector: 'app-members-list',
  imports: [
    TableModule, ButtonModule, InputTextModule,
    ProgressSpinnerModule, ToastModule, TranslateModule,
  ],
  providers: [MessageService],
  template: `
    <div>
      <div class="page-header">
        <h2>{{ 'MEMBERS.TITLE' | translate }}</h2>
        <p-button icon="pi pi-plus" [label]="'MEMBERS.ADD_NEW' | translate" severity="success" />
      </div>

      @if (service.loading()) {
        <div class="loading-center"><p-progressSpinner /></div>
      } @else {
        <p-table
          #tableRef
          [value]="service.members()"
          [paginator]="true"
          [rows]="20"
          [rowsPerPageOptions]="[10, 20, 50]"
          styleClass="p-datatable-striped"
          [globalFilterFields]="['holyName','firstName','lastName','email','phone']"
        >
          <ng-template pTemplate="caption">
            <input pInputText type="text" [placeholder]="'COMMON.SEARCH' | translate"
              (input)="tableRef.filterGlobal($any($event.target).value, 'contains')" />
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>{{ 'MEMBERS.HOLY_NAME' | translate }}</th>
              <th>{{ 'MEMBERS.FULL_NAME' | translate }}</th>
              <th>{{ 'MEMBERS.PHONE' | translate }}</th>
              <th>{{ 'MEMBERS.EMAIL' | translate }}</th>
              <th style="width:100px"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-member>
            <tr>
              <td>{{ member.holyName }}</td>
              <td>{{ member.firstName }} {{ member.lastName }}</td>
              <td>{{ member.phone }}</td>
              <td>{{ member.email }}</td>
              <td>
                <p-button icon="pi pi-pencil" [text]="true" severity="info" />
                <p-button icon="pi pi-trash" [text]="true" severity="danger" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      }
    </div>
  `,
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent implements OnInit {
  service = inject(UserService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
