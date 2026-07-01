# Angular Route Lessons

These lessons focus on Angular Router patterns used in normal application development: route configuration, links, route parameters, query parameters, nested layouts, guards, resolvers, and lazy loading.

| Lesson | Route | What It Teaches |
| --- | --- | --- |
| 1. Route Basics | `/angular-route-lessons/lesson-01-route-basics` | How Angular maps a URL to a route record, lazy-loads a component, and renders it in a `router-outlet`. |
| 2. Route Params | `/angular-route-lessons/lesson-02-route-params/project-101` | How dynamic URL segments like `:projectId` are defined, linked to, and read from a component. |
| 3. Query Params | `/angular-route-lessons/lesson-03-query-params` | How optional URL state like filters, sorting, and search terms can live after `?` in the URL. |
| 4. Child Routes | `/angular-route-lessons/lesson-04-child-routes/overview` | How a parent route keeps a shared layout on screen while child routes render inside a nested `router-outlet`. |

## Big Ideas

- A route table is a list of URL matching rules.
- Angular checks route records in order and uses the first match.
- `path` describes the URL segment to match.
- `loadComponent` lazy-loads one standalone component.
- `loadChildren` lazy-loads a group of child routes.
- `routerLink` navigates without a full browser page reload.
- `router-outlet` is the placeholder where the matched component appears.
- A route parameter is a named placeholder in the path, such as `:projectId`.
- `snapshot.paramMap` reads the current value once.
- `paramMap` is an Observable that emits again when the route parameter changes.
- Query params live after `?`, such as `?filter=active&sort=name`.
- `snapshot.queryParamMap` reads current query params once.
- `queryParamMap` emits when query params change while the same component stays on screen.
- Child routes are matched after their parent route is matched.
- A parent routed component can have its own nested `router-outlet`.
- Relative `routerLink` values are useful for moving between sibling child routes.
