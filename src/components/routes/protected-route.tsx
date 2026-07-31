import { LoaderCircle } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';

import { useAuthStore } from '@/stores/auth-store';

const ProtectedRoute = () => {
  const status = useAuthStore((state) => state.status);

  if (status === 'initializing') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin text-[#d81b27]" />
          Loading your workspace...
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
