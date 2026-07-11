import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-page-layout-shell-demo',
  template: `
    <article class="page-layout-shell">
      <header>
        <div>
          <p class="eyebrow">Layout title slot</p>
          <ng-content select="[pageTitle]" />
        </div>
        <div class="page-actions">
          <ng-content select="[pageActions]" />
        </div>
      </header>

      <section class="page-body">
        <ng-content select="[pageBody]" />
      </section>
    </article>
  `,
})
export class PageLayoutShellDemo {}

@Component({
  selector: 'app-reusable-page-layouts-demo',
  imports: [PageLayoutShellDemo],
  templateUrl: './reusable-page-layouts-demo.html',
  styleUrl: './reusable-page-layouts-demo.css',
})
export class ReusablePageLayoutsDemo {
  protected readonly entity = signal<'order' | 'user'>('order');
  protected readonly showAuditAction = signal(false);

  protected switchEntity(): void {
    this.entity.update((value) => (value === 'order' ? 'user' : 'order'));
  }

  protected toggleAuditAction(): void {
    this.showAuditAction.update((value) => !value);
  }
}
