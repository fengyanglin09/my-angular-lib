import { createActionGroup, props } from '@ngrx/store';

import { SavedBookNote } from './selected-book-notes.models';

export const SelectedBookNotesActions = createActionGroup({
  source: 'Selected Book Notes Lesson',
  events: {
    'Save Note For Selected Book': props<{ note: string; shouldFail: boolean }>(),
    'Save Note Success': props<{ savedNote: SavedBookNote }>(),
    'Save Note Failure': props<{ error: string }>(),
  },
});
