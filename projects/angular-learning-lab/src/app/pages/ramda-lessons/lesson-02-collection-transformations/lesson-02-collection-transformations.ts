import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type CourseLevel = 'advanced' | 'beginner' | 'intermediate';
type CourseTopic = 'angular' | 'ngrx' | 'ramda' | 'rxjs';
type OperatorName = 'filter' | 'find' | 'groupBy' | 'map' | 'reject' | 'sortBy';

interface Course {
  enrolled: number;
  id: string;
  level: CourseLevel;
  rating: number;
  title: string;
  topic: CourseTopic;
}

interface TransformationExample {
  buttonLabel: string;
  code: string;
  description: string;
  name: OperatorName;
  output: string;
  outputLabel: string;
}

interface PlainEquivalent {
  description: string;
  name: string;
  plain: string;
  ramda: string;
  title: string;
}

type GroupedCourseTitles = Partial<Record<CourseTopic, string[]>>;

const initialCourses: Course[] = [
  {
    enrolled: 420,
    id: 'course-angular-forms',
    level: 'intermediate',
    rating: 4.4,
    title: 'Angular Forms',
    topic: 'angular',
  },
  {
    enrolled: 380,
    id: 'course-rxjs-streams',
    level: 'beginner',
    rating: 4.2,
    title: 'RxJS Streams',
    topic: 'rxjs',
  },
  {
    enrolled: 510,
    id: 'course-ngrx-store',
    level: 'advanced',
    rating: 4.8,
    title: 'NgRx Store',
    topic: 'ngrx',
  },
  {
    enrolled: 210,
    id: 'course-ramda-data',
    level: 'beginner',
    rating: 4.1,
    title: 'Ramda Data Tools',
    topic: 'ramda',
  },
  {
    enrolled: 335,
    id: 'course-ngrx-effects',
    level: 'advanced',
    rating: 4.6,
    title: 'NgRx Effects',
    topic: 'ngrx',
  },
];

function toCourseLabel(course: Course): string {
  return `${course.title} (${course.topic})`;
}

function groupCourseTitlesByTopic(courses: Course[]): GroupedCourseTitles {
  const grouped = R.groupBy((course: Course) => course.topic, courses);

  return Object.fromEntries(
    Object.entries(grouped).map(([topic, topicCourses]) => [
      topic,
      topicCourses?.map((course) => course.title) ?? [],
    ]),
  ) as GroupedCourseTitles;
}

@Component({
  selector: 'app-lesson-02-collection-transformations',
  imports: [LearningNav],
  templateUrl: './lesson-02-collection-transformations.html',
  styleUrl: './lesson-02-collection-transformations.css',
})
export class Lesson02CollectionTransformations {
  protected readonly activeOperator = signal<OperatorName>('map');
  protected readonly courses = signal(initialCourses);
  protected readonly sortDescending = signal(false);
  protected readonly sourceDataShape = `interface Course {
  enrolled: number;
  id: string;
  level: 'advanced' | 'beginner' | 'intermediate';
  rating: number;
  title: string;
  topic: 'angular' | 'ngrx' | 'ramda' | 'rxjs';
}`;
  protected readonly sourceDataSample = JSON.stringify(initialCourses[0], null, 2);
  protected readonly plainEquivalents: PlainEquivalent[] = [
    {
      description: 'Change every item.',
      name: 'map',
      plain: `courses.map((course) => toCourseLabel(course))`,
      ramda: `R.map(toCourseLabel, courses)`,
      title: 'map',
    },
    {
      description: 'Keep or remove matching items.',
      name: 'filter-reject',
      plain: `courses.filter((course) => course.level === 'advanced')
courses.filter((course) => course.level !== 'beginner')`,
      ramda: `R.filter(isAdvanced, courses)
R.reject(isBeginner, courses)`,
      title: 'filter / reject',
    },
    {
      description: 'Sort without mutating the source array.',
      name: 'sortBy',
      plain: `[...courses].sort((a, b) => a.rating - b.rating)`,
      ramda: `R.sortBy((course) => course.rating, courses)`,
      title: 'sortBy',
    },
    {
      description: 'Turn one array into named buckets.',
      name: 'groupBy',
      plain: `courses.reduce((groups, course) => {
  const topicCourses = groups[course.topic] ?? [];

  return {
    ...groups,
    [course.topic]: [...topicCourses, course],
  };
}, {})`,
      ramda: `R.groupBy((course) => course.topic, courses)`,
      title: 'groupBy',
    },
  ];

  protected readonly courseLabels = computed(() =>
    R.map(toCourseLabel, this.courses()),
  );

  protected readonly advancedCourses = computed(() =>
    R.filter((course: Course) => course.level === 'advanced', this.courses()),
  );

  protected readonly nonBeginnerCourses = computed(() =>
    R.reject((course: Course) => course.level === 'beginner', this.courses()),
  );

  protected readonly topRatedCourse = computed(() =>
    R.find((course: Course) => course.rating >= 4.7, this.courses()),
  );

  protected readonly sortedCourses = computed(() => {
    const sortedAscending = R.sortBy((course: Course) => course.rating, this.courses());

    return this.sortDescending() ? R.reverse(sortedAscending) : sortedAscending;
  });

  protected readonly groupedCourseTitles = computed(() =>
    groupCourseTitlesByTopic(this.courses()),
  );

  protected readonly groupByOutput = computed(() =>
    JSON.stringify(this.groupedCourseTitles(), null, 2),
  );

  protected readonly operatorButtons: Array<{ label: string; name: OperatorName }> = [
    { label: 'map', name: 'map' },
    { label: 'filter', name: 'filter' },
    { label: 'reject', name: 'reject' },
    { label: 'find', name: 'find' },
    { label: 'sortBy', name: 'sortBy' },
    { label: 'groupBy', name: 'groupBy' },
  ];

  protected readonly examples = computed<TransformationExample[]>(() => [
    {
      buttonLabel: 'map',
      code: `map(
  (course) => \`\${course.title} (\${course.topic})\`,
  courses
)`,
      description: 'Return one display label for every course.',
      name: 'map',
      output: this.courseLabels().join('\n'),
      outputLabel: 'Every course changed into a display label',
    },
    {
      buttonLabel: 'filter',
      code: `filter(
  (course) => course.level === 'advanced',
  courses
)`,
      description: 'Keep only courses where the predicate returns true.',
      name: 'filter',
      output: this.advancedCourses().map((course) => course.title).join('\n'),
      outputLabel: 'Only advanced courses kept',
    },
    {
      buttonLabel: 'reject',
      code: `reject(
  (course) => course.level === 'beginner',
  courses
)`,
      description: 'Remove courses where the predicate returns true.',
      name: 'reject',
      output: this.nonBeginnerCourses().map((course) => course.title).join('\n'),
      outputLabel: 'Beginner courses removed',
    },
    {
      buttonLabel: 'find',
      code: `find((course) => course.rating >= 4.7, courses)`,
      description: 'Return the first matching course, or undefined.',
      name: 'find',
      output: this.topRatedCourse()?.title ?? 'No matching course',
      outputLabel: 'First course with rating 4.7 or higher',
    },
    {
      buttonLabel: 'sortBy',
      code: this.sortDescending()
        ? `reverse(sortBy((course) => course.rating, courses))`
        : `sortBy((course) => course.rating, courses)`,
      description: 'Sort by a derived value. Use reverse after sortBy for descending order.',
      name: 'sortBy',
      output: this.sortedCourses()
        .map((course) => `${course.title}: ${course.rating}`)
        .join('\n'),
      outputLabel: this.sortDescending()
        ? 'Courses sorted by rating, high to low'
        : 'Courses sorted by rating, low to high',
    },
    {
      buttonLabel: 'groupBy',
      code: `groupBy((course) => course.topic, courses)`,
      description: 'Build an object whose keys are topic names and values are course arrays.',
      name: 'groupBy',
      output: this.groupByOutput(),
      outputLabel: 'Object keys are topics. Each value is an array, not a count.',
    },
  ]);

  protected readonly activeExample = computed(() =>
    this.examples().find((example) => example.name === this.activeOperator()) ?? this.examples()[0],
  );

  protected setActiveOperator(operatorName: OperatorName): void {
    this.activeOperator.set(operatorName);
  }

  protected reset(): void {
    this.activeOperator.set('map');
    this.courses.set(initialCourses);
    this.sortDescending.set(false);
  }

  protected toggleSortOrder(): void {
    this.sortDescending.update((sortDescending) => !sortDescending);
  }
}
