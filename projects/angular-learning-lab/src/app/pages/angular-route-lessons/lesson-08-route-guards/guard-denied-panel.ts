import { Component } from '@angular/core';

@Component({
  selector: 'app-guard-denied-panel',
  template: `
    <article class="guard-card">
      <h3>Access Denied</h3>
      <p>The guard redirected here because admin access was not granted.</p>
      <strong>Route: access-denied</strong>
    </article>
  `,
  styles: [
    `
      .guard-card {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      h3,
      p {
        margin: 0;
      }

      p {
        color: #606b78;
      }
    `,
  ],
})
export class GuardDeniedPanel {}
