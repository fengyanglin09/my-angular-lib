# Angular HTTP Lesson Summary

Angular HTTP lessons focus on client-side API integration with `HttpClient`.
The goal is to make backend calls feel practical: typed API services, loading
state, errors, retries, cancellation, interceptors, and auth headers.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. HttpClient Basics | `/angular-http-lessons/lesson-01-http-client-basics` | How to register `HttpClient`, create a typed API service, call `http.get<T>()`, and show loading/data/error state. |

## Planned Direction

- Typed `GET` requests and API services.
- Request body patterns for `POST`, `PUT`, `PATCH`, and `DELETE`.
- Loading, empty, success, and error state.
- Query parameters and headers.
- Interceptors for auth headers and cross-cutting error handling.
- Cancellation with RxJS and route changes.
- Runtime response validation when backend data cannot be trusted.
