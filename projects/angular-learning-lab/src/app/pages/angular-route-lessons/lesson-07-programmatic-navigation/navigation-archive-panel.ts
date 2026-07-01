import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-archive-panel',
  template: `
    <article class="nav-card">
      <h3>Archive</h3>
      <p>The primary child route is showing archived messages.</p>
      <strong>42 archived messages</strong>
    </article>
  `,
  styles: [
    `
      .nav-card {
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
export class NavigationArchivePanel {}
