import {JsonPipe} from '@angular/common';
import {Component, computed, inject, signal} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';

import {LearningNav} from '../../../core/layout/learning-nav/learning-nav';
import {FormFieldsConfig} from '../angular-forms-field-config.models';
import {CodeStep, LessonLog} from '../angular-forms-lesson.models';

type ProfileFormData = Record<string, string>;

type ProfileForm = FormGroup<Record<string, FormControl<string>>>;

const learnerProfile: ProfileFormData = {
  email: 'learner@example.com',
  fullName: 'Angular Learner',
  team: 'Frontend',
};

const profileFormFields: FormFieldsConfig = {
  fullName: {
    autocomplete: 'name',
    errorMessages: {
      minlength: 'Full name must be at least 3 characters.',
      required: 'Full name is required.',
    },
    inputType: 'text',
    label: 'Full name',
    value: learnerProfile['fullName'],
    validators: [Validators.required, Validators.minLength(3)],
  },
  email: {
    autocomplete: 'email',
    errorMessages: {
      email: 'Enter a valid email address.',
      required: 'Email is required.',
    },
    inputType: 'email',
    label: 'Email',
    value: learnerProfile['email'],
    validators: [Validators.required, Validators.email],
  },
  team: {
    autocomplete: 'organization',
    errorMessages: {
      required: 'Team is required.',
    },
    inputType: 'text',
    label: 'Team',
    value: learnerProfile['team'],
    validators: [Validators.required],
  },
};

const mentorProfile: ProfileFormData = {
  email: 'mentor@example.com',
  fullName: 'Forms Mentor',
  team: 'Platform',
};

const reviewerProfile: ProfileFormData = {
  email: 'reviewer@example.com',
  fullName: 'Review Partner',
  team: 'Design Systems',
};

@Component({
  selector: 'app-lesson-03-form-factory',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-03-form-factory.html',
  styleUrl: './lesson-03-form-factory.css',
})
export class Lesson03FormFactory {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly activeProfile = signal<ProfileFormData>(learnerProfile);
  protected readonly profileForm = this.createProfileForm(profileFormFields);
  protected readonly savedProfile = signal<ProfileFormData>(this.profileForm.getRawValue());
  protected readonly fieldEntries = Object.entries(profileFormFields).map(([name, config]) => ({
    config,
    name,
  }));
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Form was created from the learner profile object.' },
  ]);

  protected readonly savedSummary = computed(
    () => this.fieldEntries.map((field) => this.savedProfile()[field.name]).join(' | '),
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Keep backend-style data as a plain object.',
      name: 'data object',
      syntax: `const learnerProfile = {
  email: 'learner@example.com',
  fullName: 'Angular Learner',
  team: 'Frontend'
}`,
    },
    {
      description: 'Describe the form fields in one object keyed by control name.',
      name: 'field object',
      syntax: `const profileFormFields = {
  email: {
    label: 'Email',
    inputType: 'email',
    value: learnerProfile.email,
    validators: [Validators.required, Validators.email]
  }
}`,
    },
    {
      description: 'The factory loops over the field object and creates controls.',
      name: 'form factory',
      syntax: `createProfileForm(fields) {
  const controls = {};
  for (const [name, field] of Object.entries(fields)) {
    controls[name] = [field.value, field.validators];
  }
  return new FormGroup(controls);
}`,
    },
    {
      description: 'The template can loop over the same field object.',
      name: 'dynamic template',
      syntax: `@for (field of fieldEntries; track field.name) {
  <input
    [type]="field.config.inputType"
    [formControlName]="field.name"
  />
}`,
    },
    {
      description: 'Patch/reset can reuse the same shape as the initial data.',
      name: 'reuse shape',
      syntax: `profileForm.patchValue(mentorProfile)
profileForm.reset(learnerProfile)`,
    },
  ];

  protected controlFor(fieldName: string): FormControl<string> {
    return this.profileForm.controls[fieldName];
  }

  protected errorMessagesFor(fieldName: string): string[] {
    const control = this.controlFor(fieldName);
    const field = profileFormFields[fieldName];

    if (!control.touched || !control.errors || !field?.errorMessages) {
      return [];
    }

    return Object.keys(control.errors).map(
      (errorName) => field.errorMessages?.[errorName] ?? `${field.label} is invalid.`,
    );
  }

  protected patchMentorProfile(): void {
    this.activeProfile.set(mentorProfile);
    this.profileForm.patchValue(mentorProfile);
    this.addLog('Patched mentor profile data into the existing form controls.');
  }

  protected patchReviewerProfile(): void {
    this.activeProfile.set(reviewerProfile);
    this.profileForm.patchValue(reviewerProfile);
    this.addLog('Patched reviewer profile data into the existing form controls.');
  }

  protected resetToLearnerProfile(): void {
    this.activeProfile.set(learnerProfile);
    this.profileForm.reset(learnerProfile);
    this.addLog('Reset the form back to the learner profile object.');
  }

  protected submitForm(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.addLog('Save blocked because the form is invalid.');
      return;
    }

    this.savedProfile.set(this.profileForm.getRawValue());
    this.addLog('Saved the current form value as profile data.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private createProfileForm(fields: FormFieldsConfig): ProfileForm {
    const controls: Record<string, FormControl<string>> = {};

    for (const [name, field] of Object.entries(fields)) {
      controls[name] = this.formBuilder.control(field.value, {
        validators: field.validators ?? [],
      });
    }

    return new FormGroup(controls);
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
