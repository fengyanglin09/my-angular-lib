import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpLessonInterceptorLog {
  readonly entries = signal<string[]>([
    'Interceptor log is waiting for a lesson HTTP request.',
  ]);

  add(entry: string): void {
    this.entries.update((entries) => [entry, ...entries].slice(0, 10));
  }

  clear(): void {
    this.entries.set(['Interceptor log cleared. Send another request.']);
  }
}

export const httpLessonAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const log = inject(HttpLessonInterceptorLog);

  if (!isHttpLessonUrl(request.url)) {
    return next(request);
  }

  const authRequest = request.clone({
    setHeaders: {
      Authorization: 'Bearer lesson-token',
      'X-Lesson-Trace': 'angular-http-lessons',
    },
  });

  log.add(`Auth interceptor cloned ${request.method} ${request.url} and added lesson headers.`);

  return next(authRequest);
};

export const httpLessonTimingInterceptor: HttpInterceptorFn = (request, next) => {
  const log = inject(HttpLessonInterceptorLog);
  const startedAt = performance.now();

  if (!isHttpLessonUrl(request.url)) {
    return next(request);
  }

  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const elapsed = Math.round(performance.now() - startedAt);
        log.add(`Timing interceptor saw ${event.status} from ${request.url} after ${elapsed}ms.`);
      }
    }),
  );
};

function isHttpLessonUrl(url: string): boolean {
  return url.includes('/http-lessons/') || url.includes('localhost:3000');
}
