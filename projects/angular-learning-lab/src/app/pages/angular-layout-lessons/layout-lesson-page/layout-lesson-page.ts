import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { LayoutLesson } from '../angular-layout-lessons.models';

@Component({
  selector: 'app-layout-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './layout-lesson-page.html',
  styleUrl: './layout-lesson-page.css',
})
export class LayoutLessonPage {
  readonly lesson = input.required<LayoutLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No layout demo action yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'Layout demo'
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
