import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { ReadingQueueApi } from './reading-queue-api';
import { QueueFilter, QueueItem, QueueStatus } from './reading-queue.models';

interface ReadingQueueState {
  filter: QueueFilter;
  items: QueueItem[];
  lastSavedAt: string | null;
  loadError: string | null;
  loading: boolean;
  nextId: number;
  saveError: string | null;
  saving: boolean;
  search: string;
}

const statusOrder: QueueStatus[] = ['queued', 'reading', 'done'];

function getNextId(items: QueueItem[]): number {
  return Math.max(...items.map((item) => item.id), 0) + 1;
}

export const ReadingQueueStore = signalStore(
  withState<ReadingQueueState>({
    filter: 'all',
    items: [],
    lastSavedAt: null,
    loadError: null,
    loading: false,
    nextId: 1,
    saveError: null,
    saving: false,
    search: '',
  }),
  withComputed(({ filter, items, search }) => ({
    filteredItems: computed(() => {
      const normalizedSearch = search().trim().toLowerCase();

      return items().filter((item) => {
        const matchesFilter = filter() === 'all' || item.status === filter();
        const matchesSearch = item.title.toLowerCase().includes(normalizedSearch);

        return matchesFilter && matchesSearch;
      });
    }),
    queuedCount: computed(() => items().filter((item) => item.status === 'queued').length),
    readingCount: computed(() => items().filter((item) => item.status === 'reading').length),
    doneCount: computed(() => items().filter((item) => item.status === 'done').length),
    totalMinutes: computed(() =>
      items().reduce((total, item) => total + item.minutes, 0),
    ),
  })),
  withComputed(({ doneCount, items, totalMinutes }) => ({
    summary: computed(
      () => `${items().length} items, ${doneCount()} done, ${totalMinutes()} minutes`,
    ),
  })),
  withMethods((store) => {
    const queueApi = inject(ReadingQueueApi);

    const saveQueue = (items: QueueItem[]): void => {
      patchState(store, {
        saveError: null,
        saving: true,
      });

      queueApi.saveQueue(items).subscribe({
        next: ({ savedAt }) => {
          patchState(store, {
            lastSavedAt: savedAt,
            saveError: null,
            saving: false,
          });
        },
        error: (error: Error) => {
          patchState(store, {
            saveError: error.message,
            saving: false,
          });
        },
      });
    };

    const loadQueue = (): void => {
      patchState(store, {
        loadError: null,
        loading: true,
      });

      queueApi.loadQueue().subscribe({
        next: ({ items, savedAt }) => {
          patchState(store, {
            items,
            lastSavedAt: savedAt,
            loading: false,
            nextId: getNextId(items),
          });
        },
        error: (error: Error) => {
          patchState(store, {
            loadError: error.message,
            loading: false,
          });
        },
      });
    };

    return {
      loadQueue,
      addItem(title: string, minutes: number): void {
        const cleanTitle = title.trim();

        if (!cleanTitle || minutes < 1) {
          return;
        }

        const nextItems = [
          ...store.items(),
          {
            id: store.nextId(),
            title: cleanTitle,
            minutes,
            status: 'queued' as const,
          },
        ];

        patchState(store, {
          items: nextItems,
          nextId: store.nextId() + 1,
        });
        saveQueue(nextItems);
      },
      reloadFromBackend(): void {
        loadQueue();
      },
      removeItem(id: number): void {
        const nextItems = store.items().filter((item) => item.id !== id);

        patchState(store, { items: nextItems });
        saveQueue(nextItems);
      },
      reset(): void {
        patchState(store, {
          loadError: null,
          loading: true,
          saveError: null,
        });

        queueApi.resetQueue().subscribe({
          next: ({ items, savedAt }) => {
            patchState(store, {
              filter: 'all',
              items,
              lastSavedAt: savedAt,
              loading: false,
              nextId: getNextId(items),
              search: '',
            });
          },
          error: (error: Error) => {
            patchState(store, {
              loadError: error.message,
              loading: false,
            });
          },
        });
      },
      setFilter(filter: QueueFilter): void {
        patchState(store, { filter });
      },
      setSearch(search: string): void {
        patchState(store, { search });
      },
      toggleStatus(id: number): void {
        const nextItems = store.items().map((item) => {
          if (item.id !== id) {
            return item;
          }

          const currentIndex = statusOrder.indexOf(item.status);
          const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

          return {
            ...item,
            status: nextStatus,
          };
        });

        patchState(store, { items: nextItems });
        saveQueue(nextItems);
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadQueue();
    },
  }),
);
