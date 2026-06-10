import { Component, computed, input } from '@angular/core';

import { ProductPlan } from './lesson-04-input-signals';

@Component({
  selector: 'app-plan-preview-card',
  templateUrl: './plan-preview-card.html',
  styleUrl: './plan-preview-card.css',
})
export class PlanPreviewCard {
  readonly plan = input.required<ProductPlan>();
  readonly billingCycle = input<'monthly' | 'annual'>('monthly');

  protected readonly monthlyTotal = computed(() => {
    const multiplier = this.billingCycle() === 'annual' ? 10 : 1;

    return this.plan().price * multiplier;
  });

  protected readonly priceLabel = computed(() => {
    if (this.billingCycle() === 'annual') {
      return `$${this.monthlyTotal()} per year`;
    }

    return `$${this.monthlyTotal()} per month`;
  });
}
