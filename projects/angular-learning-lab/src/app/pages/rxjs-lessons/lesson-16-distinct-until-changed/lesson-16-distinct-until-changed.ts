import { Component, OnDestroy, signal } from '@angular/core';
import { distinctUntilChanged, map, Subject, Subscription } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface SearchFilters {
  category: 'all' | 'angular' | 'rxjs';
  page: number;
  sort: 'newest' | 'popular';
}

interface RequestLog {
  label: string;
  request: SearchFilters;
  skipped: boolean;
}

@Component({
  selector: 'app-lesson-16-distinct-until-changed',
  imports: [LearningNav],
  templateUrl: './lesson-16-distinct-until-changed.html',
  styleUrl: './lesson-16-distinct-until-changed.css',
})
export class Lesson16DistinctUntilChanged implements OnDestroy {
  private readonly filterChanges$ = new Subject<SearchFilters>();
  private readonly rawFilterChanges$ = new Subject<SearchFilters>();
  private readonly subscriptions = new Subscription();

  protected readonly distinctLogs = signal<RequestLog[]>([]);
  protected readonly rawLogs = signal<RequestLog[]>([]);

  protected readonly currentFilters = signal<SearchFilters>({
    category: 'all',
    page: 1,
    sort: 'newest',
  });

  protected readonly snippets = [
    {
      description: 'Primitive values use === comparison by default.',
      name: 'Route id',
      syntax: "routeId$.pipe(distinctUntilChanged())",
    },
    {
      description: 'Object values need a custom comparison function.',
      name: 'Filters',
      syntax: 'filters$.pipe(distinctUntilChanged((a, b) => sameFilters(a, b)))',
    },
    {
      description: 'Normalize first when casing or whitespace should not matter.',
      name: 'Search text',
      syntax: 'query$.pipe(map((q) => q.trim().toLowerCase()), distinctUntilChanged())',
    },
  ];

  constructor() {
    this.subscriptions.add(
      this.rawFilterChanges$.subscribe((request) => {
        this.rawLogs.update((logs) => [
          {
            label: 'Raw stream requested backend data.',
            request,
            skipped: false,
          },
          ...logs,
        ]);
      }),
    );

    this.subscriptions.add(
      this.filterChanges$
        .pipe(
          distinctUntilChanged((previous, current) =>
            this.sameFilters(previous, current),
          ),
        )
        .subscribe((request) => {
          this.distinctLogs.update((logs) => [
            {
              label: 'Distinct stream requested backend data.',
              request,
              skipped: false,
            },
            ...logs,
          ]);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected emitCurrentAgain(): void {
    this.emitFilters({
      ...this.currentFilters(),
    });

    this.distinctLogs.update((logs) => [
      {
        label: 'Duplicate filters were ignored by distinctUntilChanged.',
        request: this.currentFilters(),
        skipped: true,
      },
      ...logs,
    ]);
  }

  protected reset(): void {
    const initialFilters: SearchFilters = {
      category: 'all',
      page: 1,
      sort: 'newest',
    };

    this.currentFilters.set(initialFilters);
    this.distinctLogs.set([]);
    this.rawLogs.set([]);
  }

  protected setCategory(category: SearchFilters['category']): void {
    this.emitFilters({
      ...this.currentFilters(),
      category,
      page: 1,
    });
  }

  protected setPage(page: number): void {
    this.emitFilters({
      ...this.currentFilters(),
      page,
    });
  }

  protected setSort(sort: SearchFilters['sort']): void {
    this.emitFilters({
      ...this.currentFilters(),
      sort,
      page: 1,
    });
  }

  protected runPrimitiveExample(): void {
    const routeIds$ = new Subject<string>();
    const emittedValues: string[] = [];

    const subscription = routeIds$
      .pipe(
        map((id) => id.trim()),
        distinctUntilChanged(),
      )
      .subscribe((id) => emittedValues.push(id));

    routeIds$.next('project-101');
    routeIds$.next('project-101');
    routeIds$.next(' project-101 ');
    routeIds$.next('project-202');
    routeIds$.complete();
    subscription.unsubscribe();

    this.distinctLogs.update((logs) => [
      {
        label: `Primitive example emitted ${emittedValues.join(', ')}.`,
        request: this.currentFilters(),
        skipped: false,
      },
      ...logs,
    ]);
  }

  private emitFilters(filters: SearchFilters): void {
    this.currentFilters.set(filters);
    this.rawFilterChanges$.next(filters);
    this.filterChanges$.next(filters);
  }

  private sameFilters(previous: SearchFilters, current: SearchFilters): boolean {
    return (
      previous.category === current.category &&
      previous.page === current.page &&
      previous.sort === current.sort
    );
  }
}
