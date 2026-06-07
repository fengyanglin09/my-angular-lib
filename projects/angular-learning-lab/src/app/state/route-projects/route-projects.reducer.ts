import { createFeature, createReducer, on } from '@ngrx/store';

import { RouteProjectsActions } from './route-projects.actions';
import {
  RouteProject,
  RouteProjectLoadLog,
} from './route-projects.models';

export interface RouteProjectsState {
  currentUrl: string | null;
  error: string | null;
  loading: boolean;
  logs: RouteProjectLoadLog[];
  nextLogId: number;
  project: RouteProject | null;
  projectId: string | null;
  view: string;
}

export const initialRouteProjectsState: RouteProjectsState = {
  currentUrl: null,
  error: null,
  loading: false,
  logs: [],
  nextLogId: 1,
  project: null,
  projectId: null,
  view: 'overview',
};

function addLog(
  logs: RouteProjectLoadLog[],
  nextLogId: number,
  message: string,
): RouteProjectLoadLog[] {
  return [
    {
      id: nextLogId,
      message,
    },
    ...logs,
  ].slice(0, 5);
}

export const routeProjectsFeature = createFeature({
  name: 'routeProjects',
  reducer: createReducer(
    initialRouteProjectsState,
    on(RouteProjectsActions.loadProjectFromRoute, (state, { projectId, view, url }) => ({
      ...state,
      currentUrl: url,
      error: null,
      loading: true,
      projectId,
      view,
      logs: addLog(
        state.logs,
        state.nextLogId,
        `Route effect dispatched load for ${projectId} (${view})`,
      ),
      nextLogId: state.nextLogId + 1,
    })),
    on(RouteProjectsActions.loadProjectSuccess, (state, { project, view, url }) => ({
      ...state,
      currentUrl: url,
      error: null,
      loading: false,
      project,
      projectId: project.id,
      view,
      logs: addLog(
        state.logs,
        state.nextLogId,
        `Backend returned ${project.name} for ${view}`,
      ),
      nextLogId: state.nextLogId + 1,
    })),
    on(RouteProjectsActions.loadProjectFailure, (state, { error, projectId, view, url }) => ({
      ...state,
      currentUrl: url,
      error,
      loading: false,
      project: null,
      projectId,
      view,
      logs: addLog(
        state.logs,
        state.nextLogId,
        `Backend failed for ${projectId} (${view})`,
      ),
      nextLogId: state.nextLogId + 1,
    })),
  ),
});
