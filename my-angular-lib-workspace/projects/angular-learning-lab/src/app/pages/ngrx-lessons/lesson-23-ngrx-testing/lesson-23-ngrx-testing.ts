import { Component } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface TestingExample {
  code: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-lesson-23-ngrx-testing',
  imports: [LearningNav],
  templateUrl: './lesson-23-ngrx-testing.html',
  styleUrl: './lesson-23-ngrx-testing.css',
})
export class Lesson23NgrxTesting {
  protected readonly examples: TestingExample[] = [
    {
      title: 'Reducer Test',
      description:
        'Call the reducer with a starting state and an action, then assert the returned state.',
      code: `const state = devtoolsLabFeature.reducer(
  initialDevtoolsLabState,
  DevtoolsLabActions.incrementCounter(),
);

expect(state.count).toBe(1);`,
    },
    {
      title: 'Selector Test',
      description:
        'Call the selector projector when you want to test only the derivation logic.',
      code: `const summary = selectDevtoolsLabSummary.projector(
  2,
  [{ id: 1, message: 'Loaded.' }],
);

expect(summary).toBe('2 counter actions and 1 audit entries');`,
    },
    {
      title: 'Effect Test',
      description:
        'Push an action into a mock Actions stream, mock the service result, then assert the emitted action.',
      code: `actions$ = of(DevtoolsLabActions.loadAuditTrail({
  shouldFail: false,
}));
devtoolsLabApi.loadAuditTrail.and.returnValue(of(entries));

const result = await firstValueFrom(effects.loadAuditTrail$);

expect(result).toEqual(
  DevtoolsLabActions.loadAuditTrailSuccess({ entries }),
);`,
    },
  ];
}

