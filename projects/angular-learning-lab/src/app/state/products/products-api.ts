import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { Product } from './products.models';

const demoProducts: Product[] = [
  {
    id: 1,
    name: 'Angular Signals Notebook',
    category: 'Books',
    price: 24,
  },
  {
    id: 2,
    name: 'RxJS Marble Cards',
    category: 'Learning',
    price: 16,
  },
  {
    id: 3,
    name: 'NgRx DevTools Mug',
    category: 'Desk',
    price: 12,
  },
];

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  loadProducts(shouldFail: boolean): Observable<Product[]> {
    if (shouldFail) {
      return throwError(() => new Error('Demo request failed')).pipe(delay(600));
    }

    return of(demoProducts).pipe(delay(600));
  }
}
