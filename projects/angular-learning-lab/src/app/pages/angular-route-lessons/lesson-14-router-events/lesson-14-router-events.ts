import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { RouterEventsAccessService } from './router-events-access.service';
import { RouterEventsLogService } from './router-events-log.service';

interface RouterEventEntry {
  detail: string;
  id: number;
  name: string;
  note: string;
  url: string;
}

interface RouterEventWithRouteSnapshot {
  snapshot: {
    component?: unknown;
    outlet?: string;
    routeConfig?: {
      path?: string;
      redirectTo?: string;
    } | null;
  };
}

@Component({
  selector: 'app-lesson-14-router-events',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-14-router-events.html',
  styleUrl: './lesson-14-router-events.css',
})
export class Lesson14RouterEvents {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private nextEventId = 1;

  protected readonly access = inject(RouterEventsAccessService);
  protected readonly extraLog = inject(RouterEventsLogService);
  protected readonly activePanel = signal('home');
  protected readonly latestTerminalEvent = signal('Waiting for navigation');
  protected readonly eventLog = signal<RouterEventEntry[]>([]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Router.events is an Observable of navigation lifecycle events.',
      name: 'subscribe',
      syntax: `router.events
  .pipe(takeUntilDestroyed())
  .subscribe((event) => {
    // inspect navigation event
  });`,
    },
    {
      description: 'NavigationStart begins a new navigation attempt.',
      name: 'start',
      syntax: `NavigationStart
  user clicked link
  or Router.navigate started`,
    },
    {
      description: 'Guard events happen before the target component renders.',
      name: 'guards',
      syntax: `GuardsCheckStart
  canMatch / canActivate / canDeactivate work
GuardsCheckEnd`,
    },
    {
      description: 'Resolver events happen after guards pass and before activation completes.',
      name: 'resolvers',
      syntax: `resolve: {
  profile: routerEventsProfileResolver
}

resolver(route) {
  const id = route.paramMap.get('profileId');
  return profileApi.loadProfile(id);
}`,
    },
    {
      description: 'Activation events are where routed components are created and placed into outlets.',
      name: 'activation',
      syntax: `ActivationStart
  Angular is activating route
ActivationEnd
  component is active in outlet`,
    },
    {
      description: 'Every navigation ends with success, cancel, redirect, error, or skip.',
      name: 'terminal events',
      syntax: `NavigationEnd
NavigationCancel
NavigationError
NavigationSkipped`,
    },
  ];

  constructor() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.recordRouterEvent(event);
      });
  }

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown panel');
  }

  protected useVisitorSession(): void {
    this.access.useVisitorSession();
    this.extraLog.addLog('Session changed to Visitor. Reporter route will redirect.');
  }

  protected useReporterSession(): void {
    this.access.useReporterSession();
    this.extraLog.addLog('Session changed to Reporter. Reporter route can activate.');
  }

  protected clearLogs(): void {
    this.eventLog.set([]);
    this.nextEventId = 1;
    this.latestTerminalEvent.set('Logs cleared');
    this.extraLog.clearLog();
  }

  private recordRouterEvent(event: Event): void {
    if (!this.shouldShowEvent(event)) {
      return;
    }

    const name = event.constructor.name;
    const url = this.readEventUrl(event);
    const entry: RouterEventEntry = {
      detail: this.readEventDetail(event),
      id: this.nextEventId,
      name,
      note: this.describeEvent(event),
      url,
    };

    this.nextEventId += 1;
    this.eventLog.update((events) => [...events.slice(-24), entry]);

    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.latestTerminalEvent.set(name);
    }
  }

  private readEventUrl(event: Event): string {
    if ('urlAfterRedirects' in event && typeof event.urlAfterRedirects === 'string') {
      return event.urlAfterRedirects;
    }

    if ('url' in event && typeof event.url === 'string') {
      return event.url;
    }

    return 'n/a';
  }

  private shouldShowEvent(event: Event): boolean {
    const name = event.constructor.name;

    return (
      event instanceof NavigationStart ||
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError ||
      name === 'RoutesRecognized' ||
      name === 'GuardsCheckStart' ||
      name === 'GuardsCheckEnd' ||
      name === 'ResolveStart' ||
      name === 'ResolveEnd' ||
      name === 'ActivationStart' ||
      name === 'ActivationEnd'
    );
  }

  private readEventDetail(event: Event): string {
    const name = event.constructor.name;

    if (this.hasRouteSnapshot(event)) {
      return this.describeRouteSnapshot(event.snapshot);
    }

    if (name === 'RoutesRecognized') {
      return 'Angular found the matching route tree.';
    }

    if (name === 'GuardsCheckStart' || name === 'GuardsCheckEnd') {
      return 'Guard phase for this navigation.';
    }

    if (name === 'ResolveStart' || name === 'ResolveEnd') {
      return 'Resolver phase for routes that declare resolve.';
    }

    return 'Navigation-level event.';
  }

  private hasRouteSnapshot(event: Event): event is Event & RouterEventWithRouteSnapshot {
    return (
      'snapshot' in event &&
      typeof event.snapshot === 'object' &&
      event.snapshot !== null
    );
  }

  private describeRouteSnapshot(snapshot: RouterEventWithRouteSnapshot['snapshot']): string {
    const path = snapshot.routeConfig?.path;
    const outlet = snapshot.outlet ?? 'primary';
    const component = this.readComponentName(snapshot.component);

    if (!path && !component) {
      return `Route shell in ${outlet} outlet.`;
    }

    if (!path) {
      return `${component} in ${outlet} outlet.`;
    }

    if (snapshot.routeConfig?.redirectTo) {
      return `Redirect route "${path}" to "${snapshot.routeConfig.redirectTo}".`;
    }

    return `Route path "${path}"${component ? ` -> ${component}` : ''} in ${outlet} outlet.`;
  }

  private readComponentName(component: unknown): string {
    if (typeof component === 'function') {
      return component.name;
    }

    if (component && typeof component === 'object' && 'name' in component) {
      return String(component.name);
    }

    return '';
  }

  private describeEvent(event: Event): string {
    const name = event.constructor.name;

    if (event instanceof NavigationStart) {
      return 'Navigation attempt started.';
    }

    if (event instanceof NavigationEnd) {
      return 'Navigation completed successfully.';
    }

    if (event instanceof NavigationCancel) {
      return 'Navigation was canceled, often because a guard redirected.';
    }

    if (event instanceof NavigationError) {
      return 'Navigation failed with an error.';
    }

    if (name === 'GuardsCheckStart') {
      return 'Angular is about to run route guards.';
    }

    if (name === 'GuardsCheckEnd') {
      return 'Route guard checks finished.';
    }

    if (name === 'RoutesRecognized') {
      return 'Angular matched the URL to the route config.';
    }

    if (name === 'ResolveStart') {
      return 'Resolvers are starting.';
    }

    if (name === 'ResolveEnd') {
      return 'Resolvers finished and data is ready.';
    }

    if (name === 'ActivationStart') {
      return 'Angular is creating or entering this matched route.';
    }

    if (name === 'ActivationEnd') {
      return 'This matched route finished activating.';
    }

    return 'Router lifecycle event.';
  }
}
