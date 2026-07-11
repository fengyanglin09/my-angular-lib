import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { DirectiveLesson } from '../angular-directive-lessons.models';

@Component({
  selector: 'app-directive-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './directive-lesson-page.html',
  styleUrl: './directive-lesson-page.css',
})
export class DirectiveLessonPage {
  readonly lesson = input.required<DirectiveLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No directive demo action yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'Directive demo action'
      } ran.`,
    }));
  }

  protected resetDemo(): void {
    this.demoState.set({
      count: 0,
      lastAction: 'Directive demo reset.',
    });
  }
}
