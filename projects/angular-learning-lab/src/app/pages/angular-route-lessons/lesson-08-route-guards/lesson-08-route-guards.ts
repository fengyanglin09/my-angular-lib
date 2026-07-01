import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { RouteGuardAccessService } from './route-guard-access.service';

@Component({
  selector: 'app-lesson-08-route-guards',
  imports: [LearningNav, RouterLink, RouterOutlet],
  templateUrl: './lesson-08-route-guards.html',
  styleUrl: './lesson-08-route-guards.css',
})
export class Lesson08RouteGuards {
  protected readonly access = inject(RouteGuardAccessService);
  protected readonly activePanel = signal('public');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A functional guard is a function that Angular runs before activating a route.',
      name: 'canActivate function',
      syntax: `export const adminAccessGuard: CanActivateFn = () => {
  const access = inject(RouteGuardAccessService);
  return access.adminAccess() ? true : redirect;
};`,
    },
    {
      description: 'Attach the guard to the route that needs protection.',
      name: 'guarded route',
      syntax: `{ path: 'admin',
  canActivate: [adminAccessGuard],
  component: GuardAdminPanel
}`,
    },
    {
      description: 'Returning true allows navigation to continue.',
      name: 'allow',
      syntax: `if (access.adminAccess()) {
  return true;
}`,
    },
    {
      description: 'Returning a UrlTree cancels the attempted route and redirects somewhere else.',
      name: 'redirect',
      syntax: `return router.createUrlTree([
  '/angular-route-lessons/lesson-08-route-guards/access-denied'
]);`,
    },
    {
      description: 'A relative UrlTree is possible when you pass the route snapshot as relativeTo.',
      name: 'relative redirect',
      syntax: `export const adminAccessGuard: CanActivateFn = (route) => {
  return router.createUrlTree(['../access-denied'], {
    relativeTo: route
  });
};`,
    },
    {
      description: 'The return value tells Angular whether to continue, cancel, or redirect the navigation.',
      name: 'return options',
      syntax: `return true;
// allow navigation

return false;
// cancel navigation and stay put

return router.createUrlTree(['/access-denied']);
// cancel original navigation and redirect`,
    },
    {
      description: 'Guards run when navigation enters the guarded route, not continuously after the page is active.',
      name: 'guard timing',
      syntax: `// revoke access while already on admin
// the guard does not run again by itself
// navigate away/back to test the guard again`,
    },
  ];

  protected childActivated(component: unknown): void {
    const componentName = component?.constructor?.name;

    if (componentName === 'GuardAdminPanel') {
      this.activePanel.set('admin');
      return;
    }

    if (componentName === 'GuardDeniedPanel') {
      this.activePanel.set('access denied');
      return;
    }

    this.activePanel.set('public');
  }
}
