import { Component } from '@angular/core';

@Component({
  selector: 'app-router-events-denied-panel',
  template: `
    <article class="event-panel event-panel--denied">
      <p class="eyebrow">Redirect target</p>
      <h3>Access Denied</h3>
      <p>
        The guarded report route returned a <code>UrlTree</code>, so the
        original navigation was redirected here.
      </p>
    </article>
  `,
  styles: [
    `
      .event-panel {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      .event-panel--denied {
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
export class RouterEventsDeniedPanel {}
