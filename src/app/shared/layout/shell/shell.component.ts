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
  template: `
    <p-toast />
    <div class="shell">
      <app-sidebar />
      <div class="shell__content">
        <app-topbar />
        <main class="shell__main">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  constructor() {
    inject(TranslateService).use('vi');
  }
}
