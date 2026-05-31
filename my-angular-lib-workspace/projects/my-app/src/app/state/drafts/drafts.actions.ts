import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DraftIdea } from './drafts.models';

export const DraftsActions = createActionGroup({
  source: 'Drafts Lesson',
  events: {
    'Load Drafts': emptyProps(),
    'Load Drafts Success': props<{ drafts: DraftIdea[] }>(),
    'Load Drafts Failure': props<{ error: string }>(),
    'Create Draft': props<{ title: string; category: string; shouldFail: boolean }>(),
    'Create Draft Success': props<{ draft: DraftIdea }>(),
    'Create Draft Failure': props<{ error: string }>(),
    'Update Draft Category': props<{
      id: number;
      category: string;
      shouldFail: boolean;
    }>(),
    'Update Draft Category Success': props<{ draft: DraftIdea }>(),
    'Update Draft Category Failure': props<{ id: number; error: string }>(),
  },
});
