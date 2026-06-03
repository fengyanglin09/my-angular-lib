### Phase 1: Strengthen Core NgRx

Lesson 21: Store DevTools Deep Dive
Learn how to inspect actions, state changes, router actions, effect timing, and time travel.

Lesson 22: Runtime Checks And Immutability
Why reducers must be immutable, what runtime checks catch, and common mutation mistakes.

Lesson 23: Testing Reducers
Unit test reducer state transitions.

Lesson 24: Testing Selectors
Test selectors, selector factories, and view model selectors.

Lesson 25: Testing Effects
Test effects with mocked actions, mocked services, success/failure flows.

### Phase 2: Real App Architecture

Lesson 26: Feature Folder Structure
How to organize actions, reducer, effects, selectors, facade, api service, models.

Lesson 27: Smart vs Presentational Components
Container component talks to Store; child components receive inputs and emit events.

Lesson 28: Facade With Component Inputs
Improve Lesson 11 into a more real app pattern.

Lesson 29: Loading/Error UX Patterns
Per-page loading, per-item loading, global loading, retry, empty state.

Lesson 30: Normalized State With Relationships
Example: authors + books, or projects + tasks.

### Phase 3: More Advanced Effects

Lesson 31: Cancel API Calls
Use switchMap, route changes, and cancellation intentionally.

Lesson 32: Polling / Refresh Effects
Periodic refresh, stop polling, refresh on user action.

Lesson 33: Debounced Effects
Search/filter effect using debounceTime, distinctUntilChanged.

Lesson 34: Optimistic vs Pessimistic Revisited
More realistic create/update/delete with backend ids and rollback.

Lesson 35: Entity Adapter Advanced
upsertOne, upsertMany, updateMany, custom selectId, nested entity problems.

### Phase 4: Production Concerns

Lesson 36: Persistence
Save selected state to localStorage and restore it.

Lesson 37: Auth State
Login/logout, current user, token, protected route behavior.

Lesson 38: Global App State
Theme, sidebar, notifications, preferences.

Lesson 39: Error Handling Strategy
Local errors vs global errors, effect error actions, retry.

Lesson 40: Build A Mini Real App
Put it all together: route-driven list/detail/edit app with pagination, entity state, effects, router-store, facade, and tests.
