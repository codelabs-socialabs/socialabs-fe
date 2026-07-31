import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import AccountSettingsSidebar from '@/components/fragments/account/account-setting-sidebar';
import ApplicationNavbar from '@/components/fragments/navbar';

const AccountLayoutContent = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden h-full shrink-0 md:block">
        <AccountSettingsSidebar />
      </div>

      {/* Mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <button
            type="button"
            aria-label="Close account settings navigation"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
          />

          <div className="relative h-full w-[280px] max-w-[85vw] bg-white shadow-2xl">
            <AccountSettingsSidebar />

            <button
              type="button"
              aria-label="Close account settings navigation"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Right application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Desktop application navbar */}
        <div className="hidden shrink-0 md:block">
          <ApplicationNavbar context="settings" />
        </div>

        {/* Mobile navbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open account settings navigation"
              className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Menu size={19} />
            </button>

            <div>
              <p className="text-sm font-semibold text-slate-950">
                Account settings
              </p>
            </div>
          </div>

          <ApplicationNavbar context="settings" mobile />
        </header>

        {/* Settings content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AccountLayout = () => {
  const location = useLocation();

  return <AccountLayoutContent key={location.pathname} />;
};

export default AccountLayout;
