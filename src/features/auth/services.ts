import { apiClient } from '@/lib/api-client';
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  ApiResponse,
} from './types';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data,
    );
    return res.data.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const res = await apiClient.post<ApiResponse<RegisterResponse>>(
      '/auth/register',
      data,
    );
    return res.data.data;
  },

  async verify(): Promise<boolean> {
    const res = await apiClient.get<ApiResponse<boolean>>('/auth/verify');
    return res.data.data;
  },

  async getProfile(): Promise<{
    id: string;
    fullname: string;
    email: string;
    phoneNumber: string;
    plan: string;
  }> {
    const res = await apiClient.get('/auth/me');
    return res.data.data;
  },

  async updateProfile(data: {
    fullname?: string;
    phoneNumber?: string;
  }): Promise<{
    id: string;
    fullname: string;
    email: string;
    phoneNumber: string;
  }> {
    const res = await apiClient.patch('/auth/profile', data);
    return res.data.data;
  },

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await apiClient.patch('/auth/password', data);
  },

  async deleteAccount(): Promise<void> {
    await apiClient.delete('/auth/account');
  },
};
