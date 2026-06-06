import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { FeedbackItem } from './feedback.models';

const seedFeedback: FeedbackItem[] = [
  {
    id: 1,
    author: 'Maya',
    text: 'The Entity lesson made selectors feel much clearer.',
    liked: true,
  },
  {
    id: 2,
    author: 'Jordan',
    text: 'The route-param store example finally clicked for me.',
    liked: false,
  },
  {
    id: 3,
    author: 'Sam',
    text: 'I want more examples with real backend failures.',
    liked: false,
  },
];

@Injectable({ providedIn: 'root' })
export class FeedbackApi {
  private feedback = structuredClone(seedFeedback);
  private nextId = 4;

  loadFeedback(): Observable<FeedbackItem[]> {
    return of(structuredClone(this.feedback)).pipe(delay(500));
  }

  addFeedback(text: string, shouldFail: boolean): Observable<FeedbackItem> {
    if (shouldFail) {
      return throwError(() => new Error('Backend rejected the new feedback')).pipe(delay(700));
    }

    const feedback: FeedbackItem = {
      id: this.nextId,
      author: 'You',
      text,
      liked: false,
    };

    this.nextId += 1;
    this.feedback = [...this.feedback, feedback];

    return of(structuredClone(feedback)).pipe(delay(700));
  }

  deleteFeedback(id: number, shouldFail: boolean): Observable<number> {
    if (shouldFail) {
      return throwError(() => new Error('Backend could not delete this feedback')).pipe(delay(700));
    }

    this.feedback = this.feedback.filter((item) => item.id !== id);

    return of(id).pipe(delay(700));
  }

  updateLike(id: number, liked: boolean, shouldFail: boolean): Observable<number> {
    if (shouldFail) {
      return throwError(() => new Error('Backend could not save the like change')).pipe(delay(700));
    }

    this.feedback = this.feedback.map((item) =>
      item.id === id
        ? {
            ...item,
            liked,
          }
        : item,
    );

    return of(id).pipe(delay(700));
  }
}
