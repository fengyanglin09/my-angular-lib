import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';
import { BooksFacade } from '../../../state/books/books.facade';

@Component({
  selector: 'app-lesson-11-facade-pattern',
  imports: [FormsModule, LearningNav],
  templateUrl: './lesson-11-facade-pattern.html',
  styleUrl: './lesson-11-facade-pattern.css',
})
export class Lesson11FacadePattern implements OnInit {
  protected readonly booksFacade = inject(BooksFacade);

  protected author = 'NgRx Coach';
  protected title = '';

  ngOnInit(): void {
    this.booksFacade.loadPage(1);
  }

  protected addBook(): void {
    const title = this.title.trim();
    const author = this.author.trim();

    if (!title || !author) {
      return;
    }

    this.booksFacade.addBook(title, author);
    this.title = '';
  }
}
