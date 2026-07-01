import { Component } from '@angular/core';

@Component({
  selector: 'app-project-activity',
  template: `
    <article class="child-card">
      <h3>Activity</h3>
      <p>This child route shows recent project activity.</p>
      <ol>
        <li>Design review completed.</li>
        <li>API contract updated.</li>
        <li>Beta checklist assigned.</li>
      </ol>
    </article>
  `,
  styles: [
    `
      .child-card {
        background: #ffffff;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      h3,
      p,
      ol {
        margin: 0;
      }

      p,
      ol {
        color: #606b78;
        line-height: 1.6;
      }
    `,
  ],
})
export class ProjectActivity {}
