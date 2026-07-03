import { Component } from '@angular/core';

@Component({
  selector: 'app-can-match-denied-panel',
  template: `
    <article class="match-panel match-panel--denied">
      <p class="eyebrow">Redirect target</p>
      <h3>Protected Route Not Matched</h3>
      <p>
        The protected branch returned a <code>UrlTree</code>, so Angular routed
        here instead of matching the lazy protected feature.
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

      .match-panel--denied {
        background: #fff7ed;
        border-color: #f1c48b;
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
export class CanMatchDeniedPanel {}
