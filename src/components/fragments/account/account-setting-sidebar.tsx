import logo from '@/assets/socialabs-logo.png';

import {
  ArrowLeft,
  Bell,
  Monitor,
  ShieldCheck,
  User,
  UserRoundCog,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

interface SettingsNavigationItem {
  label: string;
  path: string;
  icon: typeof User;
}

const navigationItems: SettingsNavigationItem[] = [
  {
    label: 'Profile',
    path: '/settings/profile',
    icon: User,
  },
  {
    label: 'Account',
    path: '/settings/account',
    icon: UserRoundCog,
  },
  {
    label: 'Security',
    path: '/settings/security',
    icon: ShieldCheck,
  },
  {
    label: 'Notifications',
    path: '/settings/notifications',
    icon: Bell,
  },
  {
    label: 'Appearance',
    path: '/settings/appearance',
    icon: Monitor,
  },
];

const AccountSettingsSidebar = () => {
  const navigate = useNavigate();

  const handleBackToWorkspace = (): void => {
    navigate('/workspace');
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white md:w-64">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-5">
        <button
          type="button"
          onClick={handleBackToWorkspace}
          className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
          aria-label="Go to SociaLabs workspace"
        >
          <img src={logo} alt="SociaLabs" className="size-8 object-contain" />

          <span className="text-lg font-semibold tracking-tight text-slate-950">
            SociaLabs
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Account settings navigation"
        className="flex-1 space-y-1 overflow-y-auto px-3 pt-5"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-red-50 text-red-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute bottom-2.5 left-0 top-2.5 w-0.5 rounded-full bg-red-500" />
                  )}

                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className={
                      isActive
                        ? 'text-red-600'
                        : 'text-slate-400 transition group-hover:text-slate-700'
                    }
                  />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Back to workspace */}
      <div className="shrink-0 border-t border-slate-100 px-3 py-4">
        <button
          type="button"
          onClick={handleBackToWorkspace}
          className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 border border-slate-200  transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform group-hover:-translate-x-0.5"
          />

          <span>Back to workspace</span>
        </button>
      </div>
    </aside>
  );
};

export default AccountSettingsSidebar;
