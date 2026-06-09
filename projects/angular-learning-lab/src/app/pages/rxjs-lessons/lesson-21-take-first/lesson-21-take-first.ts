import { Component, OnDestroy, signal } from '@angular/core';
import { EMPTY, first, of, Subject, Subscription, take } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type DialogAnswer = 'cancel' | 'confirm';

@Component({
  selector: 'app-lesson-21-take-first',
  imports: [LearningNav],
  templateUrl: './lesson-21-take-first.html',
  styleUrl: './lesson-21-take-first.css',
})
export class Lesson21TakeFirst implements OnDestroy {
  private readonly dialogAnswer$ = new Subject<DialogAnswer>();
  private readonly subscriptions = new Subscription();

  protected readonly logs = signal<string[]>([
    'Open the dialog listener, then emit confirm or cancel.',
  ]);
  protected readonly listening = signal(false);

  protected readonly examples = [
    {
      description: 'Read one value, then complete automatically.',
      name: 'take(1)',
      syntax: 'dialogAnswer$.pipe(take(1))',
    },
    {
      description: 'Read the first matching value, then complete automatically.',
      name: 'first(predicate)',
      syntax: "answers$.pipe(first((answer) => answer === 'confirm'))",
    },
    {
      description: 'If no value arrives before completion, first() errors.',
      name: 'empty stream',
      syntax: 'EMPTY.pipe(first())',
    },
  ];

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected listenOnce(): void {
    this.listening.set(true);
    this.addLog('take(1) subscription started.');

    const subscription = this.dialogAnswer$
      .pipe(take(1))
      .subscribe({
        next: (answer) => this.addLog(`take(1) received "${answer}".`),
        complete: () => {
          this.addLog('take(1) completed after one answer.');
          this.listening.set(false);
        },
      });

    this.subscriptions.add(subscription);
  }

  protected emitAnswer(answer: DialogAnswer): void {
    this.dialogAnswer$.next(answer);
    this.addLog(`Dialog emitted "${answer}".`);
  }

  protected runFirstConfirmExample(): void {
    const answers: DialogAnswer[] = ['cancel', 'cancel', 'confirm'];

    of(...answers)
      .pipe(first((answer) => answer === 'confirm'))
      .subscribe({
        next: (answer) =>
          this.addLog(`first(predicate) ignored cancels and received "${answer}".`),
        complete: () =>
          this.addLog('first(predicate) completed after the first matching value.'),
      });
  }

  protected runEmptyComparison(): void {
    EMPTY.pipe(take(1)).subscribe({
      complete: () => this.addLog('EMPTY.pipe(take(1)) completed without a value.'),
    });

    EMPTY.pipe(first()).subscribe({
      error: (error: Error) =>
        this.addLog(`EMPTY.pipe(first()) errored: ${error.message}`),
    });
  }

  protected reset(): void {
    this.listening.set(false);
    this.logs.set(['Open the dialog listener, then emit confirm or cancel.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}
