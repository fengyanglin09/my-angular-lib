import { createSelector } from '@ngrx/store';

import { devtoolsLabFeature } from './devtools-lab.reducer';

export const {
  selectAuditTrail,
  selectCount,
  selectDevtoolsLabState,
  selectError,
  selectLabel,
  selectLoading,
} = devtoolsLabFeature;

export const selectDevtoolsLabSummary = createSelector(
  selectCount,
  selectAuditTrail,
  (count, auditTrail) =>
    `${count} counter actions and ${auditTrail.length} audit entries`,
);

