import { Component, computed, signal } from '@angular/core';

interface ProjectSummary {
  id: string;
  name: string;
  owner: string;
  progress: number;
  status: string;
}

@Component({
  selector: 'app-dashboards-detail-pages-demo',
  templateUrl: './dashboards-detail-pages-demo.html',
  styleUrl: './dashboards-detail-pages-demo.css',
})
export class DashboardsDetailPagesDemo {
  protected readonly projects: ProjectSummary[] = [
    {
      id: 'apollo',
      name: 'Apollo',
      owner: 'Mina',
      progress: 72,
      status: 'On track',
    },
    {
      id: 'beacon',
      name: 'Beacon',
      owner: 'Theo',
      progress: 45,
      status: 'Needs attention',
    },
    {
      id: 'cipher',
      name: 'Cipher',
      owner: 'Ari',
      progress: 88,
      status: 'Ready for QA',
    },
  ];
  protected readonly selectedProjectId = signal(this.projects[0].id);
  protected readonly selectedProject = computed(
    () =>
      this.projects.find(
        (project) => project.id === this.selectedProjectId()
      ) ?? this.projects[0]
  );
  protected readonly routePreview = computed(
    () => `/projects/${this.selectedProject().id}`
  );

  protected openProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }
}
