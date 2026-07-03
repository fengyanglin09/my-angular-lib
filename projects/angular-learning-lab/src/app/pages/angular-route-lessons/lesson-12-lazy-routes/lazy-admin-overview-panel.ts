import { Component, inject } from '@angular/core';

import { LazyRoutesLogService } from './lazy-routes-log.service';

@Component({
  selector: 'app-lazy-admin-overview-panel',
  template: `
    <article class="lazy-panel">
      <p class="eyebrow">Lazy child route</p>
      <h3>Admin Overview</h3>
      <p>
        This component lives behind the lazily loaded admin route group. Angular
        can keep it out of the first route lesson bundle until the user visits
        <code>/admin</code>.
      </p>
      <strong>Loaded from: lazy-admin.routes.ts</strong>
    </article>
  `,
  styles: [
    `
      .lazy-panel {
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
export class LazyAdminOverviewPanel {
  private readonly log = inject(LazyRoutesLogService);

  constructor() {
    this.log.addLog('Lazy admin overview component activated.');
  }
}
