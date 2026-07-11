export interface AuthLessonCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface AuthLessonDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface AuthLesson {
  codeSteps: AuthLessonCodeStep[];
  demo?: AuthLessonDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
