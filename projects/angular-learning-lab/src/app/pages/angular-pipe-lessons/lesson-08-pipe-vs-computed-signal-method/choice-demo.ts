import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type Choice = 'computed' | 'method' | 'pipe';

@Component({
  selector: 'app-pipe-choice-demo',
  imports: [CurrencyPipe],
  templateUrl: './choice-demo.html',
  styleUrl: './choice-demo.css',
})
export class PipeChoiceDemo {
  protected readonly quantity = signal(2);
  protected readonly unitPrice = signal(49.95);
  protected readonly choice = signal<Choice>('pipe');
  protected readonly subtotal = computed(
    () => this.quantity() * this.unitPrice()
  );
  protected readonly recommendation = computed(() => {
    if (this.choice() === 'pipe') {
      return 'Use a pipe when the value is already known and only needs display formatting.';
    }

    if (this.choice() === 'computed') {
      return 'Use computed when the value is derived state that other template or TypeScript code may reuse.';
    }

    return 'Use a method for commands or event-time calculations, not repeated template derivation.';
  });

  protected increaseQuantity(): void {
    this.quantity.update((quantity) => quantity + 1);
  }

  protected increasePrice(): void {
    this.unitPrice.update((price) => Number((price + 5).toFixed(2)));
  }

  protected choose(choice: Choice): void {
    this.choice.set(choice);
  }

  protected calculateMethodSubtotal(): string {
    return `Method result: ${this.quantity()} x ${this.unitPrice()} = ${this.subtotal().toFixed(
      2
    )}`;
  }
}
