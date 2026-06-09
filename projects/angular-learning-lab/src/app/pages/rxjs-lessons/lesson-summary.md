# RxJS Lesson Summary

This file is a quick index of the RxJS lessons in this folder. Use it to track
what each lesson teaches as the RxJS learning path grows.

## Lessons

| Lesson | Route | What It Teaches |
| --- | --- | --- |
| 1. Observable Basics | `/rxjs-lessons/lesson-01-observable-basics` | What an Observable is, why it does not run until subscription, how `next` and `complete` work, and how `unsubscribe()` runs cleanup. |
| 2. Creation Operators | `/rxjs-lessons/lesson-02-creation-operators` | How to create Observables with `of`, `from`, `interval`, and `timer`, plus why `take` is useful for limiting long-running streams. |
| 3. Pipeable Operators | `/rxjs-lessons/lesson-03-pipeable-operators` | How `pipe()` chains operators, how `tap` observes values, how `filter` removes values, and how `map` transforms values. |
| 4. Time Operators | `/rxjs-lessons/lesson-04-time-operators` | How `delay`, `debounceTime`, and `throttleTime` change when values reach the subscriber. |
| 5. Flattening Operators | `/rxjs-lessons/lesson-05-flattening-operators` | How `switchMap`, `concatMap`, `mergeMap`, and `exhaustMap` handle inner Observables created from source values. |
| 6. Error Handling | `/rxjs-lessons/lesson-06-error-handling` | How `catchError`, `retry`, and `finalize` help streams recover, retry, and clean up loading state. |
| 7. Combining Streams | `/rxjs-lessons/lesson-07-combining-streams` | How `combineLatest`, `withLatestFrom`, and `forkJoin` combine multiple source streams for different real-world timing needs. |
| 8. Angular Subscription Patterns | `/rxjs-lessons/lesson-08-angular-subscriptions` | How manual `subscribe`, `takeUntilDestroyed`, and the `async` pipe handle subscription ownership and cleanup. |
| 9. HTTP Data Flow | `/rxjs-lessons/lesson-09-http-data-flow` | How to model backend-style loading, data, error, reload, cancellation, and shared async-pipe subscriptions. |
| 10. Service Data Flow | `/rxjs-lessons/lesson-10-service-data-flow` | How to move RxJS loading/data/error state into an injectable service with a `vm$` stream and component-friendly methods. |
| 11. Component Facade | `/rxjs-lessons/lesson-11-component-facade` | How a local facade combines backend state and UI state into one component-friendly `vm$`. |
| 12. Subjects And Multicasting | `/rxjs-lessons/lesson-12-subjects-multicasting` | How `Subject`, `BehaviorSubject`, and `ReplaySubject` multicast values and treat late subscribers differently. |
| 13. Marble Thinking | `/rxjs-lessons/lesson-13-marble-thinking` | How marble-style timelines make operator behavior easier to reason about before writing formal marble tests. |
| 14. Accumulating State With scan | `/rxjs-lessons/lesson-14-scan-state` | How `scan` turns event streams into accumulated UI state for carts, logs, undo history, and pagination. |
| 15. Comparing Changes With pairwise | `/rxjs-lessons/lesson-15-pairwise-changes` | How `pairwise` emits previous/current value pairs for route changes, metric trends, and status transitions. |
| 16. Avoiding Duplicate Work With distinctUntilChanged | `/rxjs-lessons/lesson-16-distinct-until-changed` | How `distinctUntilChanged` skips consecutive duplicate route params, filters, or search values before expensive work runs. |
| 17. Combining Reload Triggers With merge | `/rxjs-lessons/lesson-17-merge-reload-triggers` | How `merge` combines manual refresh, route change, and save success event sources into one reload workflow. |
| 18. Backend Safety With timeout | `/rxjs-lessons/lesson-18-timeout-safety` | How `timeout` turns slow or stuck streams into error states so loading does not spin forever. |
| 19. Rate Limiting With auditTime | `/rxjs-lessons/lesson-19-audit-time` | How `auditTime` compares with `debounceTime` and `throttleTime` for noisy UI events like resize, scroll, and drag. |
| 20. Batching Events With bufferTime | `/rxjs-lessons/lesson-20-buffer-time` | How `bufferTime` collects noisy events into arrays so logs, analytics, or patches can be sent in batches. |
| 21. One-Time Reads With take and first | `/rxjs-lessons/lesson-21-take-first` | How `take(1)` and `first()` read one value, complete after that value, and differ when no value arrives. |
| 22. Sharing Work With shareReplay | `/rxjs-lessons/lesson-22-share-replay` | How `share` and `shareReplay` share backend work, and why `shareReplay` can replay cached values to late subscribers. |
| 23. Refresh Trigger With shareReplay | `/rxjs-lessons/lesson-23-refresh-cache` | How to use a refresh Subject, `startWith`, `switchMap`, and `shareReplay` to load, cache, and manually reload backend-style data. |
| 24. Prevent Duplicate Submits With exhaustMap | `/rxjs-lessons/lesson-24-exhaust-map-submit` | How `exhaustMap` accepts one submit request, ignores duplicate clicks while saving, and allows the next submit after completion. |

## Big Ideas So Far

### Observables

- An Observable is a recipe for producing values over time.
- Creating an Observable does not start the work.
- Calling `subscribe()` starts the Observable producer.
- A subscriber can receive zero values, one value, or many values.
- `complete` means the Observable finished normally.
- `unsubscribe()` stops listening and runs cleanup logic.

### Creation Operators

- `of(...)` emits the values passed to it, then completes.
- `from(...)` converts arrays, promises, or iterables into Observables.
- `interval(...)` emits repeatedly on a schedule.
- `timer(...)` waits before emitting.
- `take(...)` limits how many values continue through a stream.

### Pipeable Operators

- `pipe(...)` creates a pipeline of operators.
- `tap(...)` is for logging or side effects without changing the value.
- `filter(...)` keeps only values that pass a condition.
- `map(...)` changes each value into a new value.
- The subscriber receives only the values that survive the pipeline.

### Time Operators

- `delay(...)` moves delivery later while preserving the value.
- `debounceTime(...)` waits for a quiet period and then emits the latest value.
- `throttleTime(...)` emits the first value, then ignores extra values for a short window.
- Timing operators are common in search inputs, save buttons, repeated clicks, and loading flows.

### Flattening Operators

- Flattening operators are used when one Observable value creates another Observable.
- `switchMap(...)` cancels the previous inner Observable and keeps the latest one.
- `concatMap(...)` queues inner Observables and runs them one at a time.
- `mergeMap(...)` runs inner Observables at the same time.
- `exhaustMap(...)` ignores new source values while the current inner Observable is active.

### Error Handling

- An Observable error ends the stream unless an operator catches it.
- `catchError(...)` receives the error and must return a replacement Observable.
- `retry(...)` resubscribes to the source after an error.
- `finalize(...)` runs when a stream completes, errors, or is unsubscribed.
- In Angular screens, `finalize(...)` is useful for turning loading state off.

### Combining Streams

- `combineLatest(...)` emits when any source emits, after all sources have emitted once.
- `withLatestFrom(...)` emits only when the main source emits.
- `forkJoin(...)` waits for all sources to complete, then emits one combined result.
- Choosing a combining operator depends on what should trigger the combined emission.

### Angular Subscription Patterns

- The `async` pipe subscribes in the template and cleans up when the view is destroyed.
- `takeUntilDestroyed(...)` is useful when TypeScript needs stream values until the component is destroyed.
- Manual subscriptions work, but you must keep the `Subscription` and unsubscribe at the right time.
- Long-lived streams such as `interval`, route params, and form value changes need cleanup.

### HTTP Data Flow

- A practical screen stream often emits a view model with `loading`, `data`, and `error`.
- A reload `Subject` can represent user actions or route changes that should fetch fresh data.
- `switchMap(...)` cancels older backend requests when a newer reload arrives.
- `catchError(...)` keeps the outer stream alive after a failed backend call.
- `shareReplay(...)` lets multiple subscribers reuse the latest emitted result.

### Service Data Flow

- A service can own the Subjects, backend calls, operators, and shared view-model stream.
- The component can call methods like `reload()` or `selectCategory(...)` instead of calling `next(...)` directly.
- A `vm$` stream gives the template one Observable with everything it needs.
- Component-level service providers create an isolated service instance for that screen.

### Component Facade

- A facade can expose methods for user intent and hide RxJS implementation details.
- `BehaviorSubject(...)` is useful for local UI state with a current value.
- `combineLatest(...)` can join backend data, search text, and selected ids into one view model.
- A local facade can be scoped to one screen without introducing global state.

### Subjects And Multicasting

- A `Subject` is both an Observable and an observer.
- A plain `Subject` only sends future values to subscribers.
- A `BehaviorSubject(...)` stores one current value and sends it immediately to new subscribers.
- A `ReplaySubject(...)` stores previous values according to its buffer size.
- Subjects are often private event/input streams inside services and facades.

### Marble Thinking

- Marble diagrams draw Observable values across time.
- Dashes represent time passing.
- Values such as `a`, `b`, or `1` represent emitted values.
- `|` represents stream completion.
- Thinking in marbles makes operators like `map`, `filter`, and `switchMap` easier to debug.

### Accumulating State With scan

- `scan(...)` remembers the previous emitted state.
- Each new source event becomes `previous state + event -> next state`.
- Unlike `reduce(...)`, `scan(...)` emits every intermediate state instead of waiting for completion.
- It is useful for carts, activity logs, selected items, undo history, and loading more paginated results.
- It feels similar to a reducer, but it lives inside an RxJS stream instead of global store state.

### Comparing Changes With pairwise

- `pairwise(...)` emits `[previous, current]` arrays.
- It does not emit for the first value because there is no previous value yet.
- `startWith(...)` can provide an initial previous value.
- It is useful when the transition matters, such as old route to new route, old status to new status, or previous metric to current metric.

### Avoiding Duplicate Work With distinctUntilChanged

- `distinctUntilChanged(...)` blocks consecutive duplicate values.
- By default, it compares values with `===`.
- Object values usually need a custom comparer function.
- It is useful before backend calls, route-driven reloads, search requests, and filter changes.
- Normalize values with `map(...)` first when casing or whitespace should not count as a meaningful change.

### Combining Reload Triggers With merge

- `merge(...)` forwards values from multiple Observable sources into one stream.
- It does not wait for all sources to emit.
- It does not combine values into an array or object.
- It is useful when different events should trigger the same workflow.
- A common pattern is `merge(routeChange$, refreshClick$, saveSuccess$).pipe(switchMap(() => loadData()))`.

### Backend Safety With timeout

- `timeout(...)` errors when a source waits too long before emitting.
- It is useful for backend calls, websocket handshakes, and long-running workflows that need a failure path.
- Pair it with `catchError(...)` to show a UI-friendly error state.
- `finalize(...)` still runs after success, failure, timeout, or unsubscribe.

### Rate Limiting With auditTime

- `auditTime(...)` emits the latest value at the end of each time window.
- `debounceTime(...)` waits until the source becomes quiet.
- `throttleTime(...)` emits early, then ignores values for a while.
- `auditTime(...)` is useful when noisy UI events need regular latest-value updates.

### Batching Events With bufferTime

- `bufferTime(...)` collects values for a time window, then emits an array.
- It can emit empty arrays if nothing happened during the window.
- Pair it with `filter((batch) => batch.length > 0)` when empty batches should be ignored.
- It is useful for analytics events, logs, websocket messages, autosave patches, and other small event streams.

### One-Time Reads With take and first

- `take(1)` reads the next value and then completes.
- `first()` reads the first value, or the first value that matches a predicate, then completes.
- `take(1)` completes quietly if the source completes without values.
- `first()` errors if the source completes before a matching value appears.
- These operators are useful for dialog results, one-time route reads, and short workflow decisions.

### Sharing Work With shareReplay

- A cold Observable starts work once per subscriber.
- `share(...)` lets active subscribers share one source subscription.
- `shareReplay(...)` shares the source and caches recent emitted values.
- `bufferSize: 1` means late subscribers receive the latest cached value.
- `refCount: true` disconnects from the source when there are no subscribers.

### Refresh Trigger With shareReplay

- A reload `Subject` can represent user intent, such as clicking refresh.
- `startWith(...)` creates the first load when the stream gets its first subscriber.
- `switchMap(...)` turns each reload trigger into a backend request.
- `shareReplay({ bufferSize: 1, refCount: true })` shares the request result and caches the latest state for late subscribers.
- Calling `refresh$.next(...)` does not update the data directly; it triggers the pipeline to fetch fresh data.

### Prevent Duplicate Submits With exhaustMap

- `exhaustMap(...)` accepts the first source emission and subscribes to its inner Observable.
- New source emissions are ignored while that inner Observable is still active.
- After the inner Observable completes, the next source emission can start new work.
- This is useful for save, pay, invite, upload, and other submit-style workflows.
- It is different from `switchMap(...)`, which cancels old work when a new source value arrives.

### Cold Observable Mental Model

Lesson 1 focuses on a cold Observable:

```text
define Observable
  -> nothing runs yet
subscribe
  -> producer starts
producer emits values
  -> subscriber receives next values
producer completes or subscriber unsubscribes
  -> cleanup runs
```

## Growing Path

Future RxJS lessons can build from this foundation:

- advanced stream debugging
