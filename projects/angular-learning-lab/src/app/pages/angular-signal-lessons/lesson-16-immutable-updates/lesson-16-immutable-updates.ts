import { Component, computed, effect, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  lastUpdatedBy: string;
}

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface LessonLog {
  id: number;
  message: string;
}

const initialCart: CartState = {
  items: [
    { id: 1, name: 'Signals notebook', price: 18, quantity: 1 },
    { id: 2, name: 'Angular workshop pass', price: 80, quantity: 1 },
  ],
  lastUpdatedBy: 'Initial cart',
};

@Component({
  selector: 'app-lesson-16-immutable-updates',
  imports: [LearningNav],
  templateUrl: './lesson-16-immutable-updates.html',
  styleUrl: './lesson-16-immutable-updates.css',
})
export class Lesson16ImmutableUpdates {
  private nextItemId = 3;
  private nextLogId = 2;

  protected readonly cart = signal<CartState>(this.createInitialCart());
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Cart effect is waiting for signal notifications.' },
  ]);

  protected readonly visibleItems = computed(() =>
    this.cart().items.map((item) => ({
      ...item,
      lineTotal: item.price * item.quantity,
    })),
  );

  protected readonly itemCount = computed(() =>
    this.cart().items.reduce((total, item) => total + item.quantity, 0),
  );

  protected readonly cartTotal = computed(() =>
    this.cart().items.reduce((total, item) => total + item.price * item.quantity, 0),
  );
  protected readonly lastUpdatedBy = computed(() => this.cart().lastUpdatedBy);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Create a new object and a new array when nested state changes.',
      name: 'safe array update',
      syntax: `cart.update((cart) => ({
  ...cart,
  items: [...cart.items, newItem]
}))`,
    },
    {
      description: 'Create a new item object when one item changes.',
      name: 'safe item update',
      syntax: `items: cart.items.map((item) =>
  item.id === id
    ? { ...item, quantity: item.quantity + 1 }
    : item
)`,
    },
    {
      description: 'Changing the existing object directly does not notify signal dependents.',
      name: 'mutation problem',
      syntax: `cart().items[0].quantity += 1
// no signal set/update happened`,
    },
    {
      description: 'Setting the exact same object reference is also not a meaningful signal update.',
      name: 'same reference',
      syntax: `const current = cart();
cart.set(current)
// same reference, no change`,
    },
  ];

  constructor() {
    effect(() => {
      this.addLog(
        `Cart effect ran: ${this.itemCount()} items, total $${this.cartTotal()}, source "${this.lastUpdatedBy()}".`,
      );
    });
  }

  protected addItemSafely(): void {
    const nextId = this.nextItemId;
    this.nextItemId += 1;

    this.cart.update((cart) => ({
      ...cart,
      items: [
        ...cart.items,
        {
          id: nextId,
          name: `Practice item ${nextId}`,
          price: 12 + nextId,
          quantity: 1,
        },
      ],
      lastUpdatedBy: 'Safe add item',
    }));
  }

  protected increaseFirstItemSafely(): void {
    this.cart.update((cart) => ({
      ...cart,
      items: cart.items.map((item, index) =>
        index === 0 ? { ...item, quantity: item.quantity + 1 } : item,
      ),
      lastUpdatedBy: 'Safe quantity update',
    }));
  }

  protected mutateFirstItemDirectly(): void {
    const current = this.cart();
    const firstItem = current.items[0];

    if (!firstItem) {
      this.addLog('Unsafe mutation skipped because the cart is empty.');
      return;
    }

    firstItem.quantity += 1;
    current.lastUpdatedBy = 'Unsafe direct mutation';
    this.addLog('Directly mutated cart().items[0].quantity; the cart signal did not notify dependents.');
  }

  protected setSameCartReference(): void {
    const current = this.cart();
    this.cart.set(current);
    this.addLog('Called cart.set(currentCart) with the same object reference; no signal notification.');
  }

  protected resetCart(): void {
    this.nextItemId = 3;
    this.cart.set(this.createInitialCart());
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }

  private createInitialCart(): CartState {
    return {
      items: initialCart.items.map((item) => ({ ...item })),
      lastUpdatedBy: initialCart.lastUpdatedBy,
    };
  }
}
