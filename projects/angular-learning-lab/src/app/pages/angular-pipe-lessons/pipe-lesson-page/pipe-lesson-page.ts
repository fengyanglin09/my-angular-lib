import { JsonPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import type { PipeLesson } from '../angular-pipe-lessons.models';

@Component({
  selector: 'app-pipe-lesson-page',
  imports: [JsonPipe, LearningNav],
  templateUrl: './pipe-lesson-page.html',
  styleUrl: './pipe-lesson-page.css',
})
export class PipeLessonPage {
  readonly lesson = input.required<PipeLesson>();

  protected readonly demoState = signal({
    count: 0,
    lastAction: 'No pipe demo action yet.',
  });

  protected runDemoAction(): void {
    const lesson = this.lesson();

    this.demoState.update((state) => ({
      count: state.count + 1,
      lastAction: `Lesson ${lesson.number}: ${
        lesson.demo?.actionLabel ?? 'Pipe demo action'
      } ran.`,
    }));
  }

  protected resetDemo(): void {
    this.demoState.set({
      count: 0,
      lastAction: 'Pipe demo reset.',
    });
  }
}
