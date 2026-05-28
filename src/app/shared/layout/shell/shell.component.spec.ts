import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ShellComponent } from './shell.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { LayoutService } from '../layout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: '',
})
class MockSidebarComponent {}

@Component({
  selector: 'app-topbar',
  standalone: true,
  template: '',
})
class MockTopbarComponent {}

@Component({
  standalone: true,
  template: '<div>Trang thử nghiệm</div>',
})
class DummyPageComponent {}

describe('ShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent, DummyPageComponent],
      providers: [
        MessageService,
        provideRouter([
          { path: 'dashboard', component: DummyPageComponent },
          { path: 'members', component: DummyPageComponent },
        ]),
      ],
    })
      .overrideComponent(ShellComponent, {
        remove: {
          imports: [SidebarComponent, TopbarComponent],
        },
        add: {
          imports: [MockSidebarComponent, MockTopbarComponent],
        },
      })
      .compileComponents();
  });

  it('renders the Sakai layout wrapper with a mask', () => {
    const fixture = TestBed.createComponent(ShellComponent);

    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.layout-wrapper') as HTMLDivElement | null;
    const mask = fixture.nativeElement.querySelector('.layout-mask');

    expect(wrapper).not.toBeNull();
    expect(wrapper?.classList.contains('layout-static')).toBe(true);
    expect(mask).not.toBeNull();
  });

  it('hides the mobile menu when the layout mask is clicked', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    const layoutService = TestBed.inject(LayoutService);
    const hideMobileMenuSpy = vi.spyOn(layoutService, 'hideMobileMenu');

    fixture.detectChanges();

    const mask = fixture.nativeElement.querySelector('.layout-mask') as HTMLDivElement | null;
    mask?.click();

    expect(hideMobileMenuSpy).toHaveBeenCalled();
  });

  it('hides the mobile menu and tracks the active path after navigation', async () => {
    const fixture = TestBed.createComponent(ShellComponent);
    const router = TestBed.inject(Router);
    const layoutService = TestBed.inject(LayoutService);
    const hideMobileMenuSpy = vi.spyOn(layoutService, 'hideMobileMenu');
    const setActivePathSpy = vi.spyOn(layoutService, 'setActivePath');

    fixture.detectChanges();
    await router.navigateByUrl('/members');
    fixture.detectChanges();

    expect(hideMobileMenuSpy).toHaveBeenCalled();
    expect(setActivePathSpy).toHaveBeenCalledWith('/members');
  });
});
