import { Component, inject } from '@angular/core';

import { RouteProvidersWorkspaceStore } from './route-providers-workspace-store';

@Component({
  selector: 'app-route-providers-settings-panel',
  template: `
    <article class="provider-panel">
      <p class="eyebrow">Settings Child Route</p>
      <h3>Workspace Settings</h3>
      <p>
        This child can change shared route-scoped state, and the parent shell
        updates because it injects the same service instance.
      </p>
      <div class="button-row">
        <button type="button" (click)="store.switchWorkspace('Design System')">
          Design System
        </button>
        <button type="button" (click)="store.switchWorkspace('Billing Tools')">
          Billing Tools
        </button>
      </div>
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

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
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
export class RouteProvidersSettingsPanel {
  protected readonly store = inject(RouteProvidersWorkspaceStore);
}
