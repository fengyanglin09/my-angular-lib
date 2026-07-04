import { Component } from '@angular/core';

@Component({
  selector: 'app-router-events-home-panel',
  template: `
    <article class="event-panel">
      <p class="eyebrow">Simple child route</p>
      <h3>Home Route</h3>
      <p>
        This route has no guard and no resolver, so its event sequence is the
        smallest successful navigation.
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
export class RouterEventsHomePanel {}
