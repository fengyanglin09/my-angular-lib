import { DevtoolsLabActions } from './devtools-lab.actions';
import {
  devtoolsLabFeature,
  initialDevtoolsLabState,
} from './devtools-lab.reducer';

describe('devtoolsLab reducer', () => {
  it('increments the counter', () => {
    const state = devtoolsLabFeature.reducer(
      initialDevtoolsLabState,
      DevtoolsLabActions.incrementCounter(),
    );

    expect(state.count).toBe(1);
  });

  it('sets loading when audit trail starts loading', () => {
    const state = devtoolsLabFeature.reducer(
      {
        ...initialDevtoolsLabState,
        error: 'Old error',
      },
      DevtoolsLabActions.loadAuditTrail({ shouldFail: false }),
    );

    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });
});

