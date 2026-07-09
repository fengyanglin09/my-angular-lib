import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type AccessRole = 'admin' | 'editor' | 'viewer';
type PredicateName = 'allPass' | 'anyPass' | 'complement' | 'propEq' | 'where';

interface AccessUser {
  active: boolean;
  department: 'engineering' | 'finance' | 'support';
  failedLogins: number;
  mfaEnabled: boolean;
  name: string;
  role: AccessRole;
}

interface PredicateExample {
  code: string;
  description: string;
  name: PredicateName;
  outputLabel: string;
  title: string;
}

const accessUsers: AccessUser[] = [
  {
    active: true,
    department: 'engineering',
    failedLogins: 0,
    mfaEnabled: true,
    name: 'Ava',
    role: 'admin',
  },
  {
    active: true,
    department: 'support',
    failedLogins: 1,
    mfaEnabled: false,
    name: 'Ben',
    role: 'editor',
  },
  {
    active: false,
    department: 'finance',
    failedLogins: 3,
    mfaEnabled: true,
    name: 'Cleo',
    role: 'viewer',
  },
  {
    active: true,
    department: 'engineering',
    failedLogins: 4,
    mfaEnabled: true,
    name: 'Dev',
    role: 'editor',
  },
];

const isAdmin = R.propEq('admin', 'role') as (user: AccessUser) => boolean;

const isReadyForAdminTools = R.where({
  active: R.equals(true),
  failedLogins: R.lte(R.__, 2),
  mfaEnabled: R.equals(true),
}) as (user: AccessUser) => boolean;

const canOpenAdminPanel = R.allPass([
  isAdmin,
  isReadyForAdminTools,
]) as (user: AccessUser) => boolean;

const canEditContent = R.anyPass([
  isAdmin,
  R.propEq('editor', 'role') as (user: AccessUser) => boolean,
]) as (user: AccessUser) => boolean;

const isInactive = R.complement(
  R.propEq(true, 'active') as (user: AccessUser) => boolean,
);

const predicates: Record<PredicateName, (user: AccessUser) => boolean> = {
  allPass: canOpenAdminPanel,
  anyPass: canEditContent,
  complement: isInactive,
  propEq: isAdmin,
  where: isReadyForAdminTools,
};

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-05-predicates',
  imports: [LearningNav],
  templateUrl: './lesson-05-predicates.html',
  styleUrl: './lesson-05-predicates.css',
})
export class Lesson05Predicates {
  protected readonly activePredicate = signal<PredicateName>('propEq');

  protected readonly users = accessUsers;
  protected readonly dataShape = `interface AccessUser {
  active: boolean;
  department: 'engineering' | 'finance' | 'support';
  failedLogins: number;
  mfaEnabled: boolean;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
}`;

  protected readonly predicateButtons: Array<{ label: string; name: PredicateName }> = [
    { label: 'propEq', name: 'propEq' },
    { label: 'where', name: 'where' },
    { label: 'allPass', name: 'allPass' },
    { label: 'anyPass', name: 'anyPass' },
    { label: 'complement', name: 'complement' },
  ];

  protected readonly examples: PredicateExample[] = [
    {
      code: `const isAdmin =
  propEq('admin', 'role');`,
      description: 'Check whether one property equals one expected value.',
      name: 'propEq',
      outputLabel: 'Users whose role is admin',
      title: 'One property must match',
    },
    {
      code: `const isReadyForAdminTools = where({
  active: equals(true),
  failedLogins: lte(__, 2),
  mfaEnabled: equals(true)
});`,
      description: 'Check several properties with different predicate functions.',
      name: 'where',
      outputLabel: 'Users active, secure, and not locked out',
      title: 'Object shape must match rules',
    },
    {
      code: `const canOpenAdminPanel = allPass([
  isAdmin,
  isReadyForAdminTools
]);`,
      description: 'Require every predicate to return true.',
      name: 'allPass',
      outputLabel: 'Users who pass every admin-panel rule',
      title: 'All rules must pass',
    },
    {
      code: `const canEditContent = anyPass([
  isAdmin,
  propEq('editor', 'role')
]);`,
      description: 'Accept the item if at least one predicate returns true.',
      name: 'anyPass',
      outputLabel: 'Users who are admin or editor',
      title: 'At least one rule must pass',
    },
    {
      code: `const isInactive = complement(
  propEq(true, 'active')
);`,
      description: 'Invert another predicate. True becomes false, and false becomes true.',
      name: 'complement',
      outputLabel: 'Users who are not active',
      title: 'Invert a rule',
    },
  ];

  protected readonly activeExample = computed(() =>
    this.examples.find((example) => example.name === this.activePredicate()) ?? this.examples[0],
  );

  protected readonly matchingUsers = computed(() =>
    this.users.filter(predicates[this.activePredicate()]),
  );

  protected readonly matchingUsersJson = computed(() =>
    pretty(this.matchingUsers().map((user) => user.name)),
  );

  protected readonly predicateResults = computed(() =>
    this.users.map((user) => ({
      matches: predicates[this.activePredicate()](user),
      user,
    })),
  );

  protected setActivePredicate(predicateName: PredicateName): void {
    this.activePredicate.set(predicateName);
  }
}
