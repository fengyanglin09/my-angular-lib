import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { Routes } from '@angular/router';

import { DevtoolsLabEffects } from '../../state/devtools-lab/devtools-lab.effects';
import { devtoolsLabFeature } from '../../state/devtools-lab/devtools-lab.reducer';
import * as functionalTipsEffects from '../../state/functional-tips/functional-tips.effects';
import { functionalTipsFeature } from '../../state/functional-tips/functional-tips.reducer';
import { LessonProgressEffects } from '../../state/lesson-progress/lesson-progress.effects';
import { lessonProgressFeature } from '../../state/lesson-progress/lesson-progress.reducer';

export const ngrxLessonsRoutes: Routes = [
  {
    path: 'lesson-01-counter',
    loadComponent: () =>
      import('./lesson-01-counter/lesson-01-counter').then(
        (m) => m.Lesson01Counter,
      ),
  },
  {
    path: 'lesson-02-todos',
    loadComponent: () =>
      import('./lesson-02-todos/lesson-02-todos').then(
        (m) => m.Lesson02Todos,
      ),
  },
  {
    path: 'lesson-03-effects-products',
    loadComponent: () =>
      import('./lesson-03-effects-products/lesson-03-effects-products').then(
        (m) => m.Lesson03EffectsProducts,
      ),
  },
  {
    path: 'lesson-04-entity-books',
    loadComponent: () =>
      import('./lesson-04-entity-books/lesson-04-entity-books').then(
        (m) => m.Lesson04EntityBooks,
      ),
  },
  {
    path: 'lesson-05-signal-store',
    loadComponent: () =>
      import('./lesson-05-signal-store/lesson-05-signal-store').then(
        (m) => m.Lesson05SignalStore,
      ),
  },
  {
    path: 'lesson-06-route-param-store/:projectId',
    loadComponent: () =>
      import('./lesson-06-route-param-store/lesson-06-route-param-store').then(
        (m) => m.Lesson06RouteParamStore,
      ),
  },
  {
    path: 'lesson-07-rxmethod-search',
    loadComponent: () =>
      import('./lesson-07-rxmethod-search/lesson-07-rxmethod-search').then(
        (m) => m.Lesson07RxMethodSearch,
      ),
  },
  {
    path: 'lesson-08-optimistic-updates',
    loadComponent: () =>
      import('./lesson-08-optimistic-updates/lesson-08-optimistic-updates').then(
        (m) => m.Lesson08OptimisticUpdates,
      ),
  },
  {
    path: 'lesson-09-pessimistic-updates',
    loadComponent: () =>
      import('./lesson-09-pessimistic-updates/lesson-09-pessimistic-updates').then(
        (m) => m.Lesson09PessimisticUpdates,
      ),
  },
  {
    path: 'lesson-10-effect-concurrency',
    loadComponent: () =>
      import('./lesson-10-effect-concurrency/lesson-10-effect-concurrency').then(
        (m) => m.Lesson10EffectConcurrency,
      ),
  },
  {
    path: 'lesson-11-facade-pattern',
    loadComponent: () =>
      import('./lesson-11-facade-pattern/lesson-11-facade-pattern').then(
        (m) => m.Lesson11FacadePattern,
      ),
  },
  {
    path: 'lesson-12-router-store/:topic',
    loadComponent: () =>
      import('./lesson-12-router-store/lesson-12-router-store').then(
        (m) => m.Lesson12RouterStore,
      ),
  },
  {
    path: 'lesson-13-subscriptions/:topic',
    loadComponent: () =>
      import('./lesson-13-subscriptions/lesson-13-subscriptions').then(
        (m) => m.Lesson13Subscriptions,
      ),
  },
  {
    path: 'lesson-14-route-effects/:projectId',
    loadComponent: () =>
      import('./lesson-14-route-effects/lesson-14-route-effects').then(
        (m) => m.Lesson14RouteEffects,
      ),
  },
  {
    path: 'lesson-15-lazy-feature-state',
    providers: [
      provideState(lessonProgressFeature),
      provideEffects(LessonProgressEffects),
    ],
    loadComponent: () =>
      import('./lesson-15-lazy-feature-state/lesson-15-lazy-feature-state').then(
        (m) => m.Lesson15LazyFeatureState,
      ),
  },
  {
    path: 'lesson-16-view-model-selectors',
    loadComponent: () =>
      import('./lesson-16-view-model-selectors/lesson-16-view-model-selectors').then(
        (m) => m.Lesson16ViewModelSelectors,
      ),
  },
  {
    path: 'lesson-17-action-state-effects',
    loadComponent: () =>
      import('./lesson-17-action-state-effects/lesson-17-action-state-effects').then(
        (m) => m.Lesson17ActionStateEffects,
      ),
  },
  {
    path: 'lesson-18-selector-factories',
    loadComponent: () =>
      import('./lesson-18-selector-factories/lesson-18-selector-factories').then(
        (m) => m.Lesson18SelectorFactories,
      ),
  },
  {
    path: 'lesson-19-non-dispatching-effects',
    loadComponent: () =>
      import('./lesson-19-non-dispatching-effects/lesson-19-non-dispatching-effects').then(
        (m) => m.Lesson19NonDispatchingEffects,
      ),
  },
  {
    path: 'lesson-20-functional-effects',
    providers: [
      provideState(functionalTipsFeature),
      provideEffects(functionalTipsEffects),
    ],
    loadComponent: () =>
      import('./lesson-20-functional-effects/lesson-20-functional-effects').then(
        (m) => m.Lesson20FunctionalEffects,
      ),
  },
  {
    path: 'lesson-21-store-devtools',
    providers: [
      provideState(devtoolsLabFeature),
      provideEffects(DevtoolsLabEffects),
    ],
    loadComponent: () =>
      import('./lesson-21-store-devtools/lesson-21-store-devtools').then(
        (m) => m.Lesson21StoreDevtools,
      ),
  },
];
