export type WorkspaceType = 'PERSONAL' | 'TEAM';

export enum WorkspacePlan {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum WorkspaceRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  ANALYST = 'ANALYST',
  VIEWER = 'VIEWER',
}

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
  name: string;
  description: string;
  type: WorkspaceType;
  plan: WorkspacePlan;
  isPersonal: boolean;
  role?: WorkspaceRole;
  usage?: WorkspaceUsage;
}
