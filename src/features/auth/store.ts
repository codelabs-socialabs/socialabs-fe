import { create } from 'zustand';
import type { User } from './types';

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, email: string) => void;
  logout: () => void;
}

function parseJwt(
  token: string,
): { id: string; email: string; fullname: string } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('token');
  let user: User | null = null;
  if (token) {
    const payload = parseJwt(token);
    if (payload) {
      user = {
        id: payload.id,
        email: payload.email,
        fullname: payload.fullname,
      };
    }
  }

  return {
    token,
    user,
    setAuth: (token, email) => {
      localStorage.setItem('token', token);
      const payload = parseJwt(token);
      const user = payload
        ? { id: payload.id, email, fullname: payload.fullname }
        : { id: '', email, fullname: '' };
      set({ token, user });
    },
    logout: () => {
      localStorage.removeItem('token');
      set({ token: null, user: null });
      window.location.href = '/login';
    },
  };
});
