export interface PipeLessonCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface PipeLessonDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface PipeLesson {
  codeSteps: PipeLessonCodeStep[];
  demo?: PipeLessonDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
