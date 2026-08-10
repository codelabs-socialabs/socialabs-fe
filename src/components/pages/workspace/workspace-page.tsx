import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  Folder,
  LoaderCircle,
  Plus,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router';

import { getActivitiesByWorkspaceId } from '@/data/mocks/workspace-activities';
import { useProjectStore } from '@/stores/project-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import type { Project, ProjectStatus } from '@/types/project';
import {
  WorkspacePlan,
  WorkspaceRole,
  type WorkspaceUsage,
} from '@/types/workspace';
import type { WorkspaceActivityType } from '@/types/workspace-activity';

interface WorkspaceRouteParams {
  workspaceId: string;
}

const EMPTY_PROJECTS: Project[] = [];

interface StatusAppearance {
  label: string;
  className: string;
  dotClassName: string;
}

const projectStatusAppearance: Record<ProjectStatus, StatusAppearance> = {
  CREATED: {
    label: 'Created',
    className: 'bg-slate-100 text-slate-600',
    dotClassName: 'bg-slate-400',
  },
  CRAWLING: {
    label: 'Crawling Data',
    className: 'bg-blue-50 text-blue-700',
    dotClassName: 'bg-blue-500',
  },
  MODELING: {
    label: 'AI Modeling',
    className: 'bg-purple-50 text-purple-700',
    dotClassName: 'bg-purple-500',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-700',
    dotClassName: 'bg-emerald-500',
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-50 text-red-700',
    dotClassName: 'bg-red-500',
  },
};

const activityIconMap: Record<WorkspaceActivityType, typeof Activity> = {
  PROJECT_CREATED: Folder,
  ANALYSIS_COMPLETED: CheckCircle2,
  MEMBER_JOINED: Users,
  DATASET_EXPORTED: Database,
  PROJECT_ARCHIVED: Activity,
};

const workspaceUsageFallback: Record<WorkspacePlan, WorkspaceUsage> = {
  [WorkspacePlan.FREE]: {
    used: 0,
    limit: 10_000,
  },
  [WorkspacePlan.PRO]: {
    used: 0,
    limit: 50_000,
  },
  [WorkspacePlan.ENTERPRISE]: {
    used: 0,
    limit: 250_000,
  },
};

const workspaceProjectLimit: Record<WorkspacePlan, number> = {
  [WorkspacePlan.FREE]: 2,
  [WorkspacePlan.PRO]: 5,
  [WorkspacePlan.ENTERPRISE]: 25,
};

const projectCreatorRoles: WorkspaceRole[] = [
  WorkspaceRole.OWNER,
  WorkspaceRole.ADMIN,
  WorkspaceRole.ANALYST,
];

const memberManagerRoles: WorkspaceRole[] = [
  WorkspaceRole.OWNER,
  WorkspaceRole.ADMIN,
];

const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatActivityTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

const getProjectTarget = (project: Project): string => {
  const targetPage = project.status === 'COMPLETED' ? 'overview' : 'processing';

  return (
    `/workspaces/${project.workspaceId}` +
    `/projects/${project.id}/${targetPage}`
  );
};

const normalizeWorkspaceUsage = (
  usage: WorkspaceUsage | undefined,
  plan: WorkspacePlan,
): WorkspaceUsage => {
  const fallback = workspaceUsageFallback[plan];

  if (!usage) {
    return fallback;
  }

  const normalizedUsed = Number.isFinite(usage.used)
    ? Math.max(usage.used, 0)
    : fallback.used;

  const normalizedLimit = Number.isFinite(usage.limit)
    ? Math.max(usage.limit, 0)
    : fallback.limit;

  return {
    used: normalizedUsed,
    limit: normalizedLimit,
  };
};

const WorkspaceOverviewPage = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const workspace = useMemo(() => {
    if (!workspaceId) {
      return undefined;
    }

    return workspaces.find((item) => item.id === workspaceId);
  }, [workspaceId, workspaces]);

  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  const projects = useProjectStore((state) => {
    if (!workspaceId) {
      return EMPTY_PROJECTS;
    }

    return state.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS;
  });

  const loadingWorkspaceIds = useProjectStore(
    (state) => state.loadingWorkspaceIds,
  );

  const initializedWorkspaceIds = useProjectStore(
    (state) => state.initializedWorkspaceIds,
  );

  const isLoadingProjects = workspaceId
    ? loadingWorkspaceIds.includes(workspaceId)
    : false;

  const isProjectsInitialized = workspaceId
    ? initializedWorkspaceIds.includes(workspaceId)
    : false;

  useEffect(() => {
    if (!workspaceId) {
      return;
    }

    void fetchProjects(workspaceId);
  }, [fetchProjects, workspaceId]);

  const activities = useMemo(() => {
    if (!workspaceId) {
      return [];
    }

    return getActivitiesByWorkspaceId(workspaceId);
  }, [workspaceId]);

  if (!workspaceId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!workspace) {
    return <Navigate to="/workspaces" replace />;
  }

  if (isLoadingProjects || !isProjectsInitialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin text-red-600" />
          Loading projects...
        </div>
      </div>
    );
  }

  const workspaceRole = workspace.role ?? WorkspaceRole.OWNER;

  const workspaceUsage = normalizeWorkspaceUsage(
    workspace.usage,
    workspace.plan,
  );

  const workspaceMembersCount = workspace.membersCount ?? 1;

  const canCreateProject = projectCreatorRoles.includes(workspaceRole);

  const canInviteMember =
    !workspace.isPersonal && memberManagerRoles.includes(workspaceRole);

  const processingProjects = projects.filter(
    (project) => project.status === 'CRAWLING' || project.status === 'MODELING',
  );

  const recentProjects = [...projects]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 4);

  const recentActivities = [...activities]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 5);

  const projectsLimit = workspaceProjectLimit[workspace.plan];

  const projectUsagePercentage =
    projectsLimit > 0
      ? Math.min(Math.max((projects.length / projectsLimit) * 100, 0), 100)
      : 0;

  const dataUsagePercentage =
    workspaceUsage.limit > 0
      ? Math.min(
          Math.max((workspaceUsage.used / workspaceUsage.limit) * 100, 0),
          100,
        )
      : 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      {/* Header */}
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium text-red-600">Workspace Overview</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {workspace.name}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            {workspace.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          {canInviteMember && (
            <Link
              to={`/workspaces/${workspace.id}/members`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <UserPlus size={16} />
              Invite Member
            </Link>
          )}

          {canCreateProject && (
            <Link
              to={`/workspaces/${workspace.id}/projects`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Plus size={16} />
              New Project
            </Link>
          )}
        </div>
      </header>

      {/* Stats */}
      <section className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Projects
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {projects.length}
              </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <Folder size={17} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">All research projects</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Processing</p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {processingProjects.length}
              </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Clock3 size={17} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Active analysis processes
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Data Used</p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {formatCompactNumber(workspaceUsage.used)}
              </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Database size={17} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Public conversations processed
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Members</p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {workspaceMembersCount}
              </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Users size={17} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">Workspace collaborators</p>
        </div>
      </section>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
        {/* Left column */}
        <div className="min-w-0 space-y-6">
          {/* Recent Projects */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Recent Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recently created research projects.
                </p>
              </div>

              <Link
                to={`/workspaces/${workspace.id}/projects`}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="border-t border-slate-100 px-5 py-14 text-center">
                <Folder size={24} className="mx-auto text-slate-400" />

                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  No projects yet
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  Create your first research project to begin analyzing public
                  conversations.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {recentProjects.map((project) => {
                  const status = projectStatusAppearance[project.status];

                  return (
                    <Link
                      key={project.id}
                      to={getProjectTarget(project)}
                      className="group flex items-center justify-between gap-5 px-5 py-4 transition hover:bg-slate-50"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-900 transition group-hover:text-red-700">
                          {project.name}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="truncate">{project.keyword}</span>

                          <span className="text-slate-300">•</span>

                          <span>{formatDate(project.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${status.className}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${status.dotClassName}`}
                          />

                          {status.label}
                        </span>

                        <ArrowRight
                          size={16}
                          className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-red-500"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Processing */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="px-5 py-4">
              <h2 className="text-base font-semibold text-slate-950">
                Analysis in Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track active data collection and AI processing.
              </p>
            </div>

            {processingProjects.length === 0 ? (
              <div className="flex items-start gap-3 border-t border-slate-100 px-5 py-5">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />

                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    No active analysis
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    All current projects have finished processing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {processingProjects.map((project) => {
                  const status = projectStatusAppearance[project.status];

                  const progress = project.status === 'CRAWLING' ? 62 : 84;

                  return (
                    <Link
                      key={project.id}
                      to={getProjectTarget(project)}
                      className="block px-5 py-4 transition hover:bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-slate-900">
                            {project.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {status.label}
                          </p>
                        </div>

                        <span className="shrink-0 text-xs font-semibold text-slate-700">
                          {progress}%
                        </span>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-red-500 transition-all"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-6">
          {/* Usage */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Workspace Usage
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current plan resource usage.
                </p>
              </div>

              <Link
                to={`/workspaces/${workspace.id}/settings`}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
              >
                Details
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-700">
                    Active Projects
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {projects.length}
                    <span className="font-normal text-slate-400">
                      {' '}
                      / {projectsLimit}
                    </span>
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-800"
                    style={{
                      width: `${projectUsagePercentage}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-700">
                    Data Extracted
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {formatCompactNumber(workspaceUsage.used)}
                    <span className="font-normal text-slate-400">
                      {' '}
                      / {formatCompactNumber(workspaceUsage.limit)}
                    </span>
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${dataUsagePercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest actions in this workspace.
              </p>
            </div>

            {recentActivities.length === 0 ? (
              <p className="mt-5 text-sm text-slate-500">No recent activity.</p>
            ) : (
              <div className="mt-6 space-y-5">
                {recentActivities.map((activity) => {
                  const Icon = activityIconMap[activity.type];

                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Icon size={14} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm leading-relaxed text-slate-600">
                          <span className="font-medium text-slate-900">
                            {activity.actorName}
                          </span>{' '}
                          {activity.description}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {formatActivityTime(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="px-5 py-4">
              <h2 className="text-base font-semibold text-slate-950">
                Quick Actions
              </h2>
            </div>

            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {canCreateProject && (
                <Link
                  to={`/workspaces/${workspace.id}/projects`}
                  className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-slate-50"
                >
                  <Plus
                    size={16}
                    className="text-slate-400 group-hover:text-red-500"
                  />

                  <span className="flex-1 text-sm font-medium text-slate-700">
                    Start a new research project
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-slate-300 group-hover:text-red-500"
                  />
                </Link>
              )}

              {canInviteMember && (
                <Link
                  to={`/workspaces/${workspace.id}/members`}
                  className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-slate-50"
                >
                  <UserPlus
                    size={16}
                    className="text-slate-400 group-hover:text-red-500"
                  />

                  <span className="flex-1 text-sm font-medium text-slate-700">
                    Invite workspace members
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-slate-300 group-hover:text-red-500"
                  />
                </Link>
              )}

              <Link
                to={`/workspaces/${workspace.id}/settings`}
                className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-slate-50"
              >
                <Settings
                  size={16}
                  className="text-slate-400 group-hover:text-red-500"
                />

                <span className="flex-1 text-sm font-medium text-slate-700">
                  Manage workspace settings
                </span>

                <ArrowRight
                  size={15}
                  className="text-slate-300 group-hover:text-red-500"
                />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceOverviewPage;
