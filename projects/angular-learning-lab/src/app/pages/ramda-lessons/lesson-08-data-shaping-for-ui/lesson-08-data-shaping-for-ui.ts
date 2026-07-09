import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type DataShapeOperation = 'applySpec' | 'omit' | 'pick' | 'pluck' | 'project';
type CourseLevel = 'advanced' | 'beginner' | 'intermediate';
type CourseTopic = 'angular' | 'ngrx' | 'ramda' | 'rxjs';

interface ApiCourse {
  author: string;
  enrollments: number;
  id: string;
  internalNotes: string;
  isArchived: boolean;
  lastUpdatedIso: string;
  level: CourseLevel;
  pricing: {
    amount: number;
    currency: 'USD';
  };
  stats: {
    lessons: number;
    minutes: number;
  };
  title: string;
  topic: CourseTopic;
}

interface CourseCard {
  author: string;
  badge: string;
  estimatedHours: number;
  id: string;
  lessonCount: number;
  priceLabel: string;
  status: 'Archived' | 'Published';
  title: string;
}

type CourseSummary = Pick<ApiCourse, 'id' | 'level' | 'title' | 'topic'>;
type PublicCourse = Omit<ApiCourse, 'internalNotes'>;

interface ShapeExample {
  code: string;
  description: string;
  name: DataShapeOperation;
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

interface MapRelationship {
  description: string;
  name: string;
  specialized: string;
  withMap: string;
}

const apiCourses: ApiCourse[] = [
  {
    author: 'Ava Chen',
    enrollments: 510,
    id: 'course-ngrx-store',
    internalNotes: 'Promote after next NgRx lesson release.',
    isArchived: false,
    lastUpdatedIso: '2026-06-12T14:30:00.000Z',
    level: 'advanced',
    pricing: {
      amount: 89,
      currency: 'USD',
    },
    stats: {
      lessons: 18,
      minutes: 420,
    },
    title: 'NgRx Store Architecture',
    topic: 'ngrx',
  },
  {
    author: 'Maya Singh',
    enrollments: 420,
    id: 'course-rxjs-streams',
    internalNotes: 'Needs new examples for cancellation.',
    isArchived: false,
    lastUpdatedIso: '2026-05-29T09:15:00.000Z',
    level: 'intermediate',
    pricing: {
      amount: 74,
      currency: 'USD',
    },
    stats: {
      lessons: 14,
      minutes: 330,
    },
    title: 'RxJS Streams In Apps',
    topic: 'rxjs',
  },
  {
    author: 'Lin Peng',
    enrollments: 190,
    id: 'course-old-angular',
    internalNotes: 'Keep hidden from public catalog.',
    isArchived: true,
    lastUpdatedIso: '2025-11-04T18:45:00.000Z',
    level: 'beginner',
    pricing: {
      amount: 49,
      currency: 'USD',
    },
    stats: {
      lessons: 9,
      minutes: 210,
    },
    title: 'Legacy Angular Basics',
    topic: 'angular',
  },
];

const summaryFields: Array<keyof CourseSummary> = ['id', 'title', 'topic', 'level'];

function toCourseSummary(course: ApiCourse): CourseSummary {
  return R.pick(summaryFields, course) as CourseSummary;
}

function removeInternalNotes(course: ApiCourse): PublicCourse {
  return R.omit(['internalNotes'], course) as PublicCourse;
}

function projectCourseSummaries(courses: ApiCourse[]): CourseSummary[] {
  return R.project(summaryFields, courses) as CourseSummary[];
}

function pluckCourseTitles(courses: ApiCourse[]): string[] {
  return R.pluck('title', courses) as string[];
}

const toCourseCard = R.applySpec({
  author: (course: ApiCourse) => course.author,
  badge: (course: ApiCourse) => `${course.topic} / ${course.level}`,
  estimatedHours: (course: ApiCourse) => Math.round(course.stats.minutes / 60),
  id: (course: ApiCourse) => course.id,
  lessonCount: (course: ApiCourse) => course.stats.lessons,
  priceLabel: (course: ApiCourse) => `$${course.pricing.amount}`,
  status: (course: ApiCourse) => course.isArchived ? 'Archived' : 'Published',
  title: (course: ApiCourse) => course.title,
}) as (course: ApiCourse) => CourseCard;

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-08-data-shaping-for-ui',
  imports: [LearningNav],
  templateUrl: './lesson-08-data-shaping-for-ui.html',
  styleUrl: './lesson-08-data-shaping-for-ui.css',
})
export class Lesson08DataShapingForUi {
  protected readonly activeOperation = signal<DataShapeOperation>('applySpec');
  protected readonly courses = signal(apiCourses);

  protected readonly operationButtons: Array<{ label: string; name: DataShapeOperation }> = [
    { label: 'applySpec', name: 'applySpec' },
    { label: 'pick', name: 'pick' },
    { label: 'omit', name: 'omit' },
    { label: 'project', name: 'project' },
    { label: 'pluck', name: 'pluck' },
  ];

  protected readonly sourceJson = computed(() => pretty(this.courses()));
  protected readonly courseCards = computed(() => this.courses().map(toCourseCard));
  protected readonly publicCourse = computed(() => removeInternalNotes(this.courses()[0]));
  protected readonly summaries = computed(() => projectCourseSummaries(this.courses()));
  protected readonly titles = computed(() => pluckCourseTitles(this.courses()));

  protected readonly examples = computed<ShapeExample[]>(() => [
    {
      code: `const toCourseCard = applySpec({
  id: (course) => course.id,
  title: (course) => course.title,
  lessonCount: (course) => course.stats.lessons,
  status: (course) => course.isArchived
    ? 'Archived'
    : 'Published'
});

courses.map(toCourseCard);`,
      description: 'Build a UI view model from several source fields.',
      name: 'applySpec',
      output: pretty(this.courseCards()),
      title: 'Create a display object',
    },
    {
      code: `pick(
  ['id', 'title', 'topic', 'level'],
  course
)`,
      description: 'Keep only selected fields from one object.',
      name: 'pick',
      output: pretty(toCourseSummary(this.courses()[0])),
      title: 'Keep a small object shape',
    },
    {
      code: `omit(
  ['internalNotes'],
  course
)`,
      description: 'Remove fields the UI should not receive or display.',
      name: 'omit',
      output: pretty(this.publicCourse()),
      title: 'Remove a private field',
    },
    {
      code: `project(
  ['id', 'title', 'topic', 'level'],
  courses
)`,
      description: 'Run pick against every object in an array.',
      name: 'project',
      output: pretty(this.summaries()),
      title: 'Keep the same fields for every item',
    },
    {
      code: `pluck('title', courses)`,
      description: 'Read the same property from every object.',
      name: 'pluck',
      output: pretty(this.titles()),
      title: 'Collect one field from every item',
    },
  ]);

  protected readonly activeExample = computed(() =>
    this.examples().find((example) => example.name === this.activeOperation()) ?? this.examples()[0],
  );
  protected readonly mapRelationships: MapRelationship[] = [
    {
      description: 'project is the Ramda shortcut for running the same pick against every item.',
      name: 'map + pick',
      specialized: `project(
  ['id', 'title'],
  courses,
)`,
      withMap: `courses.map((course) =>
  pick(['id', 'title'], course),
)`,
    },
    {
      description: 'pluck is the Ramda shortcut for reading one property from every item.',
      name: 'map + prop',
      specialized: `pluck('title', courses)`,
      withMap: `courses.map((course) => course.title)`,
    },
    {
      description: 'omit does not need a special array helper. Configure omit once, then map with it.',
      name: 'map + omit',
      specialized: `const removePrivateFields = omit(['internalNotes']);

courses.map(removePrivateFields)`,
      withMap: `courses.map((course) => {
  const { internalNotes, ...publicCourse } = course;

  return publicCourse;
})`,
    },
  ];

  protected readonly plainEquivalents: PlainEquivalent[] = [
    {
      description: 'Keep selected fields.',
      name: 'pick',
      plain: `const summary = {
  id: course.id,
  title: course.title,
  topic: course.topic,
  level: course.level,
};`,
      ramda: `const summary = pick(
  ['id', 'title', 'topic', 'level'],
  course,
);`,
      title: 'pick',
    },
    {
      description: 'Remove fields from an object.',
      name: 'omit',
      plain: `const { internalNotes, ...publicCourse } = course;`,
      ramda: `const publicCourse = omit(
  ['internalNotes'],
  course,
);`,
      title: 'omit',
    },
    {
      description: 'Create a UI-specific object.',
      name: 'applySpec',
      plain: `const card = {
  id: course.id,
  title: course.title,
  lessonCount: course.stats.lessons,
  status: course.isArchived ? 'Archived' : 'Published',
};`,
      ramda: `const toCourseCard = applySpec({
  id: (course) => course.id,
  title: (course) => course.title,
  lessonCount: (course) => course.stats.lessons,
  status: (course) => course.isArchived
    ? 'Archived'
    : 'Published',
});`,
      title: 'applySpec',
    },
    {
      description: 'Run one field selection for every item.',
      name: 'project-pluck',
      plain: `const summaries = courses.map((course) => ({
  id: course.id,
  title: course.title,
  topic: course.topic,
  level: course.level,
}));

const titles = courses.map((course) => course.title);`,
      ramda: `const summaries = project(
  ['id', 'title', 'topic', 'level'],
  courses,
);

const titles = pluck('title', courses);`,
      title: 'project / pluck',
    },
  ];

  protected setActiveOperation(operation: DataShapeOperation): void {
    this.activeOperation.set(operation);
  }
}
