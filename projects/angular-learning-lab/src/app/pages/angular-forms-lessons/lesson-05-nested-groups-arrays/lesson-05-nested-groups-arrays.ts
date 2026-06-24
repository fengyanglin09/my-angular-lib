import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { CodeStep, LessonLog } from '../angular-forms-lesson.models';

interface TeamMember {
  name: string;
  role: string;
}

interface OnboardingData {
  members: TeamMember[];
  project: {
    name: string;
    owner: string;
  };
}

type MemberForm = FormGroup<{
  name: FormControl<string>;
  role: FormControl<string>;
}>;

type ProjectForm = FormGroup<{
  name: FormControl<string>;
  owner: FormControl<string>;
}>;

type OnboardingForm = FormGroup<{
  members: FormArray<MemberForm>;
  project: ProjectForm;
}>;

const initialData: OnboardingData = {
  project: {
    name: 'Learning Lab Refresh',
    owner: 'Angular Learner',
  },
  members: [
    { name: 'Maya Chen', role: 'Frontend' },
    { name: 'Sam Rivera', role: 'API' },
  ],
};

@Component({
  selector: 'app-lesson-05-nested-groups-arrays',
  imports: [JsonPipe, LearningNav, ReactiveFormsModule],
  templateUrl: './lesson-05-nested-groups-arrays.html',
  styleUrl: './lesson-05-nested-groups-arrays.css',
})
export class Lesson05NestedGroupsArrays {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private nextLogId = 2;

  protected readonly onboardingForm: OnboardingForm = this.formBuilder.group({
    project: this.createProjectGroup(initialData.project),
    members: this.formBuilder.array(initialData.members.map((member) => this.createMemberGroup(member))),
  });

  protected readonly savedData = signal<OnboardingData>(this.onboardingForm.getRawValue());
  protected readonly logs = signal<LessonLog[]>([
    { id: 1, message: 'Created one nested project group and one members FormArray.' },
  ]);

  protected readonly savedSummary = computed(
    () =>
      `${this.savedData().project.name} has ${this.savedData().members.length} saved member(s).`,
  );

  protected readonly codeSteps: CodeStep[] = [
    {
      description: 'A nested group models an object inside the larger form value.',
      name: 'nested group',
      syntax: `project: formBuilder.group({
  name: ['Learning Lab Refresh'],
  owner: ['Angular Learner']
})`,
    },
    {
      description: 'A FormArray models a list where users can add or remove rows.',
      name: 'form array',
      syntax: `members: formBuilder.array([
  createMemberGroup({ name: 'Maya', role: 'Frontend' })
])`,
    },
    {
      description: 'The template enters the nested group before using child controls.',
      name: 'formGroupName',
      syntax: `<section formGroupName="project">
  <input formControlName="name" />
</section>`,
    },
    {
      description: 'The template loops over FormArray controls by index.',
      name: 'formArrayName',
      syntax: `<div formArrayName="members">
  <article [formGroupName]="index">...</article>
</div>`,
    },
  ];

  protected get projectGroup(): ProjectForm {
    return this.onboardingForm.controls.project;
  }

  protected get members(): FormArray<MemberForm> {
    return this.onboardingForm.controls.members;
  }

  protected addMember(): void {
    const memberNumber = this.members.length + 1;

    this.members.push(
      this.createMemberGroup({
        name: `New teammate ${memberNumber}`,
        role: 'Contributor',
      }),
    );
    this.addLog(`Added member row #${memberNumber} to the FormArray.`);
  }

  protected removeMember(index: number): void {
    if (this.members.length === 1) {
      this.addLog('Kept the final member row so the demo always has one editable row.');
      return;
    }

    this.members.removeAt(index);
    this.addLog(`Removed member row #${index + 1} from the FormArray.`);
  }

  protected patchProjectOwner(): void {
    this.projectGroup.patchValue({
      owner: 'Platform Team',
    });
    this.addLog('Patched only project.owner inside the nested project group.');
  }

  protected resetForm(): void {
    this.onboardingForm.reset({
      project: initialData.project,
      members: initialData.members,
    });

    this.members.clear();
    initialData.members.forEach((member) => this.members.push(this.createMemberGroup(member)));
    this.addLog('Reset nested group values and rebuilt the members FormArray.');
  }

  protected saveForm(): void {
    if (this.onboardingForm.invalid) {
      this.onboardingForm.markAllAsTouched();
      this.addLog('Save blocked. Fix the nested group or member rows first.');
      return;
    }

    this.savedData.set(this.onboardingForm.getRawValue());
    this.addLog('Saved the full nested form value.');
  }

  protected clearLogs(): void {
    this.logs.set([{ id: 1, message: 'Log cleared.' }]);
    this.nextLogId = 2;
  }

  private createProjectGroup(project: OnboardingData['project']): ProjectForm {
    return this.formBuilder.group({
      name: [project.name, [Validators.required]],
      owner: [project.owner, [Validators.required]],
    });
  }

  private createMemberGroup(member: TeamMember): MemberForm {
    return this.formBuilder.group({
      name: [member.name, [Validators.required]],
      role: [member.role, [Validators.required]],
    });
  }

  private addLog(message: string): void {
    const id = this.nextLogId;
    this.nextLogId += 1;
    this.logs.update((logs) => [...logs, { id, message }]);
  }
}
