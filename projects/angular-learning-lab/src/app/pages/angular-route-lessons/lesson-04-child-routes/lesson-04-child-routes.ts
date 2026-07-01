import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

@Component({
  selector: 'app-lesson-04-child-routes',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-04-child-routes.html',
  styleUrl: './lesson-04-child-routes.css',
})
export class Lesson04ChildRoutes {
  private nextLogId = 2;

  protected readonly activeChildPath = signal('overview');
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: 'Parent workspace loaded. The overview child route renders in the nested outlet.',
    },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The parent route owns the shared layout.',
      name: 'parent route',
      syntax: `{ path: 'lesson-04-child-routes',
  component: Lesson04ChildRoutes,
  children: [...]
}`,
    },
    {
      description: 'Children render inside the parent component outlet.',
      name: 'child routes',
      syntax: `children: [
  { path: 'overview', component: ProjectOverview },
  { path: 'activity', component: ProjectActivity },
  { path: 'settings', component: ProjectSettings }
]`,
    },
    {
      description: 'The parent template needs a nested router-outlet.',
      name: 'nested outlet',
      syntax: `<section class="workspace-layout">
  <nav>...</nav>
  <router-outlet />
</section>`,
    },
    {
      description: 'Relative links can move between sibling child routes.',
      name: 'relative links',
      syntax: `<a routerLink="activity" routerLinkActive="active">
  Activity
</a>`,
    },
    {
      description: 'No leading slash means the link is relative to the current activated route. A leading slash starts from the app root.',
      name: 'relative vs absolute',
      syntax: `routerLink="overview"
// /angular-route-lessons/lesson-04-child-routes/overview

routerLink="/overview"
// /overview`,
    },
    {
      description: 'Angular uses the parent component outlet for child routes because the child route matched under that parent route.',
      name: 'which outlet',
      syntax: `{ path: 'lesson-04-child-routes',
  component: Lesson04ChildRoutes,
  children: [{ path: 'overview', component: ProjectOverview }]
}

// ProjectOverview renders in Lesson04ChildRoutes' router-outlet.`,
    },
  ];

  protected childActivated(component: unknown): void {
    const childPath = this.readChildPath(component);
    this.activeChildPath.set(childPath);
    this.addLog(`Nested outlet activated "${childPath}". Parent workspace stayed mounted.`);
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared. Change child tabs to see nested route changes.' }]);
    this.nextLogId = 2;
  }

  private readChildPath(component: unknown): string {
    const componentName = component?.constructor?.name;

    if (componentName === 'ProjectActivity') {
      return 'activity';
    }

    if (componentName === 'ProjectSettings') {
      return 'settings';
    }

    return 'overview';
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
