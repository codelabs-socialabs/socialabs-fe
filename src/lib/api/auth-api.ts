import { apiClient } from '@/lib/api/api-client';
import type {
  CurrentUserResponse,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from '@/types/auth';

export const authApi = {
  register: async (input: RegisterInput): Promise<RegisterResponse> => {
    return apiClient<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  login: async (input: LoginInput): Promise<LoginResponse> => {
    return apiClient<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    return apiClient<CurrentUserResponse>('/auth/me', {
      method: 'GET',
      requireAuth: true,
    });
  },

  logout: async (): Promise<void> => {
    await apiClient<{ message: string }>('/auth/logout', {
      method: 'POST',
      requireAuth: true,
    });
  },
};
