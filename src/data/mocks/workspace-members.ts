import type { WorkspaceMember } from '@/types/workspace-member';

export const dummyWorkspaceMembers: WorkspaceMember[] = [
  {
    id: 'member_001',
    workspaceId: 'ws_socialabs_001',
    userId: 'usr_001',
    name: 'User Analyst',
    email: 'user@socialabs.id',
    initials: 'UA',
    role: 'OWNER',
    status: 'ACTIVE',
    joinedAt: '2025-02-01T08:00:00',
  },
  {
    id: 'member_002',
    workspaceId: 'ws_socialabs_001',
    userId: 'usr_002',
    name: 'Deriel Raditya',
    email: 'deriel@socialabs.id',
    initials: 'DR',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedAt: '2025-02-07T10:30:00',
  },
  {
    id: 'member_003',
    workspaceId: 'ws_socialabs_001',
    userId: 'usr_003',
    name: 'Abi Rachman',
    email: 'abi@socialabs.id',
    initials: 'AR',
    role: 'ANALYST',
    status: 'ACTIVE',
    joinedAt: '2025-02-12T13:20:00',
  },
  {
    id: 'member_004',
    workspaceId: 'ws_socialabs_001',
    name: null,
    email: 'researcher@example.com',
    initials: 'RE',
    role: 'VIEWER',
    status: 'PENDING',
    invitedAt: '2025-02-20T09:15:00',
    invitedBy: 'User Analyst',
  },
  {
    id: 'member_005',
    workspaceId: 'ws_unikom_001',
    userId: 'usr_001',
    name: 'User Analyst',
    email: 'user@socialabs.id',
    initials: 'UA',
    role: 'ANALYST',
    status: 'ACTIVE',
    joinedAt: '2025-01-20T08:00:00',
  },
  {
    id: 'member_006',
    workspaceId: 'ws_personal_001',
    userId: 'usr_001',
    name: 'User Analyst',
    email: 'user@socialabs.id',
    initials: 'UA',
    role: 'OWNER',
    status: 'ACTIVE',
    joinedAt: '2025-01-01T08:00:00',
  },
];

export const getMembersByWorkspaceId = (
  workspaceId: string,
): WorkspaceMember[] => {
  return dummyWorkspaceMembers.filter(
    (member) => member.workspaceId === workspaceId,
  );
};
