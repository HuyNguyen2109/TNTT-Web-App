import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../layout.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [ToolbarModule, ButtonModule, AvatarModule, TooltipModule, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  auth = inject(AuthService);
  layout = inject(LayoutService);

  userInitial(): string {
    const name = this.auth.currentUser()?.displayName ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  }
}
