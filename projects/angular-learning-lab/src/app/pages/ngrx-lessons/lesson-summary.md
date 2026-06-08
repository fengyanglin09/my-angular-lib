# NgRx Lesson Summary

This file is a quick index of the NgRx lessons in this folder. Use it when you
want to remember what each lesson teaches and where it fits in the learning
path.

## Lessons

| Lesson | Route | What It Teaches |
| --- | --- | --- |
| 1. Counter | `/ngrx-lessons/lesson-01-counter` | Basic NgRx Store flow: actions, reducer, selectors, and component dispatch. |
| 2. Todos | `/ngrx-lessons/lesson-02-todos` | Action payloads, list updates, and reducer logic for add/toggle/remove style state changes. |
| 3. Effects Products | `/ngrx-lessons/lesson-03-effects-products` | Effects for async loading, success actions, failure actions, and API boundaries. |
| 4. Entity Books | `/ngrx-lessons/lesson-04-entity-books` | `createEntityAdapter`, entity collections, selectors, pagination, and saving state through effects. |
| 5. Signal Store | `/ngrx-lessons/lesson-05-signal-store` | NgRx Signal Store for local feature state, backend-style loading, and persisted updates. |
| 6. Route Param Store | `/ngrx-lessons/lesson-06-route-param-store/project-101` | Reading route params and using them to initialize or load store-backed feature data. |
| 7. rxMethod Search | `/ngrx-lessons/lesson-07-rxmethod-search` | Signal Store `rxMethod`, debounced search, loading states, and async result handling. |
| 8. Optimistic Updates | `/ngrx-lessons/lesson-08-optimistic-updates` | Updating UI before the backend confirms, temporary IDs, pending IDs, rollback, and failure recovery. |
| 9. Pessimistic Updates | `/ngrx-lessons/lesson-09-pessimistic-updates` | Waiting for backend success before updating state, which is simpler and safer for many workflows. |
| 10. Effect Concurrency | `/ngrx-lessons/lesson-10-effect-concurrency` | `switchMap`, `concatMap`, `mergeMap`, and `exhaustMap` behavior in effects. |
| 11. Facade Pattern | `/ngrx-lessons/lesson-11-facade-pattern` | Creating a facade service to hide NgRx details from components. |
| 12. Router Store | `/ngrx-lessons/lesson-12-router-store/route-params` | Using NgRx Router Store selectors for URL, route params, and query params. |
| 13. Safe Subscriptions | `/ngrx-lessons/lesson-13-subscriptions/route-params` | Subscribing in component TypeScript, avoiding leaks, using combined route selector snapshots, and `distinctUntilChanged`. |
| 14. Route Effects | `/ngrx-lessons/lesson-14-route-effects/project-101` | Loading data from effects when route params or query params change. |
| 15. Lazy Feature State | `/ngrx-lessons/lesson-15-lazy-feature-state` | Registering feature state and effects at the route level with `provideState` and `provideEffects`. |
| 16. View Model Selectors | `/ngrx-lessons/lesson-16-view-model-selectors` | Combining multiple selectors into a single component-friendly view model. |
| 17. Action + State Effects | `/ngrx-lessons/lesson-17-action-state-effects` | Combining action payloads with latest store state inside effects using `withLatestFrom`. |
| 18. Selector Factories | `/ngrx-lessons/lesson-18-selector-factories` | Creating selectors that accept parameters, such as selecting a book by ID or filtering by author. |
| 19. Non-Dispatching Effects | `/ngrx-lessons/lesson-19-non-dispatching-effects` | Using effects for side effects like notifications with `tap` and `{ dispatch: false }`. |
| 20. Functional Effects | `/ngrx-lessons/lesson-20-functional-effects` | Writing effects as exported functions with `functional: true` instead of class properties. |
| 21. Store DevTools | `/ngrx-lessons/lesson-21-store-devtools` | Inspecting actions, state, diffs, effect success/failure actions, time travel, and optional trace. |
| 22. Meta-Reducers | `/ngrx-lessons/lesson-22-meta-reducers` | Wrapping reducers with a meta-reducer to hydrate and persist a state slice with `localStorage`. |
| 23. NgRx Testing | `/ngrx-lessons/lesson-23-ngrx-testing` | Basic reducer, selector, and effect test patterns with Jasmine. |
| 24. MockStore Testing | `/ngrx-lessons/lesson-24-mock-store-testing` | Component tests with `provideMockStore`, mocked selector values, rendered state assertions, and dispatch spies. |
| 25. Normalized State | `/ngrx-lessons/lesson-25-normalized-state` | Normalized entity state, storing relationships by ID, and selector joins for UI-ready data. |
| 26. Auth User State | `/ngrx-lessons/lesson-26-auth-user` | Global auth user state, login/logout/session effects, and selectors for logged-in status and roles. |

## Big Ideas By Category

### Store Basics

- Lessons 1-4 teach the classic NgRx flow: action -> reducer -> state -> selector -> component.
- Lesson 4 introduces entity adapters, which are useful for collections.

### Effects And Backend Work

- Lessons 3, 10, 14, 17, 19, and 20 focus on effects.
- These lessons cover API calls, error handling, route-driven loading, concurrency choices, side effects, and functional effects.

### Router And Subscriptions

- Lessons 6, 12, 13, and 14 focus on URLs, route params, query params, and safe subscriptions.
- The key idea is that URL changes are state changes too.

### Signal Store

- Lessons 5 and 7 show NgRx Signal Store as another way to manage feature state.
- These are useful when you want store-like organization without the full global Store pattern.

### Real-World State Patterns

- Lessons 8 and 9 compare optimistic and pessimistic updates.
- Lesson 11 introduces facades.
- Lesson 15 introduces lazy feature state.
- Lesson 16 introduces view model selectors.
- Lesson 22 introduces persistence with meta-reducers.
- Lesson 25 introduces normalized state and selector joins.
- Lesson 26 introduces app-wide auth user state.

### Testing

- Lesson 23 introduces reducer, selector, and effect tests.
- Lesson 24 introduces component testing with `MockStore`.

## Mental Model

Most NgRx code fits into this flow:

```text
component
  -> dispatch action
  -> reducer updates state
  -> selector derives data
  -> component renders
```

When effects are involved:

```text
component
  -> dispatch action
  -> effect calls service/API
  -> effect emits success/failure action
  -> reducer updates state
  -> selector derives data
  -> component renders
```

When router state is involved:

```text
URL changes
  -> router-store updates state
  -> selector reads route/query params
  -> component or effect reacts
```

When normalized state is involved:

```text
store related records separately
  -> connect them by ID
  -> use selectors to join data for the UI
```
