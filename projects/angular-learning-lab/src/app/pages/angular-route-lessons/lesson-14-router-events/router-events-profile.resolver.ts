import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { delay, of, tap } from 'rxjs';

import { RouterEventsLogService } from './router-events-log.service';
import {
  EventProfile,
  RouterEventsProfileService,
} from './router-events-profile.service';

export const routerEventsProfileResolver: ResolveFn<EventProfile> = (route) => {
  const log = inject(RouterEventsLogService);
  const profiles = inject(RouterEventsProfileService);
  const profileId = route.paramMap.get('profileId') ?? 'unknown';

  log.addLog(`Resolver read profileId="${profileId}" from the route params.`);

  return of(profiles.loadProfile(profileId)).pipe(
    delay(450),
    tap((profile) => log.addLog(`Resolver loaded ${profile.name} before activation.`)),
  );
};
