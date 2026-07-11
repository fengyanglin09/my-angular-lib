import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';

@Component({
  selector: 'app-dependency-injection-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './dependency-injection-lesson-page.html',
  styleUrl: './dependency-injection-lesson-page.css',
})
export class DependencyInjectionLessonPage {
  readonly lesson = input.required<DependencyInjectionLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No DI lookup yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'DI demo'
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
