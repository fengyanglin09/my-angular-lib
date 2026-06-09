import { Component, OnDestroy, signal } from '@angular/core';
import { bufferTime, filter, Subject, Subscription } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface AnalyticsEvent {
  id: number;
  label: string;
}

interface SentBatch {
  events: AnalyticsEvent[];
  id: number;
  sentAt: string;
}

@Component({
  selector: 'app-lesson-20-buffer-time',
  imports: [LearningNav],
  templateUrl: './lesson-20-buffer-time.html',
  styleUrl: './lesson-20-buffer-time.css',
})
export class Lesson20BufferTime implements OnDestroy {
  private nextBatchId = 1;
  private nextEventId = 1;
  private readonly analyticsEvents$ = new Subject<AnalyticsEvent>();
  private readonly subscription: Subscription;

  protected readonly pendingEvents = signal<AnalyticsEvent[]>([]);
  protected readonly sentBatches = signal<SentBatch[]>([]);

  protected readonly examples = [
    {
      description: 'Send analytics clicks every few seconds instead of one by one.',
      name: 'Analytics',
      syntax: 'clicks$.pipe(bufferTime(2000))',
    },
    {
      description: 'Collect log entries and send them to the server in batches.',
      name: 'Logs',
      syntax: 'logs$.pipe(bufferTime(5000), filter((batch) => batch.length > 0))',
    },
    {
      description: 'Batch small websocket or autosave patches before saving.',
      name: 'Patches',
      syntax: 'patches$.pipe(bufferTime(1000))',
    },
  ];

  constructor() {
    this.subscription = this.analyticsEvents$
      .pipe(
        bufferTime(2000),
        filter((events) => events.length > 0),
      )
      .subscribe((events) => {
        this.sentBatches.update((batches) => [
          {
            events,
            id: this.nextBatchId,
            sentAt: this.currentTime(),
          },
          ...batches,
        ]);
        this.pendingEvents.update((pending) =>
          pending.filter((event) => !events.some((sent) => sent.id === event.id)),
        );
        this.nextBatchId += 1;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected emitEvent(label: string): void {
    const event: AnalyticsEvent = {
      id: this.nextEventId,
      label,
    };

    this.nextEventId += 1;
    this.pendingEvents.update((events) => [...events, event]);
    this.analyticsEvents$.next(event);
  }

  protected emitBurst(): void {
    ['Open menu', 'View lesson', 'Click example', 'Close panel'].forEach(
      (label, index) => {
        window.setTimeout(() => this.emitEvent(label), index * 180);
      },
    );
  }

  protected reset(): void {
    this.nextBatchId = 1;
    this.nextEventId = 1;
    this.pendingEvents.set([]);
    this.sentBatches.set([]);
  }

  private currentTime(): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());
  }
}
