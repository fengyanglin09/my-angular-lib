import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, delay, distinctUntilChanged, map, of, Subject, switchMap, tap } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CourseDto {
  category: string;
  id: string;
  level: string;
  minutes: number;
  title: string;
}

interface SearchState {
  courses: CourseDto[];
  error: string | null;
  loading: boolean;
  query: string;
}

@Component({
  selector: 'app-lesson-06-cancellation-switchmap',
  imports: [FormsModule, JsonPipe, LearningNav],
  templateUrl: './lesson-06-cancellation-switchmap.html',
  styleUrl: './lesson-06-cancellation-switchmap.css',
})
export class Lesson06CancellationSwitchmap implements OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  private readonly searchTerms$ = new Subject<string>();

  protected readonly query = signal('');
  protected readonly state = signal<SearchState>({
    courses: [],
    error: null,
    loading: false,
    query: '',
  });
  protected readonly logs = signal<string[]>([
    'Type quickly. switchMap keeps the newest search and cancels the older inner stream.',
  ]);

  protected readonly codeSteps = [
    {
      name: 'User input stream',
      syntax: `searchTerms$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
)`,
    },
    {
      name: 'Newest request wins',
      syntax: `switchMap((query) =>
  http.get<CourseDto[]>(url).pipe(
    map((courses) => filterCourses(courses, query)),
  ),
)`,
    },
    {
      name: 'Angular cleanup',
      syntax: `takeUntilDestroyed(this.destroyRef)`,
    },
  ];

  constructor() {
    this.searchTerms$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((query) => {
        this.state.update((state) => ({
          ...state,
          error: null,
          loading: query.trim().length > 0,
          query,
        }));
        this.addLog(`Search settled on "${query || 'empty'}".`);
      }),
      switchMap((query) => {
        if (query.trim().length === 0) {
          return of<CourseDto[]>([]);
        }

        this.addLog(`HTTP search started for "${query}".`);

        return this.http.get<CourseDto[]>('/http-lessons/courses.json').pipe(
          delay(650),
          map((courses) => this.filterCourses(courses, query)),
          catchError(() => of<CourseDto[]>([])),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((courses) => {
      this.state.update((state) => ({
        ...state,
        courses,
        loading: false,
      }));
      this.addLog(`Search rendered ${courses.length} results.`);
    });
  }

  ngOnDestroy(): void {
    this.searchTerms$.complete();
  }

  protected setQuery(query: string): void {
    this.query.set(query);
    this.searchTerms$.next(query);
  }

  protected runFastSequence(): void {
    ['h', 'ht', 'http'].forEach((query, index) => {
      window.setTimeout(() => this.setQuery(query), index * 140);
    });
  }

  private filterCourses(courses: CourseDto[], query: string): CourseDto[] {
    const normalized = query.trim().toLowerCase();

    return courses.filter((course) =>
      `${course.title} ${course.category} ${course.level}`.toLowerCase().includes(normalized),
    );
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }
}
