# Angular Auth / Permissions Lesson Summary

Angular Auth lessons focus on the frontend side of authentication and
authorization flows: login, guards, session state, permissions, refresh, and
logout cleanup. Backend authorization still remains the real security boundary.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Login Flow | `/angular-auth-lessons/lesson-01-login-flow` | How login submits credentials, stores session state, and redirects to the intended page. |
| 2. Route Guards | `/angular-auth-lessons/lesson-02-route-guards` | How guards allow, block, or redirect protected navigation. |
| 3. Token And Session Handling | `/angular-auth-lessons/lesson-03-token-session-handling` | How to centralize token/session state and expose derived UI state. |
| 4. Role-Based UI | `/angular-auth-lessons/lesson-04-role-based-ui` | How to show/hide UI affordances by permission while still relying on backend enforcement. |
| 5. Refresh Token Flow | `/angular-auth-lessons/lesson-05-refresh-token-flow` | How expired access tokens can be refreshed and original requests retried. |
| 6. Logout Cleanup | `/angular-auth-lessons/lesson-06-logout-cleanup` | How to clear session, storage, caches, and user-specific state on logout. |

## Review Order

- Start with lessons 1-3 for session and navigation basics.
- Use lesson 4 for UI permission checks.
- Use lessons 5-6 for long-running sessions and cleanup behavior.
