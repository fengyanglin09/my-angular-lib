import { Injectable } from '@angular/core';

export interface ProfileDraft {
  email: string;
  fullName: string;
  role: string;
}

export interface ProfileSaveResult {
  profile: ProfileDraft;
  savedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileSaveApi {
  saveProfile(profile: ProfileDraft, shouldFail: boolean): Promise<ProfileSaveResult> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Backend rejected the profile save.'));
          return;
        }

        resolve({
          profile,
          savedAt: new Date().toLocaleTimeString(),
        });
      }, 900);
    });
  }
}
