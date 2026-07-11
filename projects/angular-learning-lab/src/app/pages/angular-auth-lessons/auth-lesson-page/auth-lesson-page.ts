import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { AuthLesson } from '../angular-auth-lessons.models';

@Component({
  selector: 'app-auth-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './auth-lesson-page.html',
  styleUrl: './auth-lesson-page.css',
})
export class AuthLessonPage {
  readonly lesson = input.required<AuthLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No auth demo action yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'Auth demo'
      } ran.`,
    }));
  }

  protected resetDemo(): void {
    this.demoState.set({
      count: 0,
      lastAction: 'Demo reset.',
    });
  }
}
