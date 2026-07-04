import { Component } from '@angular/core';

@Component({
  selector: 'app-metadata-settings-panel',
  template: `
    <article class="metadata-panel">
      <p class="eyebrow">Settings Child Route</p>
      <h3>Workspace Settings</h3>
      <p>
        Settings uses the same parent shell, but route metadata gives it a
        different breadcrumb trail, analytics name, and layout hint.
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
export class MetadataSettingsPanel {}
