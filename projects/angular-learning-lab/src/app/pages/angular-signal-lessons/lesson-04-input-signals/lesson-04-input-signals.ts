import { Component, computed, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { PlanPreviewCard } from './plan-preview-card';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface ProductPlan {
  id: string;
  name: string;
  price: number;
  seats: number;
}

@Component({
  selector: 'app-lesson-04-input-signals',
  imports: [LearningNav, PlanPreviewCard],
  templateUrl: './lesson-04-input-signals.html',
  styleUrl: './lesson-04-input-signals.css',
})
export class Lesson04InputSignals {
  protected readonly plans: ProductPlan[] = [
    { id: 'starter', name: 'Starter', price: 12, seats: 3 },
    { id: 'growth', name: 'Growth', price: 29, seats: 12 },
    { id: 'enterprise', name: 'Enterprise', price: 79, seats: 50 },
  ];

  protected readonly selectedPlanId = signal('starter');
  protected readonly billingCycle = signal<'monthly' | 'annual'>('monthly');
  protected readonly logs = signal<string[]>([
    'Parent owns selectedPlanId and billingCycle. Child receives them as input signals.',
  ]);

  protected readonly selectedPlan = computed(
    () =>
      this.plans.find((plan) => plan.id === this.selectedPlanId()) ??
      this.plans[0],
  );

  protected readonly parentSummary = computed(
    () => `${this.selectedPlan().name} plan, ${this.billingCycle()} billing`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Parent state can be plain writable signals.',
      name: 'parent state',
      syntax: 'selectedPlanId = signal("starter");',
    },
    {
      description: 'The child declares signal inputs with input or input.required.',
      name: 'child input',
      syntax: 'plan = input.required<ProductPlan>();',
    },
    {
      description: 'The child reads input signals the same way it reads local signals.',
      name: 'read input',
      syntax: 'computed(() => plan().price * seats())',
    },
  ];

  protected selectPlan(planId: string): void {
    this.selectedPlanId.set(planId);
    this.addLog(`Parent changed selectedPlanId to "${planId}". Child input updated.`);
  }

  protected setBillingCycle(billingCycle: 'monthly' | 'annual'): void {
    this.billingCycle.set(billingCycle);
    this.addLog(`Parent changed billingCycle to "${billingCycle}". Child computed values updated.`);
  }

  protected clearLog(): void {
    this.logs.set(['Log cleared. Change the parent signals to update the child inputs.']);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}
