import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProductsActions } from '../../../state/products/products.actions';
import {
  selectError,
  selectLoading,
  selectProducts,
  selectProductsSummary,
} from '../../../state/products/products.selectors';

@Component({
  selector: 'app-lesson-03-effects-products',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './lesson-03-effects-products.html',
  styleUrl: './lesson-03-effects-products.css',
})
export class Lesson03EffectsProducts implements OnInit {
  private readonly store = inject(Store);

  protected readonly products = this.store.selectSignal(selectProducts);
  protected readonly loading = this.store.selectSignal(selectLoading);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly summary = this.store.selectSignal(selectProductsSummary);

  ngOnInit(): void {
    this.loadProducts();
  }

  protected loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts({ shouldFail: false }));
  }

  protected simulateFailure(): void {
    this.store.dispatch(ProductsActions.loadProducts({ shouldFail: true }));
  }
}
