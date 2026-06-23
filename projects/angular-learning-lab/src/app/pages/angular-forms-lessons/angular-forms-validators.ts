import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingFieldsValidator(
  firstField: string,
  secondField: string,
  errorName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstValue = control.get(firstField)?.value;
    const secondValue = control.get(secondField)?.value;

    if (!firstValue || !secondValue || firstValue === secondValue) {
      return null;
    }

    return { [errorName]: true };
  };
}
