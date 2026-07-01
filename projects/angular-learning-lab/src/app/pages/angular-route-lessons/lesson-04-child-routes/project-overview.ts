import { Component } from '@angular/core';

@Component({
  selector: 'app-project-overview',
  template: `
    <article class="child-card">
      <h3>Overview</h3>
      <p>This child route shows project summary data.</p>
      <dl>
        <div>
          <dt>Milestone</dt>
          <dd>Public beta</dd>
        </div>
        <div>
          <dt>Health</dt>
          <dd>On track</dd>
        </div>
      </dl>
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
      dl {
        margin: 0;
      }

      p,
      dd {
        color: #606b78;
      }

      dl {
        display: grid;
        gap: 10px;
      }
    `,
  ],
})
export class ProjectOverview {}
