import { Component, OnInit } from '@angular/core';
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
export class AuthCallbackComponent implements OnInit {
  ngOnInit(): void {
    // Fallback: redirect to home if BFF doesn't redirect within 10s
    setTimeout(() => {
      window.location.href = '/';
    }, 10000);
  }
}
