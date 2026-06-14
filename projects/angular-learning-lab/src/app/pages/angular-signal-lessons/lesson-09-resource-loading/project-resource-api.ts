import { Injectable } from '@angular/core';

export type ProjectId = 'apollo' | 'beacon' | 'cosmos';

export interface ProjectDetails {
  id: ProjectId | 'none';
  name: string;
  owner: string;
  tasks: string[];
}

export interface ProjectRequest {
  projectId: ProjectId;
  reloadId: number;
  shouldFail: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectResourceApi {
  async loadProject(
    request: ProjectRequest,
    abortSignal: AbortSignal,
  ): Promise<ProjectDetails> {
    const fileName = request.shouldFail ? 'missing-project' : request.projectId;
    const url = `/signal-lessons/projects/${fileName}.json?reload=${request.reloadId}`;
    const response = await fetch(url, { signal: abortSignal });

    if (!response.ok) {
      throw new Error(`Could not load ${request.projectId}.`);
    }

    return (await response.json()) as ProjectDetails;
  }
}
