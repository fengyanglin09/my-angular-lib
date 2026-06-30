import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

type Plan = 'starter' | 'team' | 'enterprise';
type WizardStep = 'account' | 'plan' | 'review';

type AccountGroup = FormGroup<{
  companyName: FormControl<string>;
  contactEmail: FormControl<string>;
}>;

type PlanGroup = FormGroup<{
  plan: FormControl<Plan>;
  seats: FormControl<number>;
}>;

type PreferencesGroup = FormGroup<{
  newsletter: FormControl<boolean>;
  onboardingNotes: FormControl<string>;
}>;

type SignupWizardForm = FormGroup<{
  account: AccountGroup;
  plan: PlanGroup;
  preferences: PreferencesGroup;
}>;

interface StepLink {
  label: string;
  step: WizardStep;
}

@Component({
  selector: 'app-lesson-13-multi-step-form',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-13-multi-step-form.html',
  styleUrl: './lesson-13-multi-step-form.css',
})
export class Lesson13MultiStepForm {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly wizardForm: SignupWizardForm = this.formBuilder.group({
    account: this.formBuilder.group({
      companyName: ['Angular Learning Co', [Validators.required, Validators.minLength(3)]],
      contactEmail: ['team@example.com', [Validators.required, Validators.email]],
    }),
    plan: this.formBuilder.group({
      plan: this.formBuilder.control<Plan>('team'),
      seats: [5, [Validators.required, Validators.min(1), Validators.max(250)]],
    }),
    preferences: this.formBuilder.group({
      newsletter: [true],
      onboardingNotes: ['Focus onboarding on Angular forms.'],
    }),
  });

  protected readonly currentStep = signal<WizardStep>('account');
  protected readonly submittedPayload = signal<ReturnType<SignupWizardForm['getRawValue']> | null>(null);
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'One FormGroup owns all steps. The current step only controls what is visible.' },
  ]);

  protected readonly steps: StepLink[] = [
    { label: 'Account', step: 'account' },
    { label: 'Plan', step: 'plan' },
    { label: 'Review', step: 'review' },
  ];

  protected readonly stepIndex = computed(() =>
    this.steps.findIndex((step) => step.step === this.currentStep()),
  );

  protected readonly currentStepLabel = computed(
    () => this.steps[this.stepIndex()]?.label ?? 'Account',
  );

  protected readonly canGoBack = computed(() => this.stepIndex() > 0);
  protected readonly canGoNext = computed(() => this.stepIndex() < this.steps.length - 1);

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A wizard can still be one typed form with nested step groups.',
      name: 'one form',
      syntax: `wizardForm = formBuilder.group({
  account: formBuilder.group({...}),
  plan: formBuilder.group({...}),
  preferences: formBuilder.group({...})
})`,
    },
    {
      description: 'The step signal controls what section is visible.',
      name: 'current step',
      syntax: `currentStep = signal<'account' |
  'plan' | 'review'>('account')`,
    },
    {
      description: 'Before moving forward, validate the current step group only.',
      name: 'step guard',
      syntax: `if (currentGroup.invalid) {
  currentGroup.markAllAsTouched();
  return;
}`,
    },
    {
      description: 'Review uses the full form payload, not just the visible step.',
      name: 'review payload',
      syntax: `wizardForm.getRawValue()`,
    },
  ];

  protected get accountGroup(): AccountGroup {
    return this.wizardForm.controls.account;
  }

  protected get planGroup(): PlanGroup {
    return this.wizardForm.controls.plan;
  }

  protected get preferencesGroup(): PreferencesGroup {
    return this.wizardForm.controls.preferences;
  }

  protected nextStep(): void {
    if (!this.validateCurrentStep()) {
      return;
    }

    const next = this.steps[this.stepIndex() + 1];

    if (next) {
      this.currentStep.set(next.step);
      this.addLog(`Moved to ${next.label}.`);
    }
  }

  protected previousStep(): void {
    const previous = this.steps[this.stepIndex() - 1];

    if (previous) {
      this.currentStep.set(previous.step);
      this.addLog(`Moved back to ${previous.label}.`);
    }
  }

  protected goToStep(step: WizardStep): void {
    const targetIndex = this.steps.findIndex((link) => link.step === step);

    if (targetIndex <= this.stepIndex()) {
      this.currentStep.set(step);
      this.addLog(`Jumped back to ${this.steps[targetIndex].label}.`);
      return;
    }

    if (!this.validateCurrentStep()) {
      return;
    }

    this.currentStep.set(step);
    this.addLog(`Jumped forward to ${this.steps[targetIndex].label} after validating the current step.`);
  }

  protected patchInvalidAccount(): void {
    this.accountGroup.patchValue({
      companyName: 'AB',
      contactEmail: 'not-an-email',
    });
    this.currentStep.set('account');
    this.addLog('Patched invalid account data. Next is blocked until the account step is valid.');
  }

  protected patchEnterprisePlan(): void {
    this.planGroup.patchValue({
      plan: 'enterprise',
      seats: 75,
    });
    this.addLog('Patched an enterprise plan. Review shows the same single form payload.');
  }

  protected submitWizard(): void {
    if (this.wizardForm.invalid) {
      this.wizardForm.markAllAsTouched();
      this.addLog('Submit blocked. One or more steps are invalid.');
      return;
    }

    this.submittedPayload.set(this.wizardForm.getRawValue());
    this.addLog('Submitted the full wizard payload.');
  }

  protected resetWizard(): void {
    this.wizardForm.reset({
      account: {
        companyName: 'Angular Learning Co',
        contactEmail: 'team@example.com',
      },
      plan: {
        plan: 'team',
        seats: 5,
      },
      preferences: {
        newsletter: true,
        onboardingNotes: 'Focus onboarding on Angular forms.',
      },
    });
    this.currentStep.set('account');
    this.submittedPayload.set(null);
    this.addLog('Reset wizard values and returned to Account.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  protected stepStatus(step: WizardStep): string {
    return this.stepGroup(step).status;
  }

  private validateCurrentStep(): boolean {
    const group = this.stepGroup(this.currentStep());

    if (group.valid) {
      return true;
    }

    group.markAllAsTouched();
    this.addLog(`${this.currentStepLabel()} step is invalid. Fix it before moving forward.`);
    return false;
  }

  private stepGroup(step: WizardStep): AccountGroup | PlanGroup | PreferencesGroup {
    if (step === 'account') {
      return this.accountGroup;
    }

    if (step === 'plan') {
      return this.planGroup;
    }

    return this.preferencesGroup;
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
