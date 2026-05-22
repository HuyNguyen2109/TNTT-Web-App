import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { EventService } from './services/event.service';

@Component({
  standalone: true,
  selector: 'app-events-list',
  imports: [
    TableModule, ButtonModule, InputTextModule,
    ProgressSpinnerModule, ToastModule, TranslateModule,
  ],
  providers: [MessageService],
  template: `
    <div>
      <div class="page-header">
        <h2>{{ 'EVENTS.TITLE' | translate }}</h2>
        <p-button icon="pi pi-plus" [label]="'EVENTS.ADD_NEW' | translate" severity="success" />
      </div>

      @if (service.loading()) {
        <div class="loading-center"><p-progressSpinner /></div>
      } @else {
        <p-table
          #tableRef
          [value]="service.events()"
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
              <th>{{ 'EVENTS.NAME' | translate }}</th>
              <th>{{ 'EVENTS.DATE' | translate }}</th>
              <th>{{ 'EVENTS.DESCRIPTION' | translate }}</th>
              <th style="width:100px"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-event>
            <tr>
              <td>{{ event.name }}</td>
              <td>{{ event.date }}</td>
              <td>{{ event.description }}</td>
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
  styleUrl: './events-list.component.scss',
})
export class EventsListComponent implements OnInit {
  service = inject(EventService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
