import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { Lesson11CoursesFacade } from './lesson-11-courses-facade.service';

interface FacadeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-11-component-facade',
  imports: [AsyncPipe, FormsModule, LearningNav],
  providers: [Lesson11CoursesFacade],
  templateUrl: './lesson-11-component-facade.html',
  styleUrl: './lesson-11-component-facade.css',
})
export class Lesson11ComponentFacade {
  protected readonly facade = inject(Lesson11CoursesFacade);

  protected readonly steps: FacadeStep[] = [
    {
      description:
        'The component exposes user intent through method calls.',
      name: 'component API',
      syntax: 'facade.setSearch(value)',
    },
    {
      description:
        'The facade combines backend state and local UI state.',
      name: 'local store',
      syntax: 'combineLatest([dataState$, search$, selectedId$])',
    },
    {
      description:
        'The template gets one stream with everything needed to render.',
      name: 'view model',
      syntax: 'facade.vm$ | async',
    },
  ];
}
