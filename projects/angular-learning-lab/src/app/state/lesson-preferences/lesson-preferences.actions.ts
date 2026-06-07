import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LessonTheme } from './lesson-preferences.models';

export const LessonPreferencesActions = createActionGroup({
  source: 'Lesson Preferences',
  events: {
    'Set Theme': props<{ theme: LessonTheme }>(),
    'Toggle Compact Mode': emptyProps(),
    'Update Notes': props<{ notes: string }>(),
    'Reset Preferences': emptyProps(),
  },
});

