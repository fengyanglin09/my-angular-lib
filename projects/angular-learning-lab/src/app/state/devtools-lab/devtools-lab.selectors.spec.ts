import { selectDevtoolsLabSummary } from './devtools-lab.selectors';

describe('devtoolsLab selectors', () => {
  it('creates a readable summary from count and audit entries', () => {
    const summary = selectDevtoolsLabSummary.projector(2, [
      { id: 1, message: 'Reducer updated state.' },
      { id: 2, message: 'Effect returned data.' },
    ]);

    expect(summary).toBe('2 counter actions and 2 audit entries');
  });
});

