import { Component } from '@angular/core';

@Component({
  selector: 'app-redirect-demo-reports',
  template: `
    <article class="demo-card">
      <h3>Reports</h3>
      <p>The modern reports route renders this component.</p>
      <strong>Route: reports</strong>
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
export class RedirectDemoReports {}
