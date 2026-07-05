import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { RoutePreloadingLogService } from './route-preloading-log.service';

@Component({
  selector: 'app-lesson-17-preloading-lazy-routes',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-17-preloading-lazy-routes.html',
  styleUrl: './lesson-17-preloading-lazy-routes.css',
})
export class Lesson17PreloadingLazyRoutes {
  protected readonly log = inject(RoutePreloadingLogService);
  protected readonly activePanel = signal('overview');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Preloading is enabled at router setup time.',
      name: 'router setup',
      syntax: `provideRouter(
  routes,
  withHashLocation(),
  withPreloading(SelectiveRoutePreloadingStrategy)
)`,
    },
    {
      description: 'A custom strategy decides which lazy routes should preload.',
      name: 'strategy',
      syntax: `preload(route, load) {
  if (route.data?.['preload'] !== true) {
    // no: skip preloading
    return of(null);
  }

  // yes: call and return load()
  return load();
}`,
    },
    {
      description: 'A lazy route opts in with route data.',
      name: 'route opt-in',
      syntax: `{
  path: 'reports',
  data: { preload: true },
  loadChildren: () =>
    import('./preloaded-reports.routes').then(
      (m) => m.preloadedReportsRoutes
    )
}`,
    },
    {
      description: 'Lazy loading and preloading answer different questions.',
      name: 'lazy vs preload',
      syntax: `lazy loading:
  split code into a separate chunk

preloading:
  decide whether to download that chunk
  before the user clicks it`,
    },
    {
      description: 'Preloaded lazy code is still not part of the initial app bundle.',
      name: 'why not eager',
      syntax: `eager route:
  paid during first app load

lazy + preload:
  kept out of initial bundle
  downloaded after app starts
  can be conditional`,
    },
    {
      description: 'Use selective preloading for likely-next routes, not every heavy feature.',
      name: 'when to use',
      syntax: `good preload candidates:
  next tab after dashboard
  common settings route
  small reporting shell

avoid preloading:
  huge admin-only areas
  rarely used tools`,
    },
  ];

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown child route');
  }
}
