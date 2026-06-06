import { createSelector } from '@ngrx/store';

import { lessonPreferencesFeature } from './lesson-preferences.reducer';

export const {
  selectCompactMode,
  selectLessonPreferencesState,
  selectNotes,
  selectTheme,
} = lessonPreferencesFeature;

export const selectPreferencesSummary = createSelector(
  selectTheme,
  selectCompactMode,
  (theme, compactMode) =>
    `${theme} theme with ${compactMode ? 'compact' : 'comfortable'} spacing`,
);

