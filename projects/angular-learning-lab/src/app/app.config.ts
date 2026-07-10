import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withPreloading,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { SelectiveRoutePreloadingStrategy } from './pages/angular-route-lessons/lesson-17-preloading-lazy-routes/selective-route-preloading.strategy';
import { AuthUserEffects } from './state/auth-user/auth-user.effects';
import { authUserFeature } from './state/auth-user/auth-user.reducer';
import { BooksEffects } from './state/books/books.effects';
import { booksFeature } from './state/books/books.reducer';
import { ConcurrencyEffects } from './state/concurrency/concurrency.effects';
import { concurrencyFeature } from './state/concurrency/concurrency.reducer';
import { counterFeature } from './state/counter/counter.reducer';
import { DraftsEffects } from './state/drafts/drafts.effects';
import { draftsFeature } from './state/drafts/drafts.reducer';
import { FeedbackEffects } from './state/feedback/feedback.effects';
import { feedbackFeature } from './state/feedback/feedback.reducer';
import { lessonPreferencesStorageMetaReducer } from './state/lesson-preferences/lesson-preferences.meta-reducer';
import { lessonPreferencesFeature } from './state/lesson-preferences/lesson-preferences.reducer';
import { ProductsEffects } from './state/products/products.effects';
import { productsFeature } from './state/products/products.reducer';
import { RouteProjectsEffects } from './state/route-projects/route-projects.effects';
import { routeProjectsFeature } from './state/route-projects/route-projects.reducer';
import { SelectedBookNotesEffects } from './state/selected-book-notes/selected-book-notes.effects';
import { selectedBookNotesFeature } from './state/selected-book-notes/selected-book-notes.reducer';
import { todosFeature } from './state/todos/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withHashLocation(),
      withPreloading(SelectiveRoutePreloadingStrategy),
    ),
    provideStore({
      [authUserFeature.name]: authUserFeature.reducer,
      [booksFeature.name]: booksFeature.reducer,
      [concurrencyFeature.name]: concurrencyFeature.reducer,
      [counterFeature.name]: counterFeature.reducer,
      [draftsFeature.name]: draftsFeature.reducer,
      [feedbackFeature.name]: feedbackFeature.reducer,
      [lessonPreferencesFeature.name]: lessonPreferencesFeature.reducer,
      [productsFeature.name]: productsFeature.reducer,
      [routeProjectsFeature.name]: routeProjectsFeature.reducer,
      [selectedBookNotesFeature.name]: selectedBookNotesFeature.reducer,
      router: routerReducer,
      [todosFeature.name]: todosFeature.reducer,
    }, {
      metaReducers: [lessonPreferencesStorageMetaReducer],
    }),
    provideRouterStore(),
    provideEffects([
      AuthUserEffects,
      BooksEffects,
      ConcurrencyEffects,
      DraftsEffects,
      FeedbackEffects,
      ProductsEffects,
      RouteProjectsEffects,
      SelectedBookNotesEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
      traceLimit: 25,
    }),
  ]
};
