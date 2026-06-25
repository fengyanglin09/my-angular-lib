import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { finalize, from, map, of, switchMap, tap, timer } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';
import { SlugAvailabilityApi } from './slug-availability-api';

type ProjectSlugForm = FormGroup<{
  projectName: FormControl<string>;
  slug: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-09-async-validators',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-09-async-validators.html',
  styleUrl: './lesson-09-async-validators.css',
})
export class Lesson09AsyncValidators {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly slugApi = inject(SlugAvailabilityApi);
  private nextLogId = 2;
  private nextSlugCheckId = 1;

  protected readonly projectForm: ProjectSlugForm = this.formBuilder.group({
    projectName: ['Learning Lab', [Validators.required, Validators.minLength(3)]],
    slug: this.formBuilder.control(
      'learning-lab',
      {
        asyncValidators: [this.slugAvailableValidator()],
        validators: [
          Validators.required,
          Validators.pattern(/^[a-z0-9-]+$/),
          Validators.minLength(3),
        ],
      },
    ),
  });

  protected readonly savedProject = signal(this.projectForm.getRawValue());
  protected readonly checkingSlugAvailability = signal(false);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Async validator checks slug availability after sync validators pass.' },
  ]);

  protected readonly savedSummary = computed(
    () => `${this.savedProject().projectName} uses /projects/${this.savedProject().slug}.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Async validators return a Promise or Observable of validation errors.',
      name: 'async validator',
      syntax: `const validator: AsyncValidatorFn =
  async (control) => {
    const available = await api.checkSlug(control.value);
    return available ? null : { slugTaken: true };
  };`,
    },
    {
      description: 'Angular runs async validators after sync validators pass.',
      name: 'sync first',
      syntax: `validators: [
  Validators.required,
  Validators.pattern(...)
],
asyncValidators: [slugAvailableValidator]`,
    },
    {
      description: 'A control is pending during debounce and backend validation.',
      name: 'pending state',
      syntax: `slugControl.pending
slugControl.status // PENDING`,
    },
    {
      description: 'Debounce waits for typing to pause before calling the backend.',
      name: 'debounce',
      syntax: `timer(500).pipe(
  switchMap(() => api.checkSlug(slug))
)`,
    },
    {
      description: 'Use a separate flag when you only want to lock during the backend request.',
      name: 'readonly timing',
      syntax: `[readOnly]="checkingSlugAvailability()"`,
    },
    {
      description: 'Use updateValueAndValidity when you set a demo value programmatically.',
      name: 'rerun check',
      syntax: `slugControl.setValue('admin');
slugControl.updateValueAndValidity();`,
    },
  ];

  protected get projectNameControl(): FormControl<string> {
    return this.projectForm.controls.projectName;
  }

  protected get slugControl(): FormControl<string> {
    return this.projectForm.controls.slug;
  }

  protected setAvailableSlug(): void {
    this.slugControl.setValue('new-learning-space');
    this.slugControl.markAsTouched();
    this.slugControl.updateValueAndValidity();
    this.addLog('Set slug to an available value. Async validator is checking it.');
  }

  protected setTakenSlug(): void {
    this.slugControl.setValue('angular-lab');
    this.slugControl.markAsTouched();
    this.slugControl.updateValueAndValidity();
    this.addLog('Set slug to a taken value. Async validator is checking it.');
  }

  protected setInvalidSlug(): void {
    this.slugControl.setValue('Not Valid!');
    this.slugControl.markAsTouched();
    this.slugControl.updateValueAndValidity();
    this.addLog('Set slug to a value that fails sync validation before async validation runs.');
  }

  protected saveProject(): void {
    if (this.projectForm.pending) {
      this.addLog('Save blocked because async validation is still pending.');
      return;
    }

    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      this.addLog('Save blocked because the project form is invalid.');
      return;
    }

    this.savedProject.set(this.projectForm.getRawValue());
    this.addLog('Saved project after sync and async validators passed.');
  }

  protected resetForm(): void {
    this.projectForm.reset({
      projectName: 'Learning Lab',
      slug: 'learning-lab',
    });
    this.addLog('Reset form and triggered the initial slug availability check.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private slugAvailableValidator(): AsyncValidatorFn {
    return (control: AbstractControl<string>) => {
      const slug = control.value.trim().toLowerCase();
      const checkId = this.nextSlugCheckId;
      this.nextSlugCheckId += 1;

      if (!slug || !/^[a-z0-9-]{3,}$/.test(slug)) {
        this.checkingSlugAvailability.set(false);
        return of(null);
      }

      // Angular unsubscribes the previous async validator Observable when the
      // control value changes, so this timer resets on each newly typed value.
      // Only the latest value that stays unchanged for 1000ms reaches the API.
      return timer(1000).pipe(
        tap(() => this.checkingSlugAvailability.set(true)),
        switchMap(() => from(this.slugApi.checkSlug(slug))),
        map((available): ValidationErrors | null => available ? null : { slugTaken: true }),
        finalize(() => {
          if (checkId === this.nextSlugCheckId - 1) {
            this.checkingSlugAvailability.set(false);
          }
        }),
      );
    };
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
