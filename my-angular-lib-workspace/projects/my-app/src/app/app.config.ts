import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { BooksEffects } from './state/books/books.effects';
import { booksFeature } from './state/books/books.reducer';
import { ConcurrencyEffects } from './state/concurrency/concurrency.effects';
import { concurrencyFeature } from './state/concurrency/concurrency.reducer';
import { counterFeature } from './state/counter/counter.reducer';
import { DraftsEffects } from './state/drafts/drafts.effects';
import { draftsFeature } from './state/drafts/drafts.reducer';
import { FeedbackEffects } from './state/feedback/feedback.effects';
import { feedbackFeature } from './state/feedback/feedback.reducer';
import { ProductsEffects } from './state/products/products.effects';
import { productsFeature } from './state/products/products.reducer';
import { RouteProjectsEffects } from './state/route-projects/route-projects.effects';
import { routeProjectsFeature } from './state/route-projects/route-projects.reducer';
import { todosFeature } from './state/todos/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({
      [booksFeature.name]: booksFeature.reducer,
      [concurrencyFeature.name]: concurrencyFeature.reducer,
      [counterFeature.name]: counterFeature.reducer,
      [draftsFeature.name]: draftsFeature.reducer,
      [feedbackFeature.name]: feedbackFeature.reducer,
      [productsFeature.name]: productsFeature.reducer,
      [routeProjectsFeature.name]: routeProjectsFeature.reducer,
      router: routerReducer,
      [todosFeature.name]: todosFeature.reducer,
    }),
    provideRouterStore(),
    provideEffects([
      BooksEffects,
      ConcurrencyEffects,
      DraftsEffects,
      FeedbackEffects,
      ProductsEffects,
      RouteProjectsEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ]
};
