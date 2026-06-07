import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FeedbackItem } from './feedback.models';

export const FeedbackActions = createActionGroup({
  source: 'Feedback Lesson',
  events: {
    'Load Feedback': emptyProps(),
    'Load Feedback Success': props<{ feedback: FeedbackItem[] }>(),
    'Load Feedback Failure': props<{ error: string }>(),
    'Add Feedback': props<{ tempId: number; text: string; shouldFail: boolean }>(),
    'Add Feedback Success': props<{ tempId: number; feedback: FeedbackItem }>(),
    'Add Feedback Failure': props<{ tempId: number; error: string }>(),
    'Toggle Like': props<{ id: number; liked: boolean; shouldFail: boolean }>(),
    'Toggle Like Success': props<{ id: number }>(),
    'Toggle Like Failure': props<{ id: number; liked: boolean; error: string }>(),
    'Delete Feedback': props<{ feedback: FeedbackItem; shouldFail: boolean }>(),
    'Delete Feedback Success': props<{ id: number }>(),
    'Delete Feedback Failure': props<{ feedback: FeedbackItem; error: string }>(),
  },
});
