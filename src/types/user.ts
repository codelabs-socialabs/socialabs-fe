export type UserPlan = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: UserPlan;
  personalWorkspaceId: string;
  lastActiveWorkspaceId: string | null;
}
