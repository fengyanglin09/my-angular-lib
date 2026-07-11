import { Component, input, output, signal } from '@angular/core';

interface EmptyStatePreset {
  actionLabel: string;
  message: string;
  title: string;
}

@Component({
  selector: 'app-empty-state-demo',
  template: `
    <article class="empty-state-card">
      <p class="eyebrow">Reusable child</p>
      <h3>{{ title() }}</h3>
      <p>{{ message() }}</p>
      <button type="button" (click)="action.emit()">{{ actionLabel() }}</button>
    </article>
  `,
})
export class EmptyStateDemo {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly actionLabel = input<string>('Try again');
  readonly action = output<void>();
}

@Component({
  selector: 'app-reusable-component-apis-demo',
  imports: [EmptyStateDemo],
  templateUrl: './reusable-component-apis-demo.html',
  styleUrl: './reusable-component-apis-demo.css',
})
export class ReusableComponentApisDemo {
  private readonly presets: Record<string, EmptyStatePreset> = {
    courses: {
      title: 'No courses match this filter',
      message: 'Try clearing the level filter or changing the search text.',
      actionLabel: 'Clear filters',
    },
    reports: {
      title: 'No reports generated yet',
      message: 'Generate a report when you are ready to review activity.',
      actionLabel: 'Generate report',
    },
  };

  protected readonly presetKey = signal<'courses' | 'reports'>('courses');
  protected readonly actionLog = signal(
    'The child renders the API. The parent decides what the action means.'
  );

  protected readonly preset = () => this.presets[this.presetKey()];

  protected usePreset(key: 'courses' | 'reports'): void {
    this.presetKey.set(key);
    this.actionLog.set(`Parent switched inputs to the ${key} preset.`);
  }

  protected handleAction(): void {
    const action = this.preset().actionLabel.toLowerCase();

    this.actionLog.set(
      `Child emitted action. Parent handled it as "${action}".`
    );
  }
}
