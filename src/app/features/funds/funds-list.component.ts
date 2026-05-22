import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { FundService } from './services/fund.service';

@Component({
  standalone: true,
  selector: 'app-funds-list',
  imports: [
    TableModule, ButtonModule, InputTextModule,
    ProgressSpinnerModule, ToastModule, TabsModule, TranslateModule, DecimalPipe,
  ],
  providers: [MessageService],
  template: `
    <div>
      <div class="page-header">
        <h2>{{ 'FUNDS.TITLE' | translate }}</h2>
        <p-button icon="pi pi-plus" [label]="'FUNDS.ADD_ENTRY' | translate" severity="success" />
      </div>

      @if (service.loading()) {
        <div class="loading-center"><p-progressSpinner /></div>
      } @else {
        <p-tabs>
          <p-tablist>
            <p-tab value="children">{{ 'FUNDS.CHILDREN_FUND' | translate }}</p-tab>
            <p-tab value="internal">{{ 'FUNDS.INTERNAL_FUND' | translate }}</p-tab>
          </p-tablist>
          <p-tabpanels>
            <p-tabpanel value="children">
              <p-table
                [value]="service.childrenFund()"
                [paginator]="true"
                [rows]="20"
                styleClass="p-datatable-striped"
              >
                <ng-template pTemplate="header">
                  <tr>
                    <th>{{ 'FUNDS.DATE' | translate }}</th>
                    <th>{{ 'FUNDS.AMOUNT' | translate }}</th>
                    <th>{{ 'FUNDS.NOTE' | translate }}</th>
                    <th style="width:100px"></th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-entry>
                  <tr>
                    <td>{{ entry.date }}</td>
                    <td>{{ entry.amount | number }}</td>
                    <td>{{ entry.note }}</td>
                    <td>
                      <p-button icon="pi pi-pencil" [text]="true" severity="info" />
                      <p-button icon="pi pi-trash" [text]="true" severity="danger" />
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            </p-tabpanel>

            <p-tabpanel value="internal">
              <p-table
                [value]="service.internalFund()"
                [paginator]="true"
                [rows]="20"
                styleClass="p-datatable-striped"
              >
                <ng-template pTemplate="header">
                  <tr>
                    <th>{{ 'FUNDS.DATE' | translate }}</th>
                    <th>{{ 'FUNDS.AMOUNT' | translate }}</th>
                    <th>{{ 'FUNDS.NOTE' | translate }}</th>
                    <th style="width:100px"></th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-entry>
                  <tr>
                    <td>{{ entry.date }}</td>
                    <td>{{ entry.amount | number }}</td>
                    <td>{{ entry.note }}</td>
                    <td>
                      <p-button icon="pi pi-pencil" [text]="true" severity="info" />
                      <p-button icon="pi pi-trash" [text]="true" severity="danger" />
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      }
    </div>
  `,
  styleUrl: './funds-list.component.scss',
})
export class FundsListComponent implements OnInit {
  service = inject(FundService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
