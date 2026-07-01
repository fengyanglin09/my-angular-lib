import { Component } from '@angular/core';

@Component({
  selector: 'app-account-notes-panel',
  template: `
    <article class="outlet-card">
      <h3>Notes Panel</h3>
      <p>This route rendered in the named sidePanel outlet.</p>
      <ul>
        <li>Renewal call next week</li>
        <li>Prefers email updates</li>
      </ul>
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
      p,
      ul {
        margin: 0;
      }

      p,
      ul {
        color: #606b78;
        line-height: 1.5;
      }
    `,
  ],
})
export class AccountNotesPanel {}
