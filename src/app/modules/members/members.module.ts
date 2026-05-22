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

import { MembersRoutingModule } from './members-routing.module';
import { MembersListComponent } from './components/main/members-list.component';

@NgModule({
  declarations: [MembersListComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
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
export class MembersModule {}
