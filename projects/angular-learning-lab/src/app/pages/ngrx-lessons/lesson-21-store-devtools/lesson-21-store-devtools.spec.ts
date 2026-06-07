import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DevtoolsLabActions } from '../../../state/devtools-lab/devtools-lab.actions';
import {
  selectAuditTrail,
  selectCount,
  selectDevtoolsLabSummary,
  selectError,
  selectLabel,
  selectLoading,
} from '../../../state/devtools-lab/devtools-lab.selectors';
import { Lesson21StoreDevtools } from './lesson-21-store-devtools';

describe('Lesson21StoreDevtools', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lesson21StoreDevtools],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectAuditTrail, value: [] },
            { selector: selectCount, value: 3 },
            { selector: selectDevtoolsLabSummary, value: '3 counter actions and 0 audit entries' },
            { selector: selectError, value: null },
            { selector: selectLabel, value: 'Testing with MockStore' },
            { selector: selectLoading, value: false },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('renders values from mocked selectors', () => {
    const fixture = TestBed.createComponent(Lesson21StoreDevtools);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('3 counter actions and 0 audit entries');
    expect(compiled.textContent).toContain('Testing with MockStore');
  });

  it('dispatches increment action when the Increment button is clicked', () => {
    spyOn(store, 'dispatch');

    const fixture = TestBed.createComponent(Lesson21StoreDevtools);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const incrementButton = Array.from(
      compiled.querySelectorAll('button'),
    ).find((button) => button.textContent?.includes('Increment') ?? false);

    incrementButton?.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      DevtoolsLabActions.incrementCounter(),
    );
  });
});
