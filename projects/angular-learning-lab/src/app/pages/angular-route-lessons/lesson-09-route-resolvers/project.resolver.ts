import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ProjectResolverApi } from './project-resolver-api.service';
import { ResolvedProject } from './resolved-project.models';

export const projectResolver: ResolveFn<ResolvedProject> = (route) => {
  const projectApi = inject(ProjectResolverApi);
  const projectId = route.paramMap.get('projectId') ?? 'missing-project';

  return projectApi.loadProject(projectId);
};
