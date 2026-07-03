import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RouteGuardAccessService } from './route-guard-access.service';

export const adminAccessGuard: CanActivateFn = (route) => {
  const access = inject(RouteGuardAccessService);
  const router = inject(Router);
  const requiredRole = route.data['requiredRole'] as string | undefined;

  if (access.hasRole(requiredRole)) {
    access.recordGuardDecision(
      `canActivate allowed navigation because the user has ${requiredRole ?? 'no required'} access.`,
    );
    return true;
  }

  access.recordGuardDecision(
    `canActivate read requiredRole="${requiredRole}" from route data and redirected.`,
  );

  return router.createUrlTree([
    '/angular-route-lessons/lesson-08-route-guards/access-denied',
  ]);
};
