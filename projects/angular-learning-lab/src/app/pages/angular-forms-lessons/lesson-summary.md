# Angular Forms Lessons

This track focuses on Angular forms for user input, validation, submission,
form state, custom controls, and practical app workflows.

## Lessons

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Reactive Form Basics | `/angular-forms-lessons/lesson-01-reactive-form-basics` | How to build a typed `FormGroup`, connect inputs with `formControlName`, validate fields, inspect form state, and submit safely. |
| 2. FormBuilder Basics | `/angular-forms-lessons/lesson-02-form-builder` | How `NonNullableFormBuilder` creates typed controls with less repeated setup than `new FormGroup(...)`. |
| 3. Form Data And Factory | `/angular-forms-lessons/lesson-03-form-factory` | How a field config object can drive control creation, template rendering, validation messages, patching, and reset. |

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
- A form factory can loop over that object and create controls.
- The template can loop over the same object to render fields and validation messages.
- `patchValue(...)` updates existing controls from another object with the same shape.
- `reset(...)` restores values and also resets form state such as `dirty` and `touched`.

## Growing Path

Future Angular Forms lessons can build from this foundation:

- validation messages and cross-field validation
- nested groups and dynamic arrays
- form submission with backend-style save state
- custom form controls with `ControlValueAccessor`
- forms with signals and RxJS interop
