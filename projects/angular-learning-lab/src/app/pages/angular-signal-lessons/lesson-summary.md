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
| 7. Signals And RxJS Interop | `/angular-signal-lessons/lesson-07-rxjs-interop` | How to use `toObservable(...)` and `toSignal(...)` to combine signal UI state with RxJS operators and async streams. |
| 8. Signal Service State | `/angular-signal-lessons/lesson-08-signal-service` | How to use an injectable service with private writable signals, public readonly signals, computed values, and methods for shared local state. |
| 9. Resource Loading | `/angular-signal-lessons/lesson-09-resource-loading` | How `resource(...)` connects reactive params to an API service, exposing value, status, error, loading, reload, and cancellation. |
| 10. Signal Queries | `/angular-signal-lessons/lesson-10-signal-queries` | How `viewChild(...)` and `viewChildren(...)` expose DOM and child component references as signals. |
| 11. Content Queries | `/angular-signal-lessons/lesson-11-content-queries` | How `contentChild(...)` and `contentChildren(...)` inspect projected content inside reusable components. |
| 12. After Render Hooks | `/angular-signal-lessons/lesson-12-after-render` | How `afterNextRender(...)` and `afterRenderEffect(...)` run DOM focus, scroll, and measurement work after Angular renders. |

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

### Signals And RxJS Interop

- `toObservable(signal)` turns signal changes into Observable emissions.
- RxJS remains useful for debounce, cancellation, retries, and async stream composition.
- `toSignal(observable, { initialValue })` turns Observable output back into signal state.
- Provide an `initialValue` so the template can render before the Observable emits.
- This pattern works well for search boxes, route streams, service streams, and backend-style data flows.

### Signal Service State

- A service can hold signal state that several components share.
- Keep writable signals private inside the service.
- Expose readonly signals and computed values for component reads.
- Expose methods for state changes.
- Provider scope controls whether the store is local to one feature or global across the app.

### Resource Loading

- `resource(...)` is for async read/loading workflows.
- `params` is reactive; signal reads inside it can trigger a new load.
- `loader` receives `params`, `previous`, and `abortSignal`.
- The loader can call a service method, such as `projectApi.loadProject(params, abortSignal)`.
- Passing `abortSignal` through to `fetch(url, { signal: abortSignal })` lets the browser cancel stale requests.
- `value()`, `status()`, `isLoading()`, and `error()` expose loading state as signals.
- `reload()` requests a fresh load for the current params.

### Signal Queries

- `viewChild(...)` creates a signal for one matching template reference or child component.
- `viewChild.required(...)` is useful when the match always exists.
- `viewChildren(...)` creates a signal that contains all rendered matches.
- Query signals update when Angular adds or removes matching view elements.
- Use query signals for view work such as focus, scroll, measuring, or calling child component APIs.

### Content Queries

- `contentChild(...)` reads one item projected into a component through `ng-content`.
- `contentChildren(...)` reads all projected items matching a reference, directive, or component.
- Content queries are different from view queries: they observe parent-provided projected content, not the child component's own template.
- Query signals update when projected matches are added or removed.
- Use content queries for reusable shells such as cards, tabs, menus, layout components, and form wrappers.

### After Render Hooks

- `afterNextRender(...)` runs once after the next completed render.
- `afterRenderEffect(...)` tracks signals and runs after render when those dependencies change.
- Use render phases to separate DOM writes from DOM reads.
- Use these hooks for focus, scroll, layout measurement, and DOM-based library setup.
- Do not use render hooks for normal derived state; use `computed(...)` for that.

## Growing Path

Future Angular Signals lessons can build from this foundation:

- `effect(...)` for side effects
- signals with component inputs
- signal-based forms and local UI state
- converting between Signals and Observables
- signal services for shared state
