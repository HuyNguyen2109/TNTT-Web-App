import { Injectable, signal, computed, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  sidebarActive = signal(false);
  staticMenuActive = signal(true);
  isMobile = signal(false);

  menuMode = computed(() => (this.isMobile() ? 'overlay' : 'static'));

  containerClass = computed(() => ({
    'layout-overlay': this.menuMode() === 'overlay',
    'layout-static': this.menuMode() === 'static',
    'layout-static-active': this.staticMenuActive(),
    'layout-overlay-active': this.sidebarActive(),
  }));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWidth();
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.checkWidth());
    }
  }

  private checkWidth(): void {
    this.isMobile.set(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
      this.sidebarActive.set(false);
    }
  }

  onMenuToggle(): void {
    if (this.menuMode() === 'overlay') {
      this.sidebarActive.update(v => !v);
    } else {
      this.staticMenuActive.update(v => !v);
    }
  }
}
