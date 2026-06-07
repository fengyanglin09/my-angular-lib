import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { LessonProgressItem } from './lesson-progress.models';

const progress: LessonProgressItem[] = [
  {
    id: 1,
    lesson: 'Lesson 12',
    topic: 'Router Store selectors',
    complete: true,
  },
  {
    id: 2,
    lesson: 'Lesson 13',
    topic: 'Safe component subscriptions',
    complete: true,
  },
  {
    id: 3,
    lesson: 'Lesson 14',
    topic: 'Route-driven effects',
    complete: false,
  },
  {
    id: 4,
    lesson: 'Lesson 15',
    topic: 'Lazy feature registration',
    complete: false,
  },
];

@Injectable({ providedIn: 'root' })
export class LessonProgressApi {
  loadProgress(): Observable<LessonProgressItem[]> {
    return of(structuredClone(progress)).pipe(delay(550));
  }
}
