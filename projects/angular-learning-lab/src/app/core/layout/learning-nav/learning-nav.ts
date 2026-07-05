import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LessonLink {
  description: string;
  number: number;
  path: string;
  title: string;
}

type LearningCategory = 'forms' | 'ngrx' | 'routes' | 'rxjs' | 'signals';

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
    { description: 'Store the current auth user globally with effects and selectors.', number: 26, path: '/ngrx-lessons/lesson-26-auth-user', title: 'Auth User' },
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
    { description: 'Use marble-style timelines to reason about operator behavior.', number: 13, path: '/rxjs-lessons/lesson-13-marble-thinking', title: 'Marble Thinking' },
    { description: 'Accumulate event streams into useful UI state with scan.', number: 14, path: '/rxjs-lessons/lesson-14-scan-state', title: 'scan State' },
    { description: 'Compare previous and current values with pairwise.', number: 15, path: '/rxjs-lessons/lesson-15-pairwise-changes', title: 'pairwise Changes' },
    { description: 'Skip consecutive duplicate values before doing expensive work.', number: 16, path: '/rxjs-lessons/lesson-16-distinct-until-changed', title: 'Distinct Changes' },
    { description: 'Combine many event sources into one reload workflow.', number: 17, path: '/rxjs-lessons/lesson-17-merge-reload-triggers', title: 'merge Triggers' },
    { description: 'Fail slow or stuck streams before loading spins forever.', number: 18, path: '/rxjs-lessons/lesson-18-timeout-safety', title: 'timeout Safety' },
    { description: 'Sample noisy UI events with auditTime, debounceTime, and throttleTime.', number: 19, path: '/rxjs-lessons/lesson-19-audit-time', title: 'auditTime' },
    { description: 'Batch noisy events into arrays before sending backend work.', number: 20, path: '/rxjs-lessons/lesson-20-buffer-time', title: 'bufferTime' },
    { description: 'Read one value and complete with take(1) or first().', number: 21, path: '/rxjs-lessons/lesson-21-take-first', title: 'take / first' },
    { description: 'Share backend work and replay cached values to late subscribers.', number: 22, path: '/rxjs-lessons/lesson-22-share-replay', title: 'shareReplay' },
    { description: 'Use a refresh Subject to reload cached HTTP-style data.', number: 23, path: '/rxjs-lessons/lesson-23-refresh-cache', title: 'Refresh Cache' },
    { description: 'Prevent duplicate backend submits with exhaustMap.', number: 24, path: '/rxjs-lessons/lesson-24-exhaust-map-submit', title: 'Submit Guard' },
    { description: 'Clean up route param, interval, and component stream subscriptions.', number: 25, path: '/rxjs-lessons/lesson-25-take-until-destroyed/project-101', title: 'Cleanup' },
  ];

  private readonly signalLessons: LessonLink[] = [
    { description: 'Create writable signals, read values, update state, and derive computed values.', number: 1, path: '/angular-signal-lessons/lesson-01-signal-basics', title: 'Signal Basics' },
    { description: 'Use effect for side effects that run when signal dependencies change.', number: 2, path: '/angular-signal-lessons/lesson-02-effects', title: 'Effects' },
    { description: 'Cancel timers, subscriptions, and pending work with effect cleanup.', number: 3, path: '/angular-signal-lessons/lesson-03-effect-cleanup', title: 'Effect Cleanup' },
    { description: 'Pass parent state into child components with input signals.', number: 4, path: '/angular-signal-lessons/lesson-04-input-signals', title: 'Input Signals' },
    { description: 'Let child controls update parent-owned state with model signals.', number: 5, path: '/angular-signal-lessons/lesson-05-model-signals', title: 'Model Signals' },
    { description: 'Reset writable state from another signal with linkedSignal.', number: 6, path: '/angular-signal-lessons/lesson-06-linked-signal', title: 'linkedSignal' },
    { description: 'Bridge Signals and RxJS with toObservable and toSignal.', number: 7, path: '/angular-signal-lessons/lesson-07-rxjs-interop', title: 'RxJS Interop' },
    { description: 'Share local state across components with a signal service.', number: 8, path: '/angular-signal-lessons/lesson-08-signal-service', title: 'Signal Service' },
    { description: 'Load async read state with resource, params, status, and cancellation.', number: 9, path: '/angular-signal-lessons/lesson-09-resource-loading', title: 'Resource Loading' },
    { description: 'Reference DOM elements and rendered children with signal queries.', number: 10, path: '/angular-signal-lessons/lesson-10-signal-queries', title: 'Signal Queries' },
    { description: 'Inspect content projected into reusable components.', number: 11, path: '/angular-signal-lessons/lesson-11-content-queries', title: 'Content Queries' },
    { description: 'Run DOM focus, scroll, and measurement work after rendering.', number: 12, path: '/angular-signal-lessons/lesson-12-after-render', title: 'After Render' },
    { description: 'Delay expensive UI with @defer, placeholder, loading, and error blocks.', number: 13, path: '/angular-signal-lessons/lesson-13-defer-blocks', title: 'Defer Blocks' },
    { description: 'Control incidental effect reads and noisy object updates.', number: 14, path: '/angular-signal-lessons/lesson-14-untracked-equality', title: 'untracked + Equality' },
    { description: 'See how computed and effect dependencies change with conditional branches.', number: 15, path: '/angular-signal-lessons/lesson-15-dynamic-dependencies', title: 'Dynamic Dependencies' },
    { description: 'Update object and array signal state without mutating existing references.', number: 16, path: '/angular-signal-lessons/lesson-16-immutable-updates', title: 'Immutable Updates' },
  ];

  private readonly formsLessons: LessonLink[] = [
    { description: 'Build a typed FormGroup with controls, validators, form state, and submit handling.', number: 1, path: '/angular-forms-lessons/lesson-01-reactive-form-basics', title: 'Reactive Basics' },
    { description: 'Use NonNullableFormBuilder to create a typed reactive form with less setup.', number: 2, path: '/angular-forms-lessons/lesson-02-form-builder', title: 'FormBuilder' },
    { description: 'Create a typed form from plain data objects with a reusable factory method.', number: 3, path: '/angular-forms-lessons/lesson-03-form-factory', title: 'Form Factory' },
    { description: 'Use field validators and group validators for real-world form rules.', number: 4, path: '/angular-forms-lessons/lesson-04-validation-patterns', title: 'Validation' },
    { description: 'Model object-shaped and list-shaped form data with nested groups and arrays.', number: 5, path: '/angular-forms-lessons/lesson-05-nested-groups-arrays', title: 'Nested Forms' },
    { description: 'Compare form.value and getRawValue when controls are disabled.', number: 6, path: '/angular-forms-lessons/lesson-06-value-vs-raw-value', title: 'Value vs Raw' },
    { description: 'Handle backend-style form submission with loading, success, failure, and retry state.', number: 7, path: '/angular-forms-lessons/lesson-07-submit-save-state', title: 'Submit State' },
    { description: 'Make a custom component work with formControlName using ControlValueAccessor.', number: 8, path: '/angular-forms-lessons/lesson-08-control-value-accessor', title: 'Custom Control' },
    { description: 'Validate a control with a backend-style async availability check.', number: 9, path: '/angular-forms-lessons/lesson-09-async-validators', title: 'Async Validators' },
    { description: 'React to valueChanges and statusChanges with debounced form streams and cleanup.', number: 10, path: '/angular-forms-lessons/lesson-10-form-streams', title: 'Form Streams' },
    { description: 'Enable, disable, require, and clear fields based on another control value.', number: 11, path: '/angular-forms-lessons/lesson-11-dependent-controls', title: 'Dependent Controls' },
    { description: 'Build dynamic repeated sections with FormArray row factories and derived totals.', number: 12, path: '/angular-forms-lessons/lesson-12-dynamic-form-array', title: 'Dynamic FormArray' },
    { description: 'Split one typed form into wizard steps with step guards and final review.', number: 13, path: '/angular-forms-lessons/lesson-13-multi-step-form', title: 'Multi-step Form' },
    { description: 'Autosave, restore, and clear local form drafts while keeping UI state boundaries clear.', number: 14, path: '/angular-forms-lessons/lesson-14-form-persistence', title: 'Form Persistence' },
    { description: 'Map backend field validation errors onto Angular controls with setErrors.', number: 15, path: '/angular-forms-lessons/lesson-15-server-errors', title: 'Server Errors' },
    { description: 'Compare updateOn change, blur, and submit validation timing strategies.', number: 16, path: '/angular-forms-lessons/lesson-16-update-on-strategies', title: 'UpdateOn Strategies' },
    { description: 'Compare setValue, patchValue, and reset for strict, partial, and fresh form updates.', number: 17, path: '/angular-forms-lessons/lesson-17-set-patch-reset', title: 'Set Patch Reset' },
    { description: 'Use form state APIs for touched, dirty, pending, disabled, pristine, and reset behavior.', number: 18, path: '/angular-forms-lessons/lesson-18-form-state-apis', title: 'Form State APIs' },
  ];

  private readonly routesLessons: LessonLink[] = [
    { description: 'Map URLs to standalone components with route records, routerLink, and router-outlet.', number: 1, path: '/angular-route-lessons/lesson-01-route-basics', title: 'Route Basics' },
    { description: 'Read dynamic URL segments like :projectId with snapshot and paramMap.', number: 2, path: '/angular-route-lessons/lesson-02-route-params/project-101', title: 'Route Params' },
    { description: 'Use query params for optional filter, sort, and search state in the URL.', number: 3, path: '/angular-route-lessons/lesson-03-query-params', title: 'Query Params' },
    { description: 'Keep a parent layout on screen while child route content changes in a nested outlet.', number: 4, path: '/angular-route-lessons/lesson-04-child-routes/overview', title: 'Child Routes' },
    { description: 'Render primary content and a named side panel from the route tree.', number: 5, path: '/angular-route-lessons/lesson-05-named-outlets/dashboard', title: 'Named Outlets' },
    { description: 'Use default redirects, legacy URL redirects, pathMatch, and scoped wildcard fallbacks.', number: 6, path: '/angular-route-lessons/lesson-06-redirects-wildcards/dashboard', title: 'Redirects' },
    { description: 'Navigate from TypeScript with Router.navigate, relativeTo, queryParams, and navigateByUrl.', number: 7, path: '/angular-route-lessons/lesson-07-programmatic-navigation/inbox', title: 'Programmatic Nav' },
    { description: 'Use route data and a reusable canActivate guard for access checks.', number: 8, path: '/angular-route-lessons/lesson-08-route-guards/public', title: 'Route Guards' },
    { description: 'Load route data before activation with a functional resolver and ActivatedRoute.data.', number: 9, path: '/angular-route-lessons/lesson-09-route-resolvers/project-101', title: 'Route Resolvers' },
    { description: 'Prevent leaving a dirty editor route with a canDeactivate guard.', number: 10, path: '/angular-route-lessons/lesson-10-can-deactivate/editor', title: 'CanDeactivate' },
    { description: 'Attach static metadata and page titles to route records.', number: 11, path: '/angular-route-lessons/lesson-11-route-data/dashboard', title: 'Route Data' },
    { description: 'Lazy-load a feature route file with loadChildren.', number: 12, path: '/angular-route-lessons/lesson-12-lazy-routes', title: 'Lazy Routes' },
    { description: 'Use route data and canMatch to protect a lazy route branch.', number: 13, path: '/angular-route-lessons/lesson-13-can-match/public', title: 'canMatch' },
    { description: 'Watch Router.events to understand navigation lifecycle sequence.', number: 14, path: '/angular-route-lessons/lesson-14-router-events/home', title: 'Router Events' },
    { description: 'Build breadcrumbs and page chrome from active child route metadata.', number: 15, path: '/angular-route-lessons/lesson-15-route-metadata-shell/overview', title: 'Metadata Shell' },
    { description: 'Scope services and feature state to a route branch with route providers.', number: 16, path: '/angular-route-lessons/lesson-16-route-providers/overview', title: 'Route Providers' },
    { description: 'Preload selected lazy route chunks after the app is running.', number: 17, path: '/angular-route-lessons/lesson-17-preloading-lazy-routes/overview', title: 'Preloading' },
  ];

  protected get categoryLabel(): string {
    if (this.category === 'rxjs') {
      return 'RxJS';
    }

    if (this.category === 'signals') {
      return 'Signals';
    }

    if (this.category === 'forms') {
      return 'Forms';
    }

    if (this.category === 'routes') {
      return 'Routes';
    }

    return 'NgRx';
  }

  protected get currentLesson(): LessonLink | undefined {
    return this.lessons.find((lesson) => lesson.number === this.activeLesson);
  }

  protected get lessons(): LessonLink[] {
    if (this.category === 'rxjs') {
      return this.rxjsLessons;
    }

    if (this.category === 'signals') {
      return this.signalLessons;
    }

    if (this.category === 'forms') {
      return this.formsLessons;
    }

    if (this.category === 'routes') {
      return this.routesLessons;
    }

    return this.ngrxLessons;
  }

  protected get nextLesson(): LessonLink | undefined {
    return this.lessons.find((lesson) => lesson.number === this.activeLesson + 1);
  }

  protected get previousLesson(): LessonLink | undefined {
    return this.lessons.find((lesson) => lesson.number === this.activeLesson - 1);
  }
}
