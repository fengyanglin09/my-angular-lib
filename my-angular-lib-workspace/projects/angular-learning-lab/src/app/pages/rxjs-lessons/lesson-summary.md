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

- service-based data flows and component-store style facades
