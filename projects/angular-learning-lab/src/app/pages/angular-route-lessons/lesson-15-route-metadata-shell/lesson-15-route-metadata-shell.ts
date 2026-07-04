import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { RouteShellMetadata } from './route-shell-metadata.models';

interface ActiveShellState {
  metadata: RouteShellMetadata;
  routePath: string;
  title: string;
}

const fallbackMetadata: RouteShellMetadata = {
  analyticsName: 'route_metadata_unknown',
  breadcrumb: ['Routes', 'Metadata Shell'],
  helpText: 'No route metadata was found for the active child route.',
  layout: 'standard',
  section: 'Routes',
};

@Component({
  selector: 'app-lesson-15-route-metadata-shell',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-15-route-metadata-shell.html',
  styleUrl: './lesson-15-route-metadata-shell.css',
})
export class Lesson15RouteMetadataShell {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  protected readonly activePanel = signal('overview');
  protected readonly shellState = signal<ActiveShellState>({
    metadata: fallbackMetadata,
    routePath: 'waiting',
    title: 'Waiting for active route',
  });
  protected readonly shellLog = signal<string[]>([
    'Shell is waiting for the first child route navigation.',
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Each child route declares metadata that belongs to navigation and layout.',
      name: 'route metadata',
      syntax: `{
  path: 'billing',
  title: 'Billing Center',
  component: MetadataBillingPanel,
  data: {
    shell: {
      breadcrumb: ['Workspace', 'Billing'],
      section: 'Finance'
    }
  }
}`,
    },
    {
      description: 'The parent shell walks down the active route tree to find the deepest active child route.',
      name: 'active route',
      syntax: `// parent may define many possible children
children: [
  { path: 'overview' },
  { path: 'billing' },
  { path: 'settings' }
]

// but one URL activates one child branch
let activeRoute = this.route;

while (activeRoute.firstChild) {
  activeRoute = activeRoute.firstChild;
}`,
    },
    {
      description: 'The shell reads the active child route snapshot after navigation completes.',
      name: 'read metadata',
      syntax: `const snapshot = activeRoute.snapshot;
const metadata = snapshot.data['shell'];
const title = snapshot.title;`,
    },
    {
      description: 'NavigationEnd is a good moment to refresh app-shell metadata.',
      name: 'NavigationEnd',
      syntax: `router.events.pipe(
  filter((event) => event instanceof NavigationEnd)
).subscribe(() => {
  this.refreshShellFromRoute();
});`,
    },
    {
      description: 'Keep route metadata for app chrome, not editable business data.',
      name: 'when to use',
      syntax: `good route metadata:
  breadcrumbs
  section labels
  document titles
  analytics names
  layout hints`,
    },
    {
      description: 'Parent and child routes can both have data. The shell can read the deepest page data, or combine it with parent context.',
      name: 'parent + child data',
      syntax: `parent data:
  area: 'Workspace'

child data:
  page: 'Billing'

shell can use:
  Workspace / Billing`,
    },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.refreshShellFromRoute(`NavigationEnd for ${event.urlAfterRedirects}.`);
      });
  }

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown routed component');
    this.refreshShellFromRoute('Child route activated.');
  }

  protected clearLog(): void {
    this.shellLog.set(['Log cleared. Navigate to another child route to rebuild shell metadata.']);
  }

  private refreshShellFromRoute(reason: string): void {
    const activeSnapshot = this.findDeepestSnapshot(this.route);
    const metadata = this.readShellMetadata(activeSnapshot);
    const routePath = activeSnapshot.routeConfig?.path ?? '(empty path)';
    const title = activeSnapshot.title ?? this.title.getTitle();

    this.shellState.set({
      metadata,
      routePath,
      title,
    });
    this.shellLog.update((logs) => [
      ...logs,
      `${reason} Shell read metadata for path "${routePath}".`,
    ]);
  }

  private findDeepestSnapshot(route: ActivatedRoute): ActivatedRouteSnapshot {
    let activeRoute = route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    return activeRoute.snapshot;
  }

  private readShellMetadata(snapshot: ActivatedRouteSnapshot): RouteShellMetadata {
    const metadata = snapshot.data['shell'];

    if (this.isRouteShellMetadata(metadata)) {
      return metadata;
    }

    return fallbackMetadata;
  }

  private isRouteShellMetadata(value: unknown): value is RouteShellMetadata {
    return (
      typeof value === 'object' &&
      value !== null &&
      'analyticsName' in value &&
      'breadcrumb' in value &&
      'helpText' in value &&
      'layout' in value &&
      'section' in value
    );
  }
}
