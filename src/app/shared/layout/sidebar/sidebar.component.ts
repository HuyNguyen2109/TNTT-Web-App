import { Component, inject, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { LayoutService } from '../layout.service';

interface NavItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, RippleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  protected readonly layoutService = inject(LayoutService);
  private readonly el = inject(ElementRef);

  readonly navItems: NavItem[] = [
    { label: 'Thông tin chung', icon: 'pi pi-home',      routerLink: '/dashboard'  },
    { label: 'Thiếu Nhi',      icon: 'pi pi-users',     routerLink: '/children'   },
    { label: 'Giáo Lý Viên',   icon: 'pi pi-id-card',   routerLink: '/members'    },
    { label: 'Quỹ',            icon: 'pi pi-wallet',    routerLink: '/funds'      },
    { label: 'Lớp',            icon: 'pi pi-book',      routerLink: '/classes'    },
    { label: 'Sự kiện',        icon: 'pi pi-calendar',  routerLink: '/events'     },
    { label: 'Tài liệu',       icon: 'pi pi-file',      routerLink: '/documents'  },
  ];

  private outsideClickListener?: (e: Event) => void;

  ngOnInit(): void {
    this.outsideClickListener = (event: Event) => {
      if (!this.el.nativeElement.contains(event.target)) {
        this.layoutService.hideMobileMenu();
      }
    };
    document.addEventListener('click', this.outsideClickListener);
  }

  ngOnDestroy(): void {
    if (this.outsideClickListener) {
      document.removeEventListener('click', this.outsideClickListener);
    }
  }
}
