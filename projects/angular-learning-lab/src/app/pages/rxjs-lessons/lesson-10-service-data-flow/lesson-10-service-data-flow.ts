import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { Lesson10CoursesDataService } from './lesson-10-courses-data.service';

interface ServicePatternStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-10-service-data-flow',
  imports: [AsyncPipe, LearningNav],
  providers: [Lesson10CoursesDataService],
  templateUrl: './lesson-10-service-data-flow.html',
  styleUrl: './lesson-10-service-data-flow.css',
})
export class Lesson10ServiceDataFlow {
  protected readonly coursesData = inject(Lesson10CoursesDataService);

  protected readonly steps: ServicePatternStep[] = [
    {
      description:
        'The component asks for actions; the service owns the stream details.',
      name: 'service methods',
      syntax: 'coursesData.reload()',
    },
    {
      description:
        'The service exposes one template-friendly view-model stream.',
      name: 'vm$',
      syntax: 'readonly vm$ = combineLatest(...).pipe(...)',
    },
    {
      description:
        'Providing the service at the lesson component level gives this page its own instance.',
      name: 'scoped provider',
      syntax: 'providers: [Lesson10CoursesDataService]',
    },
  ];
}
