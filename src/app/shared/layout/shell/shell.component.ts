import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ToastModule } from 'primeng/toast';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, ToastModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  constructor() {
    inject(TranslateService).use('vi');
  }
}
