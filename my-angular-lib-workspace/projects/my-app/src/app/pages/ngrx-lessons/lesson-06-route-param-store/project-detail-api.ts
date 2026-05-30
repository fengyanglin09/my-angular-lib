import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { ProjectDetail } from './project-detail.models';

const seedProjects: ProjectDetail[] = [
  {
    id: 'project-101',
    name: 'Angular Learning Lab',
    owner: 'Lin',
    status: 'active',
    notes: 'Practice state patterns with small focused lessons.',
    tasks: [
      { id: 1, title: 'Compare Store and Signal Store', done: true },
      { id: 2, title: 'Add route-driven loading', done: false },
      { id: 3, title: 'Persist edited notes', done: false },
    ],
  },
  {
    id: 'project-202',
    name: 'Component Library',
    owner: 'Design Systems',
    status: 'planning',
    notes: 'Prepare reusable components and stories for a future package.',
    tasks: [
      { id: 1, title: 'Audit button variants', done: false },
      { id: 2, title: 'Write usage examples', done: false },
    ],
  },
  {
    id: 'project-303',
    name: 'Store Migration',
    owner: 'Frontend Platform',
    status: 'paused',
    notes: 'Collect examples before deciding what belongs in global Store.',
    tasks: [
      { id: 1, title: 'List shared state candidates', done: true },
      { id: 2, title: 'Prototype one page store', done: true },
      { id: 3, title: 'Review route parameter loading', done: false },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class ProjectDetailApi {
  private readonly projects = new Map(
    seedProjects.map((project) => [project.id, structuredClone(project)]),
  );

  loadProject(projectId: string): Observable<ProjectDetail> {
    const project = this.projects.get(projectId);

    if (!project) {
      return throwError(() => new Error(`Project ${projectId} was not found`)).pipe(delay(500));
    }

    return of(structuredClone(project)).pipe(delay(500));
  }

  saveProject(project: ProjectDetail): Observable<ProjectDetail> {
    this.projects.set(project.id, structuredClone(project));

    return of(structuredClone(project)).pipe(delay(500));
  }
}
