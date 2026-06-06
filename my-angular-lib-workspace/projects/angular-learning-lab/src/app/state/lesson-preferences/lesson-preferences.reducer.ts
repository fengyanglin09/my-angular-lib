import { createFeature, createReducer, on } from '@ngrx/store';

import { LessonPreferencesActions } from './lesson-preferences.actions';
import { LessonPreferencesState } from './lesson-preferences.models';

export const initialLessonPreferencesState: LessonPreferencesState = {
  compactMode: false,
  notes: 'Refresh the page after changing these values.',
  theme: 'system',
};

export const lessonPreferencesFeature = createFeature({
  name: 'lessonPreferences',
  reducer: createReducer(
    initialLessonPreferencesState,
    on(LessonPreferencesActions.setTheme, (state, { theme }) => ({
      ...state,
      theme,
    })),
    on(LessonPreferencesActions.toggleCompactMode, (state) => ({
      ...state,
      compactMode: !state.compactMode,
    })),
    on(LessonPreferencesActions.updateNotes, (state, { notes }) => ({
      ...state,
      notes,
    })),
    on(LessonPreferencesActions.resetPreferences, () => initialLessonPreferencesState),
  ),
});

