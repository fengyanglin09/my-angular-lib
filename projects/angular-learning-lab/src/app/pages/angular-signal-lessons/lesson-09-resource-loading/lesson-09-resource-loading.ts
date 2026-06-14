import { Component, computed, inject, resource, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import {
  ProjectDetails,
  ProjectId,
  ProjectRequest,
  ProjectResourceApi,
} from './project-resource-api';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-09-resource-loading',
  imports: [LearningNav],
  templateUrl: './lesson-09-resource-loading.html',
  styleUrl: './lesson-09-resource-loading.css',
})
export class Lesson09ResourceLoading {
  private readonly projectApi = inject(ProjectResourceApi);

  protected readonly projectIds: ProjectId[] = ['apollo', 'beacon', 'cosmos'];
  protected readonly selectedProjectId = signal<ProjectId>('apollo');
  protected readonly reloadId = signal(0);
  protected readonly shouldFail = signal(false);
  protected readonly logs = signal<string[]>([
    'resource reads params and starts the first project load.',
  ]);

  protected readonly projectResource = resource<ProjectDetails, ProjectRequest>({
    params: () => ({
      projectId: this.selectedProjectId(),
      reloadId: this.reloadId(),
      shouldFail: this.shouldFail(),
    }),
    defaultValue: {
      id: 'none',
      name: 'No project loaded yet',
      owner: 'None',
      tasks: [],
    },
    loader: async ({ abortSignal, params, previous }) => {
      this.addLog(
        `loader started for ${params.projectId}; previous status was ${previous.status}.`,
      );

      try {
        this.addLog('projectApi.loadProject(...) called.');
        const details = await this.projectApi.loadProject(params, abortSignal);
        this.addLog(`API resolved ${details.name}.`);

        return details;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          this.addLog(`API request aborted for ${params.projectId}.`);
        }

        throw error;
      }
    },
  });

  protected readonly statusLabel = computed(() => {
    if (this.projectResource.isLoading()) {
      return `Loading ${this.selectedProjectId()}`;
    }

    if (this.projectResource.status() === 'error') {
      return this.projectResource.error()?.message ?? 'Unknown resource error';
    }

    return `${this.projectResource.value().name} is ready`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'params is a reactive function. When a signal read inside changes, the loader runs.',
      name: 'params',
      syntax: 'params: () => ({ projectId: selectedProjectId() })',
    },
    {
      description: 'loader calls an API service and passes AbortSignal through for cancellation.',
      name: 'loader',
      syntax: 'projectApi.loadProject(params, abortSignal)',
    },
    {
      description: 'resource exposes signal state for value, status, error, and loading.',
      name: 'resource state',
      syntax: 'projectResource.value(); projectResource.status();',
    },
    {
      description: 'reload starts a fresh load for the current params.',
      name: 'manual reload',
      syntax: 'projectResource.reload();',
    },
  ];

  protected selectProject(projectId: ProjectId): void {
    this.shouldFail.set(false);
    this.selectedProjectId.set(projectId);
    this.addLog(`selectedProjectId changed to ${projectId}.`);
  }

  protected reloadProject(): void {
    this.shouldFail.set(false);
    this.projectResource.reload();
    this.addLog('projectResource.reload() requested.');
  }

  protected failReload(): void {
    this.shouldFail.set(true);
    this.reloadId.update((id) => id + 1);
    this.addLog('Failure flag changed, so params changed and resource reloaded.');
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. Change projects quickly to see old loads cancel.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}
