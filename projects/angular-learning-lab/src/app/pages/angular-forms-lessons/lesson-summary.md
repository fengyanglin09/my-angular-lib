# Angular Forms Lessons

This track focuses on Angular forms for user input, validation, submission,
form state, custom controls, and practical app workflows.

## Lessons

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Reactive Form Basics | `/angular-forms-lessons/lesson-01-reactive-form-basics` | How to build a typed `FormGroup`, connect inputs with `formControlName`, validate fields, inspect form state, and submit safely. |
| 2. FormBuilder Basics | `/angular-forms-lessons/lesson-02-form-builder` | How `NonNullableFormBuilder` creates typed controls with less repeated setup than `new FormGroup(...)`. |
| 3. Form Data And Factory | `/angular-forms-lessons/lesson-03-form-factory` | How a shared field config utility can create controls while the same config drives template rendering, validation messages, patching, and reset. |
| 4. Validation Patterns | `/angular-forms-lessons/lesson-04-validation-patterns` | How field validators and group validators work, including a password confirmation validator. |
| 5. Nested Groups And Arrays | `/angular-forms-lessons/lesson-05-nested-groups-arrays` | How nested `FormGroup` and `FormArray` model object-shaped and list-shaped form data. |

## Big Ideas So Far

### Reactive Form Basics

- `FormControl` owns one field value and validation state.
- `FormGroup` owns a named set of controls.
- `ReactiveFormsModule` enables `[formGroup]` and `formControlName`.
- Validators update `valid`, `invalid`, `errors`, `touched`, and `dirty`.
- A submit handler should check `form.invalid`, mark controls touched, and only read the value when the form is valid.

### FormBuilder Basics

- `NonNullableFormBuilder` creates non-nullable reactive form controls.
- `formBuilder.group(...)` creates a `FormGroup`.
- The common shorthand is `[initialValue, validators]`.
- FormBuilder reduces repeated `new FormControl(...)` setup.
- The template still uses `[formGroup]` and `formControlName`.

### Form Data And Factory

- Plain objects are useful for form defaults, API responses, and saved drafts.
- A field config object can describe labels, input type, autocomplete, initial values, validators, and error messages.
- `createFormFromFields(...)` is a shared helper that loops over a `FormFieldsConfig` object and creates controls.
- The template can loop over the same object to render fields and validation messages.
- `patchValue(...)` updates existing controls from another object with the same shape.
- `reset(...)` restores values and also resets form state such as `dirty` and `touched`.

### Validation Patterns

- Field validators check one control, such as required, email, or minimum length.
- Group validators check rules that need multiple controls, such as password and confirm password matching.
- `matchingFieldsValidator(...)` lives in `angular-forms-validators.ts` so future lessons can reuse and evolve shared form validators.
- A validator returns `null` when the value is valid.
- A validator returns an error object when invalid, such as `{ passwordMismatch: true }`.
- Error messages usually wait for touch or submit so users do not see errors before interacting.

### Nested Groups And Arrays

- A nested `FormGroup` models an object inside the larger form value.
- `formGroupName` tells the template to work inside a child group.
- A `FormArray` models repeated rows where the user can add or remove items.
- `formArrayName` points the template at the array, and each row uses its index as `formGroupName`.
- `getRawValue()` returns the full nested value, including group objects and array rows.

## Growing Path

Future Angular Forms lessons can build from this foundation:

- validation messages and cross-field validation
- form submission with backend-style save state
- custom form controls with `ControlValueAccessor`
- forms with signals and RxJS interop
