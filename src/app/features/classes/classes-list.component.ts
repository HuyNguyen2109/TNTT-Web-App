import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { ClassService } from './services/class.service';

@Component({
  standalone: true,
  selector: 'app-classes-list',
  imports: [
    TableModule, ButtonModule, InputTextModule,
    ProgressSpinnerModule, ToastModule, TranslateModule,
  ],
  providers: [MessageService],
  template: `
    <div>
      <div class="page-header">
        <h2>{{ 'CLASSES.TITLE' | translate }}</h2>
        <p-button icon="pi pi-plus" [label]="'CLASSES.ADD_NEW' | translate" severity="success" />
      </div>

      @if (service.loading()) {
        <div class="loading-center"><p-progressSpinner /></div>
      } @else {
        <p-table
          #tableRef
          [value]="service.classes()"
          [paginator]="true"
          [rows]="20"
          styleClass="p-datatable-striped"
          [globalFilterFields]="['className','teacher']"
        >
          <ng-template pTemplate="caption">
            <input pInputText type="text" [placeholder]="'COMMON.SEARCH' | translate"
              (input)="tableRef.filterGlobal($any($event.target).value, 'contains')" />
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>{{ 'CLASSES.CLASS_NAME' | translate }}</th>
              <th>{{ 'CLASSES.TEACHER' | translate }}</th>
              <th style="width:100px"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-cls>
            <tr>
              <td>{{ cls.className }}</td>
              <td>{{ cls.teacher }}</td>
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
  styleUrl: './classes-list.component.scss',
})
export class ClassesListComponent implements OnInit {
  service = inject(ClassService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
