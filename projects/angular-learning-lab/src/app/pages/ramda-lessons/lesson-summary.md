# Ramda Lesson Summary

Ramda is a general-purpose functional utility library for JavaScript and
TypeScript. It is not specific to NgRx. These lessons start with plain data
transformations, then later apply the same ideas to Angular, RxJS, and NgRx.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. What Is Ramda | `/ramda-lessons/lesson-01-what-is-ramda` | Ramda as a general data-transformation library, using `pipe`, `sortBy`, and `assoc` with plain arrays and objects. |
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
