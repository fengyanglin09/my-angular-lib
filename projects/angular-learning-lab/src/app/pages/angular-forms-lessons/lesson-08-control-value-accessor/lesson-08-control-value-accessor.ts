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
import { Priority, PriorityPicker } from './priority-picker';

type TaskForm = FormGroup<{
  notes: FormControl<string>;
  priority: FormControl<Priority>;
  title: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-08-control-value-accessor',
  imports: [JsonPipe, LearningNav, PriorityPicker, ReactiveFormsModule],
  templateUrl: './lesson-08-control-value-accessor.html',
  styleUrl: './lesson-08-control-value-accessor.css',
})
export class Lesson08ControlValueAccessor {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly taskForm: TaskForm = this.formBuilder.group({
    title: ['Review signup flow', [Validators.required]],
    priority: this.formBuilder.control<Priority>('medium', [Validators.required]),
    notes: ['Check validation messages and save state.'],
  });

  protected readonly savedTask = signal(this.taskForm.getRawValue());
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Custom priority picker is connected with formControlName.' },
  ]);

  protected readonly savedSummary = computed(
    () => `${this.savedTask().title} saved with ${this.savedTask().priority} priority.`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Provide NG_VALUE_ACCESSOR so Angular forms can find the custom control.',
      name: 'provider',
      syntax: `providers: [{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PriorityPicker),
  multi: true
}]`,
    },
    {
      description: 'writeValue lets the parent form push a value into the component.',
      name: 'write value',
      syntax: `writeValue(value) {
  selectedPriority.set(value ?? 'medium');
}`,
    },
    {
      description: 'registerOnChange gives the component a callback to notify the form.',
      name: 'change callback',
      syntax: `registerOnChange(fn) {
  this.onChange = fn;
}`,
    },
    {
      description: 'registerOnTouched gives a callback for blur, click, or touch interaction.',
      name: 'touch callback',
      syntax: `registerOnTouched(fn) {
  this.onTouched = fn;
}

(blur)="markTouched()"`,
    },
    {
      description: 'setDisabledState receives disabled changes from the parent FormControl.',
      name: 'disabled state',
      syntax: `setDisabledState(isDisabled) {
  disabled.set(isDisabled);
}`,
    },
    {
      description: 'After CVA is implemented, the parent uses normal formControlName.',
      name: 'parent template',
      syntax: `<app-priority-picker
  formControlName="priority"
/>`,
    },
  ];

  protected get titleControl(): FormControl<string> {
    return this.taskForm.controls.title;
  }

  protected get priorityControl(): FormControl<Priority> {
    return this.taskForm.controls.priority;
  }

  protected patchHighPriority(): void {
    this.priorityControl.setValue('high');
    this.addLog('Parent form set priority to high. writeValue updated the custom control.');
  }

  protected togglePriorityDisabled(): void {
    if (this.priorityControl.disabled) {
      this.priorityControl.enable();
      this.addLog('Enabled the priority FormControl. The custom picker became clickable again.');
      return;
    }

    this.priorityControl.disable();
    this.addLog('Disabled the priority FormControl. setDisabledState disabled the picker.');
  }

  protected saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      this.addLog('Save blocked because the task form is invalid.');
      return;
    }

    this.savedTask.set(this.taskForm.getRawValue());
    this.addLog('Saved the task from the parent form raw value.');
  }

  protected resetForm(): void {
    this.taskForm.reset({
      notes: 'Check validation messages and save state.',
      priority: 'medium',
      title: 'Review signup flow',
    });
    this.addLog('Reset the parent form. writeValue pushed medium priority into the picker.');
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
