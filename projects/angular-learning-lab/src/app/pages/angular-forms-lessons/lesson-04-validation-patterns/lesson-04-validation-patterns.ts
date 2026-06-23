import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';
import { matchingFieldsValidator } from '../angular-forms-validators';

type AccountForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  displayName: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-04-validation-patterns',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-04-validation-patterns.html',
  styleUrl: './lesson-04-validation-patterns.css',
})
export class Lesson04ValidationPatterns {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly accountForm: AccountForm = this.formBuilder.group(
    {
      displayName: ['Angular Learner', [Validators.required, Validators.minLength(3)]],
      email: ['learner@example.com', [Validators.required, Validators.email]],
      password: ['Angular123', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['Angular123', [Validators.required]],
    },
    {
      validators: [matchingFieldsValidator('password', 'confirmPassword', 'passwordMismatch')],
    },
  );

  protected readonly savedAccount = signal(this.accountForm.getRawValue());
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Account form started valid with field and group validators.' },
  ]);

  protected readonly savedSummary = computed(
    () => `${this.savedAccount().displayName} can sign in as ${this.savedAccount().email}.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Field validators belong to one control.',
      name: 'field validator',
      syntax: `email: [
  '',
  [Validators.required, Validators.email]
]`,
    },
    {
      description: 'A group validator can compare two controls.',
      name: 'group validator',
      syntax: `formBuilder.group(
  { password: [''], confirmPassword: [''] },
  { validators: [matchingFieldsValidator(...)] }
)`,
    },
    {
      description: 'Reusable validators can live in a shared forms validators file.',
      name: 'shared validator',
      syntax: `import { matchingFieldsValidator }
  from '../angular-forms-validators';`,
    },
    {
      description: 'The validator returns null when the group is valid.',
      name: 'valid result',
      syntax: `if (password === confirmPassword) {
  return null;
}`,
    },
    {
      description: 'The validator returns an error object when the group is invalid.',
      name: 'invalid result',
      syntax: `return {
  passwordMismatch: true
};`,
    },
  ];

  protected get displayNameControl(): FormControl<string> {
    return this.accountForm.controls.displayName;
  }

  protected get emailControl(): FormControl<string> {
    return this.accountForm.controls.email;
  }

  protected get passwordControl(): FormControl<string> {
    return this.accountForm.controls.password;
  }

  protected get confirmPasswordControl(): FormControl<string> {
    return this.accountForm.controls.confirmPassword;
  }

  protected get passwordsTouched(): boolean {
    return this.passwordControl.touched || this.confirmPasswordControl.touched;
  }

  protected get passwordMismatchVisible(): boolean {
    return this.passwordsTouched && this.accountForm.hasError('passwordMismatch');
  }

  protected makePasswordsMismatch(): void {
    this.accountForm.patchValue({
      confirmPassword: 'Different123',
    });
    this.confirmPasswordControl.markAsTouched();
    this.addLog('Changed confirm password so the group validator reports passwordMismatch.');
  }

  protected fixPasswords(): void {
    this.accountForm.patchValue({
      confirmPassword: this.passwordControl.value,
    });
    this.confirmPasswordControl.markAsTouched();
    this.addLog('Matched confirm password to password. The group validator is valid again.');
  }

  protected clearDisplayName(): void {
    this.displayNameControl.setValue('');
    this.displayNameControl.markAsTouched();
    this.addLog('Cleared display name to show required and minlength field errors.');
  }

  protected resetForm(): void {
    this.accountForm.reset({
      confirmPassword: 'Angular123',
      displayName: 'Angular Learner',
      email: 'learner@example.com',
      password: 'Angular123',
    });
    this.addLog('Reset values and form state back to a valid account form.');
  }

  protected submitForm(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      this.addLog('Save blocked. Fix field errors and group errors before submitting.');
      return;
    }

    this.savedAccount.set(this.accountForm.getRawValue());
    this.addLog('Save accepted. The saved account preview now uses the form value.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
