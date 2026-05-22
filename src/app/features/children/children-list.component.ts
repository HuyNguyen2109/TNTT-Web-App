import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { ChildrenService, Child } from './services/children.service';

@Component({
  standalone: true,
  selector: 'app-children-list',
  imports: [
    TableModule, ButtonModule, InputTextModule,
    ProgressSpinnerModule, ToastModule, TranslateModule,
  ],
  providers: [MessageService],
  template: `
      <div class="page-header">
        <h2>{{ 'CHILDREN.TITLE' | translate }}</h2>
        <p-button
          icon="pi pi-plus"
          [label]="'CHILDREN.ADD_NEW' | translate"
          severity="success"
        />
      </div>

      @if (service.loading()) {
        <div class="loading-center"><p-progressSpinner /></div>
      } @else {
        <p-table
          #tableRef
          [value]="service.children()"
          [paginator]="true"
          [rows]="20"
          [rowsPerPageOptions]="[10, 20, 50]"
          styleClass="p-datatable-striped"
          [globalFilterFields]="['holyName','firstName','lastName']"
        >
          <ng-template pTemplate="caption">
            <input
              pInputText
              type="text"
              [placeholder]="'COMMON.SEARCH' | translate"
              (input)="tableRef.filterGlobal($any($event.target).value, 'contains')"
            />
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>{{ 'CHILDREN.HOLY_NAME' | translate }}</th>
              <th>{{ 'CHILDREN.FULL_NAME' | translate }}</th>
              <th>{{ 'CHILDREN.BIRTHDAY' | translate }}</th>
              <th>{{ 'CHILDREN.CLASS' | translate }}</th>
              <th style="width:100px"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-child>
            <tr>
              <td>{{ child.holyName }}</td>
              <td>{{ child.firstName }} {{ child.lastName }}</td>
              <td>{{ child.birthday }}</td>
              <td>{{ child.classID }}</td>
              <td>
                <p-button icon="pi pi-pencil" [text]="true" severity="info" />
                <p-button icon="pi pi-trash" [text]="true" severity="danger" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      }
  `,
  styleUrl: './children-list.component.scss',
})
export class ChildrenListComponent implements OnInit {
  service = inject(ChildrenService);

  ngOnInit(): void {
    this.service.getAll(1).subscribe();
  }
}
