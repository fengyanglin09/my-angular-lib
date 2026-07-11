import { Component, signal } from '@angular/core';

import {
  OnpushProductCardDemo,
  type ProductDemo,
} from './onpush-product-card-demo';

@Component({
  selector: 'app-onpush-change-detection-demo',
  imports: [OnpushProductCardDemo],
  templateUrl: './onpush-change-detection-demo.html',
  styleUrl: './onpush-change-detection-demo.css',
})
export class OnpushChangeDetectionDemo {
  private nextReferenceId = 2;

  protected readonly product = signal<ProductDemo>({
    name: 'Analytics dashboard',
    referenceId: 1,
  });
  protected readonly parentTicks = signal(0);
  protected readonly log = signal(
    'The child receives product as an input. Replace the object to create a clear input change.'
  );

  protected mutateSameReference(): void {
    this.product().name =
      this.product().name === 'Analytics dashboard'
        ? 'Mutated dashboard name'
        : 'Analytics dashboard';
    this.parentTicks.update((count) => count + 1);
    this.log.set(
      'Mutated the same object reference. This is the kind of update OnPush makes harder to reason about.'
    );
  }

  protected replaceReference(): void {
    this.product.update((product) => ({
      ...product,
      name:
        product.name === 'Analytics dashboard'
          ? 'New dashboard reference'
          : 'Analytics dashboard',
      referenceId: this.nextReferenceId,
    }));
    this.nextReferenceId += 1;
    this.parentTicks.update((count) => count + 1);
    this.log.set(
      'Replaced the object. The OnPush child gets a new input reference.'
    );
  }
}
