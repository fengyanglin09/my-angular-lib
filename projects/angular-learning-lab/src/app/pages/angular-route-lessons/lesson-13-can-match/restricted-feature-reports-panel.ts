import { Component, inject } from '@angular/core';

import { CanMatchAccessService } from './can-match-access.service';

@Component({
  selector: 'app-restricted-feature-reports-panel',
  template: `
    <article class="match-panel">
      <p class="eyebrow">Protected lazy route</p>
      <h3>Protected Reports</h3>
      <p>
        This sibling route is inside the same protected lazy route group. Once
        the group matches, its child routes work like normal child routes.
      </p>
      <strong>Same protected lazy route group.</strong>
    </article>
  `,
  styles: [
    `
      .match-panel {
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
export class RestrictedFeatureReportsPanel {
  private readonly access = inject(CanMatchAccessService);

  constructor() {
    this.access.addLog('Protected reports component activated.');
  }
}
