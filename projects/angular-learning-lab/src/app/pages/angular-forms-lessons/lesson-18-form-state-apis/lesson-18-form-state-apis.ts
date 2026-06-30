import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

type StateDemoForm = FormGroup<{
  email: FormControl<string>;
  title: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-18-form-state-apis',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-18-form-state-apis.html',
  styleUrl: './lesson-18-form-state-apis.css',
})
export class Lesson18FormStateApis {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly stateForm: StateDemoForm = this.formBuilder.group({
    title: ['Draft title', [Validators.required, Validators.minLength(3)]],
    email: ['learner@example.com', [Validators.required, Validators.email]],
  });

  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Use the buttons to see which form state flags change.' },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Touched means the user has visited or left a field.',
      name: 'touched',
      syntax: `control.markAsTouched();
control.markAsUntouched();`,
    },
    {
      description: 'Dirty means the value has changed from its initial clean state.',
      name: 'dirty',
      syntax: `control.markAsDirty();
control.markAsPristine();`,
    },
    {
      description: 'Pending is useful when custom async work is in progress.',
      name: 'pending',
      syntax: `control.markAsPending();`,
    },
    {
      description: 'Disabled controls leave form.value and stop participating in validation.',
      name: 'disabled',
      syntax: `control.disable();
control.enable();`,
    },
    {
      description: 'reset restores values and makes the form pristine and untouched.',
      name: 'reset state',
      syntax: `form.reset(initialValue);`,
    },
  ];

  protected get titleControl(): FormControl<string> {
    return this.stateForm.controls.title;
  }

  protected get emailControl(): FormControl<string> {
    return this.stateForm.controls.email;
  }

  protected markTitleTouched(): void {
    this.titleControl.markAsTouched();
    this.addLog('Marked title as touched. This is useful when showing validation after blur or submit.');
  }

  protected markTitleUntouched(): void {
    this.titleControl.markAsUntouched();
    this.addLog('Marked title as untouched. Validation messages that depend on touched can hide again.');
  }

  protected markTitleDirty(): void {
    this.titleControl.markAsDirty();
    this.addLog('Marked title as dirty. This represents a changed control.');
  }

  protected markTitlePristine(): void {
    this.titleControl.markAsPristine();
    this.addLog('Marked title as pristine. The current value is treated as clean again.');
  }

  protected markEmailPending(): void {
    this.emailControl.markAsPending();
    this.addLog('Marked email as pending. The form status becomes PENDING until validity recalculates.');
  }

  protected recalculateEmail(): void {
    this.emailControl.updateValueAndValidity();
    this.addLog('Recalculated email validity. Pending clears and the real status returns.');
  }

  protected toggleEmailDisabled(): void {
    if (this.emailControl.disabled) {
      this.emailControl.enable();
      this.addLog('Enabled email. It participates in value and validation again.');
      return;
    }

    this.emailControl.disable();
    this.addLog('Disabled email. It is excluded from form.value but remains in getRawValue().');
  }

  protected patchInvalidEmail(): void {
    this.emailControl.setValue('not-an-email');
    this.emailControl.markAsDirty();
    this.emailControl.markAsTouched();
    this.addLog('Patched an invalid email and marked it dirty/touched.');
  }

  protected resetState(): void {
    this.stateForm.reset({
      email: 'learner@example.com',
      title: 'Draft title',
    });
    this.addLog('Reset values and cleared dirty/touched state.');
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
