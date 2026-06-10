# Angular Signals Lessons

This track focuses on Angular's signal-based reactivity for component state,
derived values, effects, inputs, and practical UI patterns.

## Lessons

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Signal Basics | `/angular-signal-lessons/lesson-01-signal-basics` | How to create writable signals, read signal values, update state with `set` and `update`, and derive values with `computed`. |
| 2. Effects For Side Effects | `/angular-signal-lessons/lesson-02-effects` | How `effect(...)` runs when signal dependencies change, and why effects are for side effects rather than derived display state. |
| 3. Effect Cleanup | `/angular-signal-lessons/lesson-03-effect-cleanup` | How to use `onCleanup` inside an effect to cancel timers, subscriptions, listeners, or pending async work before the effect reruns. |

## Big Ideas So Far

### Signal Basics

- `signal(value)` creates writable reactive state.
- Read a signal by calling it like a function, such as `quantity()`.
- `set(...)` replaces the current value.
- `update(...)` receives the current value and returns the next value.
- `computed(...)` derives values from other signals and recalculates when those dependencies change.

### Effects For Side Effects

- `effect(...)` runs once when it is created.
- Angular tracks the signals read inside the effect body.
- When any tracked signal changes, the effect runs again.
- Use `computed(...)` for values you want to read or display.
- Use `effect(...)` for side effects, such as logging, syncing preferences, or calling browser APIs.

### Effect Cleanup

- `effect((onCleanup) => ...)` gives the effect a cleanup callback.
- Cleanup runs before the same effect reruns because a tracked signal changed.
- Cleanup also runs when Angular destroys the effect with the component.
- Use cleanup for timers, subscriptions, browser listeners, and pending async work.
- Cleanup prevents older side effects from finishing after newer signal state has replaced them.

## Growing Path

Future Angular Signals lessons can build from this foundation:

- `effect(...)` for side effects
- signals with component inputs
- signal-based forms and local UI state
- converting between Signals and Observables
- signal services for shared state
