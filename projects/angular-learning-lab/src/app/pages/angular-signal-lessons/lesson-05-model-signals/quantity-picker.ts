import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-quantity-picker',
  templateUrl: './quantity-picker.html',
  styleUrl: './quantity-picker.css',
})
export class QuantityPicker {
  readonly quantity = model<number>(1);
  readonly label = input<string>('Quantity');
  readonly min = input<number>(1);
  readonly max = input<number>(10);

  protected readonly canDecrease = computed(() => this.quantity() > this.min());
  protected readonly canIncrease = computed(() => this.quantity() < this.max());

  protected decrease(): void {
    this.quantity.update((quantity) => Math.max(this.min(), quantity - 1));
  }

  protected increase(): void {
    this.quantity.update((quantity) => Math.min(this.max(), quantity + 1));
  }
}
