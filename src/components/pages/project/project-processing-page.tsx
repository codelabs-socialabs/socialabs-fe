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
import { Link, Navigate, useParams } from 'react-router';

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

interface DummyProjectProcessingError {
  stage: string;
  message: string;
}

interface DummyProject {
  id: string;
  workspaceId: string;

  name: string;
  description: string;

  category: string;
  language: string;
  keyword: string;

  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;

  status: ProjectStatus;

  processing: {
    stage: 'CRAWLING' | 'MODELING' | null;
    progress: number;
    startedAt: string;
    estimatedCompletionAt: string;
    error: DummyProjectProcessingError | null;
  };

  dataLimit: number;
  tweetsRetrieved: number;
  validTweets: number;
  duplicatedTweets: number;
  rejectedTweets: number;

  topicsCount: number;
  sentimentCount: number;
  emotionCount: number;
}

/*
 * Seluruh data project masih dummy.
 *
 * Untuk melihat desain status yang berbeda,
 * ubah `status` dan `processing.stage`:
 *
 * CREATED:
 * status: 'CREATED'
 * stage: null
 * progress: 0
 *
 * CRAWLING:
 * status: 'CRAWLING'
 * stage: 'CRAWLING'
 * progress: 62
 *
 * MODELING:
 * status: 'MODELING'
 * stage: 'MODELING'
 * progress: 84
 *
 * FAILED:
 * status: 'FAILED'
 * stage: 'CRAWLING'
 * progress: 37
 *
 * COMPLETED:
 * status: 'COMPLETED'
 * stage: null
 * progress: 100
 */
const dummyProject: DummyProject = {
  id: 'project-demo-001',
  workspaceId: 'workspace-demo-001',

  name: 'Public Sentiment Toward Artificial Intelligence',
  description:
    'Analyze public conversations about the adoption, benefits, and concerns surrounding artificial intelligence in Indonesia.',

  category: 'Technology',
  language: 'Indonesian',
  keyword: 'artificial intelligence Indonesia',

  startDate: '2026-07-01T00:00:00.000Z',
  endDate: '2026-07-30T23:59:59.000Z',

  createdAt: '2026-07-30T08:15:00.000Z',
  updatedAt: '2026-07-31T03:40:00.000Z',

  status: 'CRAWLING',

  processing: {
    stage: 'CRAWLING',
    progress: 62,
    startedAt: '2026-07-31T02:10:00.000Z',
    estimatedCompletionAt: '2026-07-31T05:15:00.000Z',
    error: null,

    /*
     * Dummy error untuk mencoba tampilan FAILED:
     *
     * error: {
     *   stage: 'CRAWLING',
     *   message:
     *     'The crawler could not continue because the external data source temporarily rejected the request.',
     * },
     */
  },

  dataLimit: 10_000,
  tweetsRetrieved: 6_240,
  validTweets: 5_918,
  duplicatedTweets: 214,
  rejectedTweets: 108,

  topicsCount: 0,
  sentimentCount: 0,
  emotionCount: 0,
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

const formatDateTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
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

  if (!workspaceId || !projectId) {
    return <Navigate to="/workspaces" replace />;
  }

  /*
   * ID route tetap digunakan agar link kembali dan dashboard
   * mengikuti URL yang sedang dibuka.
   *
   * Data tampilannya masih sepenuhnya berasal dari dummyProject.
   */
  const project: DummyProject = {
    ...dummyProject,
    id: projectId,
    workspaceId,
  };

  const progress = Math.min(Math.max(project.processing.progress, 0), 100);

  const collectionPercentage =
    project.dataLimit > 0
      ? Math.min(
          Math.max((project.tweetsRetrieved / project.dataLimit) * 100, 0),
          100,
        )
      : 0;

  const validDataPercentage =
    project.tweetsRetrieved > 0
      ? Math.min(
          Math.max((project.validTweets / project.tweetsRetrieved) * 100, 0),
          100,
        )
      : 0;

  const timeline = getTimeline(project.status);

  const projectListUrl = `/workspaces/${workspaceId}/projects`;

  const projectOverviewUrl =
    `/workspaces/${workspaceId}` + `/projects/${projectId}/overview`;

  const handleRetry = (): void => {
    /*
     * Dummy sementara.
     * Nanti ganti dengan request API retry processing.
     */
    console.info('Retry processing project:', {
      workspaceId,
      projectId,
    });
  };

  const handleStartProcessing = (): void => {
    /*
     * Dummy sementara.
     * Nanti ganti dengan request API start processing.
     */
    console.info('Start processing project:', {
      workspaceId,
      projectId,
    });
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
                  project.status,
                )}`}
              >
                {getStatusLabel(project.status)}
              </span>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              {project.description}
            </p>
          </div>

          {project.status === 'COMPLETED' && (
            <Link
              to={projectOverviewUrl}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Sparkles size={16} />
              Open Analytics
            </Link>
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
        </div>
      </header>

      <main className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <div
              className={`flex size-16 items-center justify-center rounded-full ${getProcessingIconClassName(
                project.status,
              )}`}
            >
              {project.status === 'FAILED' ? (
                <AlertCircle size={28} />
              ) : project.status === 'MODELING' ? (
                <Sparkles size={28} className="animate-pulse" />
              ) : project.status === 'CRAWLING' ? (
                <Database size={28} className="animate-pulse" />
              ) : project.status === 'COMPLETED' ? (
                <CheckCircle2 size={28} />
              ) : (
                <Clock3 size={28} />
              )}
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
              {getProcessingTitle(project.status)}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              {getProcessingDescription(project.status)}
            </p>

            {project.status !== 'FAILED' && project.status !== 'COMPLETED' && (
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
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                  <span>
                    Current stage:{' '}
                    <strong className="font-semibold text-slate-700">
                      {project.processing.stage ?? project.status}
                    </strong>
                  </span>

                  <span>
                    Started:{' '}
                    <strong className="font-semibold text-slate-700">
                      {formatDateTime(project.processing.startedAt)}
                    </strong>
                  </span>

                  <span>
                    Estimated finish:{' '}
                    <strong className="font-semibold text-slate-700">
                      {formatDateTime(project.processing.estimatedCompletionAt)}
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {project.status === 'CREATED' && (
              <button
                type="button"
                onClick={handleStartProcessing}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                <Sparkles size={16} />
                Start Processing
              </button>
            )}
          </div>
        </section>

        {project.status === 'FAILED' && (
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
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <RefreshCcw size={15} />
                  Try Again
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Database className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Data collected
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {formatNumber(project.tweetsRetrieved)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              of {formatNumber(project.dataLimit)} targeted posts
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <CheckCircle2 className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Valid data
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {formatNumber(project.validTweets)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {validDataPercentage.toFixed(1)}% passed validation
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Layers3 className="size-5 text-slate-400" />

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Current stage
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
              {project.processing.stage ?? project.status}
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
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.7fr)]">
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

          <div className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold text-slate-950">
                Project details
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Hash className="mt-0.5 size-4 shrink-0 text-slate-400" />

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Search keyword
                    </p>

                    <p className="mt-1 break-words text-sm font-medium text-slate-800">
                      {project.keyword}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="mt-0.5 size-4 shrink-0 text-slate-400" />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {project.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe2 className="mt-0.5 size-4 shrink-0 text-slate-400" />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Language
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {project.language}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-slate-400" />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Data period
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {formatDate(project.startDate)}
                      {' – '}
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold text-slate-950">
                Data quality
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-600">
                      Collection target
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {collectionPercentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${collectionPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatNumber(project.validTweets)}
                    </p>

                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Valid
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatNumber(project.duplicatedTweets)}
                    </p>

                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Duplicate
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatNumber(project.rejectedTweets)}
                    </p>

                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Rejected
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectProcessingPage;
