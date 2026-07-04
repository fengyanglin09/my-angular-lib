import { Component } from '@angular/core';

@Component({
  selector: 'app-router-events-report-panel',
  template: `
    <article class="event-panel">
      <p class="eyebrow">Guarded child route</p>
      <h3>Reporter Dashboard</h3>
      <p>
        This component renders only after <code>canActivate</code> allows the
        report route to activate.
      </p>
    </article>
  `,
  styles: [
    `
      .event-panel {
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
export class RouterEventsReportPanel {}
