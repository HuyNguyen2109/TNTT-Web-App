import { Component, inject } from '@angular/core';
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
  template: `
    <p-toolbar styleClass="topbar">
      <ng-template pTemplate="end">
        <div class="topbar__user">
          <p-avatar
            [label]="userInitial()"
            shape="circle"
            styleClass="topbar__avatar"
          />
          <span class="topbar__name">{{ auth.currentUser()?.displayName }}</span>
          <p-button
            icon="pi pi-sign-out"
            [text]="true"
            severity="secondary"
            [pTooltip]="'NAV.LOGOUT' | translate"
            (onClick)="auth.logout()"
          />
        </div>
      </ng-template>
    </p-toolbar>
  `,
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  auth = inject(AuthService);

  userInitial(): string {
    const name = this.auth.currentUser()?.displayName ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  }
}
