# Angular Dependency Injection Lesson Summary

Angular Dependency Injection lessons focus on how Angular creates, shares, and
isolates services and configuration. The goal is to make provider scope feel
concrete: who gets the same instance, who gets a new instance, and why provider
location matters.

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Provider Basics | `/angular-dependency-injection-lessons/lesson-01-provider-basics` | How tokens, providers, and `inject()` work together. |
| 2. Service Scope | `/angular-dependency-injection-lessons/lesson-02-service-scope` | How provider location controls service lifetime and sharing. |
| 3. Root vs Component Providers | `/angular-dependency-injection-lessons/lesson-03-root-vs-component-providers` | When to use app-wide services versus component-local service instances. |
| 4. Injection Tokens | `/angular-dependency-injection-lessons/lesson-04-injection-tokens` | How to inject non-class values such as config objects, strings, and feature flags. |
| 5. Factory Providers | `/angular-dependency-injection-lessons/lesson-05-factory-providers` | How `useFactory` creates dependencies from runtime logic and other injected dependencies. |
| 6. Hierarchical Injectors | `/angular-dependency-injection-lessons/lesson-06-hierarchical-injectors` | How Angular walks upward through injector scopes and why the nearest provider wins. |
| 7. Shared vs Isolated Service State | `/angular-dependency-injection-lessons/lesson-07-shared-vs-isolated-state` | How root, route, and component providers affect stateful services. |

## Review Order

- Start with lessons 1-3 to understand providers and scope.
- Use lessons 4-5 for configuration and factory recipes.
- Use lessons 6-7 when debugging why service state is shared or isolated.
