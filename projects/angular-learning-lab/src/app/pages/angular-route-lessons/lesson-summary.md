# Angular Route Lessons

These lessons focus on Angular Router patterns used in normal application development: route configuration, links, route parameters, query parameters, nested layouts, guards, resolvers, and lazy loading.

| Lesson | Route | What It Teaches |
| --- | --- | --- |
| 1. Route Basics | `/angular-route-lessons/lesson-01-route-basics` | How Angular maps a URL to a route record, lazy-loads a component, and renders it in a `router-outlet`. |
| 2. Route Params | `/angular-route-lessons/lesson-02-route-params/project-101` | How dynamic URL segments like `:projectId` are defined, linked to, and read from a component. |
| 3. Query Params | `/angular-route-lessons/lesson-03-query-params` | How optional URL state like filters, sorting, and search terms can live after `?` in the URL. |
| 4. Child Routes | `/angular-route-lessons/lesson-04-child-routes/overview` | How a parent route keeps a shared layout on screen while child routes render inside a nested `router-outlet`. |
| 5. Named Outlets | `/angular-route-lessons/lesson-05-named-outlets/dashboard` | How an unnamed primary outlet and a named outlet can render different route branches at the same time. |
| 6. Redirects | `/angular-route-lessons/lesson-06-redirects-wildcards/dashboard` | How default redirects, legacy redirects, `pathMatch`, and wildcard fallbacks shape navigation. |
| 7. Programmatic Nav | `/angular-route-lessons/lesson-07-programmatic-navigation/inbox` | How to navigate from TypeScript with `Router.navigate`, `relativeTo`, `queryParams`, and `navigateByUrl`. |
| 8. Route Guards | `/angular-route-lessons/lesson-08-route-guards/public` | How `canActivate` can allow navigation, block navigation, or redirect to a safer route. |
| 9. Route Resolvers | `/angular-route-lessons/lesson-09-route-resolvers/project-101` | How a resolver loads data before route activation and exposes it through `ActivatedRoute.data`. |
| 10. CanDeactivate | `/angular-route-lessons/lesson-10-can-deactivate/editor` | How a `canDeactivate` guard can pause navigation and ask the user to save, discard, or stay when there are unsaved changes. |
| 11. Route Data | `/angular-route-lessons/lesson-11-route-data/dashboard` | How route records can provide static metadata and page titles that components read from `ActivatedRoute.data`. |
| 12. Lazy Routes | `/angular-route-lessons/lesson-12-lazy-routes` | How `loadChildren` lazy-loads a feature route file with its own child routes. |

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
- An unnamed route renders in the primary unnamed outlet.
- A route with `outlet: 'sidePanel'` renders in `<router-outlet name="sidePanel" />`.
- Named outlet URLs use auxiliary route syntax, such as `(dashboard//sidePanel:notes)`.
- `redirectTo` changes the matched URL to another route.
- `pathMatch: 'full'` means the whole remaining path must match.
- `**` is a wildcard fallback and should usually be last within its route group.
- `Router.navigate(...)` builds navigation from route commands.
- `relativeTo` makes programmatic navigation relative to the current activated route.
- `navigateByUrl(...)` navigates to a complete URL string.
- A guard runs during navigation before Angular activates the target route.
- A guard can return `true`, `false`, or a `UrlTree` redirect.
- Guards protect route entry; they do not automatically remove a user from a page after access changes.
- A resolver runs during navigation before the target route activates.
- Resolved values are available on `ActivatedRoute.data`.
- Resolvers are useful when the route should not render until required data is available.
- `canDeactivate` runs when navigation tries to leave the guarded component.
- A `canDeactivate` guard can allow or cancel leaving the current route.
- A `canDeactivate` guard can return a `Promise<boolean>` when navigation must wait for a user decision.
- Unsaved-change guards usually belong on editor or form routes.
- Route `data` stores static metadata such as labels, breadcrumbs, role hints, and analytics names.
- Route `title` describes the document title for the active route.
- Static route data and resolver results are both read through `ActivatedRoute.data`.
- Lazy route groups are useful for larger feature areas the user may not visit immediately.
