import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from './services';
import { useAuthStore } from './store';
import type { LoginRequest, RegisterRequest } from './types';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data, variables) => {
      setAuth(data.token, variables.email);
      navigate('/app');
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      navigate('/login');
    },
  });
}

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return {
    user,
    isAuthenticated: !!token,
    isLoading: false,
    logout,
  };
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { fullname?: string; phoneNumber?: string }) =>
      authService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(data),
  });
}

export function useDeleteAccount() {
  const logout = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: () => authService.deleteAccount(),
    onSuccess: () => {
      logout();
    },
  });
}
