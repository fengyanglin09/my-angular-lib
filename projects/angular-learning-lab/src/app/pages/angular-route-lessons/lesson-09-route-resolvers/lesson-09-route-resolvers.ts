import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { ProjectResolverApi } from './project-resolver-api.service';
import { ResolvedProject } from './resolved-project.models';

const initialProject: ResolvedProject = {
  id: 'loading',
  name: 'Waiting for resolver',
  owner: 'None',
  priority: 'Low',
  status: 'Planning',
  summary: 'The component will update after ActivatedRoute.data emits resolved data.',
};

@Component({
  selector: 'app-lesson-09-route-resolvers',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-09-route-resolvers.html',
  styleUrl: './lesson-09-route-resolvers.css',
})
export class Lesson09RouteResolvers {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  protected readonly projectApi = inject(ProjectResolverApi);
  protected readonly project = signal<ResolvedProject>(initialProject);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A functional resolver runs before Angular activates the target route.',
      name: 'resolver function',
      syntax: `export const projectResolver: ResolveFn<Project> = (route) => {
  const projectId = route.paramMap.get('projectId');
  return projectApi.loadProject(projectId);
};`,
    },
    {
      description: 'The route config names the resolved value under resolve.',
      name: 'route config',
      syntax: `{ path: 'lesson-09-route-resolvers/:projectId',
  component: Lesson09RouteResolvers,
  resolve: {
    project: projectResolver
  }
}`,
    },
    {
      description: 'A route can have multiple resolvers. Each resolve key becomes a key on ActivatedRoute.data.',
      name: 'multiple resolvers',
      syntax: `resolve: {
  project: projectResolver,
  permissions: permissionsResolver,
  activity: activityResolver
}

// data['project']
// data['permissions']
// data['activity']`,
    },
    {
      description: 'The component reads the resolver result from ActivatedRoute.data.',
      name: 'route data',
      syntax: `route.data.pipe(
  map((data) => data['project'])
)`,
    },
    {
      description: 'Changing the projectId route param runs the resolver again before updating route data.',
      name: 'param changes',
      syntax: `/lesson-09-route-resolvers/project-101
/lesson-09-route-resolvers/project-202

// resolver runs for each projectId navigation`,
    },
    {
      description: 'Resolvers are best for required route data. Optional details can still load inside the component.',
      name: 'when to use',
      syntax: `required before page renders -> resolver
optional or secondary data -> component/service load`,
    },
  ];

  constructor() {
    this.route.data
      .pipe(
        map((data) => data['project'] as ResolvedProject),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((project) => {
        this.project.set(project);
      });
  }
}
