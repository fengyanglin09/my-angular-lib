export interface PerformanceLessonCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface PerformanceLessonDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface PerformanceLesson {
  codeSteps: PerformanceLessonCodeStep[];
  demo?: PerformanceLessonDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
