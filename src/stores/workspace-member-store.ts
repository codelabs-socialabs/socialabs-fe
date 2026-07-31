import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { dummyWorkspaceMembers } from '@/data/mocks/workspace-members';
import type {
  InviteWorkspaceMemberInput,
  UpdateWorkspaceMemberRoleInput,
  WorkspaceMember,
} from '@/types/workspace-member';

interface WorkspaceMemberState {
  members: WorkspaceMember[];

  inviteMember: (input: InviteWorkspaceMemberInput) => WorkspaceMember | null;

  updateMemberRole: (input: UpdateWorkspaceMemberRoleInput) => boolean;

  removeMember: (memberId: string) => boolean;

  cancelInvitation: (memberId: string) => boolean;

  resendInvitation: (memberId: string) => boolean;

  resetMemberStore: () => void;
}

const createInitials = (email: string): string => {
  const localPart = email.split('@')[0] ?? '';

  const sections = localPart.replace(/[._-]/g, ' ').split(' ').filter(Boolean);

  if (sections.length >= 2) {
    return `${sections[0][0] ?? ''}${sections[1][0] ?? ''}`.toUpperCase();
  }

  return localPart.slice(0, 2).toUpperCase();
};

const createMemberId = (): string => {
  return `member_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
};

const initialState = {
  members: dummyWorkspaceMembers,
};

export const useWorkspaceMemberStore = create<WorkspaceMemberState>()(
  persist(
    (set, get) => ({
      ...initialState,

      inviteMember: (
        input: InviteWorkspaceMemberInput,
      ): WorkspaceMember | null => {
        const normalizedEmail = input.email.trim().toLowerCase();

        const memberExists = get().members.some(
          (member) =>
            member.workspaceId === input.workspaceId &&
            member.email.toLowerCase() === normalizedEmail,
        );

        if (memberExists) {
          return null;
        }

        const member: WorkspaceMember = {
          id: createMemberId(),
          workspaceId: input.workspaceId,
          name: null,
          email: normalizedEmail,
          initials: createInitials(normalizedEmail),
          role: input.role,
          status: 'PENDING',
          invitedAt: new Date().toISOString(),
          invitedBy: 'User Analyst',
        };

        set((state) => ({
          members: [...state.members, member],
        }));

        return member;
      },

      updateMemberRole: ({
        memberId,
        role,
      }: UpdateWorkspaceMemberRoleInput): boolean => {
        const member = get().members.find((item) => item.id === memberId);

        if (!member || member.role === 'OWNER' || member.status !== 'ACTIVE') {
          return false;
        }

        set((state) => ({
          members: state.members.map((item) =>
            item.id === memberId
              ? {
                  ...item,
                  role,
                }
              : item,
          ),
        }));

        return true;
      },

      removeMember: (memberId: string): boolean => {
        const member = get().members.find((item) => item.id === memberId);

        if (!member || member.role === 'OWNER' || member.status !== 'ACTIVE') {
          return false;
        }

        set((state) => ({
          members: state.members.filter((item) => item.id !== memberId),
        }));

        return true;
      },

      cancelInvitation: (memberId: string): boolean => {
        const member = get().members.find((item) => item.id === memberId);

        if (!member || member.status !== 'PENDING') {
          return false;
        }

        set((state) => ({
          members: state.members.filter((item) => item.id !== memberId),
        }));

        return true;
      },

      resendInvitation: (memberId: string): boolean => {
        const member = get().members.find((item) => item.id === memberId);

        if (!member || member.status !== 'PENDING') {
          return false;
        }

        set((state) => ({
          members: state.members.map((item) =>
            item.id === memberId
              ? {
                  ...item,
                  invitedAt: new Date().toISOString(),
                }
              : item,
          ),
        }));

        return true;
      },

      resetMemberStore: (): void => {
        set(initialState);
      },
    }),
    {
      name: 'socialabs-workspace-member-storage',
    },
  ),
);
