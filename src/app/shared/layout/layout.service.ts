import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type MenuMode = 'static' | 'overlay';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly platformId = inject(PLATFORM_ID);

  // Menu mode (static = sidebar always visible on desktop, overlay = slides over content)
  private readonly _menuMode = signal<MenuMode>('static');
  readonly menuMode = this._menuMode.asReadonly();

  // Desktop: sidebar collapsed (only applies in static mode)
  private readonly _staticMenuDesktopInactive = signal(false);
  readonly staticMenuDesktopInactive = this._staticMenuDesktopInactive.asReadonly();

  // Desktop overlay mode: sidebar open
  private readonly _overlayMenuActive = signal(false);
  readonly overlayMenuActive = this._overlayMenuActive.asReadonly();

  // Mobile: sidebar open
  private readonly _mobileMenuActive = signal(false);
  readonly mobileMenuActive = this._mobileMenuActive.asReadonly();

  // Current active route path (set by router navigation, used for menu active state)
  private readonly _activePath = signal('');
  readonly activePath = this._activePath.asReadonly();

  // Computed: container class map for layout-wrapper [ngClass]
  readonly containerClass = computed(() => ({
    'layout-overlay': this._menuMode() === 'overlay',
    'layout-static': this._menuMode() === 'static',
    'layout-static-inactive': this._staticMenuDesktopInactive() && this._menuMode() === 'static',
    'layout-overlay-active': this._overlayMenuActive(),
    'layout-mobile-active': this._mobileMenuActive(),
  }));

  onMenuToggle(): void {
    if (this.isOverlay()) {
      this._overlayMenuActive.update((v) => !v);
    } else if (this.isDesktop()) {
      this._staticMenuDesktopInactive.update((v) => !v);
    } else {
      this._mobileMenuActive.update((v) => !v);
    }
  }

  setActivePath(path: string): void {
    this._activePath.set(path);
  }

  hideMobileMenu(): void {
    this._mobileMenuActive.set(false);
    this._overlayMenuActive.set(false);
  }

  isDesktop(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;
    return window.innerWidth > 991;
  }

  isOverlay(): boolean {
    return this._menuMode() === 'overlay';
  }
}
