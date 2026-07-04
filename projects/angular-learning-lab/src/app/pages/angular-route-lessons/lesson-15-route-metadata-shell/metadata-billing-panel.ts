import { Component } from '@angular/core';

@Component({
  selector: 'app-metadata-billing-panel',
  template: `
    <article class="metadata-panel">
      <p class="eyebrow">Billing Child Route</p>
      <h3>Billing Center</h3>
      <p>
        The URL changed to a billing route, so the shell metadata changes to a
        finance section, billing breadcrumbs, and a billing document title.
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
export class MetadataBillingPanel {}
