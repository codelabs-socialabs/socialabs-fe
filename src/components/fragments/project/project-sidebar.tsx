import logo from '@/assets/socialabs-logo.png';
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  LayoutDashboard,
  MessageSquare,
  Network,
  Settings,
  Smile,
  TrendingUp,
  UserRoundSearch,
} from 'lucide-react';
import { NavLink } from 'react-router';

import type { Project } from '@/types/project';
import type { Workspace } from '@/types/workspace';

interface ProjectSidebarProps {
  workspace: Workspace;
  project: Project;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

const ProjectSidebar = ({ workspace, project }: ProjectSidebarProps) => {
  const projectBasePath =
    `/workspaces/${workspace.id}` + `/projects/${project.id}`;

  const navigationGroups: NavigationGroup[] = [
    {
      label: 'Dashboard',
      items: [
        {
          label: 'Overview',
          path: `${projectBasePath}/overview`,
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: 'AI Analytics',
      items: [
        {
          label: 'Topic Modeling',
          path: `${projectBasePath}/topics`,
          icon: BrainCircuit,
        },
        {
          label: 'Sentiment Trend',
          path: `${projectBasePath}/sentiment`,
          icon: TrendingUp,
        },
        {
          label: 'Emotion Analysis',
          path: `${projectBasePath}/emotion`,
          icon: Smile,
        },
      ],
    },
    {
      label: 'Network & Actors',
      items: [
        {
          label: 'Influencers',
          path: `${projectBasePath}/influencers`,
          icon: UserRoundSearch,
        },
        {
          label: 'Communities',
          path: `${projectBasePath}/communities`,
          icon: Network,
        },
      ],
    },
    {
      label: 'Assistant',
      items: [
        {
          label: 'Socia Chat',
          path: `${projectBasePath}/chat`,
          icon: MessageSquare,
        },
      ],
    },
    {
      label: 'Project',
      items: [
        {
          label: 'Dataset',
          path: `${projectBasePath}/dataset`,
          icon: Database,
        },
        {
          label: 'Project Settings',
          path: `${projectBasePath}/settings`,
          icon: Settings,
        },
      ],
    },
  ];

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

      <div className="shrink-0 border-b border-slate-100 px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Current Project
        </p>

        <h2
          title={project.name}
          className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-900"
        >
          {project.name}
        </h2>

        <p className="mt-1 truncate text-xs text-slate-500">{workspace.name}</p>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          {navigationGroups.map((group) => (
            <section key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
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
                            className={
                              isActive ? 'text-red-600' : 'text-slate-400'
                            }
                          />

                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </nav>

      <div className="shrink-0 border-t border-slate-200 p-4">
        <NavLink
          to={`/workspaces/${workspace.id}/projects`}
          className="group flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft
            size={16}
            className="text-slate-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-slate-600"
          />
          Back to Projects
        </NavLink>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
