import { Injectable } from '@angular/core';

export interface ProfileDraft {
  email: string;
  fullName: string;
  notes: string;
  role: string;
}

export interface StoredProfileDraft {
  savedAt: string;
  value: ProfileDraft;
}

const storageKey = 'angular-learning-lab.forms.lesson-14.profile-draft';

@Injectable({ providedIn: 'root' })
export class ProfileDraftStorage {
  loadDraft(): StoredProfileDraft | null {
    const rawDraft = window.localStorage.getItem(storageKey);

    if (!rawDraft) {
      return null;
    }

    try {
      return JSON.parse(rawDraft) as StoredProfileDraft;
    } catch {
      window.localStorage.removeItem(storageKey);
      return null;
    }
  }

  saveDraft(value: ProfileDraft): StoredProfileDraft {
    const draft: StoredProfileDraft = {
      savedAt: new Date().toLocaleTimeString(),
      value,
    };

    window.localStorage.setItem(storageKey, JSON.stringify(draft));

    return draft;
  }

  clearDraft(): void {
    window.localStorage.removeItem(storageKey);
  }
}
