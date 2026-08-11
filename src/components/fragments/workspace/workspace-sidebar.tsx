import logo from '@/assets/socialabs-logo.png';
import { Folder, LayoutDashboard, Settings, Users } from 'lucide-react';
import { NavLink, useParams } from 'react-router';

import { useWorkspaceStore } from '@/stores/workspace-store';
import { WorkspaceRole } from '@/types/workspace';

import WorkspaceQuota from './workspace-qouta';
import WorkspaceSwitcher from './workspace-switcher';

interface WorkspaceRouteParams extends Record<string, string | undefined> {
  workspaceId: string;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: typeof Folder;
  disabled?: boolean;
}

const workspaceManagerRoles: WorkspaceRole[] = [
  WorkspaceRole.OWNER,
  WorkspaceRole.ADMIN,
];

const WorkspaceSidebar = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  /*
   * URL menjadi sumber utama.
   * activeWorkspaceId hanya fallback.
   */
  const currentWorkspaceId = workspaceId || activeWorkspaceId;

  const currentWorkspace = workspaces.find(
    (workspace) => workspace.id === currentWorkspaceId,
  );

  /*
   * WorkspaceLayout sudah memvalidasi workspace.
   * Fallback role ini hanya mencegah sidebar hilang
   * selama proses sinkronisasi state.
   */
  const currentWorkspaceRole = currentWorkspace?.role ?? WorkspaceRole.OWNER;

  const canViewMembers = currentWorkspace?.isPersonal !== true;

  const canManageWorkspace =
    workspaceManagerRoles.includes(currentWorkspaceRole);

  /*
   * Kalau parameter route benar-benar tidak tersedia,
   * barulah sidebar tidak dapat membuat navigation URL.
   */
  if (!currentWorkspaceId) {
    return null;
  }

  const mainNavigation: NavigationItem[] = [
    {
      label: 'Overview',
      path: `/workspaces/${currentWorkspaceId}/overview`,
      icon: LayoutDashboard,
    },
    {
      label: 'Research Projects',
      path: `/workspaces/${currentWorkspaceId}/projects`,
      icon: Folder,
    },
    ...(canViewMembers
      ? [
          {
            label: 'Team Members',
            path: `/workspaces/${currentWorkspaceId}/members`,
            icon: Users,
          },
        ]
      : []),
  ];

  const settingNavigation: NavigationItem[] = canManageWorkspace
    ? [
        {
          label: 'Workspace Settings',
          path: `/workspaces/${currentWorkspaceId}/settings`,
          icon: Settings,
        },
      ]
    : [];

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon;

    if (item.disabled) {
      return (
        <div
          key={item.label}
          className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400"
          title="Coming soon"
        >
          <Icon size={16} />
          {item.label}

          <span className="ml-auto text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            Soon
          </span>
        </div>
      );
    }

    return (
      <NavLink
        key={item.label}
        to={item.path}
        className={({ isActive }) =>
          [
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-red-50 text-red-700'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={16}
              className={isActive ? 'text-red-600' : 'text-slate-400'}
            />

            {item.label}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="relative z-20 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-5">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="SociaLabs" className="size-7 object-contain" />

          <span className="text-xl font-semibold tracking-tight text-slate-950">
            SociaLabs
          </span>
        </div>
      </div>

      <div className="shrink-0 border-b border-slate-100 p-4">
        <WorkspaceSwitcher />
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">
            {mainNavigation.map(renderNavigationItem)}
          </div>
        </div>

        {settingNavigation.length > 0 && (
          <div className="mt-7">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Settings
            </p>

            <div className="space-y-1">
              {settingNavigation.map(renderNavigationItem)}
            </div>
          </div>
        )}
      </nav>

      <div className="shrink-0">
        <WorkspaceQuota />
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
