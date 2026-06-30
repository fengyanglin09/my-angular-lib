import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

type UpdateStrategyForm = FormGroup<{
  blurEmail: FormControl<string>;
  changeEmail: FormControl<string>;
  submitEmail: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-16-update-on-strategies',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-16-update-on-strategies.html',
  styleUrl: './lesson-16-update-on-strategies.css',
})
export class Lesson16UpdateOnStrategies {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 4;

  protected readonly strategyForm: UpdateStrategyForm = this.formBuilder.group({
    changeEmail: this.formBuilder.control('change@example.com', {
      validators: [Validators.required, Validators.email],
    }),
    blurEmail: this.formBuilder.control('blur@example.com', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email],
    }),
    submitEmail: this.formBuilder.control('submit@example.com', {
      updateOn: 'submit',
      validators: [Validators.required, Validators.email],
    }),
  });

  protected readonly valueChangeCounts = signal({
    blurEmail: 0,
    changeEmail: 0,
    submitEmail: 0,
  });
  protected readonly statusChangeCounts = signal({
    blurEmail: 0,
    changeEmail: 0,
    submitEmail: 0,
  });
  protected readonly submittedPayload = signal<ReturnType<UpdateStrategyForm['getRawValue']> | null>(null);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'changeEmail updates on every input event.' },
    { id: 2, message: 'blurEmail waits until the input loses focus.' },
    { id: 3, message: 'submitEmail waits until the form submit attempts validation.' },
  ]);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Default behavior is updateOn change, so validation reacts as the user types.',
      name: 'change',
      syntax: `formBuilder.control('', {
  validators: [Validators.email]
})`,
    },
    {
      description: 'Blur waits until the user leaves the field.',
      name: 'blur',
      syntax: `formBuilder.control('', {
  updateOn: 'blur',
  validators: [Validators.email]
})`,
    },
    {
      description: 'Submit waits until the form is submitted.',
      name: 'submit',
      syntax: `formBuilder.control('', {
  updateOn: 'submit',
  validators: [Validators.email]
})`,
    },
    {
      description: 'Use blur or submit when validation is noisy or expensive.',
      name: 'when useful',
      syntax: `change: instant feedback
blur: field-level validation
submit: final review`,
    },
  ];

  constructor() {
    this.trackControl('changeEmail', this.changeEmailControl);
    this.trackControl('blurEmail', this.blurEmailControl);
    this.trackControl('submitEmail', this.submitEmailControl);
  }

  protected get changeEmailControl(): FormControl<string> {
    return this.strategyForm.controls.changeEmail;
  }

  protected get blurEmailControl(): FormControl<string> {
    return this.strategyForm.controls.blurEmail;
  }

  protected get submitEmailControl(): FormControl<string> {
    return this.strategyForm.controls.submitEmail;
  }

  protected patchInvalidValues(): void {
    this.strategyForm.patchValue({
      blurEmail: 'not-an-email',
      changeEmail: 'not-an-email',
      submitEmail: 'not-an-email',
    });
    this.addLog('Patched invalid values. Notice that setValue/patchValue still updates programmatically.');
  }

  protected resetForm(): void {
    this.strategyForm.reset({
      blurEmail: 'blur@example.com',
      changeEmail: 'change@example.com',
      submitEmail: 'submit@example.com',
    });
    this.submittedPayload.set(null);
    this.addLog('Reset values and form state.');
  }

  protected submitForm(): void {
    if (this.strategyForm.invalid) {
      this.strategyForm.markAllAsTouched();
      this.submittedPayload.set(null);
      this.addLog('Submit checked every control and found invalid values.');
      return;
    }

    this.submittedPayload.set(this.strategyForm.getRawValue());
    this.addLog('Submit succeeded with the current raw value.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private trackControl(
    name: keyof ReturnType<UpdateStrategyForm['getRawValue']>,
    control: FormControl<string>,
  ): void {
    control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.valueChangeCounts.update((counts) => ({
          ...counts,
          [name]: counts[name] + 1,
        }));
        this.addLog(`${name} valueChanges emitted "${value}".`);
      });

    control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        this.statusChangeCounts.update((counts) => ({
          ...counts,
          [name]: counts[name] + 1,
        }));
        this.addLog(`${name} statusChanges emitted ${status}.`);
      });
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
