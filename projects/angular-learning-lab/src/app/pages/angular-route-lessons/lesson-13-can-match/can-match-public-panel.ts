import { Component } from '@angular/core';

@Component({
  selector: 'app-can-match-public-panel',
  template: `
    <article class="match-panel">
      <p class="eyebrow">Always matchable route</p>
      <h3>Public Workspace</h3>
      <p>
        This child route has no <code>canMatch</code> guard, so Angular can
        match and activate it normally.
      </p>
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
export class CanMatchPublicPanel {}
