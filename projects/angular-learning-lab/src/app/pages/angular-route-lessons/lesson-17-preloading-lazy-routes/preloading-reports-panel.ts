import { Component, inject } from '@angular/core';

import { RoutePreloadingLogService } from './route-preloading-log.service';

@Component({
  selector: 'app-preloading-reports-panel',
  template: `
    <article class="preloading-panel">
      <p class="eyebrow">Lazy Preloaded Child Route</p>
      <h3>Quarterly Reports</h3>
      <p>
        This component lives inside a lazy route file. The custom preloading
        strategy can load the route file before the user clicks this tab.
      </p>
      <button type="button" (click)="recordRefresh()">Refresh report view</button>
    </article>
  `,
  styles: [
    `
      .preloading-panel {
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
export class PreloadingReportsPanel {
  private readonly log = inject(RoutePreloadingLogService);

  constructor() {
    this.log.addLog('Lazy reports component activated.');
  }

  protected recordRefresh(): void {
    this.log.addLog('Reports view refreshed after activation.');
  }
}
