export type ProjectStatus = 'planning' | 'active' | 'paused';

export interface ProjectTask {
  id: number;
  title: string;
  done: boolean;
}

export interface ProjectDetail {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  notes: string;
  tasks: ProjectTask[];
}
