import {
  AtSign,
  BrainCircuit,
  Calendar,
  Database,
  Globe,
  Search,
  Users,
} from 'lucide-react';
import { useParams } from 'react-router';

import { useProjectAnalytics } from '@/hooks/use-project-analytics';
import { useProjectStore } from '@/stores/project-store';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatNumber = (value: number): string => value.toLocaleString('en-US');

const ProjectPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();

  const project = useProjectStore((state) => {
    const projects = state.projectsByWorkspace[workspaceId ?? ''] ?? [];
    return projects.find((p) => p.id === projectId) ?? null;
  });

  const { analytics, isLoading } = useProjectAnalytics(
    workspaceId ?? '',
    projectId ?? '',
  );

  if (!workspaceId || !projectId) {
    return null;
  }

  if (isLoading && !analytics) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-sm text-slate-500">Loading analytics…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-sm text-slate-500">Project not found.</p>
      </div>
    );
  }

  const tweetsOverTime = analytics?.tweetsOverTime ?? [];
  const topKeywords = analytics?.topKeywords ?? [];
  const topUsers = analytics?.topUsers ?? [];

  const maxVolume =
    tweetsOverTime.length > 0
      ? Math.max(...tweetsOverTime.map((d) => d.count))
      : 1;

  const topKeyword = topKeywords[0]?.keyword ?? '-';

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-6 pb-10">
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              {project.name}
            </h1>

            {project.description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {project.description}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Search size={14} className="text-slate-400" />
                <span className="text-slate-500">Query</span>
                <span className="font-medium text-slate-800">
                  "{project.keyword}"
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-slate-500">Period</span>
                <span className="font-medium text-slate-800">
                  {formatDate(project.startDate)} –{' '}
                  {formatDate(project.endDate)}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Globe size={14} className="text-slate-400" />
                <span className="text-slate-500">Language</span>
                <span className="font-medium text-slate-800">
                  {project.language}
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Database size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Total Tweets
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {formatNumber(project.totalTweets)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Users size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Unique Accounts
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {formatNumber(topUsers.length)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <BrainCircuit size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Top Keyword
              </span>
            </div>
            <p
              title={topKeyword}
              className="mt-3 line-clamp-2 text-sm font-semibold leading-relaxed text-slate-800"
            >
              {topKeyword}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <AtSign size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Top User
              </span>
            </div>
            <p
              title={topUsers[0]?.userId ?? '-'}
              className="mt-3 truncate text-sm font-semibold text-slate-800"
            >
              {topUsers[0]?.userId ?? '-'}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Conversation Volume Trend
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tweet count over the collection period.
              </p>
            </div>
          </div>

          {tweetsOverTime.length === 0 ? (
            <p className="text-sm text-slate-500">
              No tweet volume data available.
            </p>
          ) : (
            <>
              <div className="relative flex h-[240px] w-full items-end justify-between gap-1 border-b border-slate-100 pb-6 sm:gap-2">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6 opacity-30">
                  <div className="h-px w-full bg-slate-200" />
                  <div className="h-px w-full bg-slate-200" />
                  <div className="h-px w-full bg-slate-200" />
                  <div className="h-px w-full bg-slate-200" />
                </div>

                {tweetsOverTime.map((data) => {
                  const heightPercentage = (data.count / maxVolume) * 100;
                  const isPeak = data.count === maxVolume;

                  return (
                    <div
                      key={data.date}
                      className="group relative z-10 flex h-full flex-1 cursor-pointer justify-center"
                    >
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        <span className="font-semibold">{data.date}:</span>{' '}
                        {formatNumber(data.count)} Tweets
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-slate-900" />
                      </div>

                      <div
                        className={`mt-auto w-full max-w-12 rounded-t-sm transition-colors ${
                          isPeak
                            ? 'bg-red-500 group-hover:bg-red-600'
                            : 'bg-slate-200 group-hover:bg-slate-300'
                        }`}
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span>{tweetsOverTime[0]?.date}</span>
                <span>{tweetsOverTime[tweetsOverTime.length - 1]?.date}</span>
              </div>
            </>
          )}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-950">
              Top Keywords
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Most frequent words across collected tweets.
            </p>

            <div className="mt-6 space-y-5">
              {topKeywords.length === 0 ? (
                <p className="text-sm text-slate-500">No keyword data.</p>
              ) : (
                topKeywords.map((kw) => {
                  const maxCount = topKeywords[0]?.count || 1;
                  const widthPct = (kw.count / maxCount) * 100;

                  return (
                    <article key={kw.keyword}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-slate-800">
                          {kw.keyword}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {formatNumber(kw.count)}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-400"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-950">Top Users</h2>
            <p className="mt-1 text-sm text-slate-500">
              Accounts with the most tweets in the dataset.
            </p>

            <div className="mt-6">
              {topUsers.length === 0 ? (
                <p className="text-sm text-slate-500">No user data.</p>
              ) : (
                topUsers.slice(0, 10).map((user) => (
                  <article
                    key={user.userId}
                    className="-mx-2 flex items-center justify-between rounded-lg border-b border-slate-100 px-2 py-3 last:border-0 hover:bg-slate-50/60"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600">
                        {user.userId.charAt(0).toUpperCase()}
                      </div>
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.userId}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {formatNumber(user.count)}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
