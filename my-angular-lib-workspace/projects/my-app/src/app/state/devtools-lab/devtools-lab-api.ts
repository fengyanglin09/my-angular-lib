import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { DevtoolsAuditEntry } from './devtools-lab.models';

@Injectable({ providedIn: 'root' })
export class DevtoolsLabApi {
  loadAuditTrail(shouldFail: boolean): Observable<DevtoolsAuditEntry[]> {
    if (shouldFail) {
      return throwError(
        () => new Error('The audit service rejected this request.'),
      ).pipe(delay(600));
    }

    return of([
      {
        id: 1,
        message: 'Action entered the reducer and produced a new state object.',
      },
      {
        id: 2,
        message: 'Effect listened for the load action and called the mock API.',
      },
      {
        id: 3,
        message: 'Success action carried backend data back into the reducer.',
      },
    ]).pipe(delay(600));
  }
}

