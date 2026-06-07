import { Component, OnDestroy, signal } from '@angular/core';
import {
  concatMap,
  exhaustMap,
  mergeMap,
  Observable,
  OperatorFunction,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type FlatteningStrategy = 'switchMap' | 'concatMap' | 'mergeMap' | 'exhaustMap';

interface FlatteningOperator {
  description: string;
  name: FlatteningStrategy;
  realWorldUse: string;
  rule: string;
}

@Component({
  selector: 'app-lesson-05-flattening-operators',
  imports: [LearningNav],
  templateUrl: './lesson-05-flattening-operators.html',
  styleUrl: './lesson-05-flattening-operators.css',
})
export class Lesson05FlatteningOperators implements OnDestroy {
  private readonly click$ = new Subject<number>();
  private activeSubscription = new Subscription();
  private readonly timerIds: number[] = [];

  protected readonly activeStrategy = signal<FlatteningStrategy | 'None'>('None');
  protected readonly results = signal<string[]>([]);
  protected readonly logs = signal<string[]>([
    'Choose a flattening operator to run the same click burst through it.',
  ]);

  protected readonly operators: FlatteningOperator[] = [
    {
      description: 'Cancels the previous inner Observable when a new value arrives.',
      name: 'switchMap',
      realWorldUse: 'Search suggestions where only the latest query matters.',
      rule: 'latest wins',
    },
    {
      description: 'Waits for each inner Observable to finish before starting the next.',
      name: 'concatMap',
      realWorldUse: 'Save operations that must run in order.',
      rule: 'queue in order',
    },
    {
      description: 'Starts every inner Observable immediately and lets them overlap.',
      name: 'mergeMap',
      realWorldUse: 'Independent requests that can finish in any order.',
      rule: 'run together',
    },
    {
      description: 'Ignores new source values while an inner Observable is still running.',
      name: 'exhaustMap',
      realWorldUse: 'Submit buttons where double-clicks should be ignored.',
      rule: 'ignore while busy',
    },
  ];

  ngOnDestroy(): void {
    this.clearTimers();
    this.activeSubscription.unsubscribe();
    this.click$.complete();
  }

  protected runDemo(strategy: FlatteningStrategy): void {
    this.startDemo(strategy);

    this.activeSubscription.add(
      this.click$
        .pipe(
          tap((id) => this.addLog(`Outer click stream emitted click ${id}.`)),
          this.getFlatteningOperator(strategy),
        )
        .subscribe((result) => {
          this.results.update((results) => [...results, result]);
          this.addLog(`Subscriber received "${result}".`);
        }),
    );

    [
      { delayMs: 0, id: 1 },
      { delayMs: 180, id: 2 },
      { delayMs: 360, id: 3 },
      { delayMs: 1200, id: 4 },
    ].forEach(({ delayMs, id }) => {
      this.schedule(() => this.click$.next(id), delayMs);
    });
  }

  protected reset(): void {
    this.startDemo('None');
    this.logs.set([
      'Choose a flattening operator to run the same click burst through it.',
    ]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private clearTimers(): void {
    while (this.timerIds.length > 0) {
      const timerId = this.timerIds.pop();

      if (timerId !== undefined) {
        window.clearTimeout(timerId);
      }
    }
  }

  private fakeBackendRequest(
    strategy: FlatteningStrategy,
    id: number,
  ): Observable<string> {
    const requestTimes: Record<number, number> = {
      1: 800,
      2: 300,
      3: 600,
      4: 400,
    };
    const durationMs = requestTimes[id] ?? 500;

    return new Observable<string>((observer) => {
      let finished = false;

      this.addLog(
        `${strategy} started inner request ${id} (${durationMs}ms).`,
      );

      const timerId = window.setTimeout(() => {
        finished = true;
        observer.next(`Result ${id}`);
        observer.complete();
      }, durationMs);

      return () => {
        window.clearTimeout(timerId);

        if (!finished) {
          this.addLog(`${strategy} canceled inner request ${id}.`);
        }
      };
    });
  }

  private getFlatteningOperator(
    strategy: FlatteningStrategy,
  ): OperatorFunction<number, string> {
    switch (strategy) {
      case 'concatMap':
        return concatMap((id) => this.fakeBackendRequest(strategy, id));
      case 'exhaustMap':
        return exhaustMap((id) => this.fakeBackendRequest(strategy, id));
      case 'mergeMap':
        return mergeMap((id) => this.fakeBackendRequest(strategy, id));
      case 'switchMap':
        return switchMap((id) => this.fakeBackendRequest(strategy, id));
    }
  }

  private schedule(callback: () => void, delayMs: number): void {
    const timerId = window.setTimeout(callback, delayMs);

    this.timerIds.push(timerId);
  }

  private startDemo(strategy: FlatteningStrategy | 'None'): void {
    this.clearTimers();
    this.activeSubscription.unsubscribe();
    this.activeSubscription = new Subscription();
    this.activeStrategy.set(strategy);
    this.results.set([]);
    this.logs.set([`Starting ${strategy} demo.`]);
  }
}
