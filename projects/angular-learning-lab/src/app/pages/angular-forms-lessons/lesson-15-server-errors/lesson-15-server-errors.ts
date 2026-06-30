import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';
import {
  AccountRegistrationApi,
  AccountRegistrationDraft,
  AccountRegistrationResult,
  ServerValidationError,
} from './account-registration-api';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

type AccountRegistrationForm = FormGroup<{
  displayName: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-15-server-errors',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-15-server-errors.html',
  styleUrl: './lesson-15-server-errors.css',
})
export class Lesson15ServerErrors {
  private readonly accountApi = inject(AccountRegistrationApi);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly accountForm: AccountRegistrationForm = this.formBuilder.group({
    displayName: ['Angular Learner', [Validators.required, Validators.minLength(3)]],
    email: ['learner@example.com', [Validators.required, Validators.email]],
    role: ['Member', [Validators.required]],
  });

  protected readonly saveStatus = signal<SaveStatus>('idle');
  protected readonly lastSavedResult = signal<AccountRegistrationResult | null>(null);
  protected readonly formError = signal<string | null>(null);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Server errors are mapped back onto controls with setErrors.' },
  ]);

  protected readonly saveSummary = computed(() => {
    const result = this.lastSavedResult();

    if (!result) {
      return 'No backend save has succeeded yet.';
    }

    return `Account ${result.accountId} saved at ${result.savedAt}.`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A Promise has two exits: resolve for success and reject for failure.',
      name: 'promise result',
      syntax: `return new Promise((resolve, reject) => {
  if (backendFoundErrors) {
    reject(serverValidationError);
    return;
  }

  resolve(savedResult);
});`,
    },
    {
      description: 'Client validators run before the backend request.',
      name: 'client guard',
      syntax: `if (form.invalid) {
  form.markAllAsTouched();
  return;
}`,
    },
    {
      description: 'Clear old server errors before trying the backend again.',
      name: 'clear server errors',
      syntax: `clearServerError(emailControl);
clearServerError(roleControl);`,
    },
    {
      description: 'Map backend field errors onto the matching controls.',
      name: 'setErrors',
      syntax: `emailControl.setErrors({
  ...emailControl.errors,
  server: 'Email is already used'
});`,
    },
    {
      description: 'A server error makes the control and the parent form invalid.',
      name: 'invalid form',
      syntax: `emailControl.hasError('server')
form.status // INVALID`,
    },
    {
      description: 'Preserve other errors when removing only the server error.',
      name: 'remove one error',
      syntax: `const { server, ...rest } =
  control.errors ?? {};

control.setErrors(Object.keys(rest).length
  ? rest
  : null);`,
    },
  ];

  protected get displayNameControl(): FormControl<string> {
    return this.accountForm.controls.displayName;
  }

  protected get emailControl(): FormControl<string> {
    return this.accountForm.controls.email;
  }

  protected get roleControl(): FormControl<string> {
    return this.accountForm.controls.role;
  }

  protected async saveAccount(): Promise<void> {
    this.clearServerErrors();
    this.formError.set(null);
    this.lastSavedResult.set(null);

    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      this.addLog('Save blocked by client-side validation before calling the backend.');
      return;
    }

    const payload: AccountRegistrationDraft = this.accountForm.getRawValue();

    this.saveStatus.set('saving');
    this.addLog(`Submitting ${payload.email} to the backend.`);

    try {
      const result = await this.accountApi.saveAccount(payload);

      this.saveStatus.set('success');
      this.lastSavedResult.set(result);
      this.addLog(`Backend save succeeded with account id ${result.accountId}.`);
    } catch (error) {
      const serverError = this.toServerValidationError(error);

      this.saveStatus.set('error');
      this.formError.set(serverError.message);
      this.applyServerErrors(serverError.fieldErrors);
      this.addLog('Backend returned field errors. The matching controls are now invalid.');
    }
  }

  protected patchTakenEmail(): void {
    this.accountForm.patchValue({
      email: 'taken@example.com',
      role: 'Member',
    });
    this.addLog('Patched a client-valid email that the backend will reject.');
  }

  protected patchBlockedRole(): void {
    this.accountForm.patchValue({
      email: 'learner@example.com',
      role: 'Owner',
    });
    this.addLog('Patched a client-valid role that the backend will reject.');
  }

  protected patchValidAccount(): void {
    this.accountForm.patchValue({
      displayName: 'Server Error Learner',
      email: 'server.lesson@example.com',
      role: 'Member',
    });
    this.clearServerErrors();
    this.formError.set(null);
    this.addLog('Patched a backend-valid account and cleared previous server errors.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private applyServerErrors(fieldErrors: ServerValidationError['fieldErrors']): void {
    for (const [fieldName, message] of Object.entries(fieldErrors)) {
      const control = this.accountForm.controls[fieldName as keyof AccountRegistrationDraft];

      control.setErrors({
        ...control.errors,
        server: message,
      });
      control.markAsTouched();
    }
  }

  private clearServerErrors(): void {
    this.clearServerError(this.emailControl);
    this.clearServerError(this.roleControl);
  }

  private clearServerError(control: AbstractControl): void {
    const errors = control.errors;

    if (!errors?.['server']) {
      return;
    }

    const nextErrors: ValidationErrors = { ...errors };
    delete nextErrors['server'];

    control.setErrors(Object.keys(nextErrors).length > 0 ? nextErrors : null);
  }

  private toServerValidationError(error: unknown): ServerValidationError {
    if (
      typeof error === 'object' &&
      error !== null &&
      'fieldErrors' in error &&
      'message' in error
    ) {
      return error as ServerValidationError;
    }

    return {
      fieldErrors: {},
      message: 'Unknown backend validation error.',
    };
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
