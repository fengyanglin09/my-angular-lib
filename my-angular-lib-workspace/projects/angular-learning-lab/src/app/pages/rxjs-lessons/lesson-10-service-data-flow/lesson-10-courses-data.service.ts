import { Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  concat,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

interface Course {
  category: CourseCategory;
  id: number;
  title: string;
}

type CourseCategory = 'all' | 'angular' | 'rxjs';

interface LoadCommand {
  label: string;
  shouldFail: boolean;
}

export interface CoursesViewModel {
  category: CourseCategory;
  courses: Course[];
  error: string | null;
  loading: boolean;
  source: string;
}

@Injectable()
export class Lesson10CoursesDataService {
  private readonly category$ = new BehaviorSubject<CourseCategory>('all');
  private readonly reload$ = new Subject<LoadCommand>();

  readonly logs = signal<string[]>([
    'Service is ready. The first async pipe subscription starts the stream.',
  ]);

  readonly vm$ = combineLatest([
    this.category$,
    this.reload$.pipe(
      startWith({ label: 'Initial load', shouldFail: false }),
    ),
  ]).pipe(
    switchMap(([category, command]) => {
      this.addLog(
        `Service received ${command.label} for category "${category}".`,
      );

      return concat(
        of<CoursesViewModel>({
          category,
          courses: [],
          error: null,
          loading: true,
          source: command.label,
        }),
        this.fetchCourses(category, command).pipe(
          map((courses) => ({
            category,
            courses,
            error: null,
            loading: false,
            source: command.label,
          })),
          catchError((error: Error) =>
            of<CoursesViewModel>({
              category,
              courses: [],
              error: error.message,
              loading: false,
              source: command.label,
            }),
          ),
        ),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  failNextLoad(): void {
    this.reload$.next({ label: 'Failing service reload', shouldFail: true });
  }

  reload(): void {
    this.reload$.next({ label: 'Manual service reload', shouldFail: false });
  }

  selectCategory(category: CourseCategory): void {
    this.category$.next(category);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }

  private fetchCourses(
    category: CourseCategory,
    command: LoadCommand,
  ): Observable<Course[]> {
    const allCourses: Course[] = [
      { category: 'angular', id: 1, title: 'Angular Component Streams' },
      { category: 'rxjs', id: 2, title: 'RxJS Service Data Flow' },
      { category: 'angular', id: 3, title: 'Template Async Pipe Patterns' },
      { category: 'rxjs', id: 4, title: 'Shared Observable View Models' },
    ];
    const filteredCourses =
      category === 'all'
        ? allCourses
        : allCourses.filter((course) => course.category === category);

    return new Observable<Course[]>((observer) => {
      let finished = false;

      this.addLog(`API request started by ${command.label}.`);

      const timerId = window.setTimeout(() => {
        if (command.shouldFail) {
          finished = true;
          observer.error(new Error('Service request failed.'));
          return;
        }

        finished = true;
        observer.next(filteredCourses);
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
