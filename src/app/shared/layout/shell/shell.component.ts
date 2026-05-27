import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, ToastModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {}
