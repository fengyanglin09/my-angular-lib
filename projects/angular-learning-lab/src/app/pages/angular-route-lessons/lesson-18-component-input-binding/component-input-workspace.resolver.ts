import { ResolveFn } from '@angular/router';

export interface InputBindingWorkspace {
  id: string;
  name: string;
  owner: string;
  summary: string;
}

const workspaces: Record<string, InputBindingWorkspace> = {
  'workspace-101': {
    id: 'workspace-101',
    name: 'Customer Portal',
    owner: 'Maya',
    summary: 'Workspace data came from a resolver and was bound directly to a component input.',
  },
  'workspace-202': {
    id: 'workspace-202',
    name: 'Billing Tools',
    owner: 'Noah',
    summary: 'The URL changed, the resolver ran again, and Angular updated the input.',
  },
  'workspace-303': {
    id: 'workspace-303',
    name: 'Design System',
    owner: 'Ari',
    summary: 'Resolved data can feed a page without manually subscribing to ActivatedRoute.data.',
  },
};

export const componentInputWorkspaceResolver: ResolveFn<InputBindingWorkspace> = (route) => {
  const workspaceId = route.paramMap.get('workspaceId') ?? 'workspace-101';

  return (
    workspaces[workspaceId] ?? {
      id: workspaceId,
      name: `Unknown workspace: ${workspaceId}`,
      owner: 'Unassigned',
      summary: 'The resolver received the route param, but no matching workspace was found.',
    }
  );
};
