import { Component, inject } from '@angular/core';

import { CanMatchAccessService } from './can-match-access.service';

@Component({
  selector: 'app-restricted-feature-home-panel',
  template: `
    <article class="match-panel">
      <p class="eyebrow">Protected lazy route</p>
      <h3>Protected Overview</h3>
      <p>
        This route rendered only after <code>canMatch</code> allowed the
        protected lazy route group to match.
      </p>
      <strong>Loaded from restricted-feature.routes.ts</strong>
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
export class RestrictedFeatureHomePanel {
  private readonly access = inject(CanMatchAccessService);

  constructor() {
    this.access.addLog('Protected overview component activated.');
  }
}
