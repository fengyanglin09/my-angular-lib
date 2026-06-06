import { Action, INIT, MetaReducer, UPDATE } from '@ngrx/store';

import { LessonPreferencesActions } from './lesson-preferences.actions';
import { LessonPreferencesState, LessonTheme } from './lesson-preferences.models';
import {
  initialLessonPreferencesState,
  lessonPreferencesFeature,
} from './lesson-preferences.reducer';

export const lessonPreferencesStorageKey = 'ngrx.lessonPreferences';

const persistedActionTypes = new Set<string>([
  LessonPreferencesActions.setTheme.type,
  LessonPreferencesActions.toggleCompactMode.type,
  LessonPreferencesActions.updateNotes.type,
  LessonPreferencesActions.resetPreferences.type,
]);

export const lessonPreferencesStorageMetaReducer: MetaReducer = (reducer) => {
  return (state, action) => {
    const nextState = reducer(state, action) as Record<string, unknown>;

    if (isStoreInitAction(action)) {
      const hydratedPreferences = readPreferencesFromStorage();

      if (hydratedPreferences) {
        return {
          ...nextState,
          [lessonPreferencesFeature.name]: hydratedPreferences,
        };
      }
    }

    if (persistedActionTypes.has(action.type)) {
      const preferences = nextState[lessonPreferencesFeature.name];

      if (isLessonPreferencesState(preferences)) {
        writePreferencesToStorage(preferences);
      }
    }

    return nextState;
  };
};

function isStoreInitAction(action: Action): boolean {
  return action.type === INIT || action.type === UPDATE;
}

function readPreferencesFromStorage(): LessonPreferencesState | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  const storedPreferences = localStorage.getItem(lessonPreferencesStorageKey);

  if (!storedPreferences) {
    return null;
  }

  try {
    const parsedPreferences = JSON.parse(storedPreferences) as Partial<LessonPreferencesState>;

    return {
      compactMode:
        typeof parsedPreferences.compactMode === 'boolean'
          ? parsedPreferences.compactMode
          : initialLessonPreferencesState.compactMode,
      notes:
        typeof parsedPreferences.notes === 'string'
          ? parsedPreferences.notes
          : initialLessonPreferencesState.notes,
      theme: isLessonTheme(parsedPreferences.theme)
        ? parsedPreferences.theme
        : initialLessonPreferencesState.theme,
    };
  } catch {
    localStorage.removeItem(lessonPreferencesStorageKey);

    return null;
  }
}

function writePreferencesToStorage(preferences: LessonPreferencesState): void {
  if (!canUseLocalStorage()) {
    return;
  }

  localStorage.setItem(lessonPreferencesStorageKey, JSON.stringify(preferences));
}

function isLessonPreferencesState(value: unknown): value is LessonPreferencesState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const preferences = value as Partial<LessonPreferencesState>;

  return (
    typeof preferences.compactMode === 'boolean' &&
    typeof preferences.notes === 'string' &&
    isLessonTheme(preferences.theme)
  );
}

function isLessonTheme(value: unknown): value is LessonTheme {
  return value === 'system' || value === 'light' || value === 'dark';
}

function canUseLocalStorage(): boolean {
  return typeof localStorage !== 'undefined';
}

