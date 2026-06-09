import { Component, OnDestroy, signal } from '@angular/core';
import {
  auditTime,
  debounceTime,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface OperatorLog {
  operator: 'auditTime' | 'debounceTime' | 'raw' | 'throttleTime';
  value: number;
}

@Component({
  selector: 'app-lesson-19-audit-time',
  imports: [LearningNav],
  templateUrl: './lesson-19-audit-time.html',
  styleUrl: './lesson-19-audit-time.css',
})
export class Lesson19AuditTime implements OnDestroy {
  private value = 0;
  private readonly resizeEvents$ = new Subject<number>();
  private readonly subscriptions = new Subscription();

  protected readonly auditLogs = signal<number[]>([]);
  protected readonly debounceLogs = signal<number[]>([]);
  protected readonly rawLogs = signal<number[]>([]);
  protected readonly throttleLogs = signal<number[]>([]);
  protected readonly timeline = signal<OperatorLog[]>([]);

  protected readonly examples = [
    {
      description: 'Emit the latest value at the end of each time window.',
      name: 'auditTime',
      syntax: 'resize$.pipe(auditTime(700))',
    },
    {
      description: 'Wait until the source becomes quiet, then emit the latest value.',
      name: 'debounceTime',
      syntax: 'resize$.pipe(debounceTime(700))',
    },
    {
      description: 'Emit quickly, then ignore values during the time window.',
      name: 'throttleTime',
      syntax: 'resize$.pipe(throttleTime(700))',
    },
  ];

  constructor() {
    this.subscriptions.add(
      this.resizeEvents$.subscribe((value) => {
        this.rawLogs.update((logs) => [...logs, value]);
        this.addTimeline('raw', value);
      }),
    );

    this.subscriptions.add(
      this.resizeEvents$.pipe(auditTime(700)).subscribe((value) => {
        this.auditLogs.update((logs) => [...logs, value]);
        this.addTimeline('auditTime', value);
      }),
    );

    this.subscriptions.add(
      this.resizeEvents$.pipe(debounceTime(700)).subscribe((value) => {
        this.debounceLogs.update((logs) => [...logs, value]);
        this.addTimeline('debounceTime', value);
      }),
    );

    this.subscriptions.add(
      this.resizeEvents$.pipe(throttleTime(700)).subscribe((value) => {
        this.throttleLogs.update((logs) => [...logs, value]);
        this.addTimeline('throttleTime', value);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected emitOne(): void {
    this.value += 1;
    this.resizeEvents$.next(this.value);
  }

  protected emitBurst(): void {
    for (let index = 0; index < 6; index += 1) {
      window.setTimeout(() => this.emitOne(), index * 120);
    }
  }

  protected reset(): void {
    this.value = 0;
    this.auditLogs.set([]);
    this.debounceLogs.set([]);
    this.rawLogs.set([]);
    this.throttleLogs.set([]);
    this.timeline.set([]);
  }

  private addTimeline(operator: OperatorLog['operator'], value: number): void {
    this.timeline.update((logs) => [...logs, { operator, value }]);
  }
}
