import { Component, computed, effect, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type Density = 'comfortable' | 'compact';
type Theme = 'light' | 'dark';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-02-effects',
  imports: [LearningNav],
  templateUrl: './lesson-02-effects.html',
  styleUrl: './lesson-02-effects.css',
})
export class Lesson02Effects {
  private hasEffectRun = false;

  protected readonly theme = signal<Theme>('light');
  protected readonly density = signal<Density>('comfortable');
  protected readonly notificationsEnabled = signal(true);
  protected readonly logs = signal<string[]>([]);

  protected readonly preferenceSummary = computed(() => {
    const notificationText = this.notificationsEnabled()
      ? 'notifications on'
      : 'notifications off';

    return `${this.theme()} theme, ${this.density()} density, ${notificationText}`;
  });

  protected readonly previewClasses = computed(() => ({
    'preview-card--compact': this.density() === 'compact',
    'preview-card--dark': this.theme() === 'dark',
  }));

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Signals store the user preference state.',
      name: 'state',
      syntax: 'const theme = signal<Theme>("light");',
    },
    {
      description: 'computed builds display values from other signals.',
      name: 'derived value',
      syntax: 'const summary = computed(() => `${theme()} theme`);',
    },
    {
      description: 'effect runs after Angular tracks the signals read inside it.',
      name: 'side effect',
      syntax: 'effect(() => savePreference(theme(), density()));',
    },
  ];

  constructor() {
    effect(() => {
      const summary = this.preferenceSummary();
      const logMessage = this.hasEffectRun
        ? `effect reran after a tracked signal changed: ${summary}.`
        : `effect ran for the first time and read preferences: ${summary}.`;

      this.logs.update((logs) => [
        ...logs,
        logMessage,
      ]);
      this.hasEffectRun = true;
    });
  }

  protected setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  protected setDensity(density: Density): void {
    this.density.set(density);
  }

  protected toggleNotifications(): void {
    this.notificationsEnabled.update((enabled) => !enabled);
  }

  protected clearLog(): void {
    this.logs.set([
      'Log cleared. The next signal change will cause the effect to run again.',
    ]);
  }
}
