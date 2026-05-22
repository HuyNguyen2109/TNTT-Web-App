import { Component, OnInit } from '@angular/core';

/**
 * Shown briefly at /callback while BFF session is being established.
 * The BFF redirects the browser to '/' after a successful OIDC callback,
 * so this component only renders if the redirect hasn't happened yet.
 */
@Component({
  standalone: true,
  selector: 'app-auth-callback',
  template: `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;">
      <p>Đang xác thực, vui lòng chờ…</p>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
  ngOnInit(): void {
    // BFF handles the redirect to '/' — nothing to do here.
  }
}
