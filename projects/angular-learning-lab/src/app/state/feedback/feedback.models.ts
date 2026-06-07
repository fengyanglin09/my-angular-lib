export interface FeedbackItem {
  id: number;
  author: string;
  text: string;
  liked: boolean;
  pending?: boolean;
}
