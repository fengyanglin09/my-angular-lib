import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import * as R from 'ramda';
import { delay, map as rxMap, of, startWith, Subject, switchMap, tap } from 'rxjs';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

type TopicFilter = 'all' | 'angular' | 'ngrx' | 'ramda' | 'rxjs';

interface ApiCourse {
  archived: boolean;
  id: string;
  lessons: number;
  rating: number;
  title: string;
  topic: Exclude<TopicFilter, 'all'>;
  updatedAt: string;
}

interface CourseCard {
  badge: string;
  id: string;
  ratingLabel: string;
  title: string;
}

interface CourseRequest {
  label: string;
  query: string;
  topic: TopicFilter;
}

interface CourseState {
  cards: CourseCard[];
  query: string;
  source: string;
  topic: TopicFilter;
  totalFromBackend: number;
}

interface CodeExample {
  description: string;
  name: string;
  plain: string;
  ramda: string;
  title: string;
}

interface PipelineExample {
  code: string;
  description: string;
  name: string;
  title: string;
}

const apiCourses: ApiCourse[] = [
  {
    archived: false,
    id: 'ngrx-effects',
    lessons: 22,
    rating: 4.8,
    title: 'NgRx Effects In Practice',
    topic: 'ngrx',
    updatedAt: '2026-06-22',
  },
  {
    archived: false,
    id: 'rxjs-cancellation',
    lessons: 16,
    rating: 4.7,
    title: 'RxJS Cancellation Patterns',
    topic: 'rxjs',
    updatedAt: '2026-06-19',
  },
  {
    archived: false,
    id: 'ramda-data-shaping',
    lessons: 11,
    rating: 4.6,
    title: 'Ramda Data Shaping',
    topic: 'ramda',
    updatedAt: '2026-06-12',
  },
  {
    archived: true,
    id: 'angular-legacy',
    lessons: 9,
    rating: 3.9,
    title: 'Legacy Angular Patterns',
    topic: 'angular',
    updatedAt: '2025-11-04',
  },
  {
    archived: false,
    id: 'angular-forms',
    lessons: 18,
    rating: 4.5,
    title: 'Angular Forms For Apps',
    topic: 'angular',
    updatedAt: '2026-06-08',
  },
];

const toCourseCard = R.applySpec({
  badge: (course: ApiCourse) => `${course.topic} / ${course.lessons} lessons`,
  id: (course: ApiCourse) => course.id,
  ratingLabel: (course: ApiCourse) => `${course.rating.toFixed(1)} rating`,
  title: (course: ApiCourse) => course.title,
}) as (course: ApiCourse) => CourseCard;

function matchesTopic(topic: TopicFilter): (course: ApiCourse) => boolean {
  if (topic === 'all') {
    return () => true;
  }

  return (course) => course.topic === topic;
}

function matchesQuery(query: string): (course: ApiCourse) => boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return () => true;
  }

  return (course) => course.title.toLowerCase().includes(normalizedQuery);
}

function selectCourseCards(
  topic: TopicFilter,
  query: string,
  courses: ApiCourse[],
): CourseCard[] {
  const visibleCourses = R.reject((course: ApiCourse) => course.archived, courses);
  const topicCourses = R.filter(matchesTopic(topic), visibleCourses);
  const queryCourses = R.filter(matchesQuery(query), topicCourses);
  const sortedCourses = R.reverse(R.sortBy((course: ApiCourse) => course.rating, queryCourses));

  return R.map(toCourseCard, sortedCourses);
}

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

@Component({
  selector: 'app-lesson-10-ramda-with-rxjs',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-10-ramda-with-rxjs.html',
  styleUrl: './lesson-10-ramda-with-rxjs.css',
})
export class Lesson10RamdaWithRxjs {
  private readonly loadRequests$ = new Subject<CourseRequest>();

  protected readonly query = signal('');
  protected readonly topic = signal<TopicFilter>('all');
  protected readonly logs = signal<string[]>([
    'Initial stream request will run when the lesson subscribes through toSignal.',
  ]);

  protected readonly topicButtons: Array<{ label: string; topic: TopicFilter }> = [
    { label: 'All', topic: 'all' },
    { label: 'Angular', topic: 'angular' },
    { label: 'NgRx', topic: 'ngrx' },
    { label: 'Ramda', topic: 'ramda' },
    { label: 'RxJS', topic: 'rxjs' },
  ];

  protected readonly courseState = toSignal(
    this.loadRequests$.pipe(
      startWith({
        label: 'Initial load',
        query: '',
        topic: 'all' as TopicFilter,
      }),
      tap((request) => {
        this.addLog(`${request.label}: RxJS stream emitted a request.`);
      }),
      switchMap((request) =>
        of(apiCourses).pipe(
          delay(350),
          rxMap((courses) => ({
            cards: selectCourseCards(request.topic, request.query, courses),
            query: request.query,
            source: request.label,
            topic: request.topic,
            totalFromBackend: courses.length,
          })),
          tap((state) => {
            this.addLog(`Ramda shaped ${state.cards.length} visible course cards.`);
          }),
        ),
      ),
    ),
    {
      initialValue: {
        cards: [],
        query: '',
        source: 'Waiting for stream',
        topic: 'all' as TopicFilter,
        totalFromBackend: 0,
      } satisfies CourseState,
    },
  );

  protected readonly codeExamples: CodeExample[] = [
    {
      description: 'RxJS map receives the backend response emitted by the stream.',
      name: 'rxjs-map',
      plain: `source$.pipe(
  map((courses) => courses.filter((course) => !course.archived)),
)`,
      ramda: `source$.pipe(
  rxMap((courses) =>
    R.reject((course) => course.archived, courses),
  ),
)`,
      title: 'RxJS map transforms stream emissions',
    },
    {
      description: 'Ramda map transforms the array inside one emitted value.',
      name: 'ramda-map',
      plain: `source$.pipe(
  rxMap((courses) =>
    courses.map((course) => toCourseCard(course)),
  ),
)`,
      ramda: `source$.pipe(
  rxMap((courses) => R.map(toCourseCard, courses)),
)`,
      title: 'Ramda map transforms arrays',
    },
    {
      description: 'A named Ramda selector keeps the RxJS pipeline readable.',
      name: 'named-selector',
      plain: `source$.pipe(
  rxMap((courses) =>
    selectCourseCards(topic, query, courses),
  ),
)`,
      ramda: `const cards = selectCourseCards(topic, query, courses);

// Inside the selector:
reject(...)
filter(...)
sortBy(...)
map(...)`,
      title: 'Keep shaping logic outside the stream',
    },
  ];
  protected readonly pipelineExamples: PipelineExample[] = [
    {
      code: `loadRequests$.pipe(
  switchMap((request) =>
    backendCall().pipe(
      rxMap((courses) => selectCourseCards(
        request.topic,
        request.query,
        courses,
      )),
    ),
  ),
)`,
      description: 'Use RxJS for async flow.',
      name: 'Stream layer',
      title: 'RxJS controls when values arrive',
    },
    {
      code: `function selectCourseCards(topic, query, courses) {
  const visible = reject(isArchived, courses);
  const topicCourses = filter(matchesTopic(topic), visible);
  const queryCourses = filter(matchesQuery(query), topicCourses);
  const sorted = reverse(sortBy(prop('rating'), queryCourses));

  return map(toCourseCard, sorted);
}`,
      description: 'Use Ramda for array shaping.',
      name: 'Data layer',
      title: 'Ramda controls how one value is shaped',
    },
  ];

  protected readonly shapedCardsJson = () => pretty(this.courseState().cards);

  protected reload(): void {
    this.emitLoadRequest('Manual reload');
  }

  protected reset(): void {
    this.query.set('');
    this.topic.set('all');
    this.emitLoadRequest('Reset filters');
  }

  protected setQuery(query: string): void {
    this.query.set(query);
    this.emitLoadRequest('Search changed');
  }

  protected setTopic(topic: TopicFilter): void {
    this.topic.set(topic);
    this.emitLoadRequest(`Topic changed to ${topic}`);
  }

  private addLog(message: string): void {
    this.logs.update((logs) => [message, ...logs].slice(0, 8));
  }

  private emitLoadRequest(label: string): void {
    this.loadRequests$.next({
      label,
      query: this.query(),
      topic: this.topic(),
    });
  }
}
