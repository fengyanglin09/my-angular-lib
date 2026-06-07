import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';

import { DevtoolsLabActions } from './devtools-lab.actions';
import { DevtoolsLabApi } from './devtools-lab-api';
import { DevtoolsLabEffects } from './devtools-lab.effects';

describe('DevtoolsLabEffects', () => {
  let actions$: Observable<Action>;
  let devtoolsLabApi: jasmine.SpyObj<DevtoolsLabApi>;
  let effects: DevtoolsLabEffects;

  beforeEach(() => {
    devtoolsLabApi = jasmine.createSpyObj<DevtoolsLabApi>('DevtoolsLabApi', [
      'loadAuditTrail',
    ]);

    TestBed.configureTestingModule({
      providers: [
        DevtoolsLabEffects,
        provideMockActions(() => actions$),
        { provide: DevtoolsLabApi, useValue: devtoolsLabApi },
      ],
    });

    effects = TestBed.inject(DevtoolsLabEffects);
  });

  it('dispatches success when the API returns audit entries', async () => {
    const entries = [{ id: 1, message: 'Loaded from API.' }];

    actions$ = of(DevtoolsLabActions.loadAuditTrail({ shouldFail: false }));
    devtoolsLabApi.loadAuditTrail.and.returnValue(of(entries));

    const result = await firstValueFrom(effects.loadAuditTrail$);

    expect(result).toEqual(DevtoolsLabActions.loadAuditTrailSuccess({ entries }));
  });

  it('dispatches failure when the API errors', async () => {
    actions$ = of(DevtoolsLabActions.loadAuditTrail({ shouldFail: true }));
    devtoolsLabApi.loadAuditTrail.and.returnValue(
      throwError(() => new Error('API failed')),
    );

    const result = await firstValueFrom(effects.loadAuditTrail$);

    expect(result).toEqual(
      DevtoolsLabActions.loadAuditTrailFailure({ error: 'API failed' }),
    );
  });
});

