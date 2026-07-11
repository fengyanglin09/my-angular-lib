import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { FactoryProvidersDemo } from './factory-providers-demo';

export const dependencyInjectionLesson05 = {
  number: 5,
  route: 'lesson-05-factory-providers',
  title: 'Factory Providers',
  intro:
    'Factory providers create a dependency by running a function. They are useful when a value depends on other injected services, runtime flags, or browser state.',
  keyPoints: [
    'useFactory can inject other dependencies while creating a value.',
    'Factories keep setup logic near provider registration.',
    'Use factories when useValue is too static and useClass is not the right shape.',
  ],
  mentalModel: `provider asks factory
  how should this dependency be made?

factory can inject
  environment
  window
  auth state

injector stores result
  according to provider scope`,
  demo: {
    title: 'Feature flag configuration',
    before: 'The app needs different logging behavior in dev and production.',
    after:
      'A factory creates the logger config from injected environment state.',
    actionLabel: 'Run factory again',
  },
  codeSteps: [
    {
      name: 'Factory function',
      description: 'A factory can compute a dependency value.',
      syntax: `function createApiConfig(): ApiConfig {
  const location = inject(DOCUMENT).location;

  return {
    baseUrl: location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : '/api',
  };
}`,
    },
    {
      name: 'Provider',
      description:
        'useFactory tells Angular to call the factory for this token.',
      syntax: `{
  provide: API_CONFIG,
  useFactory: createApiConfig,
}`,
    },
    {
      name: 'Consumer',
      description:
        'Consumers just inject the token. They do not care how it was created.',
      syntax: `private readonly config = inject(API_CONFIG);`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-05-factory-providers',
  imports: [DependencyInjectionLessonPage, FactoryProvidersDemo],
  templateUrl: './lesson-05-factory-providers.html',
  styleUrl: './lesson-05-factory-providers.css',
})
export class DependencyInjectionLesson05FactoryProviders {
  protected readonly lesson = dependencyInjectionLesson05;
}
