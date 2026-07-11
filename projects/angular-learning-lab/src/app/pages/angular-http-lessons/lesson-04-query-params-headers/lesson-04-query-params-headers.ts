import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import {
  CourseDto,
  CourseSearchQuery,
  CourseSearchResult,
  Lesson04CourseSearchApi,
} from './lesson-04-course-search-api';

interface SearchState {
  courses: CourseDto[];
  error: string | null;
  loading: boolean;
  request: CourseSearchResult | null;
}

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-04-query-params-headers',
  imports: [FormsModule, JsonPipe, LearningNav],
  templateUrl: './lesson-04-query-params-headers.html',
  styleUrl: './lesson-04-query-params-headers.css',
})
export class Lesson04QueryParamsHeaders {
  private readonly coursesApi = inject(Lesson04CourseSearchApi);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly category = signal('HTTP');
  protected readonly level = signal('All');
  protected readonly order = signal<'asc' | 'desc'>('asc');
  protected readonly page = signal(1);
  protected readonly pageSize = signal(4);
  protected readonly sort = signal<'minutes' | 'title'>('minutes');

  protected readonly state = signal<SearchState>({
    courses: [],
    error: null,
    loading: false,
    request: null,
  });

  protected readonly logs = signal<string[]>([
    'Run npm run mock-api, then click Search courses to send query params to the local backend.',
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'HttpParams is immutable. Each set returns a new params object.',
      name: 'Build params',
      syntax: `let params = new HttpParams()
  .set('_page', page)
  .set('_per_page', pageSize)
  .set('_sort', sort)
  .set('_order', order);

params = params.set('category', category);`,
    },
    {
      description: 'Headers are extra request metadata. They do not appear in the URL.',
      name: 'Build headers',
      syntax: `const headers = new HttpHeaders()
  .set('X-Lesson-Request-Id', requestId)
  .set('X-Lesson-Client', 'angular-learning-lab');`,
    },
    {
      description: 'observe: response returns status, headers, URL, and body.',
      name: 'Send request',
      syntax: `this.http.get<CourseDto[]>(url, {
  params,
  headers,
  observe: 'response',
});`,
    },
  ];

  protected searchCourses(): void {
    const query = this.createQuery();
    this.state.update((state) => ({
      ...state,
      error: null,
      loading: true,
      request: null,
    }));
    this.addLog(`GET requested with category=${query.category}, level=${query.level}, page=${query.page}.`);

    this.coursesApi.searchCourses(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.state.set({
            courses: result.courses,
            error: null,
            loading: false,
            request: result,
          });
          this.addLog(`Response ${result.status}: ${result.courses.length} courses returned.`);
        },
        error: (error: HttpErrorResponse) => {
          const message = this.formatError(error);
          this.state.set({
            courses: [],
            error: message,
            loading: false,
            request: null,
          });
          this.addLog(`Request failed: ${message}`);
        },
      });
  }

  protected setCategory(category: string): void {
    this.category.set(category);
    this.page.set(1);
  }

  protected setLevel(level: string): void {
    this.level.set(level);
    this.page.set(1);
  }

  protected setOrder(order: 'asc' | 'desc'): void {
    this.order.set(order);
  }

  protected setPage(page: string): void {
    this.page.set(Number(page));
  }

  protected setPageSize(pageSize: string): void {
    this.pageSize.set(Number(pageSize));
    this.page.set(1);
  }

  protected setSort(sort: 'minutes' | 'title'): void {
    this.sort.set(sort);
  }

  private createQuery(): CourseSearchQuery {
    return {
      category: this.category(),
      level: this.level(),
      order: this.order(),
      page: this.page(),
      pageSize: this.pageSize(),
      sort: this.sort(),
    };
  }

  private formatError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Could not reach http://localhost:3000. Run npm run mock-api in another terminal.';
    }

    return `${error.status} ${error.statusText || 'HTTP error'}`;
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }
}
