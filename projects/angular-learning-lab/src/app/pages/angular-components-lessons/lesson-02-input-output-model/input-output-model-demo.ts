import { Component, input, model, output, signal } from '@angular/core';

@Component({
  selector: 'app-quantity-picker-demo',
  template: `
    <article class="picker-card">
      <p class="eyebrow">Reusable child control</p>
      <h3>{{ label() }}</h3>
      <div class="quantity-row">
        <button type="button" (click)="decrement()">-</button>
        <strong>{{ quantity() }}</strong>
        <button type="button" (click)="increment()">+</button>
      </div>
      <button type="button" (click)="saved.emit(quantity())">
        Save quantity
      </button>
    </article>
  `,
})
export class QuantityPickerDemo {
  readonly quantity = model<number>(1);
  readonly label = input<string>('Quantity');
  readonly min = input<number>(1);
  readonly max = input<number>(10);
  readonly saved = output<number>();

  protected decrement(): void {
    this.quantity.update((value) => Math.max(this.min(), value - 1));
  }

  protected increment(): void {
    this.quantity.update((value) => Math.min(this.max(), value + 1));
  }
}

@Component({
  selector: 'app-input-output-model-demo',
  imports: [QuantityPickerDemo],
  templateUrl: './input-output-model-demo.html',
  styleUrl: './input-output-model-demo.css',
})
export class InputOutputModelDemo {
  protected readonly cartQuantity = signal(2);
  protected readonly lastSaved = signal('Nothing saved yet.');

  protected saveQuantity(quantity: number): void {
    this.lastSaved.set(
      `Parent received saved output with quantity ${quantity}.`
    );
  }

  protected setParentQuantity(quantity: number): void {
    this.cartQuantity.set(quantity);
    this.lastSaved.set('Parent changed the model value.');
  }
}
