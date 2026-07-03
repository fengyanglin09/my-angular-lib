import { Component, inject } from '@angular/core';

import { LazyRoutesLogService } from './lazy-routes-log.service';

@Component({
  selector: 'app-lazy-admin-reports-panel',
  template: `
    <article class="lazy-panel">
      <p class="eyebrow">Lazy child route</p>
      <h3>Admin Reports</h3>
      <p>
        This sibling route is declared in the same lazy route file. After the
        admin route group has loaded, moving between lazy children is normal
        child-route navigation.
      </p>
      <strong>Same lazy route group, different child route.</strong>
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
export class LazyAdminReportsPanel {
  private readonly log = inject(LazyRoutesLogService);

  constructor() {
    this.log.addLog('Lazy admin reports component activated.');
  }
}
