import { ChevronDown, LoaderCircle, Plus, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import CreateProjectModal from '@/components/fragments/project/create-project-modal';
import ProjectList from '@/components/fragments/project/project-list';
import { useProjectStore } from '@/stores/project-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import type { Project, ProjectStatus } from '@/types/project';

type ProjectStatusFilter = 'ALL' | ProjectStatus;

type ProjectSort = 'NEWEST' | 'OLDEST' | 'NAME_ASC' | 'NAME_DESC';

type WorkspaceItem = ReturnType<
  typeof useWorkspaceStore.getState
>['workspaces'][number];

interface WorkspaceRouteParams extends Record<string, string | undefined> {
  workspaceId: string;
}

interface WorkspaceProjectsContentProps {
  workspaceId: string;
  activeWorkspace: WorkspaceItem;
}

const PROJECTS_PER_PAGE = 6;

const EMPTY_PROJECTS: Project[] = [];

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): Array<number | 'ELLIPSIS'> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ELLIPSIS', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ELLIPSIS',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'ELLIPSIS',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ELLIPSIS',
    totalPages,
  ];
};

const WorkspaceProjectsContent = ({
  workspaceId,
  activeWorkspace,
}: WorkspaceProjectsContentProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [statusFilter, setStatusFilter] = useState<ProjectStatusFilter>('ALL');

  const [sortBy, setSortBy] = useState<ProjectSort>('NEWEST');

  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  const projectsByWorkspace = useProjectStore(
    (state) => state.projectsByWorkspace,
  );

  const loadingWorkspaceIds = useProjectStore(
    (state) => state.loadingWorkspaceIds,
  );

  const initializedWorkspaceIds = useProjectStore(
    (state) => state.initializedWorkspaceIds,
  );

  const projects = projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS;

  const isLoadingProjects = loadingWorkspaceIds.includes(workspaceId);

  const isProjectsInitialized = initializedWorkspaceIds.includes(workspaceId);

  useEffect(() => {
    void fetchProjects(workspaceId);
  }, [fetchProjects, workspaceId]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const filtered = projects.filter((project) => {
      const normalizedName = project.name.toLowerCase();

      const normalizedKeyword = project.keyword.toLowerCase();

      const normalizedDescription = (project.description ?? '').toLowerCase();

      const normalizedCategory = String(project.category).toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        normalizedName.includes(normalizedSearch) ||
        normalizedKeyword.includes(normalizedSearch) ||
        normalizedDescription.includes(normalizedSearch) ||
        normalizedCategory.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'ALL' || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort(
      (firstProject: Project, secondProject: Project) => {
        switch (sortBy) {
          case 'OLDEST':
            return (
              new Date(firstProject.createdAt).getTime() -
              new Date(secondProject.createdAt).getTime()
            );

          case 'NAME_ASC':
            return firstProject.name.localeCompare(secondProject.name);

          case 'NAME_DESC':
            return secondProject.name.localeCompare(firstProject.name);

          case 'NEWEST':
          default:
            return (
              new Date(secondProject.createdAt).getTime() -
              new Date(firstProject.createdAt).getTime()
            );
        }
      },
    );
  }, [projects, searchQuery, sortBy, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE),
  );

  /*
   * currentPage tetap menyimpan pilihan pengguna.
   * safeCurrentPage digunakan sebagai nilai efektif apabila jumlah halaman
   * berkurang setelah pencarian atau filter berubah.
   */
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedProjects = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PROJECTS_PER_PAGE;

    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, safeCurrentPage]);

  const startResult =
    filteredProjects.length === 0
      ? 0
      : (safeCurrentPage - 1) * PROJECTS_PER_PAGE + 1;

  const endResult = Math.min(
    safeCurrentPage * PROJECTS_PER_PAGE,
    filteredProjects.length,
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 || statusFilter !== 'ALL';

  const visiblePages = getVisiblePages(safeCurrentPage, totalPages);

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: ProjectStatusFilter): void => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: ProjectSort): void => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleResetFilters = (): void => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setSortBy('NEWEST');
    setCurrentPage(1);
  };

  const handlePreviousPage = (): void => {
    setCurrentPage((current) => Math.max(Math.min(current, totalPages) - 1, 1));
  };

  const handleNextPage = (): void => {
    setCurrentPage((current) => Math.min(Math.max(current, 1) + 1, totalPages));
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  if (isLoadingProjects || !isProjectsInitialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin text-red-600" />

          <span>Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Projects
            </h1>

            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              Manage and explore public opinion research in{' '}
              <span className="font-medium text-slate-700">
                {activeWorkspace.name}
              </span>
              .
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsProjectModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Plus size={16} />
            New Project
          </button>
        </header>

        {/* Toolbar */}
        {projects.length > 0 && (
          <section className="mb-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search projects, keywords, or categories"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      handleStatusChange(
                        event.target.value as ProjectStatusFilter,
                      )
                    }
                    className="min-w-40 appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  >
                    <option value="ALL">All statuses</option>

                    <option value="CREATED">Created</option>

                    <option value="CRAWLING">Crawling</option>

                    <option value="MODELING">Modeling</option>

                    <option value="COMPLETED">Completed</option>

                    <option value="FAILED">Failed</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      handleSortChange(event.target.value as ProjectSort)
                    }
                    className="min-w-40 appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  >
                    <option value="NEWEST">Newest first</option>

                    <option value="OLDEST">Oldest first</option>

                    <option value="NAME_ASC">Name A–Z</option>

                    <option value="NAME_DESC">Name Z–A</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex min-h-5 items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                {filteredProjects.length}{' '}
                {filteredProjects.length === 1 ? 'project' : 'projects'} found
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-medium text-red-600 transition hover:text-red-700"
                >
                  Reset filters
                </button>
              )}
            </div>
          </section>
        )}

        {/* Project content */}
        {projects.length === 0 ? (
          <ProjectList
            projects={[]}
            onCreateProject={() => setIsProjectModalOpen(true)}
          />
        ) : filteredProjects.length === 0 ? (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={20} />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-900">
              No matching projects
            </h2>

            <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500">
              No projects match your current search and filters. Try changing
              the keyword or project status.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 text-sm font-medium text-red-600 transition hover:text-red-700"
            >
              Clear search and filters
            </button>
          </section>
        ) : (
          <>
            <ProjectList
              projects={paginatedProjects}
              onCreateProject={() => setIsProjectModalOpen(true)}
            />

            {/* Pagination */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-5 sm:flex-row">
              <p className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-medium text-slate-700">
                  {startResult}
                </span>{' '}
                to{' '}
                <span className="font-medium text-slate-700">{endResult}</span>{' '}
                of{' '}
                <span className="font-medium text-slate-700">
                  {filteredProjects.length}
                </span>{' '}
                projects
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={safeCurrentPage === 1}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {visiblePages.map((item, index) => {
                    if (item === 'ELLIPSIS') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="flex size-9 items-center justify-center text-sm text-slate-400"
                        >
                          …
                        </span>
                      );
                    }

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePageChange(item)}
                        className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                          item === safeCurrentPage
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-500 hover:bg-white hover:text-slate-900'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={safeCurrentPage === totalPages}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        workspaceId={workspaceId}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </>
  );
};

const WorkspacePage = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspace = useMemo(() => {
    if (!workspaceId) {
      return undefined;
    }

    return workspaces.find((workspace) => workspace.id === workspaceId);
  }, [workspaceId, workspaces]);

  if (!workspaceId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!activeWorkspace) {
    return <Navigate to="/workspaces" replace />;
  }

  return (
    <WorkspaceProjectsContent
      key={workspaceId}
      workspaceId={workspaceId}
      activeWorkspace={activeWorkspace}
    />
  );
};

export default WorkspacePage;
