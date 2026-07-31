import type { CurrentUser } from '@/types/user';

export const dummyCurrentUser: CurrentUser = {
  id: 'usr_001',
  name: 'User Analyst',
  email: 'user@socialabs.id',
  initials: 'UA',
  plan: 'FREE',
  personalWorkspaceId: 'ws_personal_001',
  lastActiveWorkspaceId: 'ws_socialabs_001',
};
