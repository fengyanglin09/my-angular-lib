import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SearchStore } from './search.store';

@Component({
  selector: 'app-lesson-07-rxmethod-search',
  imports: [FormsModule, RouterLink],
  providers: [SearchStore],
  templateUrl: './lesson-07-rxmethod-search.html',
  styleUrl: './lesson-07-rxmethod-search.css',
})
export class Lesson07RxMethodSearch {
  protected readonly searchStore = inject(SearchStore);
}
