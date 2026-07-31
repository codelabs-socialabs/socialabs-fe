export type WorkspaceMemberRole = 'OWNER' | 'ADMIN' | 'ANALYST' | 'VIEWER';

export type WorkspaceMemberStatus = 'ACTIVE' | 'PENDING';

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId?: string;
  name: string | null;
  email: string;
  initials: string;
  role: WorkspaceMemberRole;
  status: WorkspaceMemberStatus;
  joinedAt?: string;
  invitedAt?: string;
  invitedBy?: string;
}

export interface InviteWorkspaceMemberInput {
  workspaceId: string;
  email: string;
  role: Exclude<WorkspaceMemberRole, 'OWNER'>;
}

export interface UpdateWorkspaceMemberRoleInput {
  memberId: string;
  role: Exclude<WorkspaceMemberRole, 'OWNER'>;
}
