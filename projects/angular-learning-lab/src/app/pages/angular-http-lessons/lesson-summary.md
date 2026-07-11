# Angular HTTP Lesson Summary

Angular HTTP lessons focus on client-side API integration with `HttpClient`.
The goal is to make backend calls feel practical: typed API services, loading
state, errors, retries, cancellation, interceptors, and auth headers.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. HttpClient Basics | `/angular-http-lessons/lesson-01-http-client-basics` | How to register `HttpClient`, create a typed API service, call `http.get<T>()`, and show loading/data/error state. |
| 2. POST Create | `/angular-http-lessons/lesson-02-post-create` | How a create request body differs from the returned server object, using a fake in-memory API instead of a real backend. |
| 3. JSON Server Local Backend | `/angular-http-lessons/lesson-03-json-server-backend` | How to run an optional local REST API with JSON Server and call real `GET`, `POST`, `PATCH`, and `DELETE` endpoints from Angular. |
| 4. Query Params And Headers | `/angular-http-lessons/lesson-04-query-params-headers` | How to send filters, sorting, pagination, and request metadata with `HttpParams`, `HttpHeaders`, and `observe: 'response'`. |
| 5. Error Handling And Retry | `/angular-http-lessons/lesson-05-error-retry` | How to use `retry`, `catchError`, and clear UI state for failed HTTP calls. |
| 6. Cancellation With switchMap | `/angular-http-lessons/lesson-06-cancellation-switchmap` | How to use `debounceTime`, `distinctUntilChanged`, `switchMap`, and `takeUntilDestroyed` for newest-request-wins search flows. |
| 7. Interceptors And Auth Headers | `/angular-http-lessons/lesson-07-interceptors-auth` | How functional interceptors clone requests, add headers, continue with `next`, and observe responses. |
| 8. Progress Events | `/angular-http-lessons/lesson-08-progress-events` | How `observe: 'events'` and `reportProgress` support upload/download progress UI. |
| 9. DTO Mapping And Runtime Validation | `/angular-http-lessons/lesson-09-dto-mapping-validation` | How to validate backend JSON at runtime and map DTOs into UI view models. |
| 10. API Configuration | `/angular-http-lessons/lesson-10-api-configuration` | How to keep API base URLs and endpoint construction centralized instead of scattering URLs through components. |

## Planned Direction

- Use lessons 1-4 first to learn request basics and backend shape.
- Use lessons 5-8 next to learn real app behavior around failures, cancellation, interceptors, and progress.
- Use lessons 9-10 when you are thinking about larger app boundaries: backend DTOs and API configuration.
