import { Component } from '@angular/core';

@Component({
  selector: 'app-preloading-overview-panel',
  template: `
    <article class="preloading-panel">
      <p class="eyebrow">Eager Child Route</p>
      <h3>Reports Workspace Overview</h3>
      <p>
        This child component is part of the already-loaded lesson route. It is
        not a lazy route branch.
      </p>
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
export class PreloadingOverviewPanel {}
