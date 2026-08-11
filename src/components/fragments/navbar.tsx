import { ChevronDown, HelpCircle, LogOut, Settings, User } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';

import { tokenStorage } from '@/lib/auth/token-storage';
import { useAuthStore } from '@/stores/auth-store';
import { useWorkspaceStore } from '@/stores/workspace-store';

interface WorkspaceRouteParams extends Record<string, string | undefined> {
  workspaceId?: string;
  projectId?: string;
}

interface WorkspaceContext {
  id: string;
  name: string;
}

interface ProjectContext {
  id: string;
  name: string;
}

interface WorkspaceNavbarProps {
  workspace?: WorkspaceContext | null;
  project?: ProjectContext | null;
  context?: string;
  mobile?: boolean;
}

interface NavbarBreadcrumb {
  label: string;
  path?: string;
}

type NavbarContext = 'settings' | 'workspace' | 'project';

const projectPageTitles: Record<string, string> = {
  overview: 'Overview',
  topics: 'Topics',
  sentiment: 'Sentiment',
  emotion: 'Emotion',
  influence: 'Influencers',
  influencers: 'Influencers',
  communities: 'Communities',
  chat: 'AI Chat',
  dataset: 'Dataset',
  settings: 'Project Settings',
};

const getPathSegments = (pathname: string): string[] => {
  return pathname.split('/').filter(Boolean);
};

const getLastPathSegment = (pathname: string): string => {
  const segments = getPathSegments(pathname);

  return segments.at(-1) ?? '';
};

const isSettingsRoute = (pathname: string): boolean => {
  return pathname.startsWith('/settings');
};

const isProjectRoute = (pathname: string): boolean => {
  const segments = getPathSegments(pathname);

  const projectsIndex = segments.indexOf('projects');

  if (projectsIndex < 0) {
    return false;
  }

  const projectIdentifier = segments[projectsIndex + 1];

  return Boolean(projectIdentifier && projectIdentifier !== 'new');
};

const getNavbarContext = (pathname: string): NavbarContext => {
  if (isSettingsRoute(pathname)) {
    return 'settings';
  }

  if (isProjectRoute(pathname)) {
    return 'project';
  }

  return 'workspace';
};

const getProjectPageTitle = (pathname: string): string => {
  const segments = getPathSegments(pathname);

  const projectsIndex = segments.indexOf('projects');

  const projectIdentifier = segments[projectsIndex + 1];

  const lastSegment = getLastPathSegment(pathname);

  if (!lastSegment || lastSegment === projectIdentifier) {
    return 'Overview';
  }

  return projectPageTitles[lastSegment] ?? 'Overview';
};

const getProjectBreadcrumbs = ({
  pathname,
  workspace,
  project,
}: {
  pathname: string;
  workspace?: WorkspaceContext | null;
  project?: ProjectContext | null;
}): NavbarBreadcrumb[] => {
  return [
    {
      label: workspace?.name ?? 'Workspace',
      path: workspace ? `/workspaces/${workspace.id}/overview` : '/workspace',
    },
    {
      label: project?.name ?? 'Project',
    },
    {
      label: getProjectPageTitle(pathname),
    },
  ];
};

const createAvatarInitial = (
  fullname: string | null | undefined,
  email: string | null | undefined,
): string => {
  const normalizedFullname = fullname?.trim();

  if (normalizedFullname) {
    return normalizedFullname.charAt(0).toUpperCase();
  }

  const normalizedEmail = email?.trim();

  if (normalizedEmail) {
    return normalizedEmail.charAt(0).toUpperCase();
  }

  return 'U';
};

const WorkspaceNavbar = ({
  workspace: workspaceProp = null,
  project = null,
}: WorkspaceNavbarProps) => {
  const location = useLocation();

  const navigate = useNavigate();

  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  const resetWorkspaceStore = useWorkspaceStore(
    (state) => state.resetWorkspaceStore,
  );

  const currentWorkspace = useMemo<WorkspaceContext | null>(() => {
    if (workspaceProp) {
      return workspaceProp;
    }

    const currentWorkspaceId = workspaceId ?? activeWorkspaceId;

    if (!currentWorkspaceId) {
      return null;
    }

    const storedWorkspace = workspaces.find(
      (workspace) => workspace.id === currentWorkspaceId,
    );

    if (!storedWorkspace) {
      return null;
    }

    return {
      id: storedWorkspace.id,
      name: storedWorkspace.name,
    };
  }, [activeWorkspaceId, workspaceId, workspaceProp, workspaces]);

  const navbarContext = getNavbarContext(location.pathname);

  const projectBreadcrumbs =
    navbarContext === 'project'
      ? getProjectBreadcrumbs({
          pathname: location.pathname,
          workspace: currentWorkspace,
          project,
        })
      : [];

  const userFullname = user?.fullname?.trim() || 'User';

  const userEmail = user?.email?.trim() || '';

  const userInitial = createAvatarInitial(user?.fullname, user?.email);

  /*
   * Kalau AuthUser belum mempunyai avatarUrl,
   * biarkan nilainya null.
   */
  const userAvatarUrl =
    'avatarUrl' in (user ?? {})
      ? ((
          user as typeof user & {
            avatarUrl?: string | null;
          }
        )?.avatarUrl ?? null)
      : null;

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (userMenuRef.current?.contains(target)) {
        return;
      }

      setIsUserMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen]);

  const handleToggleUserMenu = (): void => {
    setIsUserMenuOpen((current) => !current);
  };

  const handleCloseUserMenu = (): void => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = (): void => {
    handleCloseUserMenu();

    tokenStorage.removeAccessToken();

    setUnauthenticated();

    resetWorkspaceStore();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left navbar context */}
      <div className="min-w-0">
        {navbarContext === 'settings' && (
          <div>
            <h1 className="text-sm font-semibold leading-none text-slate-800">
              Account settings
            </h1>

            <p className="mt-1.5 text-xs leading-none text-slate-400">
              Personal account preferences
            </p>
          </div>
        )}

        {navbarContext === 'workspace' && (
          <div>
            <h1 className="text-sm font-semibold leading-none text-slate-800">
              Workspace
            </h1>

            <p className="mt-1.5 text-xs leading-none text-slate-400">
              Manage projects, members, and workspace activity
            </p>
          </div>
        )}

        {navbarContext === 'project' && (
          <nav
            aria-label="Current project page"
            className="flex min-w-0 items-center gap-2"
          >
            {projectBreadcrumbs.map((breadcrumb, index) => {
              const isLast = index === projectBreadcrumbs.length - 1;

              return (
                <div
                  key={`${breadcrumb.label}-${index}`}
                  className="flex min-w-0 items-center gap-2"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-sm text-slate-300"
                    >
                      /
                    </span>
                  )}

                  {breadcrumb.path && !isLast ? (
                    <Link
                      to={breadcrumb.path}
                      onClick={handleCloseUserMenu}
                      className="max-w-36 truncate text-sm font-medium text-slate-500 transition hover:text-slate-800 sm:max-w-52"
                    >
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <span
                      className={`max-w-40 truncate text-sm sm:max-w-60 ${
                        isLast
                          ? 'font-semibold text-slate-800'
                          : 'font-medium text-slate-500'
                      }`}
                    >
                      {breadcrumb.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* Right navbar actions */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="mr-1 border-r border-slate-200 pr-2">
          <button
            type="button"
            aria-label="Open help"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <HelpCircle size={18} />
          </button>
        </div>

        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={handleToggleUserMenu}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-xl border border-slate-200 p-1.5 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-700 text-white">
              {userAvatarUrl ? (
                <img
                  src={userAvatarUrl}
                  alt={userFullname}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold">{userInitial}</span>
              )}
            </div>

            <div className="hidden flex-col items-center px-1 sm:flex">
              <span className="max-w-40 truncate text-sm font-medium leading-none text-slate-800">
                {userFullname}
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
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg shadow-slate-950/5"
            >
              <div className="mb-1 border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {userFullname}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {userEmail}
                </p>
              </div>

              <Link
                to="/settings/profile"
                onClick={handleCloseUserMenu}
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <User size={14} className="text-slate-400" />
                My Profile
              </Link>

              <Link
                to="/settings/account"
                onClick={handleCloseUserMenu}
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Settings size={14} className="text-slate-400" />
                Account Settings
              </Link>

              <div className="mt-1 border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  role="menuitem"
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
