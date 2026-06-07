import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { FunctionalTip } from './functional-tips.models';

const tips: FunctionalTip[] = [
  {
    id: 1,
    title: 'Functional effects are plain exported functions',
    body: 'They use inject() for dependencies instead of constructor injection.',
  },
  {
    id: 2,
    title: 'Register them as an object',
    body: 'provideEffects(functionalTipsEffects) registers every functional effect export in the object.',
  },
  {
    id: 3,
    title: 'The stream shape is the same',
    body: 'You still use actions$, ofType, switchMap, map, catchError, and dispatch: false when needed.',
  },
];

@Injectable({ providedIn: 'root' })
export class FunctionalTipsApi {
  loadTips(shouldFail: boolean): Observable<FunctionalTip[]> {
    if (shouldFail) {
      return throwError(() => new Error('Functional effect API failed')).pipe(delay(650));
    }

    return of(structuredClone(tips)).pipe(delay(650));
  }
}
