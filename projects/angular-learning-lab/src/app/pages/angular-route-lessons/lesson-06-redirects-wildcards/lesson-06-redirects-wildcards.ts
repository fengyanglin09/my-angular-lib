import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-route-lesson.models';

@Component({
  selector: 'app-lesson-06-redirects-wildcards',
  imports: [LearningNav, RouterLink, RouterOutlet],
  templateUrl: './lesson-06-redirects-wildcards.html',
  styleUrl: './lesson-06-redirects-wildcards.css',
})
export class Lesson06RedirectsWildcards {
  private nextLogId = 2;

  protected readonly activePanel = signal('dashboard');
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: 'Redirect lesson loaded. Try the default, legacy, and missing links.',
    },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Empty child paths are often redirected to a useful default child route.',
      name: 'default redirect',
      syntax: `{ path: '',
  pathMatch: 'full',
  redirectTo: 'dashboard'
}`,
    },
    {
      description: 'Legacy URLs can redirect to the modern route without keeping old components around.',
      name: 'legacy redirect',
      syntax: `{ path: 'old-reports',
  pathMatch: 'full',
  redirectTo: 'reports'
}`,
    },
    {
      description: 'pathMatch full means the whole remaining URL segment must match.',
      name: 'pathMatch full',
      syntax: `path: ''
pathMatch: 'full'

// only matches exactly the empty child path`,
    },
    {
      description: 'A wildcard catches anything not matched above it. Put it last.',
      name: 'wildcard',
      syntax: `{ path: '**',
  component: RedirectDemoNotFound
}`,
    },
    {
      description: 'This wildcard is inside lesson 6 children, so it only catches missing lesson 6 child URLs.',
      name: 'scoped fallback',
      syntax: `{ path: 'lesson-06-redirects-wildcards',
  component: Lesson06RedirectsWildcards,
  children: [
    ...,
    { path: '**', component: RedirectDemoNotFound }
  ]
}`,
    },
  ];

  protected childActivated(component: unknown): void {
    const componentName = component?.constructor?.name ?? 'UnknownComponent';
    const panel = this.panelNameFromComponent(componentName);

    this.activePanel.set(panel);
    this.addLog(`Nested outlet activated ${componentName}.`);
  }

  protected clearLog(): void {
    this.logs.set([{ id: 1, message: 'Log cleared. Try navigating again.' }]);
    this.nextLogId = 2;
  }

  private panelNameFromComponent(componentName: string): string {
    if (componentName === 'RedirectDemoReports') {
      return 'reports';
    }

    if (componentName === 'RedirectDemoNotFound') {
      return 'wildcard fallback';
    }

    return 'dashboard';
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
