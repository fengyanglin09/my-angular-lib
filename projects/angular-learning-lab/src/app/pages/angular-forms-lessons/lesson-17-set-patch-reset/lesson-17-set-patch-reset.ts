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

interface ProfileValue {
  department: string;
  email: string;
  fullName: string;
  role: string;
}

type ProfileShapeForm = FormGroup<{
  department: FormControl<string>;
  email: FormControl<string>;
  fullName: FormControl<string>;
  role: FormControl<string>;
}>;

const initialProfile: ProfileValue = {
  department: 'Engineering',
  email: 'learner@example.com',
  fullName: 'Angular Learner',
  role: 'Frontend Developer',
};

@Component({
  selector: 'app-lesson-17-set-patch-reset',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-17-set-patch-reset.html',
  styleUrl: './lesson-17-set-patch-reset.css',
})
export class Lesson17SetPatchReset {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly profileForm: ProfileShapeForm = this.formBuilder.group({
    department: [initialProfile.department, [Validators.required]],
    email: [initialProfile.email, [Validators.required, Validators.email]],
    fullName: [initialProfile.fullName, [Validators.required, Validators.minLength(3)]],
    role: [initialProfile.role, [Validators.required]],
  });

  protected readonly lastRuntimeError = signal<string | null>(null);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'setValue needs the full form shape; patchValue can update only part of it.' },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'setValue requires every control in the form shape.',
      name: 'setValue',
      syntax: `form.setValue({
  fullName: 'Ada',
  email: 'ada@example.com',
  role: 'Architect',
  department: 'Platform'
});`,
    },
    {
      description: 'patchValue accepts a partial object and only updates matching controls.',
      name: 'patchValue',
      syntax: `form.patchValue({
  role: 'Staff Engineer'
});`,
    },
    {
      description: 'reset restores values and resets dirty/touched state.',
      name: 'reset',
      syntax: `form.reset(initialValue);

form.dirty   // false
form.touched // false`,
    },
    {
      description: 'setValue throws when the object is missing a control.',
      name: 'shape guard',
      syntax: `form.setValue({
  fullName: 'Missing fields'
});
// runtime error`,
    },
  ];

  protected get fullNameControl(): FormControl<string> {
    return this.profileForm.controls.fullName;
  }

  protected get emailControl(): FormControl<string> {
    return this.profileForm.controls.email;
  }

  protected get roleControl(): FormControl<string> {
    return this.profileForm.controls.role;
  }

  protected get departmentControl(): FormControl<string> {
    return this.profileForm.controls.department;
  }

  protected applyFullSetValue(): void {
    this.lastRuntimeError.set(null);
    this.profileForm.setValue({
      department: 'Platform',
      email: 'complete.shape@example.com',
      fullName: 'Complete Shape',
      role: 'Architect',
    });
    this.addLog('setValue succeeded because every form control was included.');
  }

  protected applyPartialPatchValue(): void {
    this.lastRuntimeError.set(null);
    this.profileForm.patchValue({
      role: 'Staff Engineer',
    });
    this.addLog('patchValue updated only role and left the other controls unchanged.');
  }

  protected tryIncompleteSetValue(): void {
    this.lastRuntimeError.set(null);

    try {
      this.profileForm.setValue({
        fullName: 'Incomplete Shape',
      } as ProfileValue);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown setValue error.';

      this.lastRuntimeError.set(message);
      this.addLog('setValue failed because the object did not include the full form shape.');
    }
  }

  protected resetProfile(): void {
    this.lastRuntimeError.set(null);
    this.profileForm.reset(initialProfile);
    this.addLog('reset restored initial values and cleared dirty/touched state.');
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
