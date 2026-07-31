import { type PropsWithChildren, useEffect, useRef } from 'react';

import { authApi } from '@/lib/api/auth-api';
import { tokenStorage } from '@/lib/auth/token-storage';
import { useAuthStore } from '@/stores/auth-store';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const hasInitialized = useRef(false);

  const setAuthenticatedUser = useAuthStore(
    (state) => state.setAuthenticatedUser,
  );

  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const initializeAuth = async (): Promise<void> => {
      const accessToken = tokenStorage.getAccessToken();

      if (!accessToken) {
        setUnauthenticated();
        return;
      }

      try {
        const response = await authApi.getCurrentUser();

        setAuthenticatedUser(response.data);
      } catch {
        tokenStorage.removeAccessToken();
        setUnauthenticated();
      }
    };

    void initializeAuth();
  }, [setAuthenticatedUser, setUnauthenticated]);

  useEffect(() => {
    const handleUnauthorized = (): void => {
      tokenStorage.removeAccessToken();
      setUnauthenticated();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [setUnauthenticated]);

  return children;
};

export default AuthProvider;
