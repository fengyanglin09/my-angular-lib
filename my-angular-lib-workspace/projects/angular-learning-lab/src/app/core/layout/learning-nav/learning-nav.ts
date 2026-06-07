import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LessonLink {
  description: string;
  number: number;
  path: string;
  title: string;
}

type LearningCategory = 'ngrx' | 'rxjs';

@Component({
  selector: 'app-learning-nav',
  imports: [RouterLink],
  templateUrl: './learning-nav.html',
  styleUrl: './learning-nav.css',
})
export class LearningNav {
  @Input({ required: true }) activeLesson!: number;
  @Input() category: LearningCategory = 'ngrx';

  private readonly ngrxLessons: LessonLink[] = [
    { description: 'Actions, reducers, selectors, and basic store flow.', number: 1, path: '/ngrx-lessons/lesson-01-counter', title: 'Counter' },
    { description: 'State updates for a small list workflow.', number: 2, path: '/ngrx-lessons/lesson-02-todos', title: 'Todos' },
    { description: 'Effects for backend-style loading and failure handling.', number: 3, path: '/ngrx-lessons/lesson-03-effects-products', title: 'Effects' },
    { description: 'Entity adapter basics for normalized collections.', number: 4, path: '/ngrx-lessons/lesson-04-entity-books', title: 'Entity Books' },
    { description: 'Signal Store state, computed values, and methods.', number: 5, path: '/ngrx-lessons/lesson-05-signal-store', title: 'Signal Store' },
    { description: 'Initialize store data from route parameters.', number: 6, path: '/ngrx-lessons/lesson-06-route-param-store/project-101', title: 'Route Params' },
    { description: 'Use rxMethod for search streams and backend data.', number: 7, path: '/ngrx-lessons/lesson-07-rxmethod-search', title: 'rxMethod Search' },
    { description: 'Update UI first, then roll back if persistence fails.', number: 8, path: '/ngrx-lessons/lesson-08-optimistic-updates', title: 'Optimistic Updates' },
    { description: 'Wait for backend success before changing state.', number: 9, path: '/ngrx-lessons/lesson-09-pessimistic-updates', title: 'Pessimistic Updates' },
    { description: 'Compare switchMap, concatMap, mergeMap, and exhaustMap in effects.', number: 10, path: '/ngrx-lessons/lesson-10-effect-concurrency', title: 'Effect Concurrency' },
    { description: 'Hide store details behind a component-friendly facade.', number: 11, path: '/ngrx-lessons/lesson-11-facade-pattern', title: 'Facade Pattern' },
    { description: 'Read route and query params through router-store selectors.', number: 12, path: '/ngrx-lessons/lesson-12-router-store/route-params', title: 'Router Store' },
    { description: 'Subscribe safely to store and router changes in TypeScript.', number: 13, path: '/ngrx-lessons/lesson-13-subscriptions/route-params', title: 'Subscriptions' },
    { description: 'Use effects to reload data when route values change.', number: 14, path: '/ngrx-lessons/lesson-14-route-effects/project-101', title: 'Route Effects' },
    { description: 'Register feature state only when a lesson route loads.', number: 15, path: '/ngrx-lessons/lesson-15-lazy-feature-state', title: 'Lazy State' },
    { description: 'Join selector results into one component view model.', number: 16, path: '/ngrx-lessons/lesson-16-view-model-selectors', title: 'View Models' },
    { description: 'Combine an action with current store state inside an effect.', number: 17, path: '/ngrx-lessons/lesson-17-action-state-effects', title: 'Action + State' },
    { description: 'Create selectors that accept parameters.', number: 18, path: '/ngrx-lessons/lesson-18-selector-factories', title: 'Selector Factories' },
    { description: 'Run side effects that do not dispatch another action.', number: 19, path: '/ngrx-lessons/lesson-19-non-dispatching-effects', title: 'Non-Dispatch Effects' },
    { description: 'Write effects as standalone functions.', number: 20, path: '/ngrx-lessons/lesson-20-functional-effects', title: 'Functional Effects' },
    { description: 'Inspect actions, state, diffs, and time travel.', number: 21, path: '/ngrx-lessons/lesson-21-store-devtools', title: 'Store DevTools' },
    { description: 'Use meta-reducers for cross-cutting store behavior.', number: 22, path: '/ngrx-lessons/lesson-22-meta-reducers', title: 'Meta-Reducers' },
    { description: 'Test reducers and selectors with focused examples.', number: 23, path: '/ngrx-lessons/lesson-23-ngrx-testing', title: 'Reducer Tests' },
    { description: 'Use MockStore for component and facade tests.', number: 24, path: '/ngrx-lessons/lesson-24-mock-store-testing', title: 'MockStore Tests' },
    { description: 'Model relational data with normalized entities and selector joins.', number: 25, path: '/ngrx-lessons/lesson-25-normalized-state', title: 'Normalized State' },
  ];

  private readonly rxjsLessons: LessonLink[] = [
    { description: 'What Observables are and when they start running.', number: 1, path: '/rxjs-lessons/lesson-01-observable-basics', title: 'Observable Basics' },
    { description: 'Create streams with of, from, interval, and timer.', number: 2, path: '/rxjs-lessons/lesson-02-creation-operators', title: 'Creation Operators' },
    { description: 'Use pipe, tap, filter, and map to process values.', number: 3, path: '/rxjs-lessons/lesson-03-pipeable-operators', title: 'Pipeable Operators' },
    { description: 'Control when values arrive with delay, debounceTime, and throttleTime.', number: 4, path: '/rxjs-lessons/lesson-04-time-operators', title: 'Time Operators' },
    { description: 'Handle inner Observables with switchMap, concatMap, mergeMap, and exhaustMap.', number: 5, path: '/rxjs-lessons/lesson-05-flattening-operators', title: 'Flattening Operators' },
    { description: 'Recover, retry, and clean up streams with catchError, retry, and finalize.', number: 6, path: '/rxjs-lessons/lesson-06-error-handling', title: 'Error Handling' },
    { description: 'Combine several streams with combineLatest, withLatestFrom, and forkJoin.', number: 7, path: '/rxjs-lessons/lesson-07-combining-streams', title: 'Combining Streams' },
    { description: 'Compare manual subscribe, takeUntilDestroyed, and async pipe cleanup.', number: 8, path: '/rxjs-lessons/lesson-08-angular-subscriptions', title: 'Angular Subscriptions' },
    { description: 'Build a loading/data/error view model for backend-style streams.', number: 9, path: '/rxjs-lessons/lesson-09-http-data-flow', title: 'HTTP Data Flow' },
    { description: 'Move stream state into an injectable service with vm$ and methods.', number: 10, path: '/rxjs-lessons/lesson-10-service-data-flow', title: 'Service Data Flow' },
    { description: 'Use a local facade service to combine backend and UI state.', number: 11, path: '/rxjs-lessons/lesson-11-component-facade', title: 'Component Facade' },
    { description: 'Compare Subject, BehaviorSubject, and ReplaySubject for late subscribers.', number: 12, path: '/rxjs-lessons/lesson-12-subjects-multicasting', title: 'Subjects' },
  ];

  protected get categoryLabel(): string {
    return this.category === 'rxjs' ? 'RxJS' : 'NgRx';
  }

  protected get currentLesson(): LessonLink | undefined {
    return this.lessons.find((lesson) => lesson.number === this.activeLesson);
  }

  protected get lessons(): LessonLink[] {
    return this.category === 'rxjs' ? this.rxjsLessons : this.ngrxLessons;
  }

  protected get nextLesson(): LessonLink | undefined {
    return this.lessons.find((lesson) => lesson.number === this.activeLesson + 1);
  }

  protected get previousLesson(): LessonLink | undefined {
    return this.lessons.find((lesson) => lesson.number === this.activeLesson - 1);
  }
}
