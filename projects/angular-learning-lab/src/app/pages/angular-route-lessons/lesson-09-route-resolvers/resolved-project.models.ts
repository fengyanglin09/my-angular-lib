export interface ResolvedProject {
  id: string;
  name: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Planning' | 'Review' | 'Missing';
  summary: string;
}
