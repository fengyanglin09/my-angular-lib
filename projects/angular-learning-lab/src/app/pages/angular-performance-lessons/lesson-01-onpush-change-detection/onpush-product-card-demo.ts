import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface ProductDemo {
  name: string;
  referenceId: number;
}

@Component({
  selector: 'app-onpush-product-card-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onpush-product-card-demo.html',
  styleUrl: './onpush-product-card-demo.css',
})
export class OnpushProductCardDemo {
  readonly product = input.required<ProductDemo>();
}
