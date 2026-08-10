import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Database,
  Globe2,
  Hash,
  Layers3,
  LoaderCircle,
  RefreshCcw,
  Sparkles,
  Tag,
} from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { useProjectProgress } from '@/hooks/use-project-progress';
import { useProjectStore } from '@/stores/project-store';
import type { ProjectStatus } from '@/types/project';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
}

type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed';

interface TimelineItem {
  id: string;
  label: string;
  description: string;
  status: TimelineStatus;
}

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

const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US');
};

const getStatusLabel = (status: ProjectStatus): string => {
  switch (status) {
    case 'CRAWLING':
      return 'Crawling Data';
    case 'MODELING':
      return 'AI Modeling';
    case 'COMPLETED':
      return 'Completed';
    case 'FAILED':
      return 'Failed';
    case 'CREATED':
    default:
      return 'Created';
  }
};

const getStatusClassName = (status: ProjectStatus): string => {
  switch (status) {
    case 'CRAWLING':
      return 'border-blue-200 bg-blue-50 text-blue-700';
    case 'MODELING':
      return 'border-purple-200 bg-purple-50 text-purple-700';
    case 'COMPLETED':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'FAILED':
      return 'border-red-200 bg-red-50 text-red-700';
    case 'CREATED':
    default:
      return 'border-slate-200 bg-slate-100 text-slate-600';
  }
};

const getProcessingIconClassName = (status: ProjectStatus): string => {
  switch (status) {
    case 'CRAWLING':
      return 'bg-blue-50 text-blue-600';
    case 'MODELING':
      return 'bg-purple-50 text-purple-600';
    case 'FAILED':
      return 'bg-red-50 text-red-600';
    case 'COMPLETED':
      return 'bg-emerald-50 text-emerald-600';
    case 'CREATED':
    default:
      return 'bg-slate-100 text-slate-500';
  }
};

const getProcessingTitle = (status: ProjectStatus): string => {
  switch (status) {
    case 'CRAWLING':
      return 'Collecting public conversations';
    case 'MODELING':
      return 'Generating AI-powered insights';
    case 'COMPLETED':
      return 'Analysis completed';
    case 'FAILED':
      return 'Processing failed';
    case 'CREATED':
    default:
      return 'Project is ready to process';
  }
};

const getProcessingDescription = (status: ProjectStatus): string => {
  switch (status) {
    case 'CRAWLING':
      return 'SociaLabs is collecting public conversations that match the selected keyword, language, and date period.';
    case 'MODELING':
      return 'The collected data is being analyzed to identify topics, sentiment, emotion, and public opinion patterns.';
    case 'COMPLETED':
      return 'All processing stages have been completed and the project analytics dashboard is ready.';
    case 'FAILED':
      return 'The project could not complete the current processing stage. Review the error information and retry the process.';
    case 'CREATED':
    default:
      return 'The project configuration has been saved and is waiting for the data processing workflow to begin.';
  }
};

const getTimeline = (status: ProjectStatus): TimelineItem[] => {
  return [
    {
      id: 'created',
      label: 'Project created',
      description:
        'Project configuration, keyword, language, and date period were saved.',
      status: 'completed',
    },
    {
      id: 'crawling',
      label: 'Crawling public data',
      description:
        'Collecting public conversations that match the research criteria.',
      status:
        status === 'FAILED'
          ? 'failed'
          : status === 'CREATED'
            ? 'pending'
            : status === 'CRAWLING'
              ? 'active'
              : 'completed',
    },
    {
      id: 'cleaning',
      label: 'Cleaning and validating data',
      description:
        'Removing duplicated, incomplete, and irrelevant conversations.',
      status:
        status === 'MODELING' || status === 'COMPLETED'
          ? 'completed'
          : 'pending',
    },
    {
      id: 'modeling',
      label: 'AI modeling',
      description:
        'Generating topic, sentiment, emotion, and community analysis.',
      status:
        status === 'MODELING'
          ? 'active'
          : status === 'COMPLETED'
            ? 'completed'
            : 'pending',
    },
    {
      id: 'completed',
      label: 'Analysis complete',
      description:
        'The project dashboard and research insights become available.',
      status: status === 'COMPLETED' ? 'completed' : 'pending',
    },
  ];
};

const ProjectProcessingPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();
  const navigate = useNavigate();
  const recrawlProject = useProjectStore((state) => state.recrawlProject);
  const [isRetrying, setIsRetrying] = useState(false);

  const { project, isConnected } = useProjectProgress(
    workspaceId ?? '',
    projectId ?? '',
  );

  useEffect(() => {
    if (project?.processing.status === 'COMPLETED') {
      navigate(`/workspaces/${workspaceId}/projects/${projectId}/overview`);
    }
  }, [project?.processing.status, workspaceId, projectId, navigate]);

  if (!workspaceId || !projectId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">
        <p className="text-sm text-slate-500">Loading project…</p>
      </div>
    );
  }

  const status = project.processing.status;
  const progress = Math.min(Math.max(project.processing.progress ?? 0, 0), 100);
  const timeline = getTimeline(status);
  const projectListUrl = `/workspaces/${workspaceId}/projects`;
  const projectOverviewUrl = `/workspaces/${workspaceId}/projects/${projectId}/overview`;

  const handleRetry = async () => {
    setIsRetrying(true);
    await recrawlProject(workspaceId, projectId);
    setIsRetrying(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">
      <header className="mb-8">
        <Link
          to={projectListUrl}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                {project.name}
              </h1>

              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${getStatusClassName(
                  status,
                )}`}
              >
                {getStatusLabel(status)}
              </span>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              {project.description}
            </p>
          </div>

          {status === 'COMPLETED' && (
            <button
              type="button"
              onClick={() => navigate(projectOverviewUrl)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Sparkles size={16} />
              Open Analytics
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Tag size={14} className="text-slate-400" />
            {project.category}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Globe2 size={14} className="text-slate-400" />
            {project.language}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="text-slate-400" />
            {formatDate(project.startDate)}
            {' – '}
            {formatDate(project.endDate)}
          </span>

          {isConnected && (
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          )}
        </div>
      </header>

      <main className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <div
              className={`flex size-16 items-center justify-center rounded-full ${getProcessingIconClassName(
                status,
              )}`}
            >
              {status === 'FAILED' ? (
                <AlertCircle size={28} />
              ) : status === 'MODELING' ? (
                <Sparkles size={28} className="animate-pulse" />
              ) : status === 'CRAWLING' ? (
                <Database size={28} className="animate-pulse" />
              ) : status === 'COMPLETED' ? (
                <CheckCircle2 size={28} />
              ) : (
                <Clock3 size={28} />
              )}
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
              {getProcessingTitle(status)}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              {getProcessingDescription(status)}
            </p>

            {status !== 'FAILED' && status !== 'COMPLETED' && (
              <div className="mt-8 w-full max-w-3xl">
                <div className="mb-2.5 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-600">
                    Overall progress
                  </span>

                  <span className="text-sm font-semibold text-slate-950">
                    {progress}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                  <span>
                    Current stage:{' '}
                    <strong className="font-semibold text-slate-700">
                      {project.processing.stage ?? status}
                    </strong>
                  </span>

                  <span>
                    Tweets collected:{' '}
                    <strong className="font-semibold text-slate-700">
                      {formatNumber(project.crawledTweets)}
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {status === 'FAILED' && (
          <section className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />

              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-red-900">
                  Processing error
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-red-700">
                  {project.processing.error?.message ??
                    'An unexpected error occurred while processing this project.'}
                </p>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                  Stage:{' '}
                  {project.processing.error?.stage ??
                    project.processing.stage ??
                    'UNKNOWN'}
                </p>

                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  <RefreshCcw
                    size={15}
                    className={isRetrying ? 'animate-spin' : ''}
                  />
                  {isRetrying ? 'Retrying…' : 'Try Again'}
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Database className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Tweets collected
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {formatNumber(project.crawledTweets)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              of {formatNumber(project.totalTweets || project.dataLimit)}{' '}
              targeted posts
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Layers3 className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Current stage
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {project.processing.stage ?? status}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Processing workflow stage
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Sparkles className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Progress
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {progress}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Overall project processing
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Hash className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Keyword
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-950">
              {project.keyword}
            </p>

            <p className="mt-1 text-xs text-slate-500">Search query</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-950">
            Processing timeline
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Follow each stage until the analytics dashboard becomes available.
          </p>

          <div className="mt-7">
            {timeline.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full border ${
                      item.status === 'completed'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                        : item.status === 'active'
                          ? 'border-red-200 bg-red-50 text-red-600'
                          : item.status === 'failed'
                            ? 'border-red-200 bg-red-50 text-red-600'
                            : 'border-slate-200 bg-white text-slate-300'
                    }`}
                  >
                    {item.status === 'completed' ? (
                      <CheckCircle2 size={16} />
                    ) : item.status === 'active' ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : item.status === 'failed' ? (
                      <AlertCircle size={16} />
                    ) : (
                      <Clock3 size={15} />
                    )}
                  </div>

                  {index < timeline.length - 1 && (
                    <div
                      className={`my-2 h-12 w-px ${
                        item.status === 'completed'
                          ? 'bg-emerald-200'
                          : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>

                <div className="min-w-0 pb-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </h3>

                    {item.status === 'active' && (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
                        In progress
                      </span>
                    )}

                    {item.status === 'failed' && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-700">
                        Failed
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectProcessingPage;
