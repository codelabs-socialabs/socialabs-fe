import {
  BarChart3,
  Brain,
  ChevronLeft,
  MessageCircle,
  Network,
  Settings,
  Smile,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link, Outlet, useParams, useLocation } from 'react-router';
import { useProject, extractProjectId } from '@/features/project/hooks';
import { useWorkspaces } from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';
import BrandLogo from '@/components/layouts/brand-logo';
import UserMenu from '@/components/layouts/user-menu';
import UpgradeFooter from '@/components/layouts/upgrade-footer';

export default function ProjectShell() {
  const { id: rawId } = useParams<{ id: string }>();
  const id = extractProjectId(rawId!);
  const location = useLocation();
  const { activeWorkspaceId } = useWorkspaceStore();
  const { data: workspaces } = useWorkspaces();
  const { data: project, isLoading } = useProject(id!);

  const activeWorkspace = workspaces?.find((w) => w._id === activeWorkspaceId);

  const basePath = `/app/projects/${rawId}`;
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Overview', path: basePath, icon: BarChart3 },
    {
      section: 'AI Analysis',
      items: [
        {
          label: 'Socia Topic Modelling',
          path: `${basePath}/topic-modeling`,
          icon: Brain,
        },
        {
          label: 'Socia Sentiment',
          path: `${basePath}/sentiment`,
          icon: TrendingUp,
        },
        { label: 'Socia Emotion', path: `${basePath}/emotion`, icon: Smile },
      ],
    },
    {
      section: 'Network Analysis',
      items: [
        {
          label: 'Socia Influencer Recommendation',
          path: `${basePath}/influencer`,
          icon: Users,
        },
        {
          label: 'Socia Community Detection',
          path: `${basePath}/community`,
          icon: Network,
        },
      ],
    },
    {
      section: 'Interaction',
      items: [
        { label: 'Socia Chat', path: `${basePath}/chat`, icon: MessageCircle },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-500">Project not found</p>
        <Link
          to="/app/projects"
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <BrandLogo />

        {/* Back to projects */}
        <div className="p-4 border-b border-slate-100 shrink-0">
          <Link
            to="/app/projects"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Projects
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navItems.map((item) => {
              if ('section' in item) {
                return (
                  <div key={item.section}>
                    <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">
                      {item.section}
                    </div>
                    {item.items?.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive(sub.path)
                            ? 'text-red-700 bg-red-50'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <sub.icon
                          size={16}
                          className={isActive(sub.path) ? 'text-red-600' : ''}
                        />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-red-700 bg-red-50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon
                    size={16}
                    className={isActive(item.path) ? 'text-red-600' : ''}
                  />
                  {item.label}
                </Link>
              );
            })}

            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">
              Settings
            </div>
            <Link
              to={`${basePath}/settings`}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(`${basePath}/settings`)
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings
                size={16}
                className={
                  isActive(`${basePath}/settings`) ? 'text-red-600' : ''
                }
              />
              Project Setting
            </Link>
          </div>
        </div>

        <UpgradeFooter />
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/app/projects"
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              {activeWorkspace?.name || 'Workspace'}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800">{project.name}</span>
          </div>
          <UserMenu />
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
