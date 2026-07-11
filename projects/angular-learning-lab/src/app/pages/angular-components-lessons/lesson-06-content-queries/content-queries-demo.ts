import {
  Component,
  computed,
  contentChild,
  contentChildren,
  Directive,
  ElementRef,
  input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appComponentsProjectedTitle]',
})
export class ComponentsProjectedTitleDirective {}

@Directive({
  selector: '[appComponentsProjectedAction]',
})
export class ComponentsProjectedActionDirective {
  readonly actionLabel = input('Action');
}

@Component({
  selector: 'app-content-query-card-demo',
  template: `
    <article class="query-card">
      <header>
        <div>
          <p class="eyebrow">Projected title slot</p>
          <ng-content select="[appComponentsProjectedTitle]" />
        </div>
        <div class="actions">
          <ng-content select="[appComponentsProjectedAction]" />
        </div>
      </header>

      <section class="query-readout">
        <p class="eyebrow">Child content queries</p>
        <dl>
          <div>
            <dt>contentChild title text</dt>
            <dd>{{ titleText() }}</dd>
          </div>
          <div>
            <dt>contentChildren actions</dt>
            <dd>{{ actionLabels().join(', ') || 'No actions' }}</dd>
          </div>
        </dl>
      </section>
    </article>
  `,
})
export class ContentQueryCardDemo {
  private readonly titleElement = contentChild(
    ComponentsProjectedTitleDirective,
    {
      read: ElementRef,
    }
  );
  private readonly actions = contentChildren(
    ComponentsProjectedActionDirective
  );

  protected readonly titleText = computed(
    () =>
      this.titleElement()?.nativeElement.textContent?.trim() ??
      'No projected title'
  );
  protected readonly actionLabels = computed(() =>
    this.actions().map((action) => action.actionLabel())
  );
}

@Component({
  selector: 'app-content-queries-demo',
  imports: [
    ComponentsProjectedActionDirective,
    ComponentsProjectedTitleDirective,
    ContentQueryCardDemo,
  ],
  templateUrl: './content-queries-demo.html',
  styleUrl: './content-queries-demo.css',
})
export class ContentQueriesDemo {
  protected readonly useProjectTitle = signal(true);
  protected readonly showArchiveAction = signal(false);

  protected switchTitle(): void {
    this.useProjectTitle.update((value) => !value);
  }

  protected toggleArchiveAction(): void {
    this.showArchiveAction.update((value) => !value);
  }
}
