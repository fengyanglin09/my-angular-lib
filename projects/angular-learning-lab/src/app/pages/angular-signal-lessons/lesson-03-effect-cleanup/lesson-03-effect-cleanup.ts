import { Component, computed, effect, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type Plan = 'starter' | 'growth' | 'enterprise';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-03-effect-cleanup',
  imports: [LearningNav],
  templateUrl: './lesson-03-effect-cleanup.html',
  styleUrl: './lesson-03-effect-cleanup.css',
})
export class Lesson03EffectCleanup {
  private saveAttempt = 0;

  protected readonly selectedPlan = signal<Plan>('starter');
  protected readonly savedPlan = signal<Plan>('starter');
  protected readonly secondsRemaining = signal(0);
  protected readonly saving = signal(false);
  protected readonly logs = signal<string[]>([]);

  protected readonly selectedPlanLabel = computed(() =>
    this.formatPlan(this.selectedPlan()),
  );
  protected readonly savedPlanLabel = computed(() => this.formatPlan(this.savedPlan()));
  protected readonly saveStatus = computed(() => {
    if (this.saving()) {
      return `Saving ${this.selectedPlanLabel()} in ${this.secondsRemaining()} second(s)`;
    }

    return `${this.savedPlanLabel()} is saved`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The effect reads a signal, so Angular reruns it when that signal changes.',
      name: 'tracked signal',
      syntax: 'const plan = selectedPlan();',
    },
    {
      description: 'The effect starts work that lives beyond the current function call.',
      name: 'start side effect',
      syntax: 'const timerId = window.setTimeout(savePlan, 3000);',
    },
    {
      description: 'onCleanup cancels the previous work before the effect reruns or is destroyed.',
      name: 'cleanup',
      syntax: 'onCleanup(() => window.clearTimeout(timerId));',
    },
  ];

  constructor() {
    effect((onCleanup) => {
      const plan = this.selectedPlan();
      const attempt = this.saveAttempt + 1;
      this.saveAttempt = attempt;

      this.saving.set(true);
      this.secondsRemaining.set(3);
      this.addLog(`effect run #${attempt}: started autosave for ${this.formatPlan(plan)}.`);
      let completed = false;

      const countdownId = window.setInterval(() => {
        this.secondsRemaining.update((seconds) => Math.max(0, seconds - 1));
      }, 1000);

      const saveTimerId = window.setTimeout(() => {
        completed = true;
        this.savedPlan.set(plan);
        this.saving.set(false);
        this.addLog(`autosave #${attempt}: saved ${this.formatPlan(plan)}.`);
      }, 3000);

      onCleanup(() => {
        window.clearInterval(countdownId);
        window.clearTimeout(saveTimerId);

        if (!completed) {
          this.addLog(`cleanup for run #${attempt}: cancelled pending save for ${this.formatPlan(plan)}.`);
        }
      });
    });
  }

  protected selectPlan(plan: Plan): void {
    this.selectedPlan.set(plan);
  }

  protected clearLog(): void {
    this.logs.set([
      'Log cleared. Pick another plan quickly to see cleanup cancel the previous autosave.',
    ]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private formatPlan(plan: Plan): string {
    if (plan === 'starter') {
      return 'Starter';
    }

    if (plan === 'growth') {
      return 'Growth';
    }

    return 'Enterprise';
  }
}
