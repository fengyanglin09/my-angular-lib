import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { BooksEffects } from './state/books/books.effects';
import { booksFeature } from './state/books/books.reducer';
import { counterFeature } from './state/counter/counter.reducer';
import { ProductsEffects } from './state/products/products.effects';
import { productsFeature } from './state/products/products.reducer';
import { todosFeature } from './state/todos/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({
      [booksFeature.name]: booksFeature.reducer,
      [counterFeature.name]: counterFeature.reducer,
      [productsFeature.name]: productsFeature.reducer,
      [todosFeature.name]: todosFeature.reducer,
    }),
    provideEffects([BooksEffects, ProductsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ]
};
