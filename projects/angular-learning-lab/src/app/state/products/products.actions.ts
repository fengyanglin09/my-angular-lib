import { createActionGroup, props } from '@ngrx/store';

import { Product } from './products.models';

export const ProductsActions = createActionGroup({
  source: 'Products Lesson',
  events: {
    'Load Products': props<{ shouldFail: boolean }>(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
  },
});
