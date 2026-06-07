import { createActionGroup, props } from '@ngrx/store';

import { FunctionalTip } from './functional-tips.models';

export const FunctionalTipsActions = createActionGroup({
  source: 'Functional Effects Lesson',
  events: {
    'Load Tips': props<{ shouldFail: boolean }>(),
    'Load Tips Success': props<{ tips: FunctionalTip[] }>(),
    'Load Tips Failure': props<{ error: string }>(),
  },
});
