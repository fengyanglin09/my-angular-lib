import { Component } from '@angular/core';

import type { PipeLesson } from '../angular-pipe-lessons.models';
import { PipeLessonPage } from '../pipe-lesson-page/pipe-lesson-page';
import { PipePerformanceDemo } from './pipe-performance-demo';

export const pipeLesson07 = {
  number: 7,
  route: 'lesson-07-performance-considerations',
  title: 'Performance Considerations',
  intro:
    'Pipes are convenient, but expensive transformations should be pure, cache-friendly, and fed with stable inputs.',
  keyPoints: [
    'Prefer pure pipes for display transformations.',
    'Avoid heavy work inside a pipe that receives constantly changing inputs.',
    'For expensive view models, computed signals or selectors may be a better home.',
  ],
  mentalModel: `pipe input changes
  pure pipe reruns

same inputs
  cached output

expensive transformation
  consider computed or selector`,
  demo: {
    title: 'Pure pipe caching behavior',
    before: 'A search summary pipe receives a course list and query.',
    after: 'It reruns only when the course reference or query changes.',
    actionLabel: 'Run performance pipe demo',
  },
  codeSteps: [
    {
      name: 'Pure pipe input',
      description: 'Pure pipes work best when inputs are stable and immutable.',
      syntax: `{{ courses | courseSearchSummary: query }}`,
    },
    {
      name: 'Avoid heavy repeated work',
      description:
        'If the input changes every render, the pipe cannot help much.',
      syntax: `// Avoid passing freshly-created arrays from template methods.`,
    },
    {
      name: 'Use a view model for bigger work',
      description:
        'Selectors or computed signals are often better for expensive derived state.',
      syntax: `filteredCourses = computed(() =>
  filterCourses(courses(), query()),
);`,
    },
  ],
} satisfies PipeLesson;

@Component({
  selector: 'app-pipe-lesson-07-performance-considerations',
  imports: [PipeLessonPage, PipePerformanceDemo],
  templateUrl: './lesson-07-performance-considerations.html',
  styleUrl: './lesson-07-performance-considerations.css',
})
export class PipeLesson07PerformanceConsiderations {
  protected readonly lesson = pipeLesson07;
}
