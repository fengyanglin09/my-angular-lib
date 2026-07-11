export interface DirectiveLessonCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface DirectiveLessonDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface DirectiveLesson {
  codeSteps: DirectiveLessonCodeStep[];
  demo?: DirectiveLessonDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
