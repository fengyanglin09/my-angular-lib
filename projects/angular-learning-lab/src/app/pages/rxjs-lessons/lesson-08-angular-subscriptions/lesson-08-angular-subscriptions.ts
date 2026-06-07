import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, map, Observable, Subscription, take, tap } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface SubscriptionPattern {
  description: string;
  name: string;
  realWorldUse: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-08-angular-subscriptions',
  imports: [AsyncPipe, LearningNav],
  templateUrl: './lesson-08-angular-subscriptions.html',
  styleUrl: './lesson-08-angular-subscriptions.css',
})
export class Lesson08AngularSubscriptions implements OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private manualSubscription = new Subscription();
  private demoSubscription = new Subscription();

  protected readonly asyncPipeValue$: Observable<string> = interval(1000).pipe(
    map((count) => `Template value ${count + 1}`),
  );
  protected readonly activeDemo = signal('None');
  protected readonly manualValue = signal('No manual value yet.');
  protected readonly safeValue = signal('No auto-cleanup value yet.');
  protected readonly logs = signal<string[]>([
    'Choose a subscription pattern to see who owns cleanup.',
  ]);

  protected readonly patterns: SubscriptionPattern[] = [
    {
      description:
        'You call subscribe in TypeScript and keep the Subscription so you can unsubscribe later.',
      name: 'manual subscribe',
      realWorldUse: 'Useful when the side effect must happen in TypeScript.',
      syntax: 'this.subscription = source$.subscribe(...)',
    },
    {
      description:
        'Angular ends the subscription automatically when the component is destroyed.',
      name: 'takeUntilDestroyed',
      realWorldUse: 'Good for component subscriptions that should live until the component goes away.',
      syntax: 'source$.pipe(takeUntilDestroyed()).subscribe(...)',
    },
    {
      description:
        'The template subscribes for you and unsubscribes when the view is destroyed.',
      name: 'async pipe',
      realWorldUse: 'Best for displaying Observable values directly in HTML.',
      syntax: '{{ value$ | async }}',
    },
  ];

  ngOnDestroy(): void {
    this.manualSubscription.unsubscribe();
    this.demoSubscription.unsubscribe();
  }

  protected runManualSubscribeDemo(): void {
    this.startDemo('manual subscribe');
    this.manualSubscription.unsubscribe();
    this.manualSubscription = this.createCounterStream('manual')
      .pipe(take(4))
      .subscribe({
        complete: () => this.addLog('Manual subscription completed.'),
        next: (value) => this.manualValue.set(value),
      });
  }

  protected runTakeUntilDestroyedDemo(): void {
    this.startDemo('takeUntilDestroyed');

    this.demoSubscription.add(
      this.createCounterStream('auto-cleanup')
        .pipe(take(4), takeUntilDestroyed(this.destroyRef))
        .subscribe({
          complete: () => this.addLog('Auto-cleanup demo completed.'),
          next: (value) => this.safeValue.set(value),
        }),
    );
  }

  protected reset(): void {
    this.startDemo('None');
    this.manualSubscription.unsubscribe();
    this.manualValue.set('No manual value yet.');
    this.safeValue.set('No auto-cleanup value yet.');
    this.logs.set(['Choose a subscription pattern to see who owns cleanup.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private createCounterStream(label: string): Observable<string> {
    return interval(500).pipe(
      take(4),
      map((count) => `${label} value ${count + 1}`),
      tap((value) => this.addLog(`Source emitted "${value}".`)),
    );
  }

  private startDemo(name: string): void {
    this.demoSubscription.unsubscribe();
    this.demoSubscription = new Subscription();
    this.activeDemo.set(name);
    this.logs.set([`Starting ${name} demo.`]);
  }
}
