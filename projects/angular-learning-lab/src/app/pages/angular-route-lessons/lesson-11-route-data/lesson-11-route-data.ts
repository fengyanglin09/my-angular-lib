import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';

@Component({
  selector: 'app-lesson-11-route-data',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-11-route-data.html',
  styleUrl: './lesson-11-route-data.css',
})
export class Lesson11RouteData {
  protected readonly activePanel = signal('dashboard');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Route data is static metadata attached to a route record.',
      name: 'route data',
      syntax: `{
  path: 'billing',
  component: RouteDataPanel,
  data: {
    page: {
      pageLabel: 'Billing',
      requiredRole: 'Billing Admin'
    }
  }
}`,
    },
    {
      description: 'The title property updates the browser document title for the active route.',
      name: 'route title',
      syntax: `{
  path: 'audit',
  title: 'Routes Lesson 11 - Audit',
  component: RouteDataPanel
}`,
    },
    {
      description: 'Components read static route data from ActivatedRoute.data.',
      name: 'read data',
      syntax: `route.data.pipe(
  map((data) => data['page'])
)`,
    },
    {
      description: 'The title can also be observed from the activated route.',
      name: 'read title',
      syntax: `route.title.subscribe((title) => {
  this.routeTitle.set(title);
});`,
    },
    {
      description: 'Data and resolver results both end up on ActivatedRoute.data, but they come from different places.',
      name: 'data vs resolve',
      syntax: `data: {
  page: staticPageMetadata
},
resolve: {
  project: projectResolver
}

// both are read from route.data`,
    },
    {
      description: 'Use route data for labels, breadcrumbs, required roles, feature areas, and layout hints.',
      name: 'when to use',
      syntax: `good route data:
  breadcrumb labels
  page headings
  required roles
  analytics names

not route data:
  backend records
  user-editable state`,
    },
  ];

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown panel');
  }
}
