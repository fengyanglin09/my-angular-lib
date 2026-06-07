import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import {
  catchError,
  concat,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface Course {
  id: number;
  level: string;
  title: string;
}

interface DataFlowStep {
  description: string;
  name: string;
  syntax: string;
}

interface LoadRequest {
  label: string;
  shouldFail: boolean;
}

interface CoursesState {
  courses: Course[];
  error: string | null;
  loading: boolean;
  source: string;
}

@Component({
  selector: 'app-lesson-09-http-data-flow',
  imports: [AsyncPipe, LearningNav],
  templateUrl: './lesson-09-http-data-flow.html',
  styleUrl: './lesson-09-http-data-flow.css',
})
export class Lesson09HttpDataFlow implements OnDestroy {
  private readonly reload$ = new Subject<LoadRequest>();

  protected readonly logs = signal<string[]>([
    'The first async pipe subscription starts the initial load.',
  ]);

  protected readonly coursesState$ = this.reload$.pipe(
    startWith({ label: 'Initial load', shouldFail: false }),
    switchMap((request) => {
      this.addLog(`${request.label} requested.`);

      return concat(
        of<CoursesState>({
          courses: [],
          error: null,
          loading: true,
          source: request.label,
        }),
        this.fetchCourses(request).pipe(
          map((courses) => ({
            courses,
            error: null,
            loading: false,
            source: request.label,
          })),
          catchError((error: Error) =>
            of<CoursesState>({
              courses: [],
              error: error.message,
              loading: false,
              source: request.label,
            }),
          ),
        ),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly steps: DataFlowStep[] = [
    {
      description:
        'Turns button clicks or route changes into a fresh backend request.',
      name: 'reload Subject',
      syntax: 'reload$.next({ shouldFail: false })',
    },
    {
      description:
        'Cancels the previous request when a newer reload request arrives.',
      name: 'switchMap',
      syntax: 'reload$.pipe(switchMap(() => http$))',
    },
    {
      description:
        'Lets multiple async pipes reuse one request result instead of refetching.',
      name: 'shareReplay',
      syntax: 'shareReplay({ bufferSize: 1, refCount: true })',
    },
  ];

  ngOnDestroy(): void {
    this.reload$.complete();
  }

  protected reloadSuccess(): void {
    this.reload$.next({ label: 'Manual reload', shouldFail: false });
  }

  protected reloadFailure(): void {
    this.reload$.next({ label: 'Failing reload', shouldFail: true });
  }

  protected reloadTwiceQuickly(): void {
    this.reload$.next({ label: 'Slow reload', shouldFail: false });

    window.setTimeout(() => {
      this.reload$.next({ label: 'Newer reload', shouldFail: false });
    }, 180);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private fetchCourses(request: LoadRequest): Observable<Course[]> {
    const courses: Course[] = [
      { id: 1, level: 'Beginner', title: 'Observable Mental Model' },
      { id: 2, level: 'Intermediate', title: 'HTTP Streams In Angular' },
      { id: 3, level: 'Intermediate', title: 'State From Streams' },
    ];
    const delayMs = request.label === 'Slow reload' ? 1100 : 700;

    return new Observable<Course[]>((observer) => {
      let finished = false;

      this.addLog(`API request started for ${request.label}.`);

      const timerId = window.setTimeout(() => {
        if (request.shouldFail) {
          finished = true;
          observer.error(new Error('The backend returned a course loading error.'));
          return;
        }

        finished = true;
        observer.next(courses);
        observer.complete();
      }, delayMs);

      return () => {
        window.clearTimeout(timerId);

        if (!finished) {
          this.addLog(`API request canceled for ${request.label}.`);
        }
      };
    });
  }
}
