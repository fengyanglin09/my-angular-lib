import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type Priority = 'low' | 'medium' | 'high';

interface PriorityOption {
  label: string;
  value: Priority;
}

@Component({
  selector: 'app-priority-picker',
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriorityPicker),
    },
  ],
  templateUrl: './priority-picker.html',
  styleUrl: './priority-picker.css',
})
export class PriorityPicker implements ControlValueAccessor {
  protected readonly disabled = signal(false);
  protected readonly selectedPriority = signal<Priority>('medium');
  protected readonly options: PriorityOption[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  private onChange: (value: Priority) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: Priority | null): void {
    this.selectedPriority.set(value ?? 'medium');
  }

  registerOnChange(onChange: (value: Priority) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected choosePriority(priority: Priority): void {
    if (this.disabled()) {
      return;
    }

    this.selectedPriority.set(priority);
    this.onChange(priority);
    this.markTouched();
  }

  protected markTouched(): void {
    this.onTouched();
  }
}
