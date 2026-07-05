import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import {
  ProgrammaticResolverLogService,
  SupportTicketSnapshot,
} from './programmatic-resolver-log.service';

export const supportTicketResolver: ResolveFn<SupportTicketSnapshot> = (route) => {
  return inject(ProgrammaticResolverLogService).resolveTicket(route);
};
