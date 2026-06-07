import { Component } from '@angular/core';

import { LearningNav } from '../../../core/layout/learning-nav/learning-nav';

interface MockStoreExample {
  code: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-lesson-24-mock-store-testing',
  imports: [LearningNav],
  templateUrl: './lesson-24-mock-store-testing.html',
  styleUrl: './lesson-24-mock-store-testing.css',
})
export class Lesson24MockStoreTesting {
  protected readonly examples: MockStoreExample[] = [
    {
      title: 'Provide MockStore',
      description:
        'Use provideMockStore when the component needs Store, but the test should control selector output.',
      code: `providers: [
  provideMockStore({
    selectors: [
      { selector: selectCount, value: 3 },
      { selector: selectLabel, value: 'Testing with MockStore' },
    ],
  }),
]`,
    },
    {
      title: 'Assert Rendered State',
      description:
        'The component receives mocked selector values as if they came from the real store.',
      code: `const fixture = TestBed.createComponent(Lesson21StoreDevtools);
fixture.detectChanges();

expect(fixture.nativeElement.textContent)
  .toContain('Testing with MockStore');`,
    },
    {
      title: 'Assert Dispatch',
      description:
        'Spy on dispatch when you only need to prove that a user action sends the right NgRx action.',
      code: `spyOn(store, 'dispatch');

incrementButton.click();

expect(store.dispatch).toHaveBeenCalledWith(
  DevtoolsLabActions.incrementCounter(),
);`,
    },
  ];
}

