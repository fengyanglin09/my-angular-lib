import { Component, computed, linkedSignal, signal } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type Category = 'courses' | 'books' | 'tools';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface Product {
  category: Category;
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-lesson-06-linked-signal',
  imports: [LearningNav],
  templateUrl: './lesson-06-linked-signal.html',
  styleUrl: './lesson-06-linked-signal.css',
})
export class Lesson06LinkedSignal {
  protected readonly categories: Category[] = ['courses', 'books', 'tools'];
  protected readonly products: Product[] = [
    { category: 'courses', id: 'signals-lab', name: 'Signals Lab', price: 49 },
    { category: 'courses', id: 'rxjs-workshop', name: 'RxJS Workshop', price: 59 },
    { category: 'courses', id: 'ngrx-guide', name: 'NgRx Guide', price: 39 },
    { category: 'books', id: 'angular-patterns', name: 'Angular Patterns', price: 24 },
    { category: 'books', id: 'state-design', name: 'State Design Notes', price: 19 },
    { category: 'tools', id: 'dev-dashboard', name: 'Developer Dashboard', price: 15 },
    { category: 'tools', id: 'route-inspector', name: 'Route Inspector', price: 12 },
  ];

  protected readonly selectedCategory = signal<Category>('courses');
  protected readonly logs = signal<string[]>([
    'selectedProductId is linked to selectedCategory, but it is still writable.',
  ]);

  protected readonly visibleProducts = computed(() =>
    this.products.filter((product) => product.category === this.selectedCategory()),
  );

  protected readonly selectedProductId = linkedSignal(
    () => this.visibleProducts()[0]?.id ?? '',
  );

  protected readonly selectedProduct = computed(
    () =>
      this.visibleProducts().find(
        (product) => product.id === this.selectedProductId(),
      ) ?? null,
  );

  protected readonly pageSummary = computed(() => {
    const product = this.selectedProduct();

    if (!product) {
      return 'No product selected';
    }

    return `${product.name} selected from ${this.selectedCategory()}`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A source signal controls which products are valid.',
      name: 'source state',
      syntax: 'selectedCategory = signal<Category>("courses");',
    },
    {
      description: 'computed derives the valid options from the current category.',
      name: 'valid options',
      syntax: 'visibleProducts = computed(() => filterByCategory(...));',
    },
    {
      description: 'linkedSignal resets when its computation dependencies change.',
      name: 'linked state',
      syntax: 'selectedProductId = linkedSignal(() => visibleProducts()[0].id);',
    },
    {
      description: 'The linked signal can still be manually changed by the user.',
      name: 'manual update',
      syntax: 'selectedProductId.set(productId);',
    },
  ];

  protected selectCategory(category: Category): void {
    this.selectedCategory.set(category);
    this.addLog(
      `Category changed to "${category}", so linkedSignal reset selectedProductId to "${this.selectedProductId()}".`,
    );
  }

  protected selectProduct(productId: string): void {
    this.selectedProductId.set(productId);
    this.addLog(`User manually set selectedProductId to "${productId}".`);
  }

  protected clearLog(): void {
    this.logs.set([
      'Log cleared. Change category to see linkedSignal reset the selected product.',
    ]);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [...logs, message]);
  }
}
