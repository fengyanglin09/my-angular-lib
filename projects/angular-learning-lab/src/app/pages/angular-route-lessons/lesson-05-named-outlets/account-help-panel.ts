import { Component } from '@angular/core';

@Component({
  selector: 'app-account-help-panel',
  template: `
    <article class="outlet-card">
      <h3>Help Panel</h3>
      <p>This named outlet can show contextual help beside the primary route.</p>
      <strong>Shortcut: press ? for help</strong>
    </article>
  `,
  styles: [
    `
      .outlet-card {
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
export class AccountHelpPanel {}
