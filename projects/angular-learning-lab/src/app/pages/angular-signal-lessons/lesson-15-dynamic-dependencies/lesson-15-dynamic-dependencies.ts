import { Component, computed, effect, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface DependencyLog {
  id: number;
  message: string;
}

type PreviewMode = 'draft' | 'published';

@Component({
  selector: 'app-lesson-15-dynamic-dependencies',
  imports: [LearningNav],
  templateUrl: './lesson-15-dynamic-dependencies.html',
  styleUrl: './lesson-15-dynamic-dependencies.css',
})
export class Lesson15DynamicDependencies {
  private nextLogId = 2;

  protected readonly previewMode = signal<PreviewMode>('draft');
  protected readonly draftTitle = signal('Draft: Signals field guide');
  protected readonly draftBody = signal('Work in progress notes for the next release.');
  protected readonly publishedTitle = signal('Published: Angular learning lab');
  protected readonly publishedSummary = signal('Stable public summary for learners.');

  protected readonly activeTitle = computed(() => {
    if (this.previewMode() === 'draft') {
      return this.draftTitle();
    }

    return this.publishedTitle();
  });

  protected readonly activeDescription = computed(() => {
    if (this.previewMode() === 'draft') {
      return this.draftBody();
    }

    return this.publishedSummary();
  });

  protected readonly activeDependencyList = computed(() =>
    this.previewMode() === 'draft'
      ? 'previewMode, draftTitle, draftBody'
      : 'previewMode, publishedTitle, publishedSummary',
  );

  protected readonly logs = signal<DependencyLog[]>([
    { id: 1, message: 'Preview effect is waiting for tracked signal changes.' },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A computed only tracks the branch it actually reads during the latest run.',
      name: 'conditional computed',
      syntax: `activeTitle = computed(() => {
  if (previewMode() === 'draft') {
    return draftTitle();
  }

  return publishedTitle();
})`,
    },
    {
      description: 'In draft mode, publishedTitle is not a dependency yet.',
      name: 'draft dependencies',
      syntax: `previewMode: draft
tracked: draftTitle
ignored: publishedTitle`,
    },
    {
      description: 'After switching modes, Angular reruns the computed and tracks the published branch.',
      name: 'published dependencies',
      syntax: `previewMode: published
tracked: publishedTitle
ignored: draftTitle`,
    },
    {
      description: 'This is useful for tabs, feature flags, permissions, and mode-specific UI.',
      name: 'real use',
      syntax: `only the visible branch
becomes reactive work`,
    },
  ];

  constructor() {
    effect(() => {
      const mode = this.previewMode();
      const title = this.activeTitle();
      const description = this.activeDescription();

      this.addLog(
        `Preview effect ran in ${mode} mode using "${title}" and "${description}".`,
      );
    });
  }

  protected setMode(mode: PreviewMode): void {
    this.previewMode.set(mode);
  }

  protected updateDraftTitle(value: string): void {
    this.draftTitle.set(value);
  }

  protected updateDraftBody(value: string): void {
    this.draftBody.set(value);
  }

  protected updatePublishedTitle(value: string): void {
    this.publishedTitle.set(value);
  }

  protected updatePublishedSummary(value: string): void {
    this.publishedSummary.set(value);
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Dependency log cleared.' }]);
    this.nextLogId = 2;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
