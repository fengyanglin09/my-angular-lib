import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import {
  ConcurrencyResult,
  ConcurrencyStrategy,
} from './concurrency.models';

@Injectable({ providedIn: 'root' })
export class ConcurrencyApi {
  runRequest(
    strategy: ConcurrencyStrategy,
    id: number,
  ): Observable<ConcurrencyResult> {
    return of({
      id,
      strategy,
      completedAt: new Date().toLocaleTimeString(),
    }).pipe(delay(1200));
  }
}
