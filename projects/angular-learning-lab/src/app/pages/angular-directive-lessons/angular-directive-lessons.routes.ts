import { Routes } from '@angular/router';

export const angularDirectiveLessonsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lesson-01-attribute-directives',
  },
  {
    path: 'lesson-01-attribute-directives',
    loadComponent: () =>
      import(
        './lesson-01-attribute-directives/lesson-01-attribute-directives'
      ).then((m) => m.DirectiveLesson01AttributeDirectives),
  },
  {
    path: 'lesson-02-structural-directives',
    loadComponent: () =>
      import(
        './lesson-02-structural-directives/lesson-02-structural-directives'
      ).then((m) => m.DirectiveLesson02StructuralDirectives),
  },
  {
    path: 'lesson-03-host-binding-listener',
    loadComponent: () =>
      import(
        './lesson-03-host-binding-listener/lesson-03-host-binding-listener'
      ).then((m) => m.DirectiveLesson03HostBindingListener),
  },
  {
    path: 'lesson-04-directive-inputs',
    loadComponent: () =>
      import('./lesson-04-directive-inputs/lesson-04-directive-inputs').then(
        (m) => m.DirectiveLesson04DirectiveInputs
      ),
  },
  {
    path: 'lesson-05-directive-composition',
    loadComponent: () =>
      import(
        './lesson-05-directive-composition/lesson-05-directive-composition'
      ).then((m) => m.DirectiveLesson05DirectiveComposition),
  },
  {
    path: 'lesson-06-permission-feature-flag',
    loadComponent: () =>
      import(
        './lesson-06-permission-feature-flag/lesson-06-permission-feature-flag'
      ).then((m) => m.DirectiveLesson06PermissionFeatureFlag),
  },
  {
    path: 'lesson-07-tooltip-autofocus-clickoutside',
    loadComponent: () =>
      import(
        './lesson-07-tooltip-autofocus-clickoutside/lesson-07-tooltip-autofocus-clickoutside'
      ).then((m) => m.DirectiveLesson07TooltipAutofocusClickOutside),
  },
  {
    path: 'lesson-08-directive-vs-component',
    loadComponent: () =>
      import(
        './lesson-08-directive-vs-component/lesson-08-directive-vs-component'
      ).then((m) => m.DirectiveLesson08DirectiveVsComponent),
  },
];
