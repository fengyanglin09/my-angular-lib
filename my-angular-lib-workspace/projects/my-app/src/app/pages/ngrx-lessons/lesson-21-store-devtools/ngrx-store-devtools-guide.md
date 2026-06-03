# NgRx Store DevTools Guide

NgRx Store DevTools is a browser debugging tool. It does not show inside the
Angular page. It appears inside the browser Developer Tools, usually as a tab
called **Redux**.

## 1. Install The Extension

Install the Redux DevTools browser extension.

Chrome / Edge:

https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

NgRx uses this Redux DevTools extension because NgRx Store follows the same
action -> reducer -> state timeline idea.

## 2. Open The App

Run the Angular app, then open this lesson:

http://localhost:4200/ngrx-lessons/lesson-21-store-devtools

## 3. Open Browser Developer Tools

On Mac:

```text
Cmd + Option + I
```

Or right-click the page and choose **Inspect**.

Look for a tab named:

```text
Redux
```

If you do not see it, click the `>>` overflow menu in DevTools. Sometimes the
tab is hidden there.

## 4. First Thing To Try

On Lesson 21, click:

```text
Increment
```

In the Redux tab, you should see an action:

```text
[DevTools Lab] Increment Counter
```

Click that action.

Now look at the right side of DevTools.

## 5. The Most Useful Tabs

### Action

This shows the action object that was dispatched.

For example:

```ts
DevtoolsLabActions.incrementCounter()
```

creates an action similar to:

```ts
{
  type: '[DevTools Lab] Increment Counter'
}
```

If an action has parameters, they appear here too.

For example:

```ts
DevtoolsLabActions.setLabel({ label: 'Reducer updated count' })
```

creates:

```ts
{
  type: '[DevTools Lab] Set Label',
  label: 'Reducer updated count'
}
```

### State

This shows the full NgRx store state after the selected action finished.

In this project, look for:

```text
devtoolsLab
```

Inside it, you should see values like:

```ts
{
  count: 1,
  label: 'Ready to inspect',
  loading: false,
  error: null,
  auditTrail: []
}
```

### Diff

This is one of the best tabs for learning.

It shows only what changed because of the selected action.

Example:

After clicking **Increment**, the Diff tab should show that:

```text
devtoolsLab.count
```

changed from:

```text
0
```

to:

```text
1
```

This is very useful because real app state can become large.

### Trace

Trace is optional. If you click the **Trace** tab and see a message like:

```text
To enable tracing action calls, you should set trace option to true
```

that means the browser extension is working, but the selected action does not
have trace information.

Important: Trace is not retroactive. If an action happened before trace was
enabled, that old action will still show the warning. Reload the app and
dispatch a new action.

In this project, trace is enabled in:

```text
projects/my-app/src/app/app.config.ts
```

with:

```ts
provideStoreDevtools({
  maxAge: 25,
  logOnly: !isDevMode(),
  trace: true,
  traceLimit: 25,
});
```

Use this checklist after changing the setting:

1. Stop and restart `ng serve`, or wait for the dev server to rebuild.
2. Refresh the browser page.
3. In Redux DevTools, click **Reset** to clear the old action history.
4. Click a button in Lesson 21, such as **Increment**.
5. Select the new `[DevTools Lab] Increment Counter` action.
6. Open the **Trace** tab.

If you still see the warning, close and reopen Chrome DevTools. The Redux
extension can keep an older connection open until DevTools is reopened.

Also check the instance dropdown near the top of Redux DevTools. If there are
multiple instances, choose the current localhost app instance, then dispatch a
new action again.

Trace tries to show where the action was dispatched from in the code. For
example, for Lesson 21 it can help you connect:

```text
button click
```

to:

```ts
this.store.dispatch(DevtoolsLabActions.incrementCounter());
```

Trace is helpful, but it is not always the first tab to use. For learning NgRx,
start with **Action**, **State**, and **Diff**. Use **Trace** when you want to
answer:

```text
Where in the code did this action come from?
```

If Trace still does not work, do not let it block your NgRx learning. The most
important DevTools tabs are still **Action**, **State**, and **Diff**. Trace is
nice for finding the dispatch call site, but most NgRx debugging happens by
following the action payload and state diff.

## 6. How To Read An Effect In DevTools

Click:

```text
Load audit trail
```

You should see this action first:

```text
[DevTools Lab] Load Audit Trail
```

That action is handled by the reducer and changes:

```ts
loading: true
error: null
```

Then the effect runs:

```ts
readonly loadAuditTrail$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DevtoolsLabActions.loadAuditTrail),
    switchMap(({ shouldFail }) =>
      this.devtoolsLabApi.loadAuditTrail(shouldFail).pipe(
        map((entries) =>
          DevtoolsLabActions.loadAuditTrailSuccess({ entries }),
        ),
        catchError((error: Error) =>
          of(DevtoolsLabActions.loadAuditTrailFailure({ error: error.message })),
        ),
      ),
    ),
  ),
);
```

After the mock API finishes, you should see:

```text
[DevTools Lab] Load Audit Trail Success
```

That second action is also dispatched into the store. The reducer handles it and
changes:

```ts
loading: false
auditTrail: [...]
```

So the timeline is:

```text
button click
  -> dispatch Load Audit Trail
  -> reducer sets loading true
  -> effect calls API
  -> effect dispatches Load Audit Trail Success
  -> reducer saves returned data
```

## 7. How To Read A Failure

Click:

```text
Load and fail
```

You should see:

```text
[DevTools Lab] Load Audit Trail
```

Then later:

```text
[DevTools Lab] Load Audit Trail Failure
```

The failure action has the error message on it.

The reducer stores that error in state:

```ts
error: 'The audit service rejected this request.'
loading: false
```

## 8. Time Travel

In Redux DevTools, you can click older actions in the action list.

When you select an older action, DevTools shows what the state looked like at
that point in time.

This is called time travel.

It helps answer questions like:

```text
Which action changed this value?
When did loading become true?
Did the API success action actually save data?
Did a reset action clear the state?
```

## 9. How To Debug A Real NgRx Bug

When something looks wrong in a real app, use this order:

1. Did the expected action dispatch?
2. Does the action contain the payload you expected?
3. Did the reducer change the state correctly?
4. If an effect is involved, did the success or failure action happen?
5. Does the selector read the correct part of the state?
6. Does the component display the selected value correctly?

This order is powerful because it follows the real data flow:

```text
component
  -> action
  -> reducer
  -> state
  -> selector
  -> component template
```

For effects:

```text
component
  -> action
  -> effect
  -> API
  -> success/failure action
  -> reducer
  -> state
  -> selector
  -> component template
```

## 10. What To Remember

The DevTools is not magic. It is mainly a timeline.

It shows:

- what action happened
- what data was inside that action
- what the state looked like after the action
- what changed compared with the previous state

That is why NgRx can feel complicated at first, but becomes easier to debug in
large applications. The state changes are explicit and inspectable.
