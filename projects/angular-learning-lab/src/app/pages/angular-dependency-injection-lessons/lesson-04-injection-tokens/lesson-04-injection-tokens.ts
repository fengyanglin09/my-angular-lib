import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { InjectionTokensDemo } from './injection-tokens-demo';

export const dependencyInjectionLesson04 = {
  number: 4,
  route: 'lesson-04-injection-tokens',
  title: 'Injection Tokens',
  intro:
    'Injection tokens let Angular inject values that do not have a class, such as configuration objects, strings, feature flags, or browser APIs.',
  keyPoints: [
    'Use InjectionToken for non-class dependencies.',
    'Tokens make configuration explicit and testable.',
    'Typed tokens help TypeScript understand the injected value.',
  ],
  mentalModel: `class token
  inject(HttpClient)

value token
  inject(API_BASE_URL)

token
  stable name for a dependency`,
  demo: {
    title: 'API base URL token',
    before: 'A service has hard-coded URLs spread through methods.',
    after:
      'The service injects API_BASE_URL and builds endpoints from one value.',
    actionLabel: 'Switch configured URL',
  },
  codeSteps: [
    {
      name: 'Create token',
      description:
        'The generic type describes the value returned when the token is injected.',
      syntax: `export const API_BASE_URL =
  new InjectionToken<string>('API_BASE_URL');`,
    },
    {
      name: 'Provide token',
      description:
        'A value provider gives Angular the concrete value for that token.',
      syntax: `providers: [
  { provide: API_BASE_URL, useValue: 'https://api.example.com' },
]`,
    },
    {
      name: 'Inject token',
      description:
        'The service depends on configuration without hard-coding it.',
      syntax: `private readonly apiBaseUrl = inject(API_BASE_URL);`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-04-injection-tokens',
  imports: [DependencyInjectionLessonPage, InjectionTokensDemo],
  templateUrl: './lesson-04-injection-tokens.html',
  styleUrl: './lesson-04-injection-tokens.css',
})
export class DependencyInjectionLesson04InjectionTokens {
  protected readonly lesson = dependencyInjectionLesson04;
}
