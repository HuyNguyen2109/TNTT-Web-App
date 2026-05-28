import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../layout.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [RouterLink, AvatarModule, RippleModule, TooltipModule, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  protected readonly auth = inject(AuthService);
  protected readonly layoutService = inject(LayoutService);

  protected readonly userInitial = computed(() => {
    const name = this.auth.currentUser()?.displayName ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  });
}
