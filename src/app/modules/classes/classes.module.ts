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

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesListComponent } from './components/main/classes-list.component';

@NgModule({
  declarations: [ClassesListComponent],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class ClassesModule {}
