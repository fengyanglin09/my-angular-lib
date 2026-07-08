import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  componentlessRouteContextSignal,
  ComponentlessRouteContext,
} from './componentless-route-context';

@Component({
  selector: 'app-componentless-settings-panel',
  template: `
    <article class="componentless-panel">
      <p class="eyebrow">Settings Child Route</p>
      <h3>{{ context().workspaceId }} settings</h3>
      <p>
        Settings receives the same parent route context without needing a
        throwaway parent component between the lesson shell and this child.
      </p>
      <dl>
        <div>
          <dt>Workspace id from parent route</dt>
          <dd>{{ context().workspaceId }}</dd>
        </div>
        <div>
          <dt>Feature area from parent data</dt>
          <dd>{{ context().featureArea }}</dd>
        </div>
        <div>
          <dt>Required role from parent data</dt>
          <dd>{{ context().requiredRole }}</dd>
        </div>
      </dl>
    </article>
  `,
  styles: [
    `
      .componentless-panel {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      h3,
      p,
      dl {
        margin: 0;
      }

      p,
      dd {
        color: #606b78;
      }

      dl {
        display: grid;
        gap: 10px;
      }

      div {
        background: #f8fafc;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        padding: 12px;
      }

      dt {
        font-weight: 800;
      }

      dd {
        margin: 6px 0 0;
      }
    `,
  ],
})
export class ComponentlessSettingsPanel {
  protected readonly context: Signal<ComponentlessRouteContext> =
    componentlessRouteContextSignal(inject(ActivatedRoute));
}
