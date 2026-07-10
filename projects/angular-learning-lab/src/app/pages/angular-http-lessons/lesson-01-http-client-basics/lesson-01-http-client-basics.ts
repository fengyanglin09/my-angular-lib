import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { catchError, concat, map, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CourseDto, Lesson01CoursesApi } from './lesson-01-courses-api';

interface CoursesState {
  courses: CourseDto[];
  error: string | null;
  loading: boolean;
  source: string;
}

interface LoadRequest {
  label: string;
  shouldFail: boolean;
}

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-01-http-client-basics',
  imports: [AsyncPipe, JsonPipe, LearningNav],
  templateUrl: './lesson-01-http-client-basics.html',
  styleUrl: './lesson-01-http-client-basics.css',
})
export class Lesson01HttpClientBasics implements OnDestroy {
  private readonly coursesApi = inject(Lesson01CoursesApi);
  private readonly reload$ = new Subject<LoadRequest>();

  protected readonly logs = signal<string[]>([
    'The async pipe subscribes to coursesState$, which triggers the initial HTTP request.',
  ]);

  protected readonly coursesState$ = this.reload$.pipe(
    startWith({ label: 'Initial load', shouldFail: false }),
    switchMap((request) => {
      this.addLog(`${request.label}: load request entered the stream.`);

      return concat(
        of<CoursesState>({
          courses: [],
          error: null,
          loading: true,
          source: request.label,
        }),
        this.coursesApi.loadCourses(request.shouldFail).pipe(
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

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Register Angular HTTP once so services can inject HttpClient.',
      name: 'App provider',
      syntax: `provideHttpClient()`,
    },
    {
      description: 'Use a typed API service method instead of putting URLs directly in the component.',
      name: 'API service',
      syntax: `loadCourses(): Observable<CourseDto[]> {
  return this.http.get<CourseDto[]>('/http-lessons/courses.json');
}`,
    },
    {
      description: 'Convert success and failure into one view-friendly state object.',
      name: 'View state',
      syntax: `http.get<CourseDto[]>(url).pipe(
  map((courses) => ({ loading: false, courses, error: null })),
  catchError((error) => of({ loading: false, courses: [], error })),
)`,
    },
  ];

  ngOnDestroy(): void {
    this.reload$.complete();
  }

  protected loadCourses(): void {
    this.reload$.next({ label: 'Manual successful load', shouldFail: false });
  }

  protected loadFailure(): void {
    this.reload$.next({ label: 'Failing load', shouldFail: true });
  }

  protected clearLogs(): void {
    this.logs.set(['Log cleared. Load courses again to watch the HTTP flow.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }
}
