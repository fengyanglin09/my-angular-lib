import { createSelector } from '@ngrx/store';

import { routeProjectsFeature } from './route-projects.reducer';

export const {
  selectCurrentUrl,
  selectError,
  selectLoading,
  selectLogs,
  selectProject,
  selectProjectId,
  selectView,
} = routeProjectsFeature;

export const selectRouteProjectTitle = createSelector(
  selectProject,
  selectProjectId,
  (project, projectId) => project?.name ?? `Waiting for ${projectId ?? 'a project'}`,
);

export const selectRouteProjectSummary = createSelector(
  selectProject,
  selectView,
  (project, view) =>
    project
      ? `${project.status} project loaded for the ${view} view`
      : `No project loaded for the ${view} view yet`,
);
