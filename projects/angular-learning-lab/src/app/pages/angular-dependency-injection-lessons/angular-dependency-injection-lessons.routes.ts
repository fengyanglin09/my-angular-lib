import { Routes } from '@angular/router';

export const angularDependencyInjectionLessonsRoutes: Routes = [
  {
    path: 'lesson-01-provider-basics',
    loadComponent: () =>
      import('./lesson-01-provider-basics/lesson-01-provider-basics').then(
        (m) => m.DependencyInjectionLesson01ProviderBasics
      ),
  },
  {
    path: 'lesson-02-service-scope',
    loadComponent: () =>
      import('./lesson-02-service-scope/lesson-02-service-scope').then(
        (m) => m.DependencyInjectionLesson02ServiceScope
      ),
  },
  {
    path: 'lesson-03-root-vs-component-providers',
    loadComponent: () =>
      import(
        './lesson-03-root-vs-component-providers/lesson-03-root-vs-component-providers'
      ).then((m) => m.DependencyInjectionLesson03RootVsComponentProviders),
  },
  {
    path: 'lesson-04-injection-tokens',
    loadComponent: () =>
      import('./lesson-04-injection-tokens/lesson-04-injection-tokens').then(
        (m) => m.DependencyInjectionLesson04InjectionTokens
      ),
  },
  {
    path: 'lesson-05-factory-providers',
    loadComponent: () =>
      import('./lesson-05-factory-providers/lesson-05-factory-providers').then(
        (m) => m.DependencyInjectionLesson05FactoryProviders
      ),
  },
  {
    path: 'lesson-06-hierarchical-injectors',
    loadComponent: () =>
      import(
        './lesson-06-hierarchical-injectors/lesson-06-hierarchical-injectors'
      ).then((m) => m.DependencyInjectionLesson06HierarchicalInjectors),
  },
  {
    path: 'lesson-07-shared-vs-isolated-state',
    loadComponent: () =>
      import(
        './lesson-07-shared-vs-isolated-state/lesson-07-shared-vs-isolated-state'
      ).then((m) => m.DependencyInjectionLesson07SharedVsIsolatedState),
  },
];
