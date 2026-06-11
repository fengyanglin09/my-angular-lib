import { computed, Injectable, signal } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class CartSignalStore {
  private readonly itemsSignal = signal<CartItem[]>([
    { id: 'signals-course', name: 'Signals Course', price: 49, quantity: 1 },
  ]);
  private readonly discountSignal = signal(0);

  readonly items = this.itemsSignal.asReadonly();
  readonly discount = this.discountSignal.asReadonly();
  readonly itemCount = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.items().reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  );
  readonly total = computed(() =>
    Math.max(0, this.subtotal() - this.discount()),
  );
  readonly summary = computed(
    () => `${this.itemCount()} item(s), $${this.total()} total`,
  );

  addItem(item: Omit<CartItem, 'quantity'>): void {
    this.itemsSignal.update((items) => {
      const existingItem = items.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...items, { ...item, quantity: 1 }];
    });
  }

  decreaseItem(itemId: string): void {
    this.itemsSignal.update((items) =>
      items
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  applyDiscount(amount: number): void {
    this.discountSignal.set(amount);
  }

  clearCart(): void {
    this.itemsSignal.set([]);
    this.discountSignal.set(0);
  }
}
