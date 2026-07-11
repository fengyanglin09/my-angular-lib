export interface LayoutLessonCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface LayoutLessonDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface LayoutLesson {
  codeSteps: LayoutLessonCodeStep[];
  demo?: LayoutLessonDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
