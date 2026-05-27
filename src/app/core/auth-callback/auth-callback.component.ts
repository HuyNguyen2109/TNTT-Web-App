import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Shown briefly at /callback while BFF session is being established.
 * The BFF redirects the browser to '/' after a successful OIDC callback,
 * so this component only renders if the redirect hasn't happened yet.
 */
@Component({
  standalone: true,
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  imports: [TranslateModule],
})
export class AuthCallbackComponent {}
