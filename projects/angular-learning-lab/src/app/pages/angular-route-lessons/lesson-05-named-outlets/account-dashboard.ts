import { Component } from '@angular/core';

@Component({
  selector: 'app-account-dashboard',
  template: `
    <article class="outlet-card">
      <h3>Dashboard</h3>
      <p>The primary unnamed outlet is showing the account dashboard.</p>
      <strong>3 active tasks</strong>
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
export class AccountDashboard {}
