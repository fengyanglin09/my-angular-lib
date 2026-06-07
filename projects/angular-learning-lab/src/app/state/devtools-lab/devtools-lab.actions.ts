import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DevtoolsAuditEntry } from './devtools-lab.models';

export const DevtoolsLabActions = createActionGroup({
  source: 'DevTools Lab',
  events: {
    'Increment Counter': emptyProps(),
    'Set Label': props<{ label: string }>(),
    'Load Audit Trail': props<{ shouldFail: boolean }>(),
    'Load Audit Trail Success': props<{ entries: DevtoolsAuditEntry[] }>(),
    'Load Audit Trail Failure': props<{ error: string }>(),
    'Reset Lab': emptyProps(),
  },
});

