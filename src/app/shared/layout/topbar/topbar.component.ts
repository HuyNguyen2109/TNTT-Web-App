import { Component, inject, computed } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [ToolbarModule, ButtonModule, AvatarModule, TooltipModule, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  protected readonly auth = inject(AuthService);

  protected readonly userInitial = computed(() => {
    const name = this.auth.currentUser()?.displayName ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  });
}
