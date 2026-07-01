import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

type RouteExample = 'dashboard' | 'category' | 'lesson';

interface RouteMatch {
  component: string;
  routeRecord: string;
  url: string;
}

const routeMatches: Record<RouteExample, RouteMatch> = {
  dashboard: {
    component: 'Home',
    routeRecord: `{ path: '', loadComponent: () => import('./pages/home/home') }`,
    url: '/',
  },
  category: {
    component: 'angularRouteLessonsRoutes',
    routeRecord: `{ path: 'angular-route-lessons', loadChildren: () => import('./pages/angular-route-lessons/angular-route-lessons.routes') }`,
    url: '/angular-route-lessons',
  },
  lesson: {
    component: 'Lesson01RouteBasics',
    routeRecord: `{ path: 'lesson-01-route-basics', loadComponent: () => import('./lesson-01-route-basics') }`,
    url: '/angular-route-lessons/lesson-01-route-basics',
  },
};

@Component({
  selector: 'app-lesson-01-route-basics',
  imports: [LearningNav, RouterLink],
  templateUrl: './lesson-01-route-basics.html',
  styleUrl: './lesson-01-route-basics.css',
})
export class Lesson01RouteBasics {
  private nextLogId = 2;

  protected readonly selectedExample = signal<RouteExample>('lesson');
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: 'Router lesson loaded from /angular-route-lessons/lesson-01-route-basics.',
    },
  ]);

  protected readonly selectedMatch = computed(() => routeMatches[this.selectedExample()]);

  protected readonly selectedSummary = computed(
    () => `${this.selectedMatch().url} renders ${this.selectedMatch().component}.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The root route table decides which top-level section should load.',
      name: 'root routes',
      syntax: `export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home') },
  { path: 'angular-route-lessons', loadChildren: () => import('./pages/angular-route-lessons/angular-route-lessons.routes') },
];`,
    },
    {
      description: 'A category route file keeps one learning track from crowding app.routes.ts.',
      name: 'child routes',
      syntax: `export const angularRouteLessonsRoutes: Routes = [
  { path: 'lesson-01-route-basics', loadComponent: () => import('./lesson-01-route-basics') },
];`,
    },
    {
      description: 'routerLink asks Angular Router to navigate inside the running app.',
      name: 'navigation link',
      syntax: `<a [routerLink]="['/angular-route-lessons/lesson-01-route-basics']">
  Open lesson
</a>`,
    },
    {
      description: 'The app shell owns the outlet. The matched route component appears there.',
      name: 'render target',
      syntax: `<router-outlet />`,
    },
  ];

  protected readonly comparisonSteps: CodeStep[] = [
    {
      description: 'A normal href asks the browser to request the page again. That can reload the whole Angular app.',
      name: 'browser link',
      syntax: `<a href="/angular-route-lessons/lesson-01-route-basics">
  Browser reload navigation
</a>`,
    },
    {
      description: 'routerLink keeps the Angular app alive, changes the URL, and swaps the routed component in the outlet.',
      name: 'router link',
      syntax: `<a [routerLink]="['/angular-route-lessons/lesson-01-route-basics']">
  Angular Router navigation
</a>`,
    },
    {
      description: 'loadComponent lazy-loads one standalone component when this exact route is visited.',
      name: 'lazy component',
      syntax: `{ path: 'lesson-01-route-basics',
  loadComponent: () => import('./lesson-01-route-basics')
}`,
    },
    {
      description: 'component uses a component that was imported up front. It is simpler, but not lazy-loaded.',
      name: 'eager component',
      syntax: `import { Home } from './pages/home/home';

{ path: '', component: Home }`,
    },
    {
      description: 'loadChildren lazy-loads a group of child routes, which is useful for a whole lesson category.',
      name: 'route group',
      syntax: `{ path: 'angular-route-lessons',
  loadChildren: () => import('./angular-route-lessons.routes')
}`,
    },
  ];

  protected selectExample(example: RouteExample): void {
    this.selectedExample.set(example);
    this.addLog(`Selected the ${example} route example.`);
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
