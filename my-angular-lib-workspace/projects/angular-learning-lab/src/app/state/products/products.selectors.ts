import { createSelector } from '@ngrx/store';

import { productsFeature } from './products.reducer';

export const {
  selectProductsState,
  selectProducts,
  selectLoading,
  selectError,
} = productsFeature;

export const selectProductsTotal = createSelector(
  selectProducts,
  (products) => products.reduce((total, product) => total + product.price, 0),
);

export const selectProductsSummary = createSelector(
  selectProducts,
  selectProductsTotal,
  (products, total) => `${products.length} products, $${total} total`,
);
