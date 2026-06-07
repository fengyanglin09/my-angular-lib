import { Component, OnDestroy, signal } from '@angular/core';
import { debounceTime, delay, of, Subject, Subscription, tap, throttleTime } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface TimingOperator {
  description: string;
  name: string;
  realWorldUse: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-04-time-operators',
  imports: [LearningNav],
  templateUrl: './lesson-04-time-operators.html',
  styleUrl: './lesson-04-time-operators.css',
})
export class Lesson04TimeOperators implements OnDestroy {
  private readonly debounceInput$ = new Subject<string>();
  private readonly throttleClicks$ = new Subject<number>();
  private activeSubscription = new Subscription();
  private readonly timerIds: number[] = [];

  protected readonly activeDemo = signal('None');
  protected readonly logs = signal<string[]>([
    'Choose a timing demo to see when values are emitted.',
  ]);

  protected readonly operators: TimingOperator[] = [
    {
      description: 'Holds each value for a period of time before delivering it.',
      name: 'delay',
      realWorldUse: 'Show a loading state or wait before displaying a result.',
      syntax: 'of(value).pipe(delay(800))',
    },
    {
      description:
        'Waits for the source to become quiet before sending the latest value.',
      name: 'debounceTime',
      realWorldUse: 'Search after the user stops typing.',
      syntax: 'input$.pipe(debounceTime(600))',
    },
    {
      description:
        'Lets the first value through, then ignores extra values for a short window.',
      name: 'throttleTime',
      realWorldUse: 'Prevent repeated button clicks from spamming the backend.',
      syntax: 'clicks$.pipe(throttleTime(800))',
    },
  ];

  ngOnDestroy(): void {
    this.clearTimers();
    this.activeSubscription.unsubscribe();
    this.debounceInput$.complete();
    this.throttleClicks$.complete();
  }

  protected runDelayDemo(): void {
    this.startDemo('delay');

    this.activeSubscription.add(
      of('Profile saved')
        .pipe(
          tap((value) =>
            this.addLog(`Source emitted "${value}" immediately.`),
          ),
          delay(800),
        )
        .subscribe({
          complete: () => this.addLog('delay demo completed.'),
          next: (value) =>
            this.addLog(`Subscriber received "${value}" after 800ms.`),
        }),
    );
  }

  protected runDebounceDemo(): void {
    this.startDemo('debounceTime');

    this.activeSubscription.add(
      this.debounceInput$.pipe(debounceTime(600)).subscribe((query) => {
        this.addLog(
          `debounceTime released "${query}" after typing became quiet.`,
        );
      }),
    );

    ['A', 'An', 'Ang', 'Angular'].forEach((query, index) => {
      this.schedule(() => {
        this.addLog(`Source emitted typed value "${query}".`);
        this.debounceInput$.next(query);
      }, index * 180);
    });
  }

  protected runThrottleDemo(): void {
    this.startDemo('throttleTime');

    this.activeSubscription.add(
      this.throttleClicks$.pipe(throttleTime(800)).subscribe((clickNumber) => {
        this.addLog(`throttleTime allowed click ${clickNumber}.`);
      }),
    );

    [1, 2, 3, 4, 5].forEach((clickNumber, index) => {
      const delayMs = clickNumber === 5 ? 950 : index * 160;

      this.schedule(() => {
        this.addLog(`Source emitted click ${clickNumber}.`);
        this.throttleClicks$.next(clickNumber);
      }, delayMs);
    });
  }

  protected reset(): void {
    this.startDemo('None');
    this.logs.set(['Choose a timing demo to see when values are emitted.']);
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

  private schedule(callback: () => void, delayMs: number): void {
    const timerId = window.setTimeout(callback, delayMs);

    this.timerIds.push(timerId);
  }

  private startDemo(name: string): void {
    this.clearTimers();
    this.activeSubscription.unsubscribe();
    this.activeSubscription = new Subscription();
    this.activeDemo.set(name);
    this.logs.set([`Starting ${name} demo.`]);
  }
}
