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
import { ProfileDraft, ProfileSaveApi, ProfileSaveResult } from './profile-save-api';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

type ProfileForm = FormGroup<{
  email: FormControl<string>;
  fullName: FormControl<string>;
  role: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-07-submit-save-state',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-07-submit-save-state.html',
  styleUrl: './lesson-07-submit-save-state.css',
})
export class Lesson07SubmitSaveState {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly profileApi = inject(ProfileSaveApi);
  private nextLogId = 2;

  protected readonly profileForm: ProfileForm = this.formBuilder.group({
    fullName: ['Angular Learner', [Validators.required, Validators.minLength(3)]],
    email: ['learner@example.com', [Validators.required, Validators.email]],
    role: ['Frontend Developer', [Validators.required]],
  });

  protected readonly saveStatus = signal<SaveStatus>('idle');
  protected readonly saveError = signal<string | null>(null);
  protected readonly lastSavedResult = signal<ProfileSaveResult | null>(null);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Form is ready. Submit will simulate a backend save.' },
  ]);

  protected readonly isSaving = computed(() => this.saveStatus() === 'saving');
  protected readonly savedSummary = computed(() => {
    const result = this.lastSavedResult();

    if (!result) {
      return 'Nothing has been saved yet.';
    }

    return `${result.profile.fullName} saved at ${result.savedAt}.`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Keep save status outside the form controls.',
      name: 'save state',
      syntax: `saveStatus = signal<
  'idle' | 'saving' | 'success' | 'error'
>('idle')`,
    },
    {
      description: 'Block submit when the form is invalid.',
      name: 'invalid guard',
      syntax: `if (profileForm.invalid) {
  profileForm.markAllAsTouched();
  return;
}`,
    },
    {
      description: 'Disable the form while the backend save is running.',
      name: 'saving guard',
      syntax: `saveStatus.set('saving');
profileForm.disable();`,
    },
    {
      description: 'Use the full payload pattern from Lesson 6 before disabling the form.',
      name: 'payload',
      syntax: `const payload =
  profileForm.getRawValue();

profileForm.disable();`,
    },
    {
      description: 'On failure, keep the typed form value so the user can fix and retry.',
      name: 'failure',
      syntax: `catch (error) {
  saveStatus.set('error');
  profileForm.enable();
}`,
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

  protected async saveProfile(shouldFail = false): Promise<void> {
    if (this.isSaving()) {
      this.addLog('Save ignored because a save request is already running.');
      return;
    }

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.addLog('Save blocked because the form is invalid.');
      return;
    }

    const payload: ProfileDraft = this.profileForm.getRawValue();

    this.saveStatus.set('saving');
    this.saveError.set(null);
    this.profileForm.disable();
    this.addLog(`Saving ${payload.fullName} to the backend...`);

    try {
      const result = await this.profileApi.saveProfile(payload, shouldFail);

      this.lastSavedResult.set(result);
      this.saveStatus.set('success');
      this.addLog(`Backend save succeeded at ${result.savedAt}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown save error.';

      this.saveError.set(message);
      this.saveStatus.set('error');
      this.addLog(`Backend save failed: ${message}`);
    } finally {
      this.profileForm.enable();
    }
  }

  protected patchInvalidEmail(): void {
    this.emailControl.setValue('not-an-email');
    this.emailControl.markAsTouched();
    this.saveStatus.set('idle');
    this.saveError.set(null);
    this.addLog('Patched an invalid email to show the invalid submit guard.');
  }

  protected resetForm(): void {
    this.profileForm.enable();
    this.profileForm.reset({
      email: 'learner@example.com',
      fullName: 'Angular Learner',
      role: 'Frontend Developer',
    });
    this.saveStatus.set('idle');
    this.saveError.set(null);
    this.addLog('Reset form values and cleared transient save state.');
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
