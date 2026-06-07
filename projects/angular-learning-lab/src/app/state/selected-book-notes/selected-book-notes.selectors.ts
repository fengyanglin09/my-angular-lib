import { createSelector } from '@ngrx/store';

import { selectedBookNotesFeature } from './selected-book-notes.reducer';

export const {
  selectError,
  selectNotes,
  selectSaving,
  selectSelectedBookNotesState,
} = selectedBookNotesFeature;

export const selectNotesSummary = createSelector(
  selectNotes,
  selectSaving,
  (notes, saving) => `${notes.length} saved notes${saving ? ', saving...' : ''}`,
);
