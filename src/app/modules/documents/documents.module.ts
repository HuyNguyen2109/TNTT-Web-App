import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsListComponent } from './components/main/documents-list.component';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    ToastModule,
    TagModule,
    SkeletonModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
  ],
})
export class DocumentsModule {}
