import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { ProjectDetailApi } from './project-detail-api';
import { ProjectDetail, ProjectStatus } from './project-detail.models';

interface ProjectDetailState {
  error: string | null;
  lastSavedAt: string | null;
  loading: boolean;
  project: ProjectDetail | null;
  saving: boolean;
}

const statusOrder: ProjectStatus[] = ['planning', 'active', 'paused'];

export const ProjectDetailStore = signalStore(
  withState<ProjectDetailState>({
    error: null,
    lastSavedAt: null,
    loading: false,
    project: null,
    saving: false,
  }),
  withComputed(({ project }) => ({
    completedTasks: computed(() => project()?.tasks.filter((task) => task.done).length ?? 0),
    totalTasks: computed(() => project()?.tasks.length ?? 0),
  })),
  withComputed(({ completedTasks, totalTasks }) => ({
    taskSummary: computed(() => `${completedTasks()} of ${totalTasks()} tasks complete`),
  })),
  withMethods((store) => {
    const projectApi = inject(ProjectDetailApi);

    const saveProject = (project: ProjectDetail): void => {
      patchState(store, {
        error: null,
        saving: true,
      });

      projectApi.saveProject(project).subscribe({
        next: (savedProject) => {
          patchState(store, {
            lastSavedAt: new Date().toLocaleTimeString(),
            project: savedProject,
            saving: false,
          });
        },
        error: (error: Error) => {
          patchState(store, {
            error: error.message,
            saving: false,
          });
        },
      });
    };

    return {
      loadProject(projectId: string): void {
        patchState(store, {
          error: null,
          lastSavedAt: null,
          loading: true,
          project: null,
        });

        projectApi.loadProject(projectId).subscribe({
          next: (project) => {
            patchState(store, {
              loading: false,
              project,
            });
          },
          error: (error: Error) => {
            patchState(store, {
              error: error.message,
              loading: false,
            });
          },
        });
      },
      cycleStatus(): void {
        const project = store.project();

        if (!project) {
          return;
        }

        const currentIndex = statusOrder.indexOf(project.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        const nextProject = {
          ...project,
          status: nextStatus,
        };

        patchState(store, { project: nextProject });
        saveProject(nextProject);
      },
      updateNotes(notes: string): void {
        const project = store.project();

        if (!project) {
          return;
        }

        const nextProject = {
          ...project,
          notes,
        };

        patchState(store, { project: nextProject });
        saveProject(nextProject);
      },
      toggleTask(taskId: number): void {
        const project = store.project();

        if (!project) {
          return;
        }

        const nextProject = {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  done: !task.done,
                }
              : task,
          ),
        };

        patchState(store, { project: nextProject });
        saveProject(nextProject);
      },
    };
  }),
);
