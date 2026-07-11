# Angular Components Lesson Summary

Angular Components lessons focus on component design, communication, and
reusable APIs. The goal is to make component boundaries feel practical: who owns
state, how data flows, when to use projection, and when queries are appropriate.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Smart vs Presentational Components | `/angular-components-lessons/lesson-01-smart-presentational` | How to split data coordination from reusable rendering components. |
| 2. input, output, and model | `/angular-components-lessons/lesson-02-input-output-model` | How parent-to-child data, child-to-parent events, and two-way control state differ. |
| 3. Reusable Component APIs | `/angular-components-lessons/lesson-03-reusable-component-apis` | How to design small component APIs with inputs, outputs, and caller-owned behavior. |
| 4. Content Projection | `/angular-components-lessons/lesson-04-content-projection` | How `ng-content` slots let the parent provide custom markup while the child owns layout. |
| 5. View Queries | `/angular-components-lessons/lesson-05-view-queries` | How `viewChild` and `viewChildren` read elements or child components from the component's own template. |
| 6. Content Queries | `/angular-components-lessons/lesson-06-content-queries` | How `contentChild` and `contentChildren` read projected content from the parent. |
| 7. Component Communication Patterns | `/angular-components-lessons/lesson-07-component-communication` | How to choose between input/output, shared services, stores, and router state. |
| 8. State Ownership Boundaries | `/angular-components-lessons/lesson-08-state-ownership` | How to decide who owns source-of-truth state and when local draft state is appropriate. |

## Review Order

- Start with lessons 1-3 for component API design.
- Use lessons 4-6 for projection and query patterns.
- Use lessons 7-8 when deciding where state and communication should live in a larger app.
