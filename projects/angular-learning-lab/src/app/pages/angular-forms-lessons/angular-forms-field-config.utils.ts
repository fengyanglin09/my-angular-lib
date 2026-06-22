import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

import { FormFieldsConfig } from './angular-forms-field-config.models';

export type DynamicFormGroup = FormGroup<Record<string, FormControl<string>>>;

export function createFormFromFields(
  formBuilder: NonNullableFormBuilder,
  fields: FormFieldsConfig,
): DynamicFormGroup {
  const controls: Record<string, FormControl<string>> = {};

  for (const [name, field] of Object.entries(fields)) {
    controls[name] = formBuilder.control(field.value, {
      validators: field.validators ?? [],
    });
  }

  return new FormGroup(controls);
}
