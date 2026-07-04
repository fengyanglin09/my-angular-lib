import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RouterEventsAccessService } from './router-events-access.service';
import { RouterEventsLogService } from './router-events-log.service';

export const routerEventsAccessGuard: CanActivateFn = (route) => {
  const access = inject(RouterEventsAccessService);
  const log = inject(RouterEventsLogService);
  const router = inject(Router);
  const requiredRole = route.data['requiredRole'] as string | undefined;

  if (access.hasRole(requiredRole)) {
    log.addLog(`Guard allowed report route because requiredRole="${requiredRole}" passed.`);
    return true;
  }

  log.addLog(`Guard redirected because requiredRole="${requiredRole}" did not pass.`);

  return router.createUrlTree([
    '/angular-route-lessons/lesson-14-router-events/access-denied',
  ]);
};
