import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

interface ProjectDetails {
  id: string;
  name: string;
  owner: string;
  status: string;
}

const projects: Record<string, ProjectDetails> = {
  'project-101': {
    id: 'project-101',
    name: 'Customer Portal',
    owner: 'Maya',
    status: 'Active',
  },
  'project-202': {
    id: 'project-202',
    name: 'Billing Dashboard',
    owner: 'Noah',
    status: 'Planning',
  },
  'project-303': {
    id: 'project-303',
    name: 'Mobile Onboarding',
    owner: 'Ari',
    status: 'Review',
  },
};

@Component({
  selector: 'app-lesson-02-route-params',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-02-route-params.html',
  styleUrl: './lesson-02-route-params.css',
})
export class Lesson02RouteParams {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private nextLogId = 2;

  protected readonly snapshotProjectId =
    this.route.snapshot.paramMap.get('projectId') ?? 'missing-project';

  protected readonly projectId = signal(this.snapshotProjectId);
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: `snapshot.paramMap read "${this.snapshotProjectId}" when the component was created.`,
    },
  ]);

  protected readonly currentProject = computed<ProjectDetails>(() => {
    const projectId = this.projectId();

    return (
      projects[projectId] ?? {
        id: projectId,
        name: 'Unknown project',
        owner: 'Unassigned',
        status: 'Missing',
      }
    );
  });

  protected readonly projectSummary = computed(
    () => `${this.currentProject().name} belongs to ${this.currentProject().owner}.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The colon creates a named placeholder in the URL.',
      name: 'route pattern',
      syntax: `{ path: 'lesson-02-route-params/:projectId',
  loadComponent: () => import('./lesson-02-route-params')
}`,
    },
    {
      description: 'routerLink fills the placeholder with a real value.',
      name: 'route link',
      syntax: `<a [routerLink]="[
  '/angular-route-lessons/lesson-02-route-params',
  'project-202'
]">Open project 202</a>`,
    },
    {
      description: 'snapshot is useful for a one-time read when the component is created.',
      name: 'snapshot read',
      syntax: `route.snapshot.paramMap.get('projectId')`,
    },
    {
      description: 'paramMap emits when the parameter changes while the component stays alive.',
      name: 'param stream',
      syntax: `route.paramMap.pipe(
  map((params) => params.get('projectId')),
  distinctUntilChanged()
)`,
    },
  ];

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('projectId') ?? 'missing-project'),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((projectId) => {
        this.projectId.set(projectId);
        this.addLog(`paramMap emitted "${projectId}". The visible project updated.`);
      });
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared. Change projects to see paramMap emit again.' }]);
    this.nextLogId = 2;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
