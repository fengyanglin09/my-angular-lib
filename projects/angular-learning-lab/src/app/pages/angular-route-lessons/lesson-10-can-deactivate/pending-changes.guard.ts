import { CanDeactivateFn } from '@angular/router';

export type PendingChangesDecision = boolean | Promise<boolean>;

export interface PendingChangesComponent {
  canDeactivateRoute: () => PendingChangesDecision;
}

export const pendingChangesGuard: CanDeactivateFn<PendingChangesComponent> = (
  component,
) => component.canDeactivateRoute();
