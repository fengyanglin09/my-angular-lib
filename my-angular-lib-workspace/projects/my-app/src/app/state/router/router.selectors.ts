import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';

interface AppRouterState {
  router: RouterReducerState;
}

export const {
  selectQueryParam,
  selectQueryParams,
  selectRouteParam,
  selectRouteParams,
  selectUrl,
} = getRouterSelectors<AppRouterState>((state) => state.router);

export const selectLessonTopic = selectRouteParam('topic');
export const selectLessonMode = selectQueryParam('mode');
