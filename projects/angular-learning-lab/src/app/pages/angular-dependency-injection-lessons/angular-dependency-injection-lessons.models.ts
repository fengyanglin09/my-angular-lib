export interface DependencyInjectionCodeStep {
  description: string;
  name: string;
  syntax: string;
}

export interface DependencyInjectionDemo {
  actionLabel: string;
  after: string;
  before: string;
  title: string;
}

export interface DependencyInjectionLesson {
  codeSteps: DependencyInjectionCodeStep[];
  demo?: DependencyInjectionDemo;
  intro: string;
  keyPoints: string[];
  mentalModel: string;
  number: number;
  route: string;
  title: string;
}
