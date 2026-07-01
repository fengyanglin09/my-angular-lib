import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

type CourseStatus = 'active' | 'archived';
type CourseFilter = 'active' | 'all' | 'archived';
type SortOrder = 'name' | 'recent';

interface Course {
  id: number;
  status: CourseStatus;
  title: string;
  updatedDaysAgo: number;
}

interface QueryState {
  filter: CourseFilter;
  search: string;
  sort: SortOrder;
}

const courses: Course[] = [
  { id: 1, status: 'active', title: 'Angular Router Fundamentals', updatedDaysAgo: 2 },
  { id: 2, status: 'active', title: 'RxJS Search Patterns', updatedDaysAgo: 5 },
  { id: 3, status: 'archived', title: 'Legacy Module Routing', updatedDaysAgo: 30 },
  { id: 4, status: 'active', title: 'Forms And Route State', updatedDaysAgo: 1 },
];

@Component({
  selector: 'app-lesson-03-query-params',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-03-query-params.html',
  styleUrl: './lesson-03-query-params.css',
})
export class Lesson03QueryParams {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private nextLogId = 2;

  protected readonly snapshotQuery = this.readQuery(this.route.snapshot.queryParamMap);
  protected readonly queryState = signal<QueryState>(this.snapshotQuery);
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: `snapshot.queryParamMap read ${this.formatQuery(this.snapshotQuery)} when the component was created.`,
    },
  ]);

  protected readonly visibleCourses = computed(() => {
    const query = this.queryState();
    const search = query.search.trim().toLowerCase();

    const filtered = courses.filter((course) => {
      const matchesFilter = query.filter === 'all' || course.status === query.filter;
      const matchesSearch = search.length === 0 || course.title.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (query.sort === 'name') {
        return a.title.localeCompare(b.title);
      }

      return a.updatedDaysAgo - b.updatedDaysAgo;
    });
  });

  protected readonly querySummary = computed(() => {
    const query = this.queryState();

    return `${query.filter} courses, sorted by ${query.sort}, search "${query.search || 'none'}"`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Query params are optional values after the question mark.',
      name: 'URL shape',
      syntax: `/angular-route-lessons/lesson-03-query-params?filter=active&sort=recent`,
    },
    {
      description: 'routerLink can set query params separately from the path.',
      name: 'query link',
      syntax: `<a
  [routerLink]="['/angular-route-lessons/lesson-03-query-params']"
  [queryParams]="{ filter: 'active', sort: 'recent' }"
>
  Active courses
</a>`,
    },
    {
      description: 'snapshot.queryParamMap reads the current URL values once.',
      name: 'snapshot read',
      syntax: `route.snapshot.queryParamMap.get('filter')`,
    },
    {
      description: 'queryParamMap emits when only the query string changes.',
      name: 'query stream',
      syntax: `route.queryParamMap.pipe(
  map((params) => params.get('filter')),
  distinctUntilChanged()
)`,
    },
  ];

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((params) => this.readQuery(params)),
        distinctUntilChanged(
          (previous, current) =>
            previous.filter === current.filter &&
            previous.search === current.search &&
            previous.sort === current.sort,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) => {
        this.queryState.set(query);
        this.addLog(`queryParamMap emitted ${this.formatQuery(query)}.`);
      });
  }

  protected queryParamsFor(partial: Partial<QueryState>): QueryState {
    return {
      ...this.queryState(),
      ...partial,
    };
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared. Change filters to see queryParamMap emit again.' }]);
    this.nextLogId = 2;
  }

  private readQuery(params: ParamMap): QueryState {
    return {
      filter: this.readFilter(params.get('filter')),
      search: params.get('search')?.trim() ?? '',
      sort: this.readSort(params.get('sort')),
    };
  }

  private readFilter(value: string | null): CourseFilter {
    if (value === 'active' || value === 'archived') {
      return value;
    }

    return 'all';
  }

  private readSort(value: string | null): SortOrder {
    if (value === 'name') {
      return 'name';
    }

    return 'recent';
  }

  private formatQuery(query: QueryState): string {
    return `filter="${query.filter}", sort="${query.sort}", search="${query.search || 'none'}"`;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
