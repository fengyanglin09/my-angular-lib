import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, retry, timer } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CourseDto {
  category: string;
  id: string;
  level: string;
  minutes: number;
  title: string;
}

interface LoadState {
  courses: CourseDto[];
  error: string | null;
  loading: boolean;
  source: string;
}

@Component({
  selector: 'app-lesson-05-error-retry',
  imports: [JsonPipe, LearningNav],
  templateUrl: './lesson-05-error-retry.html',
  styleUrl: './lesson-05-error-retry.css',
})
export class Lesson05ErrorRetry {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);

  protected readonly state = signal<LoadState>({
    courses: [],
    error: null,
    loading: false,
    source: 'Waiting',
  });

  protected readonly logs = signal<string[]>([
    'Click a button to compare success, HTTP failure, and retry behavior.',
  ]);

  protected readonly codeSteps = [
    {
      name: 'Retry transient failures',
      syntax: `http.get<CourseDto[]>(url).pipe(
  retry({
    count: 2,
    delay: () => timer(500),
  }),
)`,
    },
    {
      name: 'Map errors into UI state',
      syntax: `catchError((error: HttpErrorResponse) =>
  of({
    courses: [],
    error: formatHttpError(error),
    loading: false,
  }),
)`,
    },
    {
      name: 'Do not retry everything',
      syntax: `Retry can help flaky network calls.
It usually does not fix validation errors,
bad URLs, or permission failures.`,
    },
  ];

  protected loadFailureWithRetry(): void {
    this.loadCourses('/http-lessons/missing-courses.json', 'Failing load with retry');
  }

  protected loadSuccess(): void {
    this.loadCourses('/http-lessons/courses.json', 'Successful load');
  }

  private loadCourses(url: string, source: string): void {
    this.state.set({
      courses: [],
      error: null,
      loading: true,
      source,
    });
    this.addLog(`${source}: request started.`);

    this.http.get<CourseDto[]>(url).pipe(
      retry({
        count: 2,
        delay: (_error, retryIndex) => {
          this.addLog(`${source}: retry #${retryIndex} scheduled.`);
          return timer(500);
        },
      }),
      map((courses) => ({
        courses,
        error: null,
        loading: false,
        source,
      })),
      catchError((error: HttpErrorResponse) =>
        of({
          courses: [],
          error: this.formatHttpError(error),
          loading: false,
          source,
        }),
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((nextState) => {
      this.state.set(nextState);
      this.addLog(
        nextState.error
          ? `${source}: request ended with ${nextState.error}.`
          : `${source}: loaded ${nextState.courses.length} courses.`,
      );
    });
  }

  private formatHttpError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Network error or server unavailable';
    }

    return `${error.status} ${error.statusText || 'HTTP error'}`;
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }
}
