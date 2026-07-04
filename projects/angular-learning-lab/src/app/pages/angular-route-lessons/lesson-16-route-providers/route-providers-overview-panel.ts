import { Component, inject } from '@angular/core';

import { RouteProvidersWorkspaceStore } from './route-providers-workspace-store';

@Component({
  selector: 'app-route-providers-overview-panel',
  template: `
    <article class="provider-panel">
      <p class="eyebrow">Overview Child Route</p>
      <h3>{{ store.workspace() }}</h3>
      <p>
        This child route injects the same route-scoped store as the parent
        lesson shell.
      </p>
      <button type="button" (click)="store.addDraft('Overview tab')">
        Add overview draft
      </button>
    </article>
  `,
  styles: [
    `
      .provider-panel {
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
export class RouteProvidersOverviewPanel {
  protected readonly store = inject(RouteProvidersWorkspaceStore);
}
