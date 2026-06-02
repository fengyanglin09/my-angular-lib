import { createActionGroup, props } from '@ngrx/store';

import { RouteProject } from './route-projects.models';

export const RouteProjectsActions = createActionGroup({
  source: 'Route Effects Lesson',
  events: {
    'Load Project From Route': props<{
      projectId: string;
      view: string;
      url: string;
    }>(),
    'Load Project Success': props<{
      project: RouteProject;
      view: string;
      url: string;
    }>(),
    'Load Project Failure': props<{
      error: string;
      projectId: string;
      view: string;
      url: string;
    }>(),
  },
});
