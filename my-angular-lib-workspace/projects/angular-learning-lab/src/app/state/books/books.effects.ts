import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { BooksActions } from './books.actions';
import { BooksApi } from './books-api';
import { selectAllBooks } from './books.selectors';

@Injectable()
export class BooksEffects {
  private readonly actions$ = inject(Actions);
  private readonly booksApi = inject(BooksApi);
  private readonly store = inject(Store);

  readonly loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      switchMap(({ page, pageSize, shouldFail }) =>
        this.booksApi.loadBooks(page, pageSize, shouldFail).pipe(
          map((result) => BooksActions.loadBooksSuccess(result)),
          catchError((error: Error) =>
            of(BooksActions.loadBooksFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly saveBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.saveBooks),
      withLatestFrom(this.store.select(selectAllBooks)),
      switchMap(([{ shouldFail }, books]) =>
        this.booksApi.saveBooks(books, shouldFail).pipe(
          map(({ savedAt }) => BooksActions.saveBooksSuccess({ savedAt })),
          catchError((error: Error) =>
            of(BooksActions.saveBooksFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
