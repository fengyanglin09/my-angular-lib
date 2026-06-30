import { Injectable } from '@angular/core';

export interface AccountRegistrationDraft {
  displayName: string;
  email: string;
  role: string;
}

export interface AccountRegistrationResult {
  accountId: number;
  savedAt: string;
}

export interface ServerValidationError {
  fieldErrors: Partial<Record<keyof AccountRegistrationDraft, string>>;
  message: string;
}

const takenEmails = new Set(['taken@example.com', 'admin@example.com']);
const blockedRoles = new Set(['Owner', 'Root']);

@Injectable({ providedIn: 'root' })
export class AccountRegistrationApi {
  saveAccount(draft: AccountRegistrationDraft): Promise<AccountRegistrationResult> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const fieldErrors: ServerValidationError['fieldErrors'] = {};

        if (takenEmails.has(draft.email.trim().toLowerCase())) {
          fieldErrors.email = 'This email is already registered.';
        }

        if (blockedRoles.has(draft.role.trim())) {
          fieldErrors.role = 'This role must be approved by an administrator.';
        }

        if (Object.keys(fieldErrors).length > 0) {
          // reject(...) fails the Promise. The component receives this in catch(...).
          reject({
            fieldErrors,
            message: 'The backend rejected one or more fields.',
          } satisfies ServerValidationError);
          return;
        }

        // resolve(...) completes the Promise successfully. The component receives this after await.
        resolve({
          accountId: Math.floor(Math.random() * 9000) + 1000,
          savedAt: new Date().toLocaleTimeString(),
        });
      }, 700);
    });
  }
}
