import { Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  concat, debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap, tap,
} from 'rxjs';

interface Course {
  id: number;
  owner: string;
  title: string;
}

interface CourseDataState {
  courses: Course[];
  error: string | null;
  loading: boolean;
}

interface LoadCommand {
  label: string;
  shouldFail: boolean;
}

export interface CoursesFacadeViewModel {
  courses: Course[];
  error: string | null;
  loading: boolean;
  resultCount: number;
  search: string;
  selectedCourse: Course | null;
}

@Injectable()
export class Lesson11CoursesFacade {
  private readonly reload$ = new Subject<LoadCommand>();
  private readonly search$ = new BehaviorSubject('');
  private readonly selectedCourseId$ = new BehaviorSubject<number | null>(null);

  readonly logs = signal<string[]>([
    'Facade is ready. The template subscribes to vm$ with async pipe.',
  ]);

  private readonly dataState$ = this.reload$.pipe(
    startWith({ label: 'Initial facade load', shouldFail: false }),
    switchMap((command) => {
      this.addLog(`${command.label} requested.`);

      return concat(
        of<CourseDataState>({
          courses: [],
          error: null,
          loading: true,
        }),
        this.fetchCourses(command).pipe(
          map((courses) => ({
            courses,
            error: null,
            loading: false,
          })),
          catchError((error: Error) =>
            of<CourseDataState>({
              courses: [],
              error: error.message,
              loading: false,
            }),
          ),
        ),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly vm$ = combineLatest([
    this.dataState$,
    this.search$,
    this.selectedCourseId$,
  ]).pipe(

    map(([dataState, search, selectedCourseId]) => {
      const normalizedSearch = search.trim().toLowerCase();
      const courses =
        normalizedSearch.length === 0
          ? dataState.courses
          : dataState.courses.filter((course) =>
              course.title.toLowerCase().includes(normalizedSearch),
            );
      const selectedCourse =
        courses.find((course) => course.id === selectedCourseId) ?? null;

      return {
        courses,
        error: dataState.error,
        loading: dataState.loading,
        resultCount: courses.length,
        search,
        selectedCourse,
      };
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  reload(): void {
    this.reload$.next({ label: 'Manual facade reload', shouldFail: false });
  }

  reloadWithFailure(): void {
    this.reload$.next({ label: 'Failing facade reload', shouldFail: true });
  }

  selectCourse(courseId: number): void {
    this.selectedCourseId$.next(courseId);
    this.addLog(`Selected course ${courseId}.`);
  }

  setSearch(search: string): void {
    this.search$.next(search);
    this.addLog(`Search changed to "${search}".`);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private fetchCourses(command: LoadCommand): Observable<Course[]> {
    const courses: Course[] = [
      { id: 101, owner: 'Angular', title: 'Component Facade Basics' },
      { id: 102, owner: 'RxJS', title: 'Local Store With BehaviorSubject' },
      { id: 103, owner: 'Angular', title: 'Template View Models' },
      { id: 104, owner: 'RxJS', title: 'Shared Facade Streams' },
    ];

    return new Observable<Course[]>((observer) => {
      let finished = false;

      this.addLog(`API request started for ${command.label}.`);

      const timerId = window.setTimeout(() => {
        if (command.shouldFail) {
          finished = true;
          observer.error(new Error('Facade backend request failed.'));
          return;
        }

        finished = true;
        observer.next(courses);
        observer.complete();
      }, 650);

      return () => {
        window.clearTimeout(timerId);

        if (!finished) {
          this.addLog(`API request canceled for ${command.label}.`);
        }
      };
    });
  }
}
