export type LessonTheme = 'system' | 'light' | 'dark';

export interface LessonPreferencesState {
  compactMode: boolean;
  notes: string;
  theme: LessonTheme;
}

