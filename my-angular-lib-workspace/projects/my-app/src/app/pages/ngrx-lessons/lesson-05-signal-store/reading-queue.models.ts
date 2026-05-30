export type QueueStatus = 'queued' | 'reading' | 'done';
export type QueueFilter = 'all' | QueueStatus;

export interface QueueItem {
  id: number;
  title: string;
  minutes: number;
  status: QueueStatus;
}

export interface QueueSnapshot {
  items: QueueItem[];
  savedAt: string | null;
}
