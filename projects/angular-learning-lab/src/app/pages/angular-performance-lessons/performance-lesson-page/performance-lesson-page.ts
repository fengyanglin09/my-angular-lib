import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { PerformanceLesson } from '../angular-performance-lessons.models';

@Component({
  selector: 'app-performance-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './performance-lesson-page.html',
  styleUrl: './performance-lesson-page.css',
})
export class PerformanceLessonPage {
  readonly lesson = input.required<PerformanceLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No performance demo action yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'Performance demo'
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
