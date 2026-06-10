import { Component, computed, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-01-signal-basics',
  imports: [LearningNav],
  templateUrl: './lesson-01-signal-basics.html',
  styleUrl: './lesson-01-signal-basics.css',
})
export class Lesson01SignalBasics {
  protected readonly quantity = signal(1);
  protected readonly unitPrice = signal(12);
  protected readonly logs = signal<string[]>([
    'Signals are ready. Change quantity or price to see computed values update.',
  ]);

  protected readonly subtotal = computed(() => this.quantity() * this.unitPrice());
  protected readonly orderLabel = computed(
    () => `${this.quantity()} item(s) at $${this.unitPrice()} each`,
  );
  protected readonly freeShipping = computed(() => this.subtotal() >= 50);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A writable signal stores local reactive state.',
      name: 'create state',
      syntax: 'const quantity = signal(1);',
    },
    {
      description: 'Calling the signal reads its current value.',
      name: 'read state',
      syntax: 'quantity()',
    },
    {
      description: 'set replaces the value with a specific new value.',
      name: 'replace state',
      syntax: 'quantity.set(1);',
    },
    {
      description: 'update receives the current value and returns the next value.',
      name: 'derive next state',
      syntax: 'quantity.update((value) => value + 1);',
    },
    {
      description: 'computed recalculates automatically when the signals it reads change.',
      name: 'derived state',
      syntax: 'const subtotal = computed(() => quantity() * unitPrice());',
    },
  ];

  protected increaseQuantity(): void {
    this.quantity.update((quantity) => quantity + 1);
    this.addLog(`quantity.update(...) changed quantity to ${this.quantity()}.`);
  }

  protected decreaseQuantity(): void {
    this.quantity.update((quantity) => Math.max(1, quantity - 1));
    this.addLog(`quantity.update(...) changed quantity to ${this.quantity()}.`);
  }

  protected setStarterOrder(): void {
    this.quantity.set(1);
    this.unitPrice.set(12);
    this.addLog('set(...) restored the starter order.');
  }

  protected setBulkOrder(): void {
    this.quantity.set(5);
    this.unitPrice.set(12);
    this.addLog('set(...) changed quantity and price; computed signals recalculated.');
  }

  protected raisePrice(): void {
    this.unitPrice.update((price) => price + 3);
    this.addLog(`unitPrice.update(...) changed price to $${this.unitPrice()}.`);
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. The current signal values are still preserved.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}
