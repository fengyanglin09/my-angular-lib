import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { RootVisitCounterService } from './root-visit-counter.service';
import { RouteProvidersWorkspaceStore } from './route-providers-workspace-store';

@Component({
  selector: 'app-lesson-16-route-providers',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-16-route-providers.html',
  styleUrl: './lesson-16-route-providers.css',
})
export class Lesson16RouteProviders {
  protected readonly rootCounter = inject(RootVisitCounterService);
  protected readonly store = inject(RouteProvidersWorkspaceStore);
  protected readonly activePanel = signal('overview');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A route can declare providers. Angular creates an injector for that route branch.',
      name: 'route provider',
      syntax: `{
  path: 'lesson-16-route-providers',
  component: Lesson16RouteProviders,
  providers: [RouteProvidersWorkspaceStore],
  children: [...]
}`,
    },
    {
      description: 'The parent route component can inject the route-scoped service.',
      name: 'parent injects',
      syntax: `protected readonly store =
  inject(RouteProvidersWorkspaceStore);`,
    },
    {
      description: 'Child routes under that parent get the same service instance.',
      name: 'children share',
      syntax: `export class ActivityPanel {
  protected readonly store =
    inject(RouteProvidersWorkspaceStore);
}`,
    },
    {
      description: 'A root service is created once for the whole app, so it lasts longer.',
      name: 'root provider',
      syntax: `@Injectable({ providedIn: 'root' })
export class RootVisitCounterService {}`,
    },
    {
      description: 'Use route providers for feature-local state that should not become global app state.',
      name: 'when to use',
      syntax: `good route provider state:
  wizard/session state
  feature filters
  route-local caches
  temporary drafts`,
    },
  ];

  constructor() {
    this.rootCounter.recordVisit();
  }

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown routed component');
  }
}
