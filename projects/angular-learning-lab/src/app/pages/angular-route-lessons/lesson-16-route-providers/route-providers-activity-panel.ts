import { Component, inject } from '@angular/core';

import { RouteProvidersWorkspaceStore } from './route-providers-workspace-store';

@Component({
  selector: 'app-route-providers-activity-panel',
  template: `
    <article class="provider-panel">
      <p class="eyebrow">Activity Child Route</p>
      <h3>Activity for {{ store.workspace() }}</h3>
      <p>
        Switching to this child route does not create a new store because the
        provider lives on the parent route.
      </p>
      <button type="button" (click)="store.addDraft('Activity tab')">
        Add activity draft
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
export class RouteProvidersActivityPanel {
  protected readonly store = inject(RouteProvidersWorkspaceStore);
}
