# Angular Forms Lessons

This track focuses on Angular forms for user input, validation, submission,
form state, custom controls, and practical app workflows.

## Lessons

| Lesson | Route | Teaches |
| --- | --- | --- |
| 1. Reactive Form Basics | `/angular-forms-lessons/lesson-01-reactive-form-basics` | How to build a typed `FormGroup`, connect inputs with `formControlName`, validate fields, inspect form state, and submit safely. |

## Big Ideas So Far

### Reactive Form Basics

- `FormControl` owns one field value and validation state.
- `FormGroup` owns a named set of controls.
- `ReactiveFormsModule` enables `[formGroup]` and `formControlName`.
- Validators update `valid`, `invalid`, `errors`, `touched`, and `dirty`.
- A submit handler should check `form.invalid`, mark controls touched, and only read the value when the form is valid.

## Growing Path

Future Angular Forms lessons can build from this foundation:

- validation messages and cross-field validation
- nested groups and dynamic arrays
- form submission with backend-style save state
- custom form controls with `ControlValueAccessor`
- forms with signals and RxJS interop
