import {
  ChevronsUpDown,
  Folder,
  HelpCircle,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { toast } from 'sonner';
import { useWorkspaces, useCreateWorkspace } from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';
import CreateWorkspaceModal from '@/components/modals/create-workspace-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import BrandLogo from '@/components/layouts/brand-logo';
import UserMenu from '@/components/layouts/user-menu';
import UpgradeFooter from '@/components/layouts/upgrade-footer';

export default function AppShell() {
  const location = useLocation();
  const { data: workspaces, isLoading } = useWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const { activeWorkspaceId, setActiveWorkspace } = useWorkspaceStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeWorkspace = workspaces?.find((w) => w._id === activeWorkspaceId);

  const handleCreateWorkspace = (data: {
    name: string;
    description?: string;
  }) => {
    createWorkspace.mutate(
      { ...data, plan: 'FREE' },
      {
        onSuccess: (workspace) => {
          setActiveWorkspace(workspace._id);
          setIsCreateModalOpen(false);
          toast.success('Workspace created');
        },
        onError: () => toast.error('Failed to create workspace'),
      },
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen max-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <BrandLogo />

        {/* Workspace Selector */}
        <div className="p-4 border-b border-slate-100 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2 text-left hover:border-slate-300 focus:outline-none group">
                <div className="w-full flex items-center gap-2.5 overflow-hidden">
                  <Avatar className="w-8 h-8 rounded bg-red-600 text-white">
                    <AvatarFallback className="rounded bg-red-600 text-white font-semibold text-xs">
                      {activeWorkspace?.name[0].toUpperCase() || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                      Workspace
                    </span>
                    <span className="text-sm font-semibold text-slate-800 truncate leading-tight">
                      {activeWorkspace?.name || 'Select Workspace'}
                    </span>
                  </div>
                  <ChevronsUpDown
                    size={14}
                    className="text-slate-400 shrink-0 ml-auto"
                  />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right" className="w-56">
              {isLoading ? (
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-sm text-slate-500 text-center">
                    Loading...
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              ) : workspaces?.length === 0 ? (
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-sm text-slate-500 italic text-center">
                    No workspace yet
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              ) : (
                workspaces?.map((ws) => (
                  <DropdownMenuItem
                    key={ws._id}
                    onClick={() => setActiveWorkspace(ws._id)}
                    className={`flex items-center gap-2.5 cursor-pointer ${ws._id === activeWorkspaceId ? 'text-red-700' : ''}`}
                  >
                    <Avatar className="w-6 h-6 rounded bg-red-600 text-white">
                      <AvatarFallback className="rounded bg-red-600 text-white font-semibold text-[10px]">
                        {ws.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <span className="font-medium text-sm">{ws.name}</span>
                      {ws.description && (
                        <p className="text-xs text-slate-400 truncate">
                          {ws.description}
                        </p>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsCreateModalOpen(true)}
                className="cursor-pointer"
              >
                <Plus size={14} className="text-slate-500" />
                <span className="font-medium">Create Workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Main Menu
            </div>
            <Link
              to="/app/projects"
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/app/projects') ? 'text-red-700 bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Folder
                size={16}
                className={isActive('/app/projects') ? 'text-red-600' : ''}
              />
              Research Project
            </Link>
            <Link
              to="/app/analytics"
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/app/analytics') ? 'text-red-700 bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <LayoutDashboard
                size={16}
                className={isActive('/app/analytics') ? 'text-red-600' : ''}
              />
              Global Analytics
            </Link>
            <Link
              to="/app/team"
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/app/team') ? 'text-red-700 bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Users
                size={16}
                className={isActive('/app/team') ? 'text-red-600' : ''}
              />
              Team Members
            </Link>

            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">
              Settings
            </div>
            <Link
              to="/app/settings"
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/app/settings') ? 'text-red-700 bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Settings
                size={16}
                className={isActive('/app/settings') ? 'text-red-600' : ''}
              />
              Workspace Settings
            </Link>
          </div>
        </div>

        <UpgradeFooter />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
          <h2 className="text-base font-semibold text-slate-800">
            {isActive('/app/settings')
              ? 'Settings'
              : isActive('/app/projects')
                ? 'Projects'
                : isActive('/app/analytics')
                  ? 'Global Analytics'
                  : isActive('/app/team')
                    ? 'Team Members'
                    : 'Overview'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-slate-600"
            >
              <HelpCircle size={18} />
            </Button>
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateWorkspace}
        isLoading={createWorkspace.isPending}
      />
    </div>
  );
}
