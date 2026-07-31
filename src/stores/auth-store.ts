import { create } from 'zustand';

import type { AuthUser } from '@/types/auth';

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;

  setAuthenticatedUser: (user: AuthUser) => void;
  setUnauthenticated: () => void;
  setStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'initializing',

  setAuthenticatedUser: (user) => {
    set({
      user,
      status: 'authenticated',
    });
  },

  setUnauthenticated: () => {
    set({
      user: null,
      status: 'unauthenticated',
    });
  },

  setStatus: (status) => {
    set({ status });
  },
}));
