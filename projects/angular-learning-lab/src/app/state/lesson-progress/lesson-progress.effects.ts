import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { LessonProgressActions } from './lesson-progress.actions';
import { LessonProgressApi } from './lesson-progress-api';

@Injectable()
export class LessonProgressEffects {
  private readonly actions$ = inject(Actions);
  private readonly lessonProgressApi = inject(LessonProgressApi);

  readonly loadProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonProgressActions.loadProgress),
      switchMap(() =>
        this.lessonProgressApi.loadProgress().pipe(
          map((progress) => LessonProgressActions.loadProgressSuccess({ progress })),
          catchError((error: Error) =>
            of(LessonProgressActions.loadProgressFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
