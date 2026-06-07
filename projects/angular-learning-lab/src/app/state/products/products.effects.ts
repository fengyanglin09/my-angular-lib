import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ProductsActions } from './products.actions';
import { ProductsApi } from './products-api';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly productsApi = inject(ProductsApi);

  readonly loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(({ shouldFail }) =>
        this.productsApi.loadProducts(shouldFail).pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error: Error) =>
            of(ProductsActions.loadProductsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
