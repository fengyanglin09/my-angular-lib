# Angular HTTP Lesson Summary

Angular HTTP lessons focus on client-side API integration with `HttpClient`.
The goal is to make backend calls feel practical: typed API services, loading
state, errors, retries, cancellation, interceptors, and auth headers.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. HttpClient Basics | `/angular-http-lessons/lesson-01-http-client-basics` | How to register `HttpClient`, create a typed API service, call `http.get<T>()`, and show loading/data/error state. |
| 2. POST Create | `/angular-http-lessons/lesson-02-post-create` | How a create request body differs from the returned server object, using a fake in-memory API instead of a real backend. |
| 3. JSON Server Local Backend | `/angular-http-lessons/lesson-03-json-server-backend` | How to run an optional local REST API with JSON Server and call real `GET`, `POST`, `PATCH`, and `DELETE` endpoints from Angular. |

## Planned Direction

- Typed `GET` requests and API services.
- Request body patterns for `POST`, `PUT`, `PATCH`, and `DELETE`.
- Local-only mock backends versus GitHub Pages compatible static assets.
- Loading, empty, success, and error state.
- Query parameters and headers.
- Interceptors for auth headers and cross-cutting error handling.
- Cancellation with RxJS and route changes.
- Runtime response validation when backend data cannot be trusted.
