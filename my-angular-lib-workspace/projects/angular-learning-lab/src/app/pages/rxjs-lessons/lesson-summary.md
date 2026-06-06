# RxJS Lesson Summary

This file is a quick index of the RxJS lessons in this folder. Use it to track
what each lesson teaches as the RxJS learning path grows.

## Lessons

| Lesson | Route | What It Teaches |
| --- | --- | --- |
| 1. Observable Basics | `/rxjs-lessons/lesson-01-observable-basics` | What an Observable is, why it does not run until subscription, how `next` and `complete` work, and how `unsubscribe()` runs cleanup. |

## Big Ideas So Far

### Observables

- An Observable is a recipe for producing values over time.
- Creating an Observable does not start the work.
- Calling `subscribe()` starts the Observable producer.
- A subscriber can receive zero values, one value, or many values.
- `complete` means the Observable finished normally.
- `unsubscribe()` stops listening and runs cleanup logic.

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

- operators like `map`, `filter`, and `tap`
- async operators like `delay`, `debounceTime`, and `interval`
- flattening operators like `switchMap`, `concatMap`, `mergeMap`, and `exhaustMap`
- error handling with `catchError`
- combining streams with `combineLatest`, `withLatestFrom`, and `forkJoin`
- Angular patterns like `async` pipe, HTTP streams, and subscription cleanup

