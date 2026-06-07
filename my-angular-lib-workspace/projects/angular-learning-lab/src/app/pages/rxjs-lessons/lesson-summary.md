# RxJS Lesson Summary

This file is a quick index of the RxJS lessons in this folder. Use it to track
what each lesson teaches as the RxJS learning path grows.

## Lessons

| Lesson | Route | What It Teaches |
| --- | --- | --- |
| 1. Observable Basics | `/rxjs-lessons/lesson-01-observable-basics` | What an Observable is, why it does not run until subscription, how `next` and `complete` work, and how `unsubscribe()` runs cleanup. |
| 2. Creation Operators | `/rxjs-lessons/lesson-02-creation-operators` | How to create Observables with `of`, `from`, `interval`, and `timer`, plus why `take` is useful for limiting long-running streams. |
| 3. Pipeable Operators | `/rxjs-lessons/lesson-03-pipeable-operators` | How `pipe()` chains operators, how `tap` observes values, how `filter` removes values, and how `map` transforms values. |

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

- async operators like `delay` and `debounceTime`
- flattening operators like `switchMap`, `concatMap`, `mergeMap`, and `exhaustMap`
- error handling with `catchError`
- combining streams with `combineLatest`, `withLatestFrom`, and `forkJoin`
- Angular patterns like `async` pipe, HTTP streams, and subscription cleanup
