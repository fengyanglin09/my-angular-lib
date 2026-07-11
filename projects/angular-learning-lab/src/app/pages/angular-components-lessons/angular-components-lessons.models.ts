export interface ComponentLessonCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface ComponentLessonDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface ComponentLesson {
  codeSteps: ComponentLessonCodeStep[];
  demo?: ComponentLessonDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
