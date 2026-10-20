export type WorkspaceType = 'PERSONAL' | 'TEAM';

export const WorkspacePlan = {
  FREE: 'FREE',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE',
} as const;
export type WorkspacePlan = (typeof WorkspacePlan)[keyof typeof WorkspacePlan];

export const WorkspaceRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  ANALYST: 'ANALYST',
  VIEWER: 'VIEWER',
} as const;
export type WorkspaceRole = (typeof WorkspaceRole)[keyof typeof WorkspaceRole];

export interface WorkspaceUsage {
  used: number;
  limit: number;
}

export interface CreateWorkspaceInput {
  name: string;
  description: string;
  plan: WorkspacePlan;
}

export interface CreateWorkspaceResponse {
  message: string;
  status: boolean;
  data: Workspace;
}

export interface Workspace {
  id: string;
  _id?: string;
  name: string;
  description: string;
  type: WorkspaceType;
  plan: WorkspacePlan;
  isPersonal: boolean;
  role?: WorkspaceRole;
  membersCount?: number;
  usage?: WorkspaceUsage;
}
