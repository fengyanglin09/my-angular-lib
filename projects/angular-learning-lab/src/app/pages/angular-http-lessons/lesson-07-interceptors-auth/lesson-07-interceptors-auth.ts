import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { HttpLessonInterceptorLog } from '../shared/http-lesson-interceptors';

@Component({
  selector: 'app-lesson-07-interceptors-auth',
  imports: [LearningNav],
  templateUrl: './lesson-07-interceptors-auth.html',
  styleUrl: './lesson-07-interceptors-auth.css',
})
export class Lesson07InterceptorsAuth {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  protected readonly interceptorLog = inject(HttpLessonInterceptorLog);

  protected readonly result = signal('No request sent yet.');

  protected readonly codeSteps = [
    {
      name: 'Register once',
      syntax: `provideHttpClient(
  withInterceptors([
    httpLessonAuthInterceptor,
    httpLessonTimingInterceptor,
  ]),
)`,
    },
    {
      name: 'Clone request',
      syntax: `const authRequest = request.clone({
  setHeaders: {
    Authorization: 'Bearer lesson-token',
  },
});`,
    },
    {
      name: 'Continue chain',
      syntax: `return next(authRequest);`,
    },
  ];

  protected clearLog(): void {
    this.interceptorLog.clear();
    this.result.set('No request sent yet.');
  }

  protected sendFailingRequest(): void {
    this.sendRequest('/http-lessons/missing-interceptor-file.json');
  }

  protected sendSuccessfulRequest(): void {
    this.sendRequest('/http-lessons/courses.json');
  }

  private sendRequest(url: string): void {
    this.result.set(`Sending GET ${url}`);

    this.http.get<unknown[]>(url).pipe(
      map((body) => `Loaded ${body.length} records from ${url}.`),
      catchError((error: Error) => of(`Request failed after interceptors ran: ${error.message}`)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((message) => this.result.set(message));
  }
}
