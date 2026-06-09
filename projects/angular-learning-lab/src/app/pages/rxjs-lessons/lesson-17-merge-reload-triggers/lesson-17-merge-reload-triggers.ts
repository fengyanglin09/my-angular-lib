import { Component, OnDestroy, signal } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type ReloadSource = 'manual refresh' | 'route change' | 'save success';

interface ReloadEvent {
  detail: string;
  source: ReloadSource;
}

interface ReloadLog extends ReloadEvent {
  id: number;
  loadedAt: string;
}

@Component({
  selector: 'app-lesson-17-merge-reload-triggers',
  imports: [LearningNav],
  templateUrl: './lesson-17-merge-reload-triggers.html',
  styleUrl: './lesson-17-merge-reload-triggers.css',
})
export class Lesson17MergeReloadTriggers implements OnDestroy {
  private nextRequestId = 1;
  private readonly manualRefresh$ = new Subject<ReloadEvent>();
  private readonly routeChange$ = new Subject<ReloadEvent>();
  private readonly saveSuccess$ = new Subject<ReloadEvent>();
  private readonly subscription: Subscription;

  protected readonly logs = signal<ReloadLog[]>([]);
  protected readonly lastLoadedSource = signal('No reload yet');

  protected readonly examples = [
    {
      description: 'A Refresh button should reload the current screen.',
      name: 'Manual refresh',
      stream: 'manualRefresh$',
    },
    {
      description: 'A new route param should reload the same screen with new data.',
      name: 'Route change',
      stream: 'routeChange$',
    },
    {
      description: 'A successful save may need to reload a fresh server version.',
      name: 'Save success',
      stream: 'saveSuccess$',
    },
  ];

  constructor() {
    this.subscription = merge(
      this.manualRefresh$,
      this.routeChange$,
      this.saveSuccess$,
    ).subscribe((event) => this.reloadDashboard(event));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected manualRefresh(): void {
    this.manualRefresh$.next({
      detail: 'User clicked Refresh.',
      source: 'manual refresh',
    });
  }

  protected routeChanged(projectId: string): void {
    this.routeChange$.next({
      detail: `Route changed to project ${projectId}.`,
      source: 'route change',
    });
  }

  protected saveSucceeded(): void {
    this.saveSuccess$.next({
      detail: 'Save completed and server data may have changed.',
      source: 'save success',
    });
  }

  protected reset(): void {
    this.nextRequestId = 1;
    this.lastLoadedSource.set('No reload yet');
    this.logs.set([]);
  }

  private reloadDashboard(event: ReloadEvent): void {
    const loadedAt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

    this.lastLoadedSource.set(event.source);
    this.logs.update((logs) => [
      {
        ...event,
        id: this.nextRequestId,
        loadedAt,
      },
      ...logs,
    ]);
    this.nextRequestId += 1;
  }
}
