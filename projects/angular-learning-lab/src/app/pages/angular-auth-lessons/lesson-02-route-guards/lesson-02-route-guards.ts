import { Component } from '@angular/core';

import type { AuthLesson } from '../angular-auth-lessons.models';
import { AuthLessonPage } from '../auth-lesson-page/auth-lesson-page';
import { RouteGuardsDemo } from './route-guards-demo';

export const authLesson02 = {
  number: 2,
  route: 'lesson-02-route-guards',
  title: 'Route Guards',
  intro:
    'Route guards protect navigation. They should make a clear allow, deny, or redirect decision before Angular activates protected routes.',
  keyPoints: [
    'Use canActivate for route activation checks.',
    'Use canMatch to stop a lazy route branch from matching.',
    'Return a UrlTree when redirecting instead of imperatively navigating inside the guard.',
  ],
  mentalModel: `navigation starts
  user requests protected URL

guard runs
  allow true
  block false
  redirect UrlTree

route activates
  only if guard allows it`,
  demo: {
    title: 'Admin route checks current user role',
    before: 'User without admin role requests admin route.',
    after: 'Guard returns access-denied UrlTree.',
    actionLabel: 'Run guard decision',
  },
  codeSteps: [
    {
      name: 'Functional guard',
      description:
        'A guard can inject services just like a component or service.',
      syntax: `export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthSessionService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']);
};`,
    },
    {
      name: 'Route config',
      description: 'Attach the guard to protected route records.',
      syntax: `{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () => import('./dashboard'),
}`,
    },
    {
      name: 'Role data',
      description:
        'Route data can describe what permission the guard should check.',
      syntax: `{
  path: 'admin',
  data: { requiredRole: 'admin' },
  canActivate: [roleGuard],
}`,
    },
  ],
} satisfies AuthLesson;

@Component({
  selector: 'app-auth-lesson-02-route-guards',
  imports: [AuthLessonPage, RouteGuardsDemo],
  templateUrl: './lesson-02-route-guards.html',
  styleUrl: './lesson-02-route-guards.css',
})
export class AuthLesson02RouteGuards {
  protected readonly lesson = authLesson02;
}
