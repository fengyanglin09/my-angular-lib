import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { map, scan, shareReplay, startWith, Subject } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  lastEvent: string;
}

type CartEvent =
  | { product: Product; type: 'add' }
  | { productId: number; type: 'remove' }
  | { type: 'clear' };

interface CartViewModel extends CartState {
  totalItems: number;
  totalPrice: number;
}

@Component({
  selector: 'app-lesson-14-scan-state',
  imports: [AsyncPipe, CurrencyPipe, LearningNav],
  templateUrl: './lesson-14-scan-state.html',
  styleUrl: './lesson-14-scan-state.css',
})
export class Lesson14ScanState implements OnDestroy {
  private readonly cartEvents$ = new Subject<CartEvent>();

  protected readonly products: Product[] = [
    { id: 1, name: 'Angular notebook', price: 18 },
    { id: 2, name: 'RxJS mug', price: 14 },
    { id: 3, name: 'Debug hoodie', price: 42 },
  ];

  protected readonly vm$ = this.cartEvents$.pipe(
    scan<CartEvent, CartState>((state, event) => this.reduceCart(state, event), {
      items: [],
      lastEvent: 'Waiting for cart events.',
    }),
    startWith({
      items: [],
      lastEvent: 'Initial empty cart from startWith.',
    } satisfies CartState),
    map((state) => ({
      ...state,
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    })),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  ngOnDestroy(): void {
    this.cartEvents$.complete();
  }

  protected addProduct(product: Product): void {
    this.cartEvents$.next({ product, type: 'add' });
  }

  protected clearCart(): void {
    this.cartEvents$.next({ type: 'clear' });
  }

  protected removeProduct(productId: number): void {
    this.cartEvents$.next({ productId, type: 'remove' });
  }

  private reduceCart(state: CartState, event: CartEvent): CartState {
    if (event.type === 'clear') {
      return {
        items: [],
        lastEvent: 'clear event emptied the cart.',
      };
    }

    if (event.type === 'remove') {
      const existingItem = state.items.find((item) => item.id === event.productId);

      if (!existingItem) {
        return {
          ...state,
          lastEvent: `remove event ignored product ${event.productId}; it was not in the cart.`,
        };
      }

      const items =
        existingItem.quantity === 1
          ? state.items.filter((item) => item.id !== event.productId)
          : state.items.map((item) =>
              item.id === event.productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            );

      return {
        items,
        lastEvent: `remove event decreased ${existingItem.name}.`,
      };
    }

    const existingItem = state.items.find((item) => item.id === event.product.id);
    const items = existingItem
      ? state.items.map((item) =>
          item.id === event.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...state.items, { ...event.product, quantity: 1 }];

    return {
      items,
      lastEvent: `add event included ${event.product.name}.`,
    };
  }
}
