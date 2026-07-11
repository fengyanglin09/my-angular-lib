import { Component } from '@angular/core';

import type { DependencyInjectionLesson } from '../angular-dependency-injection-lessons.models';
import { DependencyInjectionLessonPage } from '../dependency-injection-lesson-page/dependency-injection-lesson-page';
import { ProviderBasicsDemo } from './provider-basics-demo';

export const dependencyInjectionLesson01 = {
  number: 1,
  route: 'lesson-01-provider-basics',
  title: 'Provider Basics',
  intro:
    'Dependency injection lets a class ask Angular for dependencies instead of constructing them directly. A provider tells Angular how to create or return a dependency.',
  keyPoints: [
    'A token is what you ask for.',
    'A provider is the recipe Angular uses to satisfy that token.',
    'inject(SomeService) asks the current injector tree for an instance.',
  ],
  mentalModel: `component asks for service
  inject(CoursesApi)

injector looks for provider
  CoursesApi -> new CoursesApi()

component receives instance
  no manual new needed`,
  demo: {
    title: 'Component asks for a logger service',
    before:
      'The component does not create the logger with new LoggerService().',
    after: 'Angular finds a provider and hands the component an instance.',
    actionLabel: 'Simulate injection lookup',
  },
  codeSteps: [
    {
      name: 'Injectable service',
      description:
        'providedIn root registers the service with the application root injector.',
      syntax: `@Injectable({ providedIn: 'root' })
export class CoursesApi {
  loadCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses');
  }
}`,
    },
    {
      name: 'Component injection',
      description:
        'The component asks Angular for the service instead of constructing it directly.',
      syntax: `private readonly coursesApi = inject(CoursesApi);`,
    },
    {
      name: 'Provider shape',
      description:
        'This is the long-form provider Angular can infer from many service classes.',
      syntax: `{
  provide: CoursesApi,
  useClass: CoursesApi,
}`,
    },
  ],
} satisfies DependencyInjectionLesson;

@Component({
  selector: 'app-di-lesson-01-provider-basics',
  imports: [DependencyInjectionLessonPage, ProviderBasicsDemo],
  templateUrl: './lesson-01-provider-basics.html',
  styleUrl: './lesson-01-provider-basics.css',
})
export class DependencyInjectionLesson01ProviderBasics {
  protected readonly lesson = dependencyInjectionLesson01;
}
