import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

interface InvoiceLine {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceDraft {
  customerEmail: string;
  lines: InvoiceLine[];
}

type InvoiceLineForm = FormGroup<{
  description: FormControl<string>;
  quantity: FormControl<number>;
  unitPrice: FormControl<number>;
}>;

type InvoiceForm = FormGroup<{
  customerEmail: FormControl<string>;
  lines: FormArray<InvoiceLineForm>;
}>;

const initialInvoice: InvoiceDraft = {
  customerEmail: 'billing@example.com',
  lines: [
    { description: 'Angular coaching', quantity: 2, unitPrice: 125 },
    { description: 'Code review', quantity: 1, unitPrice: 180 },
  ],
};

@Component({
  selector: 'app-lesson-12-dynamic-form-array',
  imports: [CurrencyPipe, JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-12-dynamic-form-array.html',
  styleUrl: './lesson-12-dynamic-form-array.css',
})
export class Lesson12DynamicFormArray {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly invoiceForm: InvoiceForm = this.formBuilder.group({
    customerEmail: [initialInvoice.customerEmail, [Validators.required, Validators.email]],
    lines: this.formBuilder.array(
      initialInvoice.lines.map((line) => this.createLineGroup(line)),
      { validators: [Validators.required] },
    ),
  });

  protected readonly latestDraft = signal<InvoiceDraft>(this.invoiceForm.getRawValue());
  protected readonly lineChangeCount = signal(0);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Invoice rows are FormArray entries created by a row factory.' },
  ]);

  protected readonly invoiceTotal = computed(() =>
    this.latestDraft().lines.reduce(
      (total, line) => total + line.quantity * line.unitPrice,
      0,
    ),
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A row factory keeps repeated row creation consistent.',
      name: 'row factory',
      syntax: `private createLineGroup(line): LineForm {
  return formBuilder.group({...});
}`,
    },
    {
      description: 'FormArray owns the list of row groups.',
      name: 'typed array',
      syntax: `lines: FormArray<InvoiceLineForm>`,
    },
    {
      description: 'Push a new group when the user adds a row.',
      name: 'add row',
      syntax: `lines.push(createLineGroup({
  description: '',
  quantity: 1,
  unitPrice: 0
}));`,
    },
    {
      description: 'Remove by index, but guard against removing the last useful row.',
      name: 'remove row',
      syntax: `if (lines.length > 1) {
  lines.removeAt(index);
}`,
    },
    {
      description: 'Use valueChanges plus startWith when totals need the initial value and future edits.',
      name: 'derived total',
      syntax: `form.valueChanges.pipe(
  startWith(form.getRawValue()),
  debounceTime(150)
)`,
    },
  ];

  constructor() {
    this.invoiceForm.valueChanges
      .pipe(
        startWith(this.invoiceForm.getRawValue()),
        debounceTime(150),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.latestDraft.set(this.invoiceForm.getRawValue());
        this.lineChangeCount.update((count) => count + 1);
      });
  }

  protected get customerEmailControl(): FormControl<string> {
    return this.invoiceForm.controls.customerEmail;
  }

  protected get lines(): FormArray<InvoiceLineForm> {
    return this.invoiceForm.controls.lines;
  }

  protected addLine(): void {
    const lineNumber = this.lines.length + 1;

    this.lines.push(
      this.createLineGroup({
        description: `New item ${lineNumber}`,
        quantity: 1,
        unitPrice: 50,
      }),
    );
    this.addLog(`Added invoice line #${lineNumber}.`);
  }

  protected removeLine(index: number): void {
    if (this.lines.length === 1) {
      this.addLog('Kept the final line so the invoice still has one editable row.');
      return;
    }

    this.lines.removeAt(index);
    this.addLog(`Removed invoice line #${index + 1}.`);
  }

  protected patchDiscountLine(): void {
    this.lines.push(
      this.createLineGroup({
        description: 'Learning discount',
        quantity: 1,
        unitPrice: -25,
      }),
    );
    this.addLog('Added a negative line item to model a discount.');
  }

  protected resetInvoice(): void {
    this.invoiceForm.reset({
      customerEmail: initialInvoice.customerEmail,
      lines: [],
    });
    this.lines.clear();
    initialInvoice.lines.forEach((line) => this.lines.push(this.createLineGroup(line)));
    this.addLog('Reset invoice and rebuilt the FormArray from initial data.');
  }

  protected saveInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      this.addLog('Save blocked. Fix the invoice email or line rows first.');
      return;
    }

    this.addLog(`Invoice ready to save with ${this.lines.length} line(s).`);
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  protected lineTotal(line: InvoiceLineForm): number {
    const value = line.getRawValue();

    return value.quantity * value.unitPrice;
  }

  private createLineGroup(line: InvoiceLine): InvoiceLineForm {
    return this.formBuilder.group({
      description: [line.description, [Validators.required, Validators.minLength(3)]],
      quantity: [line.quantity, [Validators.required, Validators.min(1)]],
      unitPrice: [line.unitPrice, [Validators.required, Validators.min(-1000)]],
    });
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
