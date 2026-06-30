import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';
import { ProfileDraft, ProfileDraftStorage, StoredProfileDraft } from './profile-draft-storage';

type ProfileDraftForm = FormGroup<{
  email: FormControl<string>;
  fullName: FormControl<string>;
  notes: FormControl<string>;
  role: FormControl<string>;
}>;

const defaultDraft: ProfileDraft = {
  email: 'learner@example.com',
  fullName: 'Angular Learner',
  notes: 'Remember to ask about autosave and restore behavior.',
  role: 'Frontend Developer',
};

@Component({
  selector: 'app-lesson-14-form-persistence',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-14-form-persistence.html',
  styleUrl: './lesson-14-form-persistence.css',
})
export class Lesson14FormPersistence {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly draftStorage = inject(ProfileDraftStorage);
  private nextLogId = 2;

  protected readonly profileForm: ProfileDraftForm = this.formBuilder.group({
    fullName: [defaultDraft.fullName, [Validators.required, Validators.minLength(3)]],
    email: [defaultDraft.email, [Validators.required, Validators.email]],
    role: [defaultDraft.role, [Validators.required]],
    notes: [defaultDraft.notes],
  });

  protected readonly storedDraft = signal<StoredProfileDraft | null>(this.draftStorage.loadDraft());
  protected readonly autosaveCount = signal(0);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Draft persistence saves typed values, not the old screen interaction state.' },
  ]);

  protected readonly savedSummary = computed(() => {
    const draft = this.storedDraft();

    if (!draft) {
      return 'No local draft is stored yet.';
    }

    return `${draft.value.fullName} draft saved at ${draft.savedAt}.`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Persist the complete current value, not partial valueChanges payloads.',
      name: 'save payload',
      syntax: `const payload =
  form.getRawValue();

storage.saveDraft(payload);`,
    },
    {
      description: 'Autosave streams usually debounce so typing does not write on every keystroke.',
      name: 'debounce save',
      syntax: `form.valueChanges.pipe(
  debounceTime(600)
)`,
    },
    {
      description: 'Restore values with reset when you want a clean restored form state.',
      name: 'restore values',
      syntax: `form.reset(storedDraft.value);`,
    },
    {
      description: 'Restore the typed values, but let dirty, touched, and submit state start fresh.',
      name: 'data vs UI state',
      syntax: `draft data:
  name, email, role, notes

screen state:
  dirty, touched, submitted`,
    },
    {
      description: 'reset restores values and clears dirty/touched; emitEvent false prevents autosave from running.',
      name: 'fresh form state',
      syntax: `form.reset(savedValue, {
  emitEvent: false
});

form.dirty   // false
form.touched // false`,
    },
  ];

  constructor() {
    this.profileForm.valueChanges
      .pipe(
        debounceTime(600),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.saveDraft('Autosaved draft after form values settled.'));
  }

  protected restoreDraft(): void {
    const draft = this.storedDraft() ?? this.draftStorage.loadDraft();

    if (!draft) {
      this.addLog('Restore skipped because no local draft exists.');
      return;
    }

    this.profileForm.reset(draft.value, { emitEvent: false });
    this.storedDraft.set(draft);
    this.addLog('Restored saved values quietly, so autosave did not save the same draft again.');
  }

  protected patchExampleDraft(): void {
    this.profileForm.patchValue({
      email: 'saved.friend@example.com',
      fullName: 'Saved Form Friend',
      notes: 'This change will autosave after the debounce waits.',
      role: 'Staff Engineer',
    });
    this.addLog('Patched example draft values. Autosave will run after the debounce.');
  }

  protected saveDraftNow(): void {
    this.saveDraft('Manually saved the current form payload.');
  }

  protected clearStoredDraft(): void {
    this.draftStorage.clearDraft();
    this.storedDraft.set(null);
    this.addLog('Cleared the stored local draft. The current form values stayed on screen.');
  }

  protected resetToDefaults(): void {
    this.profileForm.reset(defaultDraft, { emitEvent: false });
    this.addLog('Reset visible form values to defaults without overwriting the stored draft.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  protected get fullNameControl(): FormControl<string> {
    return this.profileForm.controls.fullName;
  }

  protected get emailControl(): FormControl<string> {
    return this.profileForm.controls.email;
  }

  protected get roleControl(): FormControl<string> {
    return this.profileForm.controls.role;
  }

  private saveDraft(message: string): void {
    if (this.profileForm.invalid) {
      this.addLog('Draft save skipped because the form is invalid.');
      return;
    }

    const draft = this.draftStorage.saveDraft(this.profileForm.getRawValue());

    this.storedDraft.set(draft);
    this.autosaveCount.update((count) => count + 1);
    this.addLog(message);
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
