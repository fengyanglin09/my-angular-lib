import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';

@Component({
  selector: 'app-lesson-21-componentless-parent',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-21-componentless-parent.html',
  styleUrl: './lesson-21-componentless-parent.css',
})
export class Lesson21ComponentlessParent {
  protected readonly activePanel = signal('No child route active yet');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A normal parent route renders the lesson shell and owns this router-outlet.',
      name: 'shell route',
      syntax: `{
  path: 'lesson-21-componentless-parent',
  component: Lesson21ComponentlessParent,
  children: [...]
}`,
    },
    {
      description: 'A componentless route can group child routes without rendering an extra component.',
      name: 'componentless group',
      syntax: `{
  path: 'workspace/:workspaceId',
  data: {
    featureArea: 'Workspace Administration',
    requiredRole: 'Workspace Manager'
  },
  children: [...]
}`,
    },
    {
      description: 'Real routed components still live on the children below the componentless group.',
      name: 'child routes',
      syntax: `children: [
  { path: 'overview', component: OverviewPanel },
  { path: 'settings', component: SettingsPanel }
]`,
    },
    {
      description: 'The child can read live params and data from the componentless parent route.',
      name: 'read parent route reactively',
      syntax: `const groupRoute = route.parent;

const context = toSignal(
  combineLatest([
    groupRoute.paramMap,
    groupRoute.data
  ]).pipe(map(([params, data]) => ({
    workspaceId: params.get('workspaceId'),
    requiredRole: data['requiredRole']
  })))
);`,
    },
    {
      description: 'Use this when you need route grouping, not another layout component.',
      name: 'when to use',
      syntax: `good fit:
  shared params
  shared data
  shared guards
  shared providers

not needed:
  when parent has UI/layout`,
    },
  ];

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown child route');
  }
}
