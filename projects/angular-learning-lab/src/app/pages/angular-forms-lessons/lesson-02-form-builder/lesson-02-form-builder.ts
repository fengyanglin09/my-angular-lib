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

type ContactForm = FormGroup<{
  email: FormControl<string>;
  fullName: FormControl<string>;
  topic: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-02-form-builder',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-02-form-builder.html',
  styleUrl: './lesson-02-form-builder.css',
})
export class Lesson02FormBuilder {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly contactForm: ContactForm = this.formBuilder.group({
    email: ['learner@example.com', [Validators.required, Validators.email]],
    fullName: ['Angular Learner', [Validators.required, Validators.minLength(3)]],
    topic: ['Reactive forms', [Validators.required]],
  });

  protected readonly submittedValue = signal(this.contactForm.getRawValue());
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'FormBuilder created the form with less control setup code.' },
  ]);

  protected readonly submittedSummary = computed(
    () =>
      `${this.submittedValue().fullName} wants to learn ${this.submittedValue().topic}.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Inject NonNullableFormBuilder when every control should hold a non-null value.',
      name: 'inject builder',
      syntax: `private readonly formBuilder =
  inject(NonNullableFormBuilder)`,
    },
    {
      description: 'group(...) creates the FormGroup and its controls.',
      name: 'builder group',
      syntax: `contactForm = formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  fullName: ['', [Validators.required]]
})`,
    },
    {
      description: 'Each array is [initialValue, validators].',
      name: 'control config',
      syntax: `topic: [
  'Reactive forms',
  [Validators.required]
]`,
    },
    {
      description: 'The template still uses the same reactive forms bindings.',
      name: 'same template',
      syntax: `<form [formGroup]="contactForm">
  <input formControlName="email" />
</form>`,
    },
  ];

  protected get emailControl(): FormControl<string> {
    return this.contactForm.controls.email;
  }

  protected get fullNameControl(): FormControl<string> {
    return this.contactForm.controls.fullName;
  }

  protected get topicControl(): FormControl<string> {
    return this.contactForm.controls.topic;
  }

  protected submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.addLog('Submit blocked because the FormBuilder form is invalid.');
      return;
    }

    this.submittedValue.set(this.contactForm.getRawValue());
    this.addLog('Submit accepted. The submitted preview now uses the form value.');
  }

  protected patchTopic(): void {
    this.contactForm.patchValue({
      topic: 'FormBuilder and validators',
    });
    this.addLog('patchValue changed only the topic control.');
  }

  protected resetForm(): void {
    this.contactForm.reset({
      email: 'learner@example.com',
      fullName: 'Angular Learner',
      topic: 'Reactive forms',
    });
    this.addLog('reset restored the builder-created form values and state.');
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
