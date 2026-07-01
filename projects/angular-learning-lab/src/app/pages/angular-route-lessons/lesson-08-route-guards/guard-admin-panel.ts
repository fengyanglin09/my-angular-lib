import { Component } from '@angular/core';

@Component({
  selector: 'app-guard-admin-panel',
  template: `
    <article class="guard-card">
      <h3>Admin Page</h3>
      <p>The guard allowed this route because admin access was granted.</p>
      <strong>Route: admin</strong>
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
export class GuardAdminPanel {}
