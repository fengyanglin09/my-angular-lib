import { inject, Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { RoutePreloadingLogService } from './route-preloading-log.service';

@Injectable({ providedIn: 'root' })
export class SelectiveRoutePreloadingStrategy implements PreloadingStrategy {
  private readonly log = inject(RoutePreloadingLogService);

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    const routePath = route.path ?? '(empty path)';

    if (route.data?.['preload'] !== true) {
      return of(null);
    }

    this.log.addLog(`Preloading started for lazy route "${routePath}".`);

    // Calling load() is the actual "yes, preload this lazy route" decision.
    return load().pipe(
      tap(() => {
        this.log.addLog(`Preloading finished for lazy route "${routePath}".`);
      }),
      catchError((error: Error) => {
        this.log.addLog(`Preloading failed for "${routePath}": ${error.message}`);
        return of(null);
      }),
    );
  }
}
