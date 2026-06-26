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
| 6. Value Vs Raw Value | `/angular-forms-lessons/lesson-06-value-vs-raw-value` | How `form.value` and `getRawValue()` differ when child controls are disabled. |
| 7. Submit And Save State | `/angular-forms-lessons/lesson-07-submit-save-state` | How to handle backend-style submission with loading, success, failure, disabled controls, and retry. |
| 8. ControlValueAccessor | `/angular-forms-lessons/lesson-08-control-value-accessor` | How to make a custom component work with `formControlName`. |
| 9. Async Validators | `/angular-forms-lessons/lesson-09-async-validators` | How to validate a control with a backend-style async availability check and pending state. |
| 10. Form Streams | `/angular-forms-lessons/lesson-10-form-streams` | How to use `valueChanges`, `statusChanges`, debounce, combined streams, and subscription cleanup. |
| 11. Dependent Controls | `/angular-forms-lessons/lesson-11-dependent-controls` | How to enable, disable, require, clear, and recalculate fields based on another control value. |

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

### Value Vs Raw Value

- `form.value` is the enabled-control value shape.
- `form.getRawValue()` is the complete form value shape.
- Disabled controls can still be valid business data, such as server-owned IDs.
- Use `getRawValue()` when read-only disabled fields must be included in a backend payload.
- The difference is easy to miss because both APIs often look the same until a child control is disabled.

### Submit And Save State

- Form values and save status are separate state.
- Submit should guard against invalid forms before calling the backend.
- Disabling the form while saving prevents duplicate submits and communicates that work is in progress.
- Success updates the last saved backend result.
- Failure keeps the current form value so the user can fix or retry without retyping.

### ControlValueAccessor

- `ControlValueAccessor` is the bridge between Angular forms and custom input components.
- `NG_VALUE_ACCESSOR` registers the custom component as a form control.
- `writeValue(...)` receives values from the parent form.
- `registerOnChange(...)` gives the custom control a callback for updating the parent form.
- `registerOnTouched(...)` is usually called from blur, click, or touch interaction.
- `setDisabledState(...)` lets disabled state flow from the parent form into the custom component.

### Async Validators

- Async validators return a Promise or Observable of validation errors.
- Angular runs async validators after sync validators pass.
- A control becomes `PENDING` while async validation is running.
- Return `null` when the value is valid, or an error object when invalid.
- Submit flows should guard against pending forms before saving.

### Form Streams

- `valueChanges` emits future form or control value changes.
- `valueChanges` does not emit the current value when you subscribe.
- Use `getRawValue()` when you need the current form value snapshot.
- `statusChanges` emits future form or control status changes: `VALID`, `INVALID`, `PENDING`, or `DISABLED`.
- `statusChanges` does not emit the current status when you subscribe.
- Use `form.status` when you need the current status snapshot.
- `startWith(...)` provides the current form state before the first user edit.
- `combineLatest(...)` is useful when work needs both the latest form value and latest form status.
- `debounceTime(...)` prevents noisy typing from triggering preview, autosave, or search work too often.
- `takeUntilDestroyed(...)` cleans component subscriptions when Angular destroys the component.

### Dependent Controls

- One control can decide whether other controls are enabled, disabled, required, or cleared.
- Use `startWith(...)` when dependent rules must run for the initial form value too.
- Use `enable(...)` and `disable(...)` when controls should join or leave `form.value`.
- Use `setValidators(...)` and `clearValidators(...)` when requirements change dynamically.
- Call `updateValueAndValidity(...)` after changing validators.
- `{ emitEvent: true }` announces internal updates to `valueChanges` and `statusChanges`.
- `{ emitEvent: false }` makes internal adjustments quietly so the original user change remains the main event.

## Growing Path

Future Angular Forms lessons can build from this foundation:

- dynamic form sections
- multi-step forms
- form state persistence
