import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type UpdateOperation = 'assoc' | 'assocPath' | 'evolve';

interface NotificationPreferences {
  email: boolean;
  productUpdates: boolean;
  sms: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  preferences: {
    density: 'comfortable' | 'compact';
    notifications: NotificationPreferences;
    theme: 'dark' | 'light';
  };
  stats: {
    completedLessons: number;
    streakDays: number;
  };
}

interface UpdateExample {
  code: string;
  description: string;
  name: UpdateOperation;
  output: string;
  title: string;
}

interface PlainEquivalent {
  description: string;
  name: string;
  plain: string;
  ramda: string;
  title: string;
}

const initialProfile: UserProfile = {
  id: 'user-101',
  name: 'Lin',
  preferences: {
    density: 'comfortable',
    notifications: {
      email: true,
      productUpdates: false,
      sms: false,
    },
    theme: 'light',
  },
  stats: {
    completedLessons: 12,
    streakDays: 4,
  },
};

function updateName(profile: UserProfile): UserProfile {
  return R.assoc('name', 'Lin Peng', profile) as UserProfile;
}

function enableSms(profile: UserProfile): UserProfile {
  return R.assocPath(
    ['preferences', 'notifications', 'sms'],
    true,
    profile,
  ) as UserProfile;
}

function advanceLearningStats(profile: UserProfile): UserProfile {
  return R.evolve({
    stats: {
      completedLessons: R.add(1),
      streakDays: R.add(1),
    },
  }, profile) as UserProfile;
}

function runOperation(operation: UpdateOperation, profile: UserProfile): UserProfile {
  if (operation === 'assoc') {
    return updateName(profile);
  }

  if (operation === 'assocPath') {
    return enableSms(profile);
  }

  return advanceLearningStats(profile);
}

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-03-immutable-object-updates',
  imports: [LearningNav],
  templateUrl: './lesson-03-immutable-object-updates.html',
  styleUrl: './lesson-03-immutable-object-updates.css',
})
export class Lesson03ImmutableObjectUpdates {
  protected readonly activeOperation = signal<UpdateOperation>('assoc');
  protected readonly profile = signal(initialProfile);
  protected readonly plainEquivalents: PlainEquivalent[] = [
    {
      description: 'Update one top-level field.',
      name: 'assoc',
      plain: `{
  ...profile,
  name: 'Lin Peng',
}`,
      ramda: `assoc('name', 'Lin Peng', profile)`,
      title: 'assoc',
    },
    {
      description: 'Update one nested field.',
      name: 'assocPath',
      plain: `{
  ...profile,
  preferences: {
    ...profile.preferences,
    notifications: {
      ...profile.preferences.notifications,
      sms: true,
    },
  },
}`,
      ramda: `assocPath(
  ['preferences', 'notifications', 'sms'],
  true,
  profile,
)`,
      title: 'assocPath',
    },
    {
      description: 'Update fields from their old values.',
      name: 'evolve',
      plain: `{
  ...profile,
  stats: {
    ...profile.stats,
    completedLessons: profile.stats.completedLessons + 1,
    streakDays: profile.stats.streakDays + 1,
  },
}`,
      ramda: `evolve({
  stats: {
    completedLessons: (count) => count + 1,
    streakDays: (days) => days + 1,
  },
}, profile)`,
      title: 'evolve',
    },
  ];

  protected readonly updatedProfile = computed(() =>
    runOperation(this.activeOperation(), this.profile()),
  );

  protected readonly originalJson = computed(() => pretty(this.profile()));
  protected readonly updatedJson = computed(() => pretty(this.updatedProfile()));

  protected readonly operationButtons: Array<{ label: string; name: UpdateOperation }> = [
    { label: 'assoc', name: 'assoc' },
    { label: 'assocPath', name: 'assocPath' },
    { label: 'evolve', name: 'evolve' },
  ];

  protected readonly examples = computed<UpdateExample[]>(() => [
    {
      code: `assoc('name', 'Lin Peng', profile)`,
      description: 'Use assoc when the field is directly on the object.',
      name: 'assoc',
      output: pretty({
        before: this.profile().name,
        after: this.updatedProfile().name,
      }),
      title: 'Update a top-level field',
    },
    {
      code: `assocPath(
  ['preferences', 'notifications', 'sms'],
  true,
  profile
)`,
      description: 'Use assocPath when the field is nested inside the object.',
      name: 'assocPath',
      output: pretty({
        before: this.profile().preferences.notifications.sms,
        after: this.updatedProfile().preferences.notifications.sms,
      }),
      title: 'Update a nested field',
    },
    {
      code: `evolve({
  stats: {
    completedLessons: add(1),
    streakDays: add(1)
  }
}, profile)`,
      description: 'Use evolve when fields should be updated by functions.',
      name: 'evolve',
      output: pretty({
        before: this.profile().stats,
        after: this.updatedProfile().stats,
      }),
      title: 'Update values with functions',
    },
  ]);

  protected readonly activeExample = computed(() =>
    this.examples().find((example) => example.name === this.activeOperation()) ?? this.examples()[0],
  );

  protected applyUpdate(): void {
    this.profile.set(this.updatedProfile());
  }

  protected reset(): void {
    this.activeOperation.set('assoc');
    this.profile.set(initialProfile);
  }

  protected setActiveOperation(operation: UpdateOperation): void {
    this.activeOperation.set(operation);
  }
}
