# Angular Performance Lesson Summary

Angular Performance lessons focus on practical frontend performance decisions:
when components update, how lists render, how route chunks load, and how to
avoid expensive recomputation.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. OnPush Change Detection | `/angular-performance-lessons/lesson-01-onpush-change-detection` | How OnPush narrows component checks and why immutable inputs matter. |
| 2. Signals And Change Detection | `/angular-performance-lessons/lesson-02-signals-change-detection` | How signal reads connect templates to precise reactive updates. |
| 3. @for track And List Rendering | `/angular-performance-lessons/lesson-03-for-track` | How stable tracking lets Angular reuse DOM rows during list changes. |
| 4. Lazy Loading | `/angular-performance-lessons/lesson-04-lazy-loading` | How `loadChildren` and `loadComponent` keep feature code out of the initial bundle. |
| 5. Defer Blocks | `/angular-performance-lessons/lesson-05-defer-blocks` | How `@defer`, placeholders, and loading blocks delay expensive secondary UI. |
| 6. Avoiding Unnecessary Recomputation | `/angular-performance-lessons/lesson-06-avoid-recomputation` | How computed values and derived state keep heavy work out of templates. |

## Review Order

- Start with lessons 1-3 for rendering and change detection.
- Use lessons 4-5 for loading less code up front.
- Use lesson 6 when filtering, sorting, and mapping start becoming expensive.
