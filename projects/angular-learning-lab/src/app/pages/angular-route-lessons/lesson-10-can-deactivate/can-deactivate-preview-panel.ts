import { Component } from '@angular/core';

@Component({
  selector: 'app-can-deactivate-preview-panel',
  template: `
    <article class="preview-card">
      <p class="eyebrow">Unguarded preview route</p>
      <h3>Preview</h3>
      <p>
        You reached this route because the editor guard allowed navigation away
        from the guarded child route.
      </p>
      <strong>Route: preview</strong>
    </article>
  `,
  styles: [
    `
      .preview-card {
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
export class CanDeactivatePreviewPanel {}
