import { createFeature, createReducer, on } from '@ngrx/store';

import { ProductsActions } from './products.actions';
import { Product } from './products.models';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialProductsState,
    on(ProductsActions.loadProducts, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
      ...state,
      products,
      loading: false,
    })),
    on(ProductsActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});
