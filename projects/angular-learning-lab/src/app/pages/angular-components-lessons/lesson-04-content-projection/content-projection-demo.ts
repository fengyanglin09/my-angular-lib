import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-projected-card-shell-demo',
  template: `
    <article class="projected-card">
      <header>
        <div>
          <p class="eyebrow">Projected header slot</p>
          <ng-content select="[cardTitle]" />
        </div>
        <div class="actions">
          <ng-content select="[cardAction]" />
        </div>
      </header>

      <section>
        <ng-content select="[cardBody]" />
      </section>
    </article>
  `,
})
export class ProjectedCardShellDemo {}

@Component({
  selector: 'app-content-projection-demo',
  imports: [ProjectedCardShellDemo],
  templateUrl: './content-projection-demo.html',
  styleUrl: './content-projection-demo.css',
})
export class ContentProjectionDemo {
  protected readonly useBillingContent = signal(true);
  protected readonly showSecondaryAction = signal(false);

  protected switchContent(): void {
    this.useBillingContent.update((value) => !value);
  }

  protected toggleSecondaryAction(): void {
    this.showSecondaryAction.update((value) => !value);
  }
}
