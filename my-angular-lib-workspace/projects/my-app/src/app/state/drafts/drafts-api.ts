import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { DraftIdea } from './drafts.models';

const seedDrafts: DraftIdea[] = [
  {
    id: 1,
    title: 'Compare optimistic and pessimistic creates',
    category: 'NgRx',
  },
  {
    id: 2,
    title: 'Add backend validation examples',
    category: 'Architecture',
  },
];

@Injectable({ providedIn: 'root' })
export class DraftsApi {
  private drafts = structuredClone(seedDrafts);
  private nextId = 3;

  createDraft(title: string, category: string, shouldFail: boolean): Observable<DraftIdea> {
    if (shouldFail) {
      return throwError(() => new Error('Backend validation rejected this draft')).pipe(delay(700));
    }

    const draft: DraftIdea = {
      id: this.nextId,
      title,
      category,
    };

    this.nextId += 1;
    this.drafts = [...this.drafts, draft];

    return of(structuredClone(draft)).pipe(delay(700));
  }

  loadDrafts(): Observable<DraftIdea[]> {
    return of(structuredClone(this.drafts)).pipe(delay(500));
  }

  updateDraftCategory(
    id: number,
    category: string,
    shouldFail: boolean,
  ): Observable<DraftIdea> {
    if (shouldFail) {
      return throwError(() => new Error('Backend rejected the category update')).pipe(delay(700));
    }

    const existing = this.drafts.find((draft) => draft.id === id);

    if (!existing) {
      return throwError(() => new Error('Draft was not found on the backend')).pipe(delay(700));
    }

    const updated: DraftIdea = {
      ...existing,
      category,
    };

    this.drafts = this.drafts.map((draft) => (draft.id === id ? updated : draft));

    return of(structuredClone(updated)).pipe(delay(700));
  }
}
