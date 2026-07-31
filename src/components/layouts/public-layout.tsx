import { Outlet } from 'react-router';

import PublicFooter from '@/components/fragments/public/public-footer';
import PublicNavbar from '@/components/fragments/public/public-navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-slate-950">
      <PublicNavbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
