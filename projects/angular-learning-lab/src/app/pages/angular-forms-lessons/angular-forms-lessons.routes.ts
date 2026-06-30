import { Routes } from '@angular/router';

export const angularFormsLessonsRoutes: Routes = [
  {
    path: 'lesson-01-reactive-form-basics',
    loadComponent: () =>
      import('./lesson-01-reactive-form-basics/lesson-01-reactive-form-basics').then(
        (m) => m.Lesson01ReactiveFormBasics,
      ),
  },
  {
    path: 'lesson-02-form-builder',
    loadComponent: () =>
      import('./lesson-02-form-builder/lesson-02-form-builder').then(
        (m) => m.Lesson02FormBuilder,
      ),
  },
  {
    path: 'lesson-03-form-factory',
    loadComponent: () =>
      import('./lesson-03-form-factory/lesson-03-form-factory').then(
        (m) => m.Lesson03FormFactory,
      ),
  },
  {
    path: 'lesson-04-validation-patterns',
    loadComponent: () =>
      import('./lesson-04-validation-patterns/lesson-04-validation-patterns').then(
        (m) => m.Lesson04ValidationPatterns,
      ),
  },
  {
    path: 'lesson-05-nested-groups-arrays',
    loadComponent: () =>
      import('./lesson-05-nested-groups-arrays/lesson-05-nested-groups-arrays').then(
        (m) => m.Lesson05NestedGroupsArrays,
      ),
  },
  {
    path: 'lesson-06-value-vs-raw-value',
    loadComponent: () =>
      import('./lesson-06-value-vs-raw-value/lesson-06-value-vs-raw-value').then(
        (m) => m.Lesson06ValueVsRawValue,
      ),
  },
  {
    path: 'lesson-07-submit-save-state',
    loadComponent: () =>
      import('./lesson-07-submit-save-state/lesson-07-submit-save-state').then(
        (m) => m.Lesson07SubmitSaveState,
      ),
  },
  {
    path: 'lesson-08-control-value-accessor',
    loadComponent: () =>
      import('./lesson-08-control-value-accessor/lesson-08-control-value-accessor').then(
        (m) => m.Lesson08ControlValueAccessor,
      ),
  },
  {
    path: 'lesson-09-async-validators',
    loadComponent: () =>
      import('./lesson-09-async-validators/lesson-09-async-validators').then(
        (m) => m.Lesson09AsyncValidators,
      ),
  },
  {
    path: 'lesson-10-form-streams',
    loadComponent: () =>
      import('./lesson-10-form-streams/lesson-10-form-streams').then(
        (m) => m.Lesson10FormStreams,
      ),
  },
  {
    path: 'lesson-11-dependent-controls',
    loadComponent: () =>
      import('./lesson-11-dependent-controls/lesson-11-dependent-controls').then(
        (m) => m.Lesson11DependentControls,
      ),
  },
  {
    path: 'lesson-12-dynamic-form-array',
    loadComponent: () =>
      import('./lesson-12-dynamic-form-array/lesson-12-dynamic-form-array').then(
        (m) => m.Lesson12DynamicFormArray,
      ),
  },
  {
    path: 'lesson-13-multi-step-form',
    loadComponent: () =>
      import('./lesson-13-multi-step-form/lesson-13-multi-step-form').then(
        (m) => m.Lesson13MultiStepForm,
      ),
  },
  {
    path: 'lesson-14-form-persistence',
    loadComponent: () =>
      import('./lesson-14-form-persistence/lesson-14-form-persistence').then(
        (m) => m.Lesson14FormPersistence,
      ),
  },
  {
    path: 'lesson-15-server-errors',
    loadComponent: () =>
      import('./lesson-15-server-errors/lesson-15-server-errors').then(
        (m) => m.Lesson15ServerErrors,
      ),
  },
  {
    path: 'lesson-16-update-on-strategies',
    loadComponent: () =>
      import('./lesson-16-update-on-strategies/lesson-16-update-on-strategies').then(
        (m) => m.Lesson16UpdateOnStrategies,
      ),
  },
];
