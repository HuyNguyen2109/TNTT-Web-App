import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabsModule } from 'primeng/tabs';

import { FundsRoutingModule } from './funds-routing.module';
import { FundsListComponent } from './components/main/funds-list.component';

@NgModule({
  declarations: [FundsListComponent],
  imports: [
    CommonModule,
    FundsRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    TabsModule,
  ],
})
export class FundsModule {}
