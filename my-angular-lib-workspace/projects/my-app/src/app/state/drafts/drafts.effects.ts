import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { DraftsActions } from './drafts.actions';
import { DraftsApi } from './drafts-api';

@Injectable()
export class DraftsEffects {
  private readonly actions$ = inject(Actions);
  private readonly draftsApi = inject(DraftsApi);

  readonly createDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftsActions.createDraft),
      switchMap(({ title, category, shouldFail }) =>
        this.draftsApi.createDraft(title, category, shouldFail).pipe(
          map((draft) => DraftsActions.createDraftSuccess({ draft })),
          catchError((error: Error) =>
            of(DraftsActions.createDraftFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly updateDraftCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftsActions.updateDraftCategory),
      switchMap(({ id, category, shouldFail }) =>
        this.draftsApi.updateDraftCategory(id, category, shouldFail).pipe(
          map((draft) => DraftsActions.updateDraftCategorySuccess({ draft })),
          catchError((error: Error) =>
            of(DraftsActions.updateDraftCategoryFailure({ id, error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly loadDrafts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftsActions.loadDrafts),
      switchMap(() =>
        this.draftsApi.loadDrafts().pipe(
          map((drafts) => DraftsActions.loadDraftsSuccess({ drafts })),
          catchError((error: Error) =>
            of(DraftsActions.loadDraftsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
