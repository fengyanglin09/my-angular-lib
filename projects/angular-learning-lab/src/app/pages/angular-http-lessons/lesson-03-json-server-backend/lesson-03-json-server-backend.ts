import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import {
  CourseDto,
  CreateCourseRequest,
  Lesson03JsonServerCoursesApi,
} from './lesson-03-json-server-courses-api';

interface RequestState {
  error: string | null;
  loading: boolean;
  method: string;
  response: CourseDto | CourseDto[] | null;
}

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-03-json-server-backend',
  imports: [FormsModule, JsonPipe, LearningNav],
  templateUrl: './lesson-03-json-server-backend.html',
  styleUrl: './lesson-03-json-server-backend.css',
})
export class Lesson03JsonServerBackend implements OnInit {
  private readonly coursesApi = inject(Lesson03JsonServerCoursesApi);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly category = signal('HTTP');
  protected readonly courses = signal<CourseDto[]>([]);
  protected readonly level = signal('Intermediate');
  protected readonly minutes = signal(30);
  protected readonly title = signal('Local JSON Server Course');

  protected readonly requestState = signal<RequestState>({
    error: null,
    loading: false,
    method: 'Waiting',
    response: null,
  });

  protected readonly logs = signal<string[]>([
    'Start the local backend with npm run mock-api, then click Load courses.',
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'JSON Server reads this file and exposes REST routes for the courses array.',
      name: 'Database file',
      syntax: `projects/angular-learning-lab/mock-api/db.json`,
    },
    {
      description: 'Run Angular on 4201 and the mock API on 3000 at the same time.',
      name: 'Start mock API',
      syntax: `npm run mock-api`,
    },
    {
      description: 'The Angular service uses real HttpClient methods against localhost:3000.',
      name: 'API service',
      syntax: `this.http.get<CourseDto[]>('http://localhost:3000/courses')
this.http.post<CourseDto>('http://localhost:3000/courses', draft)
this.http.patch<CourseDto>('http://localhost:3000/courses/1', patch)
this.http.delete<void>('http://localhost:3000/courses/1')`,
    },
  ];

  ngOnInit(): void {
    this.loadCourses();
  }

  protected createCourse(): void {
    const draft = this.buildDraft();
    this.setLoading('POST /courses');
    this.addLog(`POST requested for "${draft.title}".`);

    this.coursesApi.createCourse(draft)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (created) => {
          this.courses.update((courses) => [created, ...courses]);
          this.setSuccess('POST /courses', created);
          this.addLog(`POST succeeded. JSON Server returned id "${created.id}".`);
        },
        error: (error: HttpErrorResponse) => this.setFailure('POST /courses', error),
      });
  }

  protected deleteFirstCourse(): void {
    const firstCourse = this.courses()[0];

    if (!firstCourse) {
      this.addLog('DELETE skipped because no course is loaded.');
      return;
    }

    this.setLoading(`DELETE /courses/${firstCourse.id}`);
    this.addLog(`DELETE requested for "${firstCourse.title}".`);

    this.coursesApi.deleteCourse(firstCourse.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.courses.update((courses) => courses.filter((course) => course.id !== firstCourse.id));
          this.setSuccess(`DELETE /courses/${firstCourse.id}`, null);
          this.addLog(`DELETE succeeded for id "${firstCourse.id}".`);
        },
        error: (error: HttpErrorResponse) => this.setFailure(`DELETE /courses/${firstCourse.id}`, error),
      });
  }

  protected loadCourses(): void {
    this.setLoading('GET /courses');
    this.addLog('GET requested from JSON Server.');

    this.coursesApi.loadCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (courses) => {
          this.courses.set(courses);
          this.setSuccess('GET /courses', courses);
          this.addLog(`GET succeeded with ${courses.length} courses.`);
        },
        error: (error: HttpErrorResponse) => this.setFailure('GET /courses', error),
      });
  }

  protected setCategory(category: string): void {
    this.category.set(category);
  }

  protected setLevel(level: string): void {
    this.level.set(level);
  }

  protected setMinutes(minutes: string): void {
    this.minutes.set(Number(minutes));
  }

  protected setTitle(title: string): void {
    this.title.set(title);
  }

  protected updateFirstCourse(): void {
    const firstCourse = this.courses()[0];

    if (!firstCourse) {
      this.addLog('PATCH skipped because no course is loaded.');
      return;
    }

    const nextTitle = `${firstCourse.title} (updated)`;
    this.setLoading(`PATCH /courses/${firstCourse.id}`);
    this.addLog(`PATCH requested for "${firstCourse.title}".`);

    this.coursesApi.updateCourse(firstCourse.id, { title: nextTitle })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this.courses.update((courses) =>
            courses.map((course) => course.id === updated.id ? updated : course),
          );
          this.setSuccess(`PATCH /courses/${firstCourse.id}`, updated);
          this.addLog(`PATCH succeeded for id "${updated.id}".`);
        },
        error: (error: HttpErrorResponse) => this.setFailure(`PATCH /courses/${firstCourse.id}`, error),
      });
  }

  private buildDraft(): CreateCourseRequest {
    return {
      category: this.category().trim(),
      level: this.level().trim(),
      minutes: this.minutes(),
      title: this.title().trim(),
    };
  }

  private formatError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Could not reach http://localhost:3000. Run npm run mock-api in another terminal.';
    }

    return `${error.status} ${error.statusText || 'HTTP error'}`;
  }

  private setFailure(method: string, error: HttpErrorResponse): void {
    const message = this.formatError(error);
    this.requestState.set({
      error: message,
      loading: false,
      method,
      response: null,
    });
    this.addLog(`${method} failed: ${message}`);
  }

  private setLoading(method: string): void {
    this.requestState.set({
      error: null,
      loading: true,
      method,
      response: null,
    });
  }

  private setSuccess(method: string, response: CourseDto | CourseDto[] | null): void {
    this.requestState.set({
      error: null,
      loading: false,
      method,
      response,
    });
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }
}
