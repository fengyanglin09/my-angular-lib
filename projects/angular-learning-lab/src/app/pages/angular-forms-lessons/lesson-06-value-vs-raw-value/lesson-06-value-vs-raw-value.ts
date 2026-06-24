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

type EmployeeProfileForm = FormGroup<{
  displayName: FormControl<string>;
  email: FormControl<string>;
  employeeId: FormControl<string>;
  role: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-06-value-vs-raw-value',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-06-value-vs-raw-value.html',
  styleUrl: './lesson-06-value-vs-raw-value.css',
})
export class Lesson06ValueVsRawValue {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly profileForm: EmployeeProfileForm = this.formBuilder.group({
    displayName: ['Angular Learner', [Validators.required]],
    email: ['learner@example.com', [Validators.required, Validators.email]],
    employeeId: [{ value: 'EMP-2048', disabled: true }, [Validators.required]],
    role: ['Frontend Developer', [Validators.required]],
  });

  protected readonly savedPayload = signal(this.profileForm.getRawValue());
  protected readonly logs = signal<LessonLog[]>([
    {
      id: 1,
      message: 'employeeId starts disabled because it is server-owned, but it still belongs in the payload.',
    },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Disabled controls are common for server-owned values.',
      name: 'disabled control',
      syntax: `employeeId: [{
  value: 'EMP-2048',
  disabled: true
}]`,
    },
    {
      description: 'form.value includes only enabled child controls.',
      name: 'form.value',
      syntax: `profileForm.value
// employeeId may be omitted`,
    },
    {
      description: 'getRawValue includes every control in the form group.',
      name: 'getRawValue',
      syntax: `profileForm.getRawValue()
// includes employeeId`,
    },
    {
      description: 'Use getRawValue when disabled fields still belong in the backend payload.',
      name: 'payload',
      syntax: `const payload =
  profileForm.getRawValue();`,
    },
  ];

  protected get employeeIdControl(): FormControl<string> {
    return this.profileForm.controls.employeeId;
  }

  protected get roleControl(): FormControl<string> {
    return this.profileForm.controls.role;
  }

  protected toggleEmployeeIdDisabled(): void {
    if (this.employeeIdControl.disabled) {
      this.employeeIdControl.enable();
      this.addLog('Enabled employeeId. profileForm.value now includes it.');
      return;
    }

    this.employeeIdControl.disable();
    this.addLog('Disabled employeeId. profileForm.value omits it, but getRawValue still includes it.');
  }

  protected toggleRoleDisabled(): void {
    if (this.roleControl.disabled) {
      this.roleControl.enable();
      this.addLog('Enabled role. profileForm.value now includes role.');
      return;
    }

    this.roleControl.disable();
    this.addLog('Disabled role. profileForm.value omits role, but getRawValue still includes it.');
  }

  protected savePayload(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.addLog('Save blocked because an enabled control is invalid.');
      return;
    }

    this.savedPayload.set(this.profileForm.getRawValue());
    this.addLog('Saved payload from getRawValue, including disabled controls.');
  }

  protected resetForm(): void {
    this.profileForm.reset({
      displayName: 'Angular Learner',
      email: 'learner@example.com',
      employeeId: { value: 'EMP-2048', disabled: true },
      role: 'Frontend Developer',
    });
    this.addLog('Reset values. employeeId is disabled again.');
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
