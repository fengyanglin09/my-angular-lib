import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CourseDto {
  category: string;
  id: string;
  level: string;
  minutes: number;
  title: string;
}

type ApiTarget = 'jsonServer' | 'staticAssets';

interface ConfigState {
  courses: CourseDto[];
  error: string | null;
  target: ApiTarget;
  url: string;
}

@Component({
  selector: 'app-lesson-10-api-configuration',
  imports: [JsonPipe, LearningNav],
  templateUrl: './lesson-10-api-configuration.html',
  styleUrl: './lesson-10-api-configuration.css',
})
export class Lesson10ApiConfiguration {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);

  protected readonly target = signal<ApiTarget>('staticAssets');
  protected readonly state = signal<ConfigState>({
    courses: [],
    error: null,
    target: 'staticAssets',
    url: '/http-lessons/courses.json',
  });

  protected readonly codeSteps = [
    {
      name: 'One place for URLs',
      syntax: `readonly apiBaseUrl =
  environment.apiBaseUrl;`,
    },
    {
      name: 'Build endpoint',
      syntax: `const url = apiBaseUrl + '/courses';`,
    },
    {
      name: 'Call from service',
      syntax: `return http.get<CourseDto[]>(url);`,
    },
  ];

  protected loadCourses(): void {
    const target = this.target();
    const url = this.createCoursesUrl(target);

    this.http.get<CourseDto[]>(url).pipe(
      map((courses) => ({
        courses,
        error: null,
        target,
        url,
      })),
      catchError((error: HttpErrorResponse) =>
        of({
          courses: [],
          error: this.formatHttpError(error),
          target,
          url,
        }),
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((state) => this.state.set(state));
  }

  protected useJsonServer(): void {
    this.target.set('jsonServer');
  }

  protected useStaticAssets(): void {
    this.target.set('staticAssets');
  }

  private createCoursesUrl(target: ApiTarget): string {
    if (target === 'jsonServer') {
      return 'http://localhost:3000/courses';
    }

    return '/http-lessons/courses.json';
  }

  private formatHttpError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Server unavailable. For JSON Server, run npm run mock-api.';
    }

    return `${error.status} ${error.statusText || 'HTTP error'}`;
  }
}
