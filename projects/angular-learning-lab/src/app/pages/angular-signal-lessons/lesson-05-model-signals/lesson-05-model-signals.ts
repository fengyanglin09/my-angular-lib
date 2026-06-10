import { Component, computed, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { QuantityPicker } from './quantity-picker';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-05-model-signals',
  imports: [LearningNav, QuantityPicker],
  templateUrl: './lesson-05-model-signals.html',
  styleUrl: './lesson-05-model-signals.css',
})
export class Lesson05ModelSignals {
  protected readonly quantity = signal(2);
  protected readonly unitPrice = signal(18);
  protected readonly logs = signal<string[]>([
    'Parent owns quantity. Child can update it through model binding.',
  ]);

  protected readonly subtotal = computed(() => this.quantity() * this.unitPrice());
  protected readonly cartSummary = computed(
    () => `${this.quantity()} item(s), $${this.subtotal()} subtotal`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The child declares writable two-way input state with model.',
      name: 'child model',
      syntax: 'quantity = model<number>(1);',
    },
    {
      description: 'The parent binds its signal to the child with banana-in-a-box syntax.',
      name: 'parent binding',
      syntax: '<app-quantity-picker [(quantity)]="quantity" />',
    },
    {
      description: 'When the child updates quantity, the parent signal updates too.',
      name: 'child update',
      syntax: 'quantity.update((value) => value + 1);',
    },
  ];

  protected setSingleItem(): void {
    this.quantity.set(1);
    this.addLog('Parent set quantity to 1.');
  }

  protected setFamilyPack(): void {
    this.quantity.set(6);
    this.addLog('Parent set quantity to 6.');
  }

  protected raisePrice(): void {
    this.unitPrice.update((price) => price + 2);
    this.addLog(`Parent raised unitPrice to $${this.unitPrice()}.`);
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. Change quantity in parent or child to see shared state.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}
