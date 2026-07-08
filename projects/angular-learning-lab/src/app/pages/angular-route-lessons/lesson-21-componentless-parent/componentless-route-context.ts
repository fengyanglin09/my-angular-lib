import { Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';

export interface ComponentlessRouteContext {
  featureArea: string;
  requiredRole: string;
  workspaceId: string;
}

function readSnapshotContext(route: ActivatedRoute): ComponentlessRouteContext {
  const groupRoute = route.parent;

  return {
    featureArea: String(groupRoute?.snapshot.data['featureArea'] ?? 'Unknown feature area'),
    requiredRole: String(groupRoute?.snapshot.data['requiredRole'] ?? 'Unknown role'),
    workspaceId: groupRoute?.snapshot.paramMap.get('workspaceId') ?? 'unknown-workspace',
  };
}

export function componentlessRouteContextSignal(
  route: ActivatedRoute,
): Signal<ComponentlessRouteContext> {
  const groupRoute = route.parent;

  if (!groupRoute) {
    return signal(readSnapshotContext(route));
  }

  return toSignal(
    combineLatest([groupRoute.paramMap, groupRoute.data]).pipe(
      map(([paramMap, data]) => ({
        featureArea: String(data['featureArea'] ?? 'Unknown feature area'),
        requiredRole: String(data['requiredRole'] ?? 'Unknown role'),
        workspaceId: paramMap.get('workspaceId') ?? 'unknown-workspace',
      })),
    ),
    { initialValue: readSnapshotContext(route) },
  );
}
