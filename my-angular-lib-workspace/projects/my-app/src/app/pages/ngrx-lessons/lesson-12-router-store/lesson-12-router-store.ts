import { Component, computed, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import {
  selectLessonMode,
  selectLessonTopic,
  selectQueryParams,
  selectRouteParams,
  selectUrl,
} from '../../../state/router/router.selectors';

interface TopicCard {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-lesson-12-router-store',
  imports: [JsonPipe, LearningNav, RouterLink],
  templateUrl: './lesson-12-router-store.html',
  styleUrl: './lesson-12-router-store.css',
})
export class Lesson12RouterStore {
  private readonly store = inject(Store);

  protected readonly mode = this.store.selectSignal(selectLessonMode);
  protected readonly queryParams = this.store.selectSignal(selectQueryParams);
  protected readonly routeParams = this.store.selectSignal(selectRouteParams);
  protected readonly topic = this.store.selectSignal(selectLessonTopic);
  protected readonly url = this.store.selectSignal(selectUrl);

  protected readonly topics: TopicCard[] = [
    {
      id: 'route-params',
      title: 'Route Params',
      description: 'Values from path segments like /lesson-12-router-store/route-params.',
    },
    {
      id: 'query-params',
      title: 'Query Params',
      description: 'Values after the question mark, like ?mode=inspect.',
    },
    {
      id: 'router-actions',
      title: 'Router Actions',
      description: 'Navigation also dispatches actions that appear in Redux DevTools.',
    },
  ];

  protected readonly selectedTopic = computed(() => {
    const topicId = this.topic();

    return (
      this.topics.find((topic) => topic.id === topicId) ??
      this.topics[0]
    );
  });

  protected readonly modeLabel = computed(() => this.mode() ?? 'learn');
}
