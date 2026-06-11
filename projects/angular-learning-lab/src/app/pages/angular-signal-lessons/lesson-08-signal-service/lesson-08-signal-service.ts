import { Component } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CartActionsPanel } from './cart-actions-panel';
import { CartSignalStore } from './cart-signal-store';
import { CartSummaryPanel } from './cart-summary-panel';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

@Component({
  selector: 'app-lesson-08-signal-service',
  imports: [CartActionsPanel, CartSummaryPanel, LearningNav],
  providers: [CartSignalStore],
  templateUrl: './lesson-08-signal-service.html',
  styleUrl: './lesson-08-signal-service.css',
})
export class Lesson08SignalService {
  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'The store keeps writable signals private.',
      name: 'private state',
      syntax: 'private readonly itemsSignal = signal<CartItem[]>([]);',
    },
    {
      description: 'Components read public readonly signals and computed values.',
      name: 'public reads',
      syntax: 'readonly items = itemsSignal.asReadonly();',
    },
    {
      description: 'Methods are the public API for changing state.',
      name: 'store methods',
      syntax: 'addItem(item) { itemsSignal.update(...); }',
    },
    {
      description: 'Providing the store at the lesson level shares one instance below it.',
      name: 'provider scope',
      syntax: 'providers: [CartSignalStore]',
    },
  ];
}
