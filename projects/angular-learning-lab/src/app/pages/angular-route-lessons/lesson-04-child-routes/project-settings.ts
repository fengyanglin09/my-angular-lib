import { Component } from '@angular/core';

@Component({
  selector: 'app-project-settings',
  template: `
    <article class="child-card">
      <h3>Settings</h3>
      <p>This child route shows editable project settings.</p>
      <div class="setting-row">
        <span>Notifications</span>
        <strong>Enabled</strong>
      </div>
      <div class="setting-row">
        <span>Visibility</span>
        <strong>Team only</strong>
      </div>
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
      p {
        margin: 0;
      }

      p {
        color: #606b78;
      }

      .setting-row {
        align-items: center;
        border: 1px solid #dfe7ef;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        padding: 12px;
      }
    `,
  ],
})
export class ProjectSettings {}
