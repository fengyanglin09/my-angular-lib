import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LessonProgressItem } from './lesson-progress.models';

export const LessonProgressActions = createActionGroup({
  source: 'Lazy Feature Lesson',
  events: {
    'Load Progress': emptyProps(),
    'Load Progress Success': props<{ progress: LessonProgressItem[] }>(),
    'Load Progress Failure': props<{ error: string }>(),
    'Toggle Progress Item': props<{ id: number }>(),
  },
});
