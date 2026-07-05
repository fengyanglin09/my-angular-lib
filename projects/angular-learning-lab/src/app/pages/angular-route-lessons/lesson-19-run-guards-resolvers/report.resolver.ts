import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import {
  ReportSnapshot,
  RunGuardsResolversLogService,
} from './run-guards-resolvers-log.service';

export const reportResolver: ResolveFn<ReportSnapshot> = (route) => {
  return inject(RunGuardsResolversLogService).resolveReport(route);
};
