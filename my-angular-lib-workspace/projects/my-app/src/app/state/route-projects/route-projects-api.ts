import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { RouteProject } from './route-projects.models';

const projects: Record<string, RouteProject> = {
  'project-101': {
    id: 'project-101',
    name: 'Checkout Modernization',
    owner: 'Ada Weaver',
    status: 'In progress',
    summary: 'Route changes load the correct checkout project through an effect.',
    tasks: ['Read route state', 'Dispatch load action', 'Render project state'],
  },
  'project-202': {
    id: 'project-202',
    name: 'Analytics Dashboard',
    owner: 'Ben Stream',
    status: 'Planning',
    summary: 'Query params switch dashboard views without recreating the component.',
    tasks: ['Compare views', 'Load dashboard context', 'Review filters'],
  },
  'project-303': {
    id: 'project-303',
    name: 'Support Workflow',
    owner: 'Casey Store',
    status: 'Review',
    summary: 'Router Store keeps support workflow route data available to effects.',
    tasks: ['Inspect tickets', 'Validate route params', 'Prepare release notes'],
  },
};

@Injectable({ providedIn: 'root' })
export class RouteProjectsApi {
  loadProject(projectId: string, view: string): Observable<RouteProject> {
    const project = projects[projectId];

    if (!project || view === 'fail') {
      return throwError(
        () => new Error(`Could not load ${projectId} for view "${view}"`),
      ).pipe(delay(650));
    }

    return of(structuredClone(project)).pipe(delay(650));
  }
}
