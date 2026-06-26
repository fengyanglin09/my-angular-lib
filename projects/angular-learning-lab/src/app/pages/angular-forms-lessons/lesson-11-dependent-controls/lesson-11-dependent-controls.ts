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
import { startWith } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

type DeliveryMethod = 'pickup' | 'ship';

type DeliveryForm = FormGroup<{
  deliveryMethod: FormControl<DeliveryMethod>;
  email: FormControl<string>;
  shippingAddress: FormControl<string>;
  shippingCity: FormControl<string>;
}>;

@Component({
  selector: 'app-lesson-11-dependent-controls',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-11-dependent-controls.html',
  styleUrl: './lesson-11-dependent-controls.css',
})
export class Lesson11DependentControls {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly deliveryForm: DeliveryForm = this.formBuilder.group({
    deliveryMethod: this.formBuilder.control<DeliveryMethod>('pickup'),
    email: ['learner@example.com', [Validators.required, Validators.email]],
    shippingAddress: [''],
    shippingCity: [''],
  });

  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Delivery method controls whether shipping fields are enabled and required.' },
  ]);
  protected readonly selectedDeliveryMethod = signal<DeliveryMethod>(this.deliveryMethodControl.value);
  protected readonly formValueEmissionCount = signal(0);
  protected readonly formStatusEmissionCount = signal(0);

  protected readonly payloadPreview = computed(() => {
    if (this.selectedDeliveryMethod() === 'pickup') {
      return 'Pickup order payload excludes disabled shipping fields.';
    }

    return 'Shipping order payload includes enabled shipping fields.';
  });

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'Subscribe to the field that controls the dependent fields.',
      name: 'watch controller',
      syntax: `deliveryMethod.valueChanges.pipe(
  startWith(deliveryMethod.value)
)`,
    },
    {
      description: 'Enable fields and add validators when shipping is selected.',
      name: 'enable + require',
      syntax: `address.enable({ emitEvent: false });
address.setValidators([Validators.required]);`,
    },
    {
      description: 'Disable and clear fields when pickup is selected.',
      name: 'disable + clear',
      syntax: `address.reset('', { emitEvent: false });
address.disable({ emitEvent: false });`,
    },
    {
      description: 'emitEvent false keeps internal enable, disable, reset, and validity updates quiet.',
      name: 'quiet updates',
      syntax: `control.updateValueAndValidity({
  emitEvent: false
});`,
    },
    {
      description: 'With emitEvent true, these internal updates can emit extra valueChanges and statusChanges.',
      name: 'noisy updates',
      syntax: `address.updateValueAndValidity({
  emitEvent: true
});`,
    },
    {
      description: 'Disabled fields are excluded from form.value but included in getRawValue.',
      name: 'payload shape',
      syntax: `form.value
form.getRawValue()`,
    },
  ];

  constructor() {
    this.deliveryMethodControl.valueChanges
      .pipe(
        startWith(this.deliveryMethodControl.value),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((method) => this.applyDeliveryMethod(method));

    this.deliveryForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formValueEmissionCount.update((count) => count + 1));

    this.deliveryForm.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formStatusEmissionCount.update((count) => count + 1));
  }

  protected choosePickup(): void {
    this.deliveryMethodControl.setValue('pickup');
  }

  protected chooseShipping(): void {
    this.deliveryMethodControl.setValue('ship');
  }

  protected fillShippingExample(): void {
    this.deliveryForm.patchValue({
      deliveryMethod: 'ship',
      shippingAddress: '123 Angular Way',
      shippingCity: 'Signal City',
    });
    this.addLog('Patched a shipping example. Shipping fields are enabled and required.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  protected get deliveryMethodControl(): FormControl<DeliveryMethod> {
    return this.deliveryForm.controls.deliveryMethod;
  }

  protected get emailControl(): FormControl<string> {
    return this.deliveryForm.controls.email;
  }

  protected get shippingAddressControl(): FormControl<string> {
    return this.deliveryForm.controls.shippingAddress;
  }

  protected get shippingCityControl(): FormControl<string> {
    return this.deliveryForm.controls.shippingCity;
  }

  private applyDeliveryMethod(method: DeliveryMethod): void {
    this.selectedDeliveryMethod.set(method);

    if (method === 'ship') {
      this.enableShippingControl(this.shippingAddressControl);
      this.enableShippingControl(this.shippingCityControl);
      this.addLog('Ship to address selected. Shipping fields are enabled and required.');
      return;
    }

    this.disableShippingControl(this.shippingAddressControl);
    this.disableShippingControl(this.shippingCityControl);
    this.addLog('Pickup selected. Shipping fields are cleared, disabled, and excluded from form.value.');
  }

  private enableShippingControl(control: FormControl<string>): void {
    control.enable({ emitEvent: false });
    control.setValidators([Validators.required, Validators.minLength(3)]);
    control.updateValueAndValidity({ emitEvent: false });
  }

  private disableShippingControl(control: FormControl<string>): void {
    control.reset('', { emitEvent: false });
    control.clearValidators();
    control.disable({ emitEvent: false });
    control.updateValueAndValidity({ emitEvent: false });
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
