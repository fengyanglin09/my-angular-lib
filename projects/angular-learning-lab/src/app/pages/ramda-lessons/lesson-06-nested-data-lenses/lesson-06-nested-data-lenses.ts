import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type NestedOperation = 'over' | 'path' | 'pathOr' | 'set' | 'view';

interface OrderDetails {
  customer: {
    contact?: {
      email?: string;
      phone?: string;
    };
    id: string;
    name: string;
  };
  id: string;
  shipment: {
    address: {
      city: string;
      state: string;
      street: string;
    };
    method: 'ground' | 'pickup' | 'priority';
  };
  totals: {
    discount: number;
    subtotal: number;
    tax: number;
  };
}

interface NestedExample {
  code: string;
  description: string;
  name: NestedOperation;
  output: string;
  title: string;
}

interface PlainEquivalent {
  description: string;
  name: string;
  plain: string;
  ramda: string;
  title: string;
}

const initialOrder: OrderDetails = {
  customer: {
    contact: {
      email: 'lin@example.com',
    },
    id: 'customer-101',
    name: 'Lin Peng',
  },
  id: 'order-9001',
  shipment: {
    address: {
      city: 'Austin',
      state: 'TX',
      street: '100 Learning Lane',
    },
    method: 'ground',
  },
  totals: {
    discount: 10,
    subtotal: 120,
    tax: 9,
  },
};

const cityPath = ['shipment', 'address', 'city'];
const phonePath = ['customer', 'contact', 'phone'];
const methodLens = R.lensPath(['shipment', 'method']);
const subtotalLens = R.lensPath(['totals', 'subtotal']);

function setPriorityShipping(order: OrderDetails): OrderDetails {
  return R.set(methodLens, 'priority', order) as OrderDetails;
}

function increaseSubtotal(order: OrderDetails): OrderDetails {
  return R.over(subtotalLens, (subtotal: number) => subtotal + 25, order) as OrderDetails;
}

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-06-nested-data-lenses',
  imports: [LearningNav],
  templateUrl: './lesson-06-nested-data-lenses.html',
  styleUrl: './lesson-06-nested-data-lenses.css',
})
export class Lesson06NestedDataLenses {
  protected readonly activeOperation = signal<NestedOperation>('path');
  protected readonly order = signal(initialOrder);
  protected readonly plainEquivalents: PlainEquivalent[] = [
    {
      description: 'Read nested values safely.',
      name: 'path-path-or',
      plain: `order.shipment?.address?.city

order.customer?.contact?.phone ?? 'No phone on file'`,
      ramda: `path(['shipment', 'address', 'city'], order)

pathOr(
  'No phone on file',
  ['customer', 'contact', 'phone'],
  order,
)`,
      title: 'path / pathOr',
    },
    {
      description: 'Read or replace through a reusable lens.',
      name: 'view-set',
      plain: `order.shipment.method

{
  ...order,
  shipment: {
    ...order.shipment,
    method: 'priority',
  },
}`,
      ramda: `const methodLens = lensPath(['shipment', 'method']);

view(methodLens, order)
set(methodLens, 'priority', order)`,
      title: 'view / set',
    },
    {
      description: 'Update a nested value from its old value.',
      name: 'over',
      plain: `{
  ...order,
  totals: {
    ...order.totals,
    subtotal: order.totals.subtotal + 25,
  },
}`,
      ramda: `const subtotalLens = lensPath(['totals', 'subtotal']);

over(
  subtotalLens,
  (subtotal) => subtotal + 25,
  order,
)`,
      title: 'over',
    },
  ];

  protected readonly orderJson = computed(() => pretty(this.order()));
  protected readonly priorityOrder = computed(() => setPriorityShipping(this.order()));
  protected readonly subtotalOrder = computed(() => increaseSubtotal(this.order()));

  protected readonly operationButtons: Array<{ label: string; name: NestedOperation }> = [
    { label: 'path', name: 'path' },
    { label: 'pathOr', name: 'pathOr' },
    { label: 'view', name: 'view' },
    { label: 'set', name: 'set' },
    { label: 'over', name: 'over' },
  ];

  protected readonly examples = computed<NestedExample[]>(() => [
    {
      code: `path(['shipment', 'address', 'city'], order)`,
      description: 'Read a nested value. Missing paths return undefined.',
      name: 'path',
      output: pretty(R.path(cityPath, this.order())),
      title: 'Read a nested value',
    },
    {
      code: `pathOr(
  'No phone on file',
  ['customer', 'contact', 'phone'],
  order
)`,
      description: 'Read a nested value, but provide a fallback when it is missing.',
      name: 'pathOr',
      output: pretty(R.pathOr('No phone on file', phonePath, this.order())),
      title: 'Read with a fallback',
    },
    {
      code: `const methodLens = lensPath(['shipment', 'method']);

view(methodLens, order)`,
      description: 'A lens is a reusable focus on one path. view reads through the lens.',
      name: 'view',
      output: pretty(R.view(methodLens, this.order())),
      title: 'Read through a lens',
    },
    {
      code: `set(methodLens, 'priority', order)`,
      description: 'set returns a copy with that lens path replaced.',
      name: 'set',
      output: pretty(this.priorityOrder()),
      title: 'Replace a nested value',
    },
    {
      code: `const subtotalLens = lensPath(['totals', 'subtotal']);

over(subtotalLens, (subtotal) => subtotal + 25, order)`,
      description: 'over reads the old value, runs a function, and writes the returned value into a copy.',
      name: 'over',
      output: pretty(this.subtotalOrder()),
      title: 'Update a nested value with a function',
    },
  ]);

  protected readonly activeExample = computed(() =>
    this.examples().find((example) => example.name === this.activeOperation()) ?? this.examples()[0],
  );

  protected applyPriorityShipping(): void {
    this.order.set(this.priorityOrder());
    this.activeOperation.set('set');
  }

  protected applySubtotalIncrease(): void {
    this.order.set(this.subtotalOrder());
    this.activeOperation.set('over');
  }

  protected reset(): void {
    this.activeOperation.set('path');
    this.order.set(initialOrder);
  }

  protected setActiveOperation(operation: NestedOperation): void {
    this.activeOperation.set(operation);
  }
}
