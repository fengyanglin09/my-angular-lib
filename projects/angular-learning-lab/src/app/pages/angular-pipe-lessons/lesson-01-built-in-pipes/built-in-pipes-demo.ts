import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, signal } from '@angular/core';

type BuiltInPipeExample = 'currency' | 'date' | 'number' | 'percent' | 'text';

@Component({
  selector: 'app-built-in-pipes-demo',
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    TitleCasePipe,
    UpperCasePipe,
  ],
  templateUrl: './built-in-pipes-demo.html',
  styleUrl: './built-in-pipes-demo.css',
})
export class BuiltInPipesDemo {
  protected readonly selectedExample = signal<BuiltInPipeExample>('currency');
  protected readonly examples: BuiltInPipeExample[] = [
    'currency',
    'date',
    'number',
    'percent',
    'text',
  ];
  protected readonly invoiceTotal = signal(4825.75);
  protected readonly shippedAt = signal(new Date('2026-07-11T14:30:00'));
  protected readonly completionRate = signal(0.873);
  protected readonly rawTitle = signal('quarterly billing review');

  protected selectExample(example: BuiltInPipeExample): void {
    this.selectedExample.set(example);
  }

  protected increaseTotal(): void {
    this.invoiceTotal.update((total) => total + 125.5);
  }

  protected increaseCompletion(): void {
    this.completionRate.update((rate) => Math.min(1, rate + 0.025));
  }
}
