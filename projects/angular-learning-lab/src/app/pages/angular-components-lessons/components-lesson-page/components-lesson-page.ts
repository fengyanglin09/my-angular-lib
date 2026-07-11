import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { ComponentLesson } from '../angular-components-lessons.models';

@Component({
  selector: 'app-components-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './components-lesson-page.html',
  styleUrl: './components-lesson-page.css',
})
export class ComponentsLessonPage {
  readonly lesson = input.required<ComponentLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No demo action yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'Demo action'
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
