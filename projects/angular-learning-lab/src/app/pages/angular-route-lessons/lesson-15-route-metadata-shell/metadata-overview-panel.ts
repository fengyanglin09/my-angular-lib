import { Component } from '@angular/core';

@Component({
  selector: 'app-metadata-overview-panel',
  template: `
    <article class="metadata-panel">
      <p class="eyebrow">Overview Child Route</p>
      <h3>Workspace Overview</h3>
      <p>
        This panel is ordinary routed content. The parent lesson shell reads
        route metadata from the active child route and builds the page chrome.
      </p>
    </article>
  `,
  styles: [
    `
      .metadata-panel {
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
export class MetadataOverviewPanel {}
