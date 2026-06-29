import { Component, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [PanelMenuModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Thông tin chung', icon: 'pi pi-home',      routerLink: '/dashboard'  },
    { label: 'Thiếu Nhi',      icon: 'pi pi-users',     routerLink: '/children'   },
    { label: 'Giáo Lý Viên',   icon: 'pi pi-id-card',   routerLink: '/members'    },
    { label: 'Quỹ',            icon: 'pi pi-wallet',    routerLink: '/funds'      },
    { label: 'Lớp',            icon: 'pi pi-book',      routerLink: '/classes'    },
    { label: 'Sự kiện',        icon: 'pi pi-calendar',  routerLink: '/events'     },
    { label: 'Tài liệu',       icon: 'pi pi-file',      routerLink: '/documents'  },
  ];
}
