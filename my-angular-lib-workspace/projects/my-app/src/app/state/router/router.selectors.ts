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
