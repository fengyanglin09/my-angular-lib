import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { CanMatchAccessService } from './can-match-access.service';

export const protectedFeatureCanMatchGuard: CanMatchFn = (route) => {
  const access = inject(CanMatchAccessService);
  const router = inject(Router);
  const requiredRole = route.data?.['requiredRole'] as string | undefined;

  if (access.hasRole(requiredRole)) {
    access.addLog(
      `canMatch read requiredRole="${requiredRole}" and allowed the protected lazy route to match.`,
    );
    return true;
  }

  access.addLog(
    `canMatch read requiredRole="${requiredRole}" from route data and returned a UrlTree.`,
  );

  return router.createUrlTree([
    '/angular-route-lessons/lesson-13-can-match/access-denied',
  ]);
};
