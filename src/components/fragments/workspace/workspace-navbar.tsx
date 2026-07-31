import { ChevronDown, HelpCircle, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { dummyCurrentUser } from '@/data/mocks/current-user';

const getPageTitle = (pathname: string): string => {
  if (pathname.endsWith('/projects')) {
    return 'Research Projects';
  }

  if (pathname.endsWith('/projects/new')) {
    return 'Create Project';
  }

  if (pathname.endsWith('/members')) {
    return 'Team Members';
  }

  if (pathname.endsWith('/usage')) {
    return 'Usage';
  }

  if (pathname.endsWith('/settings')) {
    return 'Workspace Settings';
  }

  return 'Workspace';
};

const WorkspaceNavbar = () => {
  const location = useLocation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-base font-semibold text-slate-800">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="mr-1 border-r border-slate-200 pr-2">
          <button
            type="button"
            aria-label="Open help"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <HelpCircle size={18} />
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((current) => !current)}
            className="flex items-center gap-2 rounded-lg border border-transparent p-1.5 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-slate-700 text-white">
              <span className="text-xs font-semibold">
                {dummyCurrentUser.initials}
              </span>
            </div>

            <div className="hidden flex-col items-start px-1 sm:flex">
              <span className="mb-1 text-sm font-medium leading-none text-slate-800">
                {dummyCurrentUser.name}
              </span>

              <span className="text-[10px] leading-none text-slate-500">
                {dummyCurrentUser.plan} Plan
              </span>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${
                isUserMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-1.5 w-52 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <div className="mb-1 border-b border-slate-100 bg-slate-50/50 px-4 py-2.5">
                <p className="text-sm font-semibold text-slate-900">
                  {dummyCurrentUser.name}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {dummyCurrentUser.email}
                </p>
              </div>

              <Link
                to="/settings/profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <User size={14} className="text-slate-400" />
                My Profile
              </Link>

              <Link
                to="/settings/account"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Settings size={14} className="text-slate-400" />
                Account Settings
              </Link>

              <div className="mt-1 border-t border-slate-100 pt-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default WorkspaceNavbar;
