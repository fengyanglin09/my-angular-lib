# Angular Signals Lessons

This track focuses on Angular's signal-based reactivity for component state,
derived values, effects, inputs, and practical UI patterns.

## Lessons

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Signal Basics | `/angular-signal-lessons/lesson-01-signal-basics` | How to create writable signals, read signal values, update state with `set` and `update`, and derive values with `computed`. |
| 2. Effects For Side Effects | `/angular-signal-lessons/lesson-02-effects` | How `effect(...)` runs when signal dependencies change, and why effects are for side effects rather than derived display state. |
| 3. Effect Cleanup | `/angular-signal-lessons/lesson-03-effect-cleanup` | How to use `onCleanup` inside an effect to cancel timers, subscriptions, listeners, or pending async work before the effect reruns. |
| 4. Input Signals | `/angular-signal-lessons/lesson-04-input-signals` | How child components receive parent data with `input(...)` and `input.required(...)`, then read those inputs like signals. |
| 5. Model Signals | `/angular-signal-lessons/lesson-05-model-signals` | How child controls use `model(...)` and two-way binding to update parent-owned signal state. |
| 6. linkedSignal | `/angular-signal-lessons/lesson-06-linked-signal` | How `linkedSignal(...)` creates writable state that resets from another signal-driven computation. |

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

### Input Signals

- `input(...)` creates an optional input signal with a default value.
- `input.required<T>()` creates a required input signal.
- A child reads input signals by calling them, such as `plan()`.
- Input signals can be used inside `computed(...)`.
- Parent-to-child data flow still matters: the parent owns the state, and the child receives it.

### Model Signals

- `model(...)` creates a writable signal input for two-way component binding.
- The parent can bind a signal with syntax like `[(quantity)]="quantity"`.
- The child reads the model by calling it, such as `quantity()`.
- The child can update the model with `set(...)` or `update(...)`.
- Use `input(...)` for one-way data and `model(...)` when the child should update parent-owned state.

### linkedSignal

- `linkedSignal(...)` creates writable state.
- Its initial and reset value comes from a reactive computation.
- It tracks the signals read inside that computation.
- When those dependencies change, the linked signal resets from the computation.
- Use it when state is user-editable but should reset when another state source changes.

## Growing Path

Future Angular Signals lessons can build from this foundation:

- `effect(...)` for side effects
- signals with component inputs
- signal-based forms and local UI state
- converting between Signals and Observables
- signal services for shared state
