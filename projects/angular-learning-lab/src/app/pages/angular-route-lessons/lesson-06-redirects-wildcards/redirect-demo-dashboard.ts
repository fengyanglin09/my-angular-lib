import { Component } from '@angular/core';

@Component({
  selector: 'app-redirect-demo-dashboard',
  template: `
    <article class="demo-card">
      <h3>Dashboard</h3>
      <p>The empty child path redirects here by default.</p>
      <strong>Route: dashboard</strong>
    </article>
  `,
  styles: [
    `
      .demo-card {
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
export class RedirectDemoDashboard {}
