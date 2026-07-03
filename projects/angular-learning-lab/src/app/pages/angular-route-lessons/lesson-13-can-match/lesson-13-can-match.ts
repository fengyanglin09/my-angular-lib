import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep } from '../angular-route-lesson.models';
import { CanMatchAccessService } from './can-match-access.service';

@Component({
  selector: 'app-lesson-13-can-match',
  imports: [LearningNav, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './lesson-13-can-match.html',
  styleUrl: './lesson-13-can-match.css',
})
export class Lesson13CanMatch {
  protected readonly access = inject(CanMatchAccessService);
  protected readonly activePanel = signal('public');

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The protected route branch declares what role it requires, then canMatch checks that metadata.',
      name: 'guarded route',
      syntax: `{
  path: 'protected',
  canMatch: [protectedFeatureCanMatchGuard],
  data: {
    requiredRole: 'Protected Feature'
  },
  loadChildren: () =>
    import('./restricted-feature.routes').then(
      (m) => m.restrictedFeatureRoutes
    )
}`,
    },
    {
      description: 'The guard reads the role from route data instead of hardcoding one route rule.',
      name: 'read route data',
      syntax: `export const protectedFeatureCanMatchGuard:
  CanMatchFn = (route) => {
    const requiredRole =
      route.data?.['requiredRole'];

    return access.hasRole(requiredRole)
      ? true
      : redirect;
  };`,
    },
    {
      description: 'Returning true lets Angular match the route and continue navigation.',
      name: 'allow match',
      syntax: `if (access.hasRole(requiredRole)) {
  return true;
}`,
    },
    {
      description: 'Returning a UrlTree redirects instead of matching this route branch.',
      name: 'redirect instead',
      syntax: `return router.createUrlTree([
  '/angular-route-lessons/lesson-13-can-match/access-denied'
]);`,
    },
    {
      description: 'The protected route group is lazy, so canMatch checks access at the entrance to the whole feature.',
      name: 'lazy boundary',
      syntax: `canMatch check
  read requiredRole from route data
  allowed -> protected branch can match
  allowed -> loadChildren imports feature routes
  denied -> protected branch is skipped
  denied -> redirect to access-denied`,
    },
    {
      description: 'After a lazy feature is available, canActivate can still protect one specific child page inside it.',
      name: 'branch vs page',
      syntax: `canMatch on lazy parent
  "Can this feature area match at all?"

canActivate on lazy child
  "The feature is available,
   but can this user enter this page?"`,
    },
    {
      description: 'canActivate protects activation. canMatch protects route matching.',
      name: 'guard choice',
      syntax: `canActivate
  route is matched first
  then entry/activation is checked

canMatch
  route branch eligibility is checked
  before that branch is accepted`,
    },
    {
      description: 'Like other guards, canMatch runs during navigation, not continuously after the user is already inside.',
      name: 'when it runs',
      syntax: `user is already on /protected/overview
access is revoked

// canMatch does not auto-kick the user out
// next protected navigation checks again`,
    },
  ];

  protected childActivated(component: unknown): void {
    this.activePanel.set(component?.constructor?.name ?? 'Unknown panel');
  }
}
