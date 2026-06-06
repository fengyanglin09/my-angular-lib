import { createFeature, createReducer, on } from '@ngrx/store';

import { SelectedBookNotesActions } from './selected-book-notes.actions';
import { SavedBookNote } from './selected-book-notes.models';

export interface SelectedBookNotesState {
  error: string | null;
  notes: SavedBookNote[];
  saving: boolean;
}

export const initialSelectedBookNotesState: SelectedBookNotesState = {
  error: null,
  notes: [],
  saving: false,
};

export const selectedBookNotesFeature = createFeature({
  name: 'selectedBookNotes',
  reducer: createReducer(
    initialSelectedBookNotesState,
    on(SelectedBookNotesActions.saveNoteForSelectedBook, (state) => ({
      ...state,
      error: null,
      saving: true,
    })),
    on(SelectedBookNotesActions.saveNoteSuccess, (state, { savedNote }) => ({
      ...state,
      error: null,
      notes: [savedNote, ...state.notes].slice(0, 6),
      saving: false,
    })),
    on(SelectedBookNotesActions.saveNoteFailure, (state, { error }) => ({
      ...state,
      error,
      saving: false,
    })),
  ),
});
