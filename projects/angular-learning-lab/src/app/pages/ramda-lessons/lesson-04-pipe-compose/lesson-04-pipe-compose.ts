import { Component, computed, signal } from '@angular/core';
import * as R from 'ramda';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type PipelineMode = 'compose' | 'pipe';

interface ApiLesson {
  archived: boolean;
  estimatedMinutes: number;
  id: string;
  tags: string[];
  title: string;
}

interface LessonCard {
  badge: string;
  id: string;
  title: string;
}

interface PipelineStep {
  description: string;
  name: string;
  output: string;
}

interface PlainEquivalent {
  description: string;
  name: string;
  plain: string;
  ramda: string;
  title: string;
}

const apiLessons: ApiLesson[] = [
  {
    archived: false,
    estimatedMinutes: 18,
    id: 'ramda-pipe',
    tags: ['ramda', 'composition'],
    title: '  pipe basics  ',
  },
  {
    archived: false,
    estimatedMinutes: 25,
    id: 'ramda-compose',
    tags: ['ramda', 'composition'],
    title: 'compose direction',
  },
  {
    archived: true,
    estimatedMinutes: 12,
    id: 'old-helper',
    tags: ['archive'],
    title: 'old helper notes',
  },
  {
    archived: false,
    estimatedMinutes: 40,
    id: 'angular-signals',
    tags: ['angular', 'signals'],
    title: 'signals and ramda',
  },
];

function titleCase(value: string): string {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => `${word[0]?.toUpperCase() ?? ''}${word.slice(1)}`)
    .join(' ');
}

function removeArchived(lessons: ApiLesson[]): ApiLesson[] {
  return R.reject((lesson: ApiLesson) => lesson.archived, lessons);
}

function sortByDuration(lessons: ApiLesson[]): ApiLesson[] {
  return R.sortBy((lesson: ApiLesson) => lesson.estimatedMinutes, lessons);
}

function toLessonCard(lesson: ApiLesson): LessonCard {
  return {
    badge: `${lesson.estimatedMinutes} min · ${lesson.tags[0] ?? 'general'}`,
    id: lesson.id,
    title: titleCase(R.trim(lesson.title)),
  };
}

function toLessonCards(lessons: ApiLesson[]): LessonCard[] {
  return R.map(toLessonCard, lessons);
}

const buildCardsWithPipe = R.pipe(
  removeArchived,
  sortByDuration,
  toLessonCards,
);

const buildCardsWithCompose = R.compose(
  toLessonCards,
  sortByDuration,
  removeArchived,
);

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-04-pipe-compose',
  imports: [LearningNav],
  templateUrl: './lesson-04-pipe-compose.html',
  styleUrl: './lesson-04-pipe-compose.css',
})
export class Lesson04PipeCompose {
  protected readonly mode = signal<PipelineMode>('pipe');
  protected readonly plainEquivalents: PlainEquivalent[] = [
    {
      description: 'Left-to-right transformation.',
      name: 'pipe',
      plain: `const visibleLessons = removeArchived(apiLessons);
const sortedLessons = sortByDuration(visibleLessons);
const cards = toLessonCards(sortedLessons);`,
      ramda: `const buildCards = pipe(
  removeArchived,
  sortByDuration,
  toLessonCards,
);

const cards = buildCards(apiLessons);`,
      title: 'pipe',
    },
    {
      description: 'Same result, opposite reading direction.',
      name: 'compose',
      plain: `const visibleLessons = removeArchived(apiLessons);
const sortedLessons = sortByDuration(visibleLessons);
const cards = toLessonCards(sortedLessons);`,
      ramda: `const buildCards = compose(
  toLessonCards,
  sortByDuration,
  removeArchived,
);

const cards = buildCards(apiLessons);`,
      title: 'compose',
    },
  ];

  protected readonly sourceJson = pretty(apiLessons);
  protected readonly visibleLessons = computed(() => removeArchived(apiLessons));
  protected readonly sortedLessons = computed(() => sortByDuration(this.visibleLessons()));
  protected readonly lessonCards = computed(() =>
    this.mode() === 'pipe'
      ? buildCardsWithPipe(apiLessons)
      : buildCardsWithCompose(apiLessons),
  );

  protected readonly modeCode = computed(() =>
    this.mode() === 'pipe'
      ? `const buildCards = pipe(
  removeArchived,
  sortByDuration,
  toLessonCards
);`
      : `const buildCards = compose(
  toLessonCards,
  sortByDuration,
  removeArchived
);`,
  );

  protected readonly steps = computed<PipelineStep[]>(() => [
    {
      description: 'The backend-style array has extra whitespace and an archived lesson.',
      name: 'source data',
      output: pretty(apiLessons),
    },
    {
      description: 'First remove archived lessons.',
      name: 'removeArchived',
      output: pretty(this.visibleLessons()),
    },
    {
      description: 'Then sort the remaining lessons by estimated minutes.',
      name: 'sortByDuration',
      output: pretty(this.sortedLessons()),
    },
    {
      description: 'Finally map API lessons into UI card objects.',
      name: 'toLessonCards',
      output: pretty(this.lessonCards()),
    },
  ]);

  protected setMode(mode: PipelineMode): void {
    this.mode.set(mode);
  }
}
