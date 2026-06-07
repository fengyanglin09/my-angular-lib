import { createSelector } from '@ngrx/store';
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
export const selectRouteEffectProjectId = selectRouteParam('projectId');
export const selectRouteEffectView = selectQueryParam('view');

export interface LessonRouteState {
  mode: string;
  topic: string;
  url: string;
}

export const selectLessonRouteState = createSelector(
  selectLessonTopic,
  selectLessonMode,
  selectUrl,
  (topic, mode, url): LessonRouteState | null => {
    if (!topic || !url) {
      return null;
    }

    return {
      mode: Array.isArray(mode) ? mode[0] ?? 'learn' : mode ?? 'learn',
      topic,
      url,
    };
  },
);

export interface RouteEffectProjectRouteState {
  projectId: string;
  url: string;
  view: string;
}

export const selectRouteEffectProjectRouteState = createSelector(
  selectRouteEffectProjectId,
  selectRouteEffectView,
  selectUrl,
  (projectId, view, url): RouteEffectProjectRouteState | null => {
    if (!projectId || !url) {
      return null;
    }

    return {
      projectId,
      url,
      view: Array.isArray(view) ? view[0] ?? 'overview' : view ?? 'overview',
    };
  },
);
