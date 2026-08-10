import { LoaderCircle } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';

import { useAuthStore } from '@/stores/auth-store';

const GuestRoute = () => {
  const status = useAuthStore((state) => state.status);

  console.info('[GuestRoute] status:', status);

  if (status === 'initializing') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <LoaderCircle className="size-5 animate-spin text-[#d81b27]" />
        <span className="ml-3">Checking authentication...</span>
      </div>
    );
  }

  if (status === 'authenticated') {
    return <Navigate to="/workspaces" replace />;
  }

  console.info('[GuestRoute] rendering outlet');

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GuestRoute;
