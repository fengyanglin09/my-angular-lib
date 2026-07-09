# Ramda Lesson Summary

Ramda is a general-purpose functional utility library for JavaScript and
TypeScript. It is not specific to NgRx. These lessons start with plain data
transformations, then later apply the same ideas to Angular, RxJS, and NgRx.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. What Is Ramda | `/ramda-lessons/lesson-01-what-is-ramda` | Ramda as a general data-transformation library, using `pipe`, `sortBy`, and `assoc` with plain arrays and objects. |
| 2. Collection Transformations | `/ramda-lessons/lesson-02-collection-transformations` | How `map`, `filter`, `reject`, `find`, `sortBy`, `reverse`, and `groupBy` transform arrays without mutating the original data. |
| 3. Immutable Object Updates | `/ramda-lessons/lesson-03-immutable-object-updates` | How `assoc`, `assocPath`, and `evolve` return updated copies of objects while the original object stays unchanged. |
| 4. pipe And compose | `/ramda-lessons/lesson-04-pipe-compose` | How `pipe` runs functions left-to-right, how `compose` runs right-to-left, and why named transformation steps make pipelines easier to read. |
| 5. Predicates | `/ramda-lessons/lesson-05-predicates` | How `propEq`, `where`, `allPass`, `anyPass`, and `complement` create reusable yes/no functions for filtering and access rules. |
| 6. Nested Data And Lenses | `/ramda-lessons/lesson-06-nested-data-lenses` | How `path`, `pathOr`, `lensPath`, `view`, `set`, and `over` read and update nested data without mutating the source object. |
| 7. Currying And Partial Application | `/ramda-lessons/lesson-07-currying-partial-application` | How `curry` and `partial` pre-fill configuration arguments so the returned function can be reused with later data. |
| 8. Data Shaping For UI | `/ramda-lessons/lesson-08-data-shaping-for-ui` | How `pick`, `omit`, `project`, `pluck`, and `applySpec` shape backend records into smaller UI view models. |
| 9. Ramda With NgRx | `/ramda-lessons/lesson-09-ramda-with-ngrx` | How Ramda can help with NgRx-style immutable reducer updates and selector transformations after the core Ramda ideas are familiar. |

## Planned Direction

- Core list transformations: `map`, `filter`, `reject`, `find`, `sortBy`, and `groupBy`.
- Immutable object updates: `assoc`, `assocPath`, `evolve`, `lensPath`, and `over`.
- Composition: `pipe`, `compose`, and naming small transformation steps.
- Predicates: `propEq`, `where`, `allPass`, `anyPass`, and `complement`.
- Practical Angular use: deriving display data from API responses.
- Practical RxJS use: Ramda functions inside stream operators.
- Practical NgRx use: selectors and reducers.

## Big Ideas

- Ramda is optional.
- Ramda works on plain data, so it can be used in many places.
- Pure transformations are easiest to test and reuse.
- Compact code is not automatically clearer code.
- Prefer plain TypeScript when the Ramda version hides the business meaning.
