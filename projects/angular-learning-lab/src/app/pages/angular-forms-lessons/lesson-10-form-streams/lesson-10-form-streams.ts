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
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

type NewsletterFrequency = 'daily' | 'weekly' | 'monthly';

type NewsletterForm = FormGroup<{
  email: FormControl<string>;
  frequency: FormControl<NewsletterFrequency>;
  topic: FormControl<string>;
}>;

interface NewsletterDraft {
  email: string;
  frequency: NewsletterFrequency;
  topic: string;
}

@Component({
  selector: 'app-lesson-10-form-streams',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-10-form-streams.html',
  styleUrl: './lesson-10-form-streams.css',
})
export class Lesson10FormStreams {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 4;

  protected readonly newsletterForm: NewsletterForm = this.formBuilder.group({
    email: ['learner@example.com', [Validators.required, Validators.email]],
    frequency: this.formBuilder.control<NewsletterFrequency>('weekly'),
    topic: ['Angular forms', [Validators.required, Validators.minLength(3)]],
  });

  protected readonly valueChangeCount = signal(0);
  protected readonly statusChangeCount = signal(0);
  protected readonly latestDraft = signal<NewsletterDraft>(this.newsletterForm.getRawValue());
  protected readonly latestStatus = signal(this.newsletterForm.status);
  protected readonly autosavePreview = signal('Waiting for a stable valid form value.');
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'valueChanges emits when a form value changes.' },
    { id: 2, message: 'statusChanges emits when validation status changes.' },
    { id: 3, message: 'takeUntilDestroyed cleans these subscriptions when the component is destroyed.' },
  ]);

  protected readonly formSummary = computed(() => {
    const draft = this.latestDraft();

    return `${draft.email} wants ${draft.frequency} updates about ${draft.topic}.`;
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'valueChanges emits future edits only; it does not emit the current value when you subscribe.',
      name: 'valueChanges',
      syntax: `form.valueChanges.subscribe((value) => {
  // value changed
})`,
    },
    {
      description: 'Use getRawValue when you need the current form value snapshot right now.',
      name: 'value snapshot',
      syntax: `const currentValue =
  form.getRawValue();`,
    },
    {
      description: 'statusChanges emits future status changes only: VALID, INVALID, PENDING, or DISABLED.',
      name: 'statusChanges',
      syntax: `form.statusChanges.subscribe((status) => {
  // validation status changed
})`,
    },
    {
      description: 'Use the status property when you need the current status snapshot right now.',
      name: 'status snapshot',
      syntax: `const currentStatus =
  form.status;`,
    },
    {
      description: 'startWith gives combineLatest an initial value before the user types.',
      name: 'initial values',
      syntax: `form.valueChanges.pipe(
  startWith(form.getRawValue())
)`,
    },
    {
      description: 'Debounce noisy form values before autosave-style work.',
      name: 'autosave stream',
      syntax: `valueChanges.pipe(
  debounceTime(600),
  distinctUntilChanged(...)
)`,
    },
    {
      description: 'Component subscriptions should clean up when the component goes away.',
      name: 'cleanup',
      syntax: `stream.pipe(
  takeUntilDestroyed(destroyRef)
).subscribe(...)`,
    },
  ];

  constructor() {
    this.newsletterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.valueChangeCount.update((count) => count + 1);
        this.latestDraft.set(this.toDraft(value));
        this.addLog(`valueChanges emitted ${JSON.stringify(value)}.`);
      });

    this.newsletterForm.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        this.statusChangeCount.update((count) => count + 1);
        this.latestStatus.set(status);
        this.addLog(`statusChanges emitted ${status}.`);
      });

    combineLatest([
      this.newsletterForm.valueChanges.pipe(startWith(this.newsletterForm.getRawValue())),
      this.newsletterForm.statusChanges.pipe(startWith(this.newsletterForm.status)),
    ])
      .pipe(
        debounceTime(600),
        map(([value, status]) => ({ status, value: this.toDraft(value) })),
        distinctUntilChanged((previous, current) =>
          previous.status === current.status &&
          previous.value.email === current.value.email &&
          previous.value.frequency === current.value.frequency &&
          previous.value.topic === current.value.topic,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ status, value }) => {
        if (status !== 'VALID') {
          this.autosavePreview.set('Autosave skipped because the form is not valid.');
          this.addLog('Autosave stream waited, then skipped an invalid form value.');
          return;
        }

        this.autosavePreview.set(
          `Would autosave ${value.email} with ${value.frequency} ${value.topic} updates.`,
        );
        this.addLog('Autosave stream waited for typing to settle, then used the latest valid value.');
      });
  }

  protected patchValidDraft(): void {
    this.newsletterForm.patchValue({
      email: 'forms.friend@example.com',
      frequency: 'daily',
      topic: 'Reactive forms',
    });
    this.addLog('Patched a valid draft. Watch valueChanges and the debounced autosave stream.');
  }

  protected patchInvalidEmail(): void {
    this.emailControl.setValue('not-an-email');
    this.emailControl.markAsTouched();
    this.addLog('Patched an invalid email. Watch statusChanges and autosave skip.');
  }

  protected resetForm(): void {
    this.newsletterForm.reset({
      email: 'learner@example.com',
      frequency: 'weekly',
      topic: 'Angular forms',
    });
    this.addLog('Reset the form to its initial values.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  protected get emailControl(): FormControl<string> {
    return this.newsletterForm.controls.email;
  }

  protected get topicControl(): FormControl<string> {
    return this.newsletterForm.controls.topic;
  }

  private toDraft(value: Partial<NewsletterDraft>): NewsletterDraft {
    const current = this.newsletterForm.getRawValue();

    return {
      email: value.email ?? current.email,
      frequency: value.frequency ?? current.frequency,
      topic: value.topic ?? current.topic,
    };
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
