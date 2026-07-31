import { BarChart2, Clock, Globe, Search, Tag } from 'lucide-react';
import { type KeyboardEvent, type MouseEvent } from 'react';
import { useNavigate } from 'react-router';

import type { Project, ProjectStatus } from '@/types/project';

import ProjectActionMenu from './project-action-menu';

interface ProjectCardProps {
  project: Project;
}

interface StatusAppearance {
  label: string;
  className: string;
}

const statusAppearance: Record<ProjectStatus, StatusAppearance> = {
  CREATED: {
    label: 'Created',
    className: 'border-slate-200 bg-slate-100 text-slate-600',
  },
  CRAWLING: {
    label: 'Crawling Data',
    className: 'border-blue-200 bg-blue-50 text-blue-600',
  },
  MODELING: {
    label: 'AI Modeling',
    className: 'border-purple-200 bg-purple-50 text-purple-600',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  FAILED: {
    label: 'Failed',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
};

const categoryLabelMap: Record<string, string> = {
  MARKETING: 'Marketing',
  EDUCATION: 'Education',
  HEALTH: 'Health',
  OTHER: 'Other',
};

const languageLabelMap: Record<string, string> = {
  ID: 'Indonesian',
  EN: 'English',

  /*
   * Compatibility sementara jika masih ada data mock lama.
   */
  id: 'Indonesian',
  en: 'English',
  mixed: 'Mixed',
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

const formatShortDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
};

const getProjectStatus = (project: Project): ProjectStatus => {
  return project.status ?? project.processing?.status ?? 'CREATED';
};

const getProjectTarget = (project: Project): string => {
  const projectStatus = getProjectStatus(project);

  const targetPage = projectStatus === 'COMPLETED' ? 'overview' : 'processing';

  return (
    `/workspaces/${project.workspaceId}` +
    `/projects/${project.id}/${targetPage}`
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const projectStatus = getProjectStatus(project);

  const status = statusAppearance[projectStatus] ?? statusAppearance.CREATED;

  const categoryLabel =
    categoryLabelMap[String(project.category)] ?? String(project.category);

  const languageLabel =
    languageLabelMap[String(project.language)] ?? String(project.language);

  const projectTarget = getProjectTarget(project);

  const isArchived = project.isArchived ?? false;

  const dataLimit = project.dataLimit ?? project.totalTweets ?? 10_000;

  const tweetsRetrieved = project.tweetsRetrieved ?? project.crawledTweets ?? 0;

  const topicsCount = project.topicsCount ?? project.topicCounte ?? 0;

  const handleOpenProject = (): void => {
    navigate(projectTarget);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenProject();
    }
  };

  const handleInteractiveElementClick = (
    event: MouseEvent<HTMLElement>,
  ): void => {
    event.stopPropagation();
  };

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Open project ${project.name}`}
      onClick={handleOpenProject}
      onKeyDown={handleCardKeyDown}
      className="group relative flex h-full cursor-pointer flex-col overflow-visible rounded-xl border border-slate-200 bg-white p-5 outline-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm focus-visible:border-red-400 focus-visible:ring-2 focus-visible:ring-red-500/15"
    >
      {isArchived && (
        <div className="absolute left-4 top-0 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Archived
        </div>
      )}

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-1 text-lg font-semibold leading-tight text-slate-900 transition group-hover:text-red-700">
            {project.name}
          </h2>

          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <Clock size={12} />
            Created {formatDate(project.createdAt)}
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {project.description || 'No project description.'}
          </p>
        </div>

        <div
          onClick={handleInteractiveElementClick}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <ProjectActionMenu project={project} />
        </div>
      </div>

      <div className="mt-auto space-y-3 pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
            <Tag size={12} className="text-slate-400" />

            {categoryLabel}
          </span>

          <span className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
            <Globe size={12} className="text-slate-400" />

            {languageLabel}
          </span>
        </div>

        <div className="flex items-start gap-2.5 rounded-lg bg-slate-50/70 p-2.5">
          <Search size={14} className="mt-0.5 shrink-0 text-slate-400" />

          <div className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Search topic
            </span>

            <span className="mt-0.5 block truncate text-sm font-medium text-slate-800">
              {project.keyword}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-3">
          <div>
            <p className="text-[11px] font-medium text-slate-500">
              Data period
            </p>

            <p className="mt-1 text-xs font-medium text-slate-800">
              {formatShortDate(project.startDate)}
              {' – '}
              {formatShortDate(project.endDate)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 text-right">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${status.className}`}
            >
              {status.label}
            </span>

            {projectStatus === 'COMPLETED' ? (
              <p className="text-[10px] font-medium text-slate-500">
                <strong className="text-slate-700">
                  {tweetsRetrieved.toLocaleString('en-US')}
                </strong>{' '}
                posts
                <span className="mx-1.5 text-slate-300">•</span>
                <strong className="text-slate-700">
                  {topicsCount.toLocaleString('en-US')}
                </strong>{' '}
                topics
              </p>
            ) : (
              <p className="text-[10px] font-medium text-slate-400">
                Target: {dataLimit.toLocaleString('en-US')} posts
              </p>
            )}
          </div>
        </div>
      </div>

      {projectStatus === 'COMPLETED' && !isArchived && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1.5 rounded-b-xl border-t border-slate-100 bg-white/95 p-3.5 text-sm font-semibold text-red-600 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0">
          <BarChart2 size={16} />
          View Dashboard Analytics
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
