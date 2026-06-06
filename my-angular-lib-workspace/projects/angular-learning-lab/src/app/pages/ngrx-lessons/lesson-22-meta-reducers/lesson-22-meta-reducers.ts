import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { LessonPreferencesActions } from '../../../state/lesson-preferences/lesson-preferences.actions';
import { lessonPreferencesStorageKey } from '../../../state/lesson-preferences/lesson-preferences.meta-reducer';
import { LessonTheme } from '../../../state/lesson-preferences/lesson-preferences.models';
import {
  selectCompactMode,
  selectNotes,
  selectPreferencesSummary,
  selectTheme,
} from '../../../state/lesson-preferences/lesson-preferences.selectors';

@Component({
  selector: 'app-lesson-22-meta-reducers',
  imports: [LearningNav],
  templateUrl: './lesson-22-meta-reducers.html',
  styleUrl: './lesson-22-meta-reducers.css',
})
export class Lesson22MetaReducers implements OnInit {
  private readonly store = inject(Store);

  protected readonly compactMode = this.store.selectSignal(selectCompactMode);
  protected readonly notes = this.store.selectSignal(selectNotes);
  protected readonly storageSnapshot = signal('');
  protected readonly summary = this.store.selectSignal(selectPreferencesSummary);
  protected readonly theme = this.store.selectSignal(selectTheme);
  protected readonly themes: LessonTheme[] = ['system', 'light', 'dark'];

  ngOnInit(): void {
    this.refreshStorageSnapshot();
  }

  protected resetPreferences(): void {
    this.store.dispatch(LessonPreferencesActions.resetPreferences());
    this.refreshStorageSnapshot();
  }

  protected setTheme(theme: LessonTheme): void {
    this.store.dispatch(LessonPreferencesActions.setTheme({ theme }));
    this.refreshStorageSnapshot();
  }

  protected toggleCompactMode(): void {
    this.store.dispatch(LessonPreferencesActions.toggleCompactMode());
    this.refreshStorageSnapshot();
  }

  protected updateNotes(notes: string): void {
    this.store.dispatch(LessonPreferencesActions.updateNotes({ notes }));
    this.refreshStorageSnapshot();
  }

  private refreshStorageSnapshot(): void {
    this.storageSnapshot.set(
      localStorage.getItem(lessonPreferencesStorageKey) ?? 'Nothing stored yet.',
    );
  }
}

