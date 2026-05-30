import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { SearchStore } from './search.store';

@Component({
  selector: 'app-lesson-07-rxmethod-search',
  imports: [FormsModule, LearningNav],
  providers: [SearchStore],
  templateUrl: './lesson-07-rxmethod-search.html',
  styleUrl: './lesson-07-rxmethod-search.css',
})
export class Lesson07RxMethodSearch {
  protected readonly searchStore = inject(SearchStore);
}
