import { Component } from '@angular/core';

@Component({
  selector: 'app-guard-public-panel',
  template: `
    <article class="guard-card">
      <h3>Public Page</h3>
      <p>This route has no guard, so anyone can activate it.</p>
      <strong>Route: public</strong>
    </article>
  `,
  styles: [
    `
      .guard-card {
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
export class GuardPublicPanel {}
