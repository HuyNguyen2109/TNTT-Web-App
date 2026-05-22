import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/main/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule,
    CardModule,
    ProgressSpinnerModule,
  ],
})
export class DashboardModule {}
