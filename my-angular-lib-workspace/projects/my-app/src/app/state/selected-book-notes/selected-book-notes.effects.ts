import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, withLatestFrom } from 'rxjs';

import { selectSelectedBook } from '../books/books.selectors';
import { SelectedBookNotesActions } from './selected-book-notes.actions';
import { SelectedBookNotesApi } from './selected-book-notes-api';

@Injectable()
export class SelectedBookNotesEffects {
  private readonly actions$ = inject(Actions);
  private readonly selectedBookNotesApi = inject(SelectedBookNotesApi);
  private readonly store = inject(Store);

  readonly saveNoteForSelectedBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedBookNotesActions.saveNoteForSelectedBook),
      withLatestFrom(this.store.select(selectSelectedBook)),
      concatMap(([{ note, shouldFail }, selectedBook]) => {
        if (!selectedBook) {
          return of(
            SelectedBookNotesActions.saveNoteFailure({
              error: 'Select a book before saving a note',
            }),
          );
        }

        return this.selectedBookNotesApi
          .saveNote(selectedBook, note, shouldFail)
          .pipe(
            map((savedNote) =>
              SelectedBookNotesActions.saveNoteSuccess({ savedNote }),
            ),
            catchError((error: Error) =>
              of(SelectedBookNotesActions.saveNoteFailure({ error: error.message })),
            ),
          );
      }),
    ),
  );
}
