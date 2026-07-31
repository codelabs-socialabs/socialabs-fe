import type { Workspace } from '@/types/workspace';

export const dummyWorkspaces: Workspace[] = [
  {
    id: 'ws_personal_001',
    name: "Rafi's Workspace",
    description: 'Personal research workspace',
    type: 'PERSONAL',
    plan: 'FREE',
    role: 'OWNER',
    isPersonal: true,
    membersCount: 1,
    usage: {
      used: 22500,
      limit: 50000,
    },
  },
  {
    id: 'ws_socialabs_001',
    name: 'Socia Research Team',
    description: 'Social media research and analysis workspace',
    type: 'TEAM',
    plan: 'PRO',
    role: 'OWNER',
    isPersonal: false,
    membersCount: 4,
    usage: {
      used: 32750,
      limit: 100000,
    },
  },
  {
    id: 'ws_unikom_001',
    name: 'UNIKOM Research Team',
    description: 'Academic research workspace',
    type: 'TEAM',
    plan: 'PRO',
    role: 'ANALYST',
    isPersonal: false,
    membersCount: 6,
    usage: {
      used: 48500,
      limit: 100000,
    },
  },
];

export const getWorkspaceById = (
  workspaceId: string,
): Workspace | undefined => {
  return dummyWorkspaces.find((workspace) => workspace.id === workspaceId);
};
