import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface CodeStep {
  description: string;
  name: string;
  syntax: string;
}

interface LessonLog {
  id: number;
  message: string;
}

type SignupForm = FormGroup<{
  email: FormControl<string>;
  fullName: FormControl<string>;
  role: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-01-reactive-form-basics',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-01-reactive-form-basics.html',
  styleUrl: './lesson-01-reactive-form-basics.css',
})
export class Lesson01ReactiveFormBasics {
  private nextLogId = 2;

  protected readonly signupForm: SignupForm = new FormGroup({
    email: new FormControl('learner@example.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    fullName: new FormControl('Angular Learner', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    role: new FormControl('developer', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly submittedValue = signal(this.signupForm.getRawValue());
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Form is ready. Try editing fields and submitting.' },
  ]);

  protected readonly submittedSummary = computed(
    () =>
      `${this.submittedValue().fullName} uses ${this.submittedValue().email} as a ${
        this.submittedValue().role
      }.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A FormGroup owns several named controls.',
      name: 'form group',
      syntax: `signupForm = new FormGroup({
  email: new FormControl('', validators),
  fullName: new FormControl('', validators)
})`,
    },
    {
      description: 'formControlName connects one input to one control.',
      name: 'template binding',
      syntax: `<form [formGroup]="signupForm">
  <input formControlName="email" />
</form>`,
    },
    {
      description: 'Validators update the control and group validity.',
      name: 'validation state',
      syntax: `signupForm.valid
signupForm.controls.email.errors
signupForm.controls.email.touched`,
    },
    {
      description: 'Submit reads the current form value only after validation passes.',
      name: 'submit flow',
      syntax: `if (signupForm.invalid) {
  signupForm.markAllAsTouched();
  return;
}`,
    },
  ];

  protected get emailControl(): FormControl<string> {
    return this.signupForm.controls.email;
  }

  protected get fullNameControl(): FormControl<string> {
    return this.signupForm.controls.fullName;
  }

  protected get roleControl(): FormControl<string> {
    return this.signupForm.controls.role;
  }

  protected submitForm(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.addLog('Submit blocked because the form is invalid.');
      return;
    }

    this.submittedValue.set(this.signupForm.getRawValue());
    this.addLog('Submit accepted. The submitted preview now matches the form value.');
  }

  protected patchExample(): void {
    this.signupForm.patchValue({
      email: 'mentor@example.com',
      fullName: 'Forms Mentor',
      role: 'mentor',
    });
    this.addLog('patchValue updated selected controls without recreating the form.');
  }

  protected resetForm(): void {
    this.signupForm.reset({
      email: 'learner@example.com',
      fullName: 'Angular Learner',
      role: 'developer',
    });
    this.addLog('reset restored the initial form values and form state.');
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
