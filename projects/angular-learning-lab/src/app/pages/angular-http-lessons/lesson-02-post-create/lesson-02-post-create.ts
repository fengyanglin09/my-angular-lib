import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CourseDto, CreateCourseRequest, Lesson02CoursesApi } from './lesson-02-courses-api';

interface SaveState {
  error: string | null;
  lastCreated: CourseDto | null;
  saving: boolean;
}

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-02-post-create',
  imports: [FormsModule, JsonPipe, LearningNav],
  templateUrl: './lesson-02-post-create.html',
  styleUrl: './lesson-02-post-create.css',
})
export class Lesson02PostCreate implements OnInit {
  private readonly coursesApi = inject(Lesson02CoursesApi);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly category = signal('Angular');
  protected readonly courses = signal<CourseDto[]>([]);
  protected readonly level = signal('Beginner');
  protected readonly minutes = signal(25);
  protected readonly title = signal('HTTP POST Create');

  protected readonly saveState = signal<SaveState>({
    error: null,
    lastCreated: null,
    saving: false,
  });

  protected readonly logs = signal<string[]>([
    'The fake API keeps data in memory while the app is running.',
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The browser sends a request body with only the fields needed to create a course.',
      name: 'Create request',
      syntax: `interface CreateCourseRequest {
  title: string;
  category: string;
  level: string;
  minutes: number;
}`,
    },
    {
      description: 'In a real backend app, the API service would call HttpClient.post.',
      name: 'Real POST shape',
      syntax: `createCourse(draft: CreateCourseRequest) {
  return this.http.post<CourseDto>('/api/courses', draft);
}`,
    },
    {
      description: 'This lesson uses an in-memory fake API, so the returned object acts like the server response.',
      name: 'Returned DTO',
      syntax: `{
  id: 203,
  title: 'HTTP POST Create',
  category: 'Angular',
  level: 'Beginner',
  minutes: 25
}`,
    },
  ];

  ngOnInit(): void {
    this.loadCourses('Initial list loaded from fake API.');
  }

  protected createCourse(shouldFail = false): void {
    if (this.saveState().saving) {
      return;
    }

    const draft = this.buildDraft();
    this.saveState.set({
      error: null,
      lastCreated: null,
      saving: true,
    });
    this.addLog(`POST create requested for "${draft.title}".`);

    this.coursesApi.createCourse(draft, shouldFail)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (created) => {
          this.courses.update((courses) => [created, ...courses]);
          this.saveState.set({
            error: null,
            lastCreated: created,
            saving: false,
          });
          this.addLog(`Fake API returned created course #${created.id}.`);
        },
        error: (error: Error) => {
          this.saveState.set({
            error: error.message,
            lastCreated: null,
            saving: false,
          });
          this.addLog(`Create failed: ${error.message}`);
        },
      });
  }

  protected reset(): void {
    this.coursesApi.reset()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((courses) => {
        this.courses.set(courses);
        this.saveState.set({
          error: null,
          lastCreated: null,
          saving: false,
        });
        this.addLog('Fake API data reset to the starting list.');
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

  private buildDraft(): CreateCourseRequest {
    return {
      category: this.category().trim(),
      level: this.level().trim(),
      minutes: this.minutes(),
      title: this.title().trim(),
    };
  }

  private loadCourses(message: string): void {
    this.coursesApi.listCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((courses) => {
        this.courses.set(courses);
        this.addLog(message);
      });
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }
}
