import { ValidatorFn } from '@angular/forms';

export interface FormFieldConfig {
  // Browser autofill hint, such as "email", "name", or "organization".
  autocomplete?: string;

  // Messages keyed by Angular validator error names, such as "required" or "email".
  errorMessages?: Partial<Record<string, string>>;

  // Native input type used when rendering the field.
  inputType?: 'email' | 'text';

  // Human-readable text shown beside the input.
  label: string;

  // Initial value used when creating the FormControl.
  value: string;

  // Angular validators attached to the FormControl.
  validators?: ValidatorFn[];
}

export type FormFieldsConfig = Record<string, FormFieldConfig>;
