import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';

import { selectRouteEffectProjectRouteState } from '../router/router.selectors';
import { RouteProjectsActions } from './route-projects.actions';
import { RouteProjectsApi } from './route-projects-api';

@Injectable()
export class RouteProjectsEffects {
  private readonly actions$ = inject(Actions);
  private readonly routeProjectsApi = inject(RouteProjectsApi);
  private readonly store = inject(Store);

  readonly loadProjectWhenRouteChanges$ = createEffect(() =>
    this.store.select(selectRouteEffectProjectRouteState).pipe(
      filter((routeState) => routeState !== null),
      distinctUntilChanged(
        (previous, current) =>
          previous.projectId === current.projectId && previous.view === current.view,
      ),
      map(({ projectId, view, url }) =>
        RouteProjectsActions.loadProjectFromRoute({
          projectId,
          view,
          url,
        }),
      ),
    ),
  );

  readonly loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouteProjectsActions.loadProjectFromRoute),
      switchMap(({ projectId, view, url }) =>
        this.routeProjectsApi.loadProject(projectId, view).pipe(
          map((project) =>
            RouteProjectsActions.loadProjectSuccess({
              project,
              view,
              url,
            }),
          ),
          catchError((error: Error) =>
            of(
              RouteProjectsActions.loadProjectFailure({
                error: error.message,
                projectId,
                view,
                url,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
