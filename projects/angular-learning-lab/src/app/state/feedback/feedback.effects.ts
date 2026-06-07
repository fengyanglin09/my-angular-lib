import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { FeedbackActions } from './feedback.actions';
import { FeedbackApi } from './feedback-api';

@Injectable()
export class FeedbackEffects {
  private readonly actions$ = inject(Actions);
  private readonly feedbackApi = inject(FeedbackApi);

  readonly loadFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.loadFeedback),
      switchMap(() =>
        this.feedbackApi.loadFeedback().pipe(
          map((feedback) => FeedbackActions.loadFeedbackSuccess({ feedback })),
          catchError((error: Error) =>
            of(FeedbackActions.loadFeedbackFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly addFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.addFeedback),
      mergeMap(({ tempId, text, shouldFail }) =>
        this.feedbackApi.addFeedback(text, shouldFail).pipe(
          map((feedback) => FeedbackActions.addFeedbackSuccess({ tempId, feedback })),
          catchError((error: Error) =>
            of(FeedbackActions.addFeedbackFailure({ tempId, error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly deleteFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.deleteFeedback),
      mergeMap(({ feedback, shouldFail }) =>
        this.feedbackApi.deleteFeedback(feedback.id, shouldFail).pipe(
          map((id) => FeedbackActions.deleteFeedbackSuccess({ id })),
          catchError((error: Error) =>
            of(FeedbackActions.deleteFeedbackFailure({ feedback, error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly toggleLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.toggleLike),
      mergeMap(({ id, liked, shouldFail }) =>
        this.feedbackApi.updateLike(id, liked, shouldFail).pipe(
          map(() => FeedbackActions.toggleLikeSuccess({ id })),
          catchError((error: Error) =>
            of(FeedbackActions.toggleLikeFailure({ id, liked, error: error.message })),
          ),
        ),
      ),
    ),
  );
}
