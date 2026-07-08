import { Component, computed, signal } from '@angular/core';
import { Action, createActionGroup, createReducer, emptyProps, on, props } from '@ngrx/store';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type ProductCategory = 'backend' | 'frontend' | 'testing';

interface Product {
  archived: boolean;
  category: ProductCategory;
  featured: boolean;
  id: string;
  price: number;
  rating: number;
  title: string;
}

interface ProductFilters {
  search: string;
  showArchived: boolean;
}

interface CatalogState {
  filters: ProductFilters;
  products: Product[];
  selectedProductId: string;
}

interface CodeComparison {
  name: string;
  plain: string;
  ramda: string;
  takeaway: string;
}

const initialCatalogState: CatalogState = {
  filters: {
    search: '',
    showArchived: false,
  },
  products: [
    {
      archived: false,
      category: 'frontend',
      featured: false,
      id: 'angular-forms',
      price: 59,
      rating: 4.3,
      title: 'Angular Forms Field Guide',
    },
    {
      archived: false,
      category: 'backend',
      featured: true,
      id: 'ngrx-effects',
      price: 79,
      rating: 4.7,
      title: 'NgRx Effects In Practice',
    },
    {
      archived: true,
      category: 'testing',
      featured: false,
      id: 'selector-testing',
      price: 49,
      rating: 4.1,
      title: 'Selector Testing Workbook',
    },
  ],
  selectedProductId: 'ngrx-effects',
};

const CatalogActions = createActionGroup({
  events: {
    'Promote Product': props<{ productId: string }>(),
    Reset: emptyProps(),
    'Set Search': props<{ search: string }>(),
    'Toggle Archived': emptyProps(),
  },
  source: 'NgRx Ramda Catalog',
});

const normalizeSearch = R.pipe(R.trim, R.toLower);

function setSearchWithRamda(state: CatalogState, search: string): CatalogState {
  return R.assocPath(['filters', 'search'], search, state) as CatalogState;
}

function toggleArchivedWithRamda(state: CatalogState): CatalogState {
  return R.assocPath(
    ['filters', 'showArchived'],
    !state.filters.showArchived,
    state,
  ) as CatalogState;
}

function promoteProductWithRamda(product: Product): Product {
  return R.pipe(
    (current: Product) => R.assoc('featured', true, current) as Product,
    (current: Product) =>
      R.assoc('rating', Math.min(5, Number((current.rating + 0.2).toFixed(1))), current) as Product,
  )(product);
}

function selectVisibleProducts(state: CatalogState): Product[] {
  const search = normalizeSearch(state.filters.search);
  const products = state.products.filter((product) => {
    const title = normalizeSearch(product.title);
    const matchesSearch = search.length === 0 || R.includes(search, title);
    const matchesArchived = state.filters.showArchived || !product.archived;

    return matchesSearch && matchesArchived;
  });

  return R.sortBy((product: Product) => product.title.toLowerCase(), products);
}

function selectSelectedProduct(state: CatalogState): Product | undefined {
  return R.find(
    (product: Product) => product.id === state.selectedProductId,
    state.products,
  );
}

const catalogReducer = createReducer(
  initialCatalogState,
  on(CatalogActions.setSearch, (state, { search }) =>
    setSearchWithRamda(state, search),
  ),
  on(CatalogActions.toggleArchived, (state) =>
    toggleArchivedWithRamda(state),
  ),
  on(CatalogActions.promoteProduct, (state, { productId }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === productId ? promoteProductWithRamda(product) : product,
    ),
  })),
  on(CatalogActions.reset, () => initialCatalogState),
);

@Component({
  selector: 'app-lesson-09-ramda-with-ngrx',
  imports: [LearningNav],
  templateUrl: './lesson-09-ramda-with-ngrx.html',
  styleUrl: './lesson-09-ramda-with-ngrx.css',
})
export class Lesson09RamdaWithNgrx {
  protected readonly state = signal(initialCatalogState);
  protected readonly selectedProduct = computed(() => selectSelectedProduct(this.state()));
  protected readonly visibleProducts = computed(() => selectVisibleProducts(this.state()));

  protected readonly comparisons: CodeComparison[] = [
    {
      name: 'Nested filter update',
      plain: `return {
  ...state,
  filters: {
    ...state.filters,
    search,
  },
};`,
      ramda: `return assocPath(
  ['filters', 'search'],
  search,
  state
);`,
      takeaway: 'Ramda can reduce spread noise for nested immutable updates.',
    },
    {
      name: 'Selector pipeline',
      plain: `return products
  .filter(matchesFilters)
  .sort((a, b) =>
    a.title.localeCompare(b.title)
  );`,
      ramda: `return sortBy(
  (product) => product.title.toLowerCase(),
  products.filter(matchesFilters)
);`,
      takeaway: 'Ramda can make transformation steps read like data flow.',
    },
    {
      name: 'The tradeoff',
      plain: `product.id === id
  ? { ...product, featured: true }
  : product`,
      ramda: `product.id === id
  ? assoc('featured', true, product)
  : product`,
      takeaway: 'If the Ramda version is not clearer, plain TypeScript is fine.',
    },
  ];

  protected promote(productId: string): void {
    this.dispatch(CatalogActions.promoteProduct({ productId }));
  }

  protected reset(): void {
    this.dispatch(CatalogActions.reset());
  }

  protected setSearch(search: string): void {
    this.dispatch(CatalogActions.setSearch({ search }));
  }

  protected toggleArchived(): void {
    this.dispatch(CatalogActions.toggleArchived());
  }

  private dispatch(action: Action): void {
    this.state.update((state) => catalogReducer(state, action));
  }
}
