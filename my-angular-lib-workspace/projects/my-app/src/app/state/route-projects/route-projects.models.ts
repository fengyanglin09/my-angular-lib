export interface RouteProject {
  id: string;
  name: string;
  owner: string;
  status: string;
  summary: string;
  tasks: string[];
}

export interface RouteProjectLoadLog {
  id: number;
  message: string;
}
