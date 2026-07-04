import { Injectable, signal } from '@angular/core';

import { ResolvedProject } from './resolved-project.models';

const projects: Record<string, ResolvedProject> = {
  'project-101': {
    id: 'project-101',
    name: 'Customer Portal',
    owner: 'Maya',
    priority: 'High',
    status: 'Active',
    summary: 'A customer-facing portal for account support and billing workflows.',
  },
  'project-202': {
    id: 'project-202',
    name: 'Billing Dashboard',
    owner: 'Noah',
    priority: 'Medium',
    status: 'Planning',
    summary: 'An internal dashboard for invoice review and revenue reports.',
  },
  'project-303': {
    id: 'project-303',
    name: 'Mobile Onboarding',
    owner: 'Ari',
    priority: 'Low',
    status: 'Review',
    summary: 'A mobile onboarding flow for new team members.',
  },
};

@Injectable({ providedIn: 'root' })
export class ProjectResolverApi {
  readonly resolverLog = signal<string[]>([
    'Resolver demo ready. Navigate to a project to run the resolver.',
  ]);

  async loadProject(projectId: string): Promise<ResolvedProject> {
    this.addLog(`Resolver started loading ${projectId}.`);
    await this.wait(500);

    const project =
      projects[projectId] ??
      ({
        id: projectId,
        name: 'Unknown project',
        owner: 'Unassigned',
        priority: 'Low',
        status: 'Missing',
        summary: 'The resolver could not find this project, so it returned fallback data.',
      } satisfies ResolvedProject);

    this.addLog(`Resolver finished loading ${project.name}.`);

    return project;
  }

  clearLog(): void {
    this.resolverLog.set(['Log cleared. Navigate to another project to run the resolver again.']);
  }

  recordRouteParam(projectId: string): void {
    this.addLog(`Resolver read projectId="${projectId}" from the route params.`);
  }

  private addLog(message: string): void {
    this.resolverLog.update((logs) => [...logs, message]);
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }
}
