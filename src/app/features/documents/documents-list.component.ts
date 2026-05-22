import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentService } from './services/document.service';

@Component({
  standalone: true,
  selector: 'app-documents-list',
  imports: [
    TableModule, ButtonModule, InputTextModule,
    ProgressSpinnerModule, ToastModule, TranslateModule,
  ],
  providers: [MessageService],
  template: `
    <div>
      <div class="page-header">
        <h2>{{ 'DOCUMENTS.TITLE' | translate }}</h2>
        <p-button icon="pi pi-upload" [label]="'DOCUMENTS.UPLOAD' | translate" severity="success" />
      </div>

      @if (service.loading()) {
        <div class="loading-center"><p-progressSpinner /></div>
      } @else {
        <p-table
          #tableRef
          [value]="service.documents()"
          [paginator]="true"
          [rows]="20"
          styleClass="p-datatable-striped"
          [globalFilterFields]="['name','description']"
        >
          <ng-template pTemplate="caption">
            <input pInputText type="text" [placeholder]="'COMMON.SEARCH' | translate"
              (input)="tableRef.filterGlobal($any($event.target).value, 'contains')" />
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>{{ 'DOCUMENTS.NAME' | translate }}</th>
              <th>{{ 'DOCUMENTS.DESCRIPTION' | translate }}</th>
              <th style="width:120px">{{ 'DOCUMENTS.DOWNLOAD' | translate }}</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-doc>
            <tr>
              <td>{{ doc.name }}</td>
              <td>{{ doc.description }}</td>
              <td>
                <p-button icon="pi pi-download" [text]="true" severity="info" />
                <p-button icon="pi pi-trash" [text]="true" severity="danger" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      }
    </div>
  `,
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent implements OnInit {
  service = inject(DocumentService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
