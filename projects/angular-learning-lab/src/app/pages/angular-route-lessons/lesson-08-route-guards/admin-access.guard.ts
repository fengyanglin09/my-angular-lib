import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RouteGuardAccessService } from './route-guard-access.service';

export const adminAccessGuard: CanActivateFn = () => {
  const access = inject(RouteGuardAccessService);
  const router = inject(Router);

  if (access.adminAccess()) {
    access.recordGuardDecision('canActivate allowed navigation to the admin route.');
    return true;
  }

  access.recordGuardDecision('canActivate blocked admin navigation and returned a UrlTree redirect.');

  return router.createUrlTree([
    '/angular-route-lessons/lesson-08-route-guards/access-denied',
  ]);
};
