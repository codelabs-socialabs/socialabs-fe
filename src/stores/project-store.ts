import { create } from 'zustand';

import { projectApi } from '@/lib/api/project-api';
import type {
  CreateProjectInput,
  Project,
  ProjectAnalytics,
  UpdateProjectInput,
} from '@/types/project';

interface ProjectState {
  projectsByWorkspace: Record<string, Project[]>;

  loadingWorkspaceIds: string[];
  initializedWorkspaceIds: string[];

  creatingWorkspaceIds: string[];
  updatingProjectIds: string[];
  deletingProjectIds: string[];

  error: string | null;

  getProjectsByWorkspaceId: (workspaceId: string) => Project[];

  isWorkspaceLoading: (workspaceId: string) => boolean;

  isWorkspaceInitialized: (workspaceId: string) => boolean;

  isCreatingProject: (workspaceId: string) => boolean;

  isUpdatingProject: (projectId: string) => boolean;

  isDeletingProject: (projectId: string) => boolean;

  analyticsByProjectId: Record<string, ProjectAnalytics | null>;
  analyticsLoadingIds: string[];
  failedAnalyticsFetchIds: string[];

  isAnalyticsLoading: (projectId: string) => boolean;
  hasAnalyticsFailed: (projectId: string) => boolean;
  getAnalytics: (projectId: string) => ProjectAnalytics | null;

  recrawlProject: (workspaceId: string, projectId: string) => Promise<boolean>;

  applyProgressEvent: (
    projectId: string,
    event: {
      status: Project['processing']['status'];
      stage?: string | null;
      progress: number;
      crawledTweets?: number;
      error?: { stage: string; message: string } | null;
    },
  ) => void;

  fetchProjectAnalytics: (
    workspaceId: string,
    projectId: string,
  ) => Promise<ProjectAnalytics | null>;

  fetchProjects: (workspaceId: string, force?: boolean) => Promise<Project[]>;

  fetchProjectById: (
    workspaceId: string,
    projectId: string,
  ) => Promise<Project | null>;

  createProject: (
    workspaceId: string,
    input: CreateProjectInput,
  ) => Promise<Project | null>;

  updateProject: (
    workspaceId: string,
    projectId: string,
    input: UpdateProjectInput,
  ) => Promise<Project | null>;

  deleteProject: (workspaceId: string, projectId: string) => Promise<boolean>;

  duplicateProject: (
    workspaceId: string,
    projectId: string,
  ) => Promise<Project | null>;

  clearWorkspaceProjects: (workspaceId: string) => void;

  resetProjectStore: () => void;
}

const EMPTY_PROJECTS: Project[] = [];

const initialState = {
  projectsByWorkspace: {} as Record<string, Project[]>,

  loadingWorkspaceIds: [] as string[],
  initializedWorkspaceIds: [] as string[],

  creatingWorkspaceIds: [] as string[],
  updatingProjectIds: [] as string[],
  deletingProjectIds: [] as string[],

  analyticsByProjectId: {} as Record<string, ProjectAnalytics | null>,
  analyticsLoadingIds: [] as string[],
  failedAnalyticsFetchIds: [] as string[],

  error: null as string | null,
};

const addUniqueValue = (values: string[], value: string): string[] => {
  if (values.includes(value)) {
    return values;
  }

  return [...values, value];
};

const removeValue = (values: string[], value: string): string[] => {
  if (!values.includes(value)) {
    return values;
  }

  return values.filter((item) => item !== value);
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const normalizeProject = (project: Project, workspaceId: string): Project => {
  const processingStatus =
    project.processing?.status ?? project.status ?? 'CREATED';

  const totalTweets = Number.isFinite(project.totalTweets)
    ? Math.max(project.totalTweets, 0)
    : 0;

  const crawledTweets = Number.isFinite(project.crawledTweets)
    ? Math.max(project.crawledTweets, 0)
    : 0;

  const topicCount = Number.isFinite(project.topicCounte)
    ? Math.max(project.topicCounte, 0)
    : 0;

  return {
    ...project,

    workspaceId: project.workspaceId ?? workspaceId,

    description: project.description ?? '',

    processing: {
      status: processingStatus,

      stage: project.processing?.stage ?? null,

      progress: Number.isFinite(project.processing?.progress)
        ? Math.min(Math.max(project.processing.progress, 0), 100)
        : 0,

      error: project.processing?.error ?? null,
    },

    totalTweets,
    crawledTweets,

    topicCounte: topicCount,

    createdAt: project.createdAt ?? new Date().toISOString(),

    updatedAt:
      project.updatedAt ?? project.createdAt ?? new Date().toISOString(),

    /*
     * Compatibility field lama.
     */
    status: processingStatus,

    /*
     * Belum tersedia dari backend.
     */
    isArchived: project.isArchived ?? false,

    /*
     * Sementara menggunakan totalTweets.
     * Jika totalTweets belum tersedia, gunakan dummy 10.000.
     */
    dataLimit: project.dataLimit ?? (totalTweets > 0 ? totalTweets : 10_000),

    /*
     * Mapping crawledTweets ke nama field UI lama.
     */
    tweetsRetrieved: project.tweetsRetrieved ?? crawledTweets,

    /*
     * Mapping typo backend topicCounte ke nama UI lama.
     */
    topicsCount: project.topicsCount ?? topicCount,
  };
};

const upsertProject = (projects: Project[], project: Project): Project[] => {
  const projectExists = projects.some((item) => item.id === project.id);

  if (!projectExists) {
    return [project, ...projects];
  }

  return projects.map((item) => (item.id === project.id ? project : item));
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  ...initialState,

  getProjectsByWorkspaceId: (workspaceId): Project[] => {
    return get().projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS;
  },

  isWorkspaceLoading: (workspaceId): boolean => {
    return get().loadingWorkspaceIds.includes(workspaceId);
  },

  isWorkspaceInitialized: (workspaceId): boolean => {
    return get().initializedWorkspaceIds.includes(workspaceId);
  },

  isCreatingProject: (workspaceId): boolean => {
    return get().creatingWorkspaceIds.includes(workspaceId);
  },

  isUpdatingProject: (projectId): boolean => {
    return get().updatingProjectIds.includes(projectId);
  },

  isDeletingProject: (projectId): boolean => {
    return get().deletingProjectIds.includes(projectId);
  },

  fetchProjects: async (workspaceId, force = false): Promise<Project[]> => {
    const state = get();

    const currentProjects =
      state.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS;

    if (!force && state.initializedWorkspaceIds.includes(workspaceId)) {
      return currentProjects;
    }

    if (state.loadingWorkspaceIds.includes(workspaceId)) {
      return currentProjects;
    }

    set((current) => ({
      loadingWorkspaceIds: addUniqueValue(
        current.loadingWorkspaceIds,
        workspaceId,
      ),
      error: null,
    }));

    try {
      const response = await projectApi.getProjects(workspaceId);

      const responseProjects = Array.isArray(response.data)
        ? response.data
        : [];

      const projects = responseProjects.map((project) =>
        normalizeProject(project, workspaceId),
      );

      set((current) => ({
        projectsByWorkspace: {
          ...current.projectsByWorkspace,
          [workspaceId]: projects,
        },

        initializedWorkspaceIds: addUniqueValue(
          current.initializedWorkspaceIds,
          workspaceId,
        ),

        error: null,
      }));

      return projects;
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Unable to load projects.'),
      });

      return currentProjects;
    } finally {
      set((current) => ({
        loadingWorkspaceIds: removeValue(
          current.loadingWorkspaceIds,
          workspaceId,
        ),
      }));
    }
  },

  fetchProjectById: async (workspaceId, projectId): Promise<Project | null> => {
    const existingProject = get().projectsByWorkspace[workspaceId]?.find(
      (project) => project.id === projectId,
    );

    if (existingProject) {
      return existingProject;
    }

    try {
      const response = await projectApi.getProject(workspaceId, projectId);

      const project = normalizeProject(response.data, workspaceId);

      set((current) => {
        const workspaceProjects =
          current.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS;

        return {
          projectsByWorkspace: {
            ...current.projectsByWorkspace,

            [workspaceId]: upsertProject(workspaceProjects, project),
          },
        };
      });

      return project;
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Unable to load project.'),
      });

      return null;
    }
  },

  createProject: async (workspaceId, input): Promise<Project | null> => {
    if (get().creatingWorkspaceIds.includes(workspaceId)) {
      return null;
    }

    set((current) => ({
      creatingWorkspaceIds: addUniqueValue(
        current.creatingWorkspaceIds,
        workspaceId,
      ),
      error: null,
    }));

    try {
      const response = await projectApi.createProject(workspaceId, input);

      const project = normalizeProject(response.data, workspaceId);

      set((current) => {
        const workspaceProjects =
          current.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS;

        return {
          projectsByWorkspace: {
            ...current.projectsByWorkspace,

            [workspaceId]: upsertProject(workspaceProjects, project),
          },

          initializedWorkspaceIds: addUniqueValue(
            current.initializedWorkspaceIds,
            workspaceId,
          ),

          error: null,
        };
      });

      return project;
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Unable to create project.'),
      });

      throw error;
    } finally {
      set((current) => ({
        creatingWorkspaceIds: removeValue(
          current.creatingWorkspaceIds,
          workspaceId,
        ),
      }));
    }
  },

  updateProject: async (
    workspaceId,
    projectId,
    input,
  ): Promise<Project | null> => {
    if (get().updatingProjectIds.includes(projectId)) {
      return null;
    }

    set((current) => ({
      updatingProjectIds: addUniqueValue(current.updatingProjectIds, projectId),
      error: null,
    }));

    try {
      const response = await projectApi.updateProject(
        workspaceId,
        projectId,
        input,
      );

      const updatedProject = normalizeProject(response.data, workspaceId);

      set((current) => ({
        projectsByWorkspace: {
          ...current.projectsByWorkspace,

          [workspaceId]: (
            current.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS
          ).map((project) =>
            project.id === projectId ? updatedProject : project,
          ),
        },

        error: null,
      }));

      return updatedProject;
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Unable to update project.'),
      });

      throw error;
    } finally {
      set((current) => ({
        updatingProjectIds: removeValue(current.updatingProjectIds, projectId),
      }));
    }
  },

  deleteProject: async (workspaceId, projectId): Promise<boolean> => {
    if (get().deletingProjectIds.includes(projectId)) {
      return false;
    }

    set((current) => ({
      deletingProjectIds: addUniqueValue(current.deletingProjectIds, projectId),
      error: null,
    }));

    try {
      await projectApi.deleteProject(workspaceId, projectId);

      set((current) => ({
        projectsByWorkspace: {
          ...current.projectsByWorkspace,

          [workspaceId]: (
            current.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS
          ).filter((project) => project.id !== projectId),
        },

        error: null,
      }));

      return true;
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Unable to delete project.'),
      });

      throw error;
    } finally {
      set((current) => ({
        deletingProjectIds: removeValue(current.deletingProjectIds, projectId),
      }));
    }
  },

  duplicateProject: async (workspaceId, projectId): Promise<Project | null> => {
    const project = get().projectsByWorkspace[workspaceId]?.find(
      (item) => item.id === projectId,
    );

    if (!project) {
      return null;
    }

    return get().createProject(workspaceId, {
      category: project.category,

      name: `${project.name} Copy`,

      description: project.description,

      keyword: project.keyword,

      startDate: project.startDate,

      endDate: project.endDate,

      language: project.language,
    });
  },

  clearWorkspaceProjects: (workspaceId): void => {
    set((current) => {
      const nextProjects = {
        ...current.projectsByWorkspace,
      };

      delete nextProjects[workspaceId];

      return {
        projectsByWorkspace: nextProjects,

        loadingWorkspaceIds: removeValue(
          current.loadingWorkspaceIds,
          workspaceId,
        ),

        initializedWorkspaceIds: removeValue(
          current.initializedWorkspaceIds,
          workspaceId,
        ),

        creatingWorkspaceIds: removeValue(
          current.creatingWorkspaceIds,
          workspaceId,
        ),
      };
    });
  },

  isAnalyticsLoading: (projectId): boolean => {
    return get().analyticsLoadingIds.includes(projectId);
  },

  hasAnalyticsFailed: (projectId): boolean => {
    return get().failedAnalyticsFetchIds.includes(projectId);
  },

  getAnalytics: (projectId): ProjectAnalytics | null => {
    return get().analyticsByProjectId[projectId] ?? null;
  },

  recrawlProject: async (workspaceId, projectId): Promise<boolean> => {
    try {
      await projectApi.recrawlProject(workspaceId, projectId);

      set((current) => ({
        projectsByWorkspace: {
          ...current.projectsByWorkspace,
          [workspaceId]: (
            current.projectsByWorkspace[workspaceId] ?? EMPTY_PROJECTS
          ).map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  processing: {
                    status: 'CREATED',
                    stage: null,
                    progress: 0,
                    error: null,
                    jobId: null,
                  },
                  totalTweets: 0,
                  crawledTweets: 0,
                }
              : project,
          ),
        },
      }));

      return true;
    } catch (error) {
      set({ error: getErrorMessage(error, 'Unable to recrawl project.') });
      return false;
    }
  },

  applyProgressEvent: (projectId, event) => {
    set((current) => {
      const updatedWorkspaces: Record<string, Project[]> = {};

      for (const [workspaceId, projects] of Object.entries(
        current.projectsByWorkspace,
      )) {
        const hasProject = projects.some((p) => p.id === projectId);
        if (!hasProject) continue;

        updatedWorkspaces[workspaceId] = projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                processing: {
                  ...project.processing,
                  status: event.status,
                  stage: event.stage ?? null,
                  progress: event.progress,
                  error: event.error ?? null,
                },
                crawledTweets: event.crawledTweets ?? project.crawledTweets,
                tweetsRetrieved: event.crawledTweets ?? project.tweetsRetrieved,
                status: event.status,
              }
            : project,
        );
      }

      if (Object.keys(updatedWorkspaces).length === 0) {
        return {};
      }

      return {
        projectsByWorkspace: {
          ...current.projectsByWorkspace,
          ...updatedWorkspaces,
        },
      };
    });
  },

  fetchProjectAnalytics: async (
    workspaceId,
    projectId,
  ): Promise<ProjectAnalytics | null> => {
    if (get().analyticsLoadingIds.includes(projectId)) {
      return get().analyticsByProjectId[projectId] ?? null;
    }

    set((current) => ({
      analyticsLoadingIds: addUniqueValue(
        current.analyticsLoadingIds,
        projectId,
      ),
    }));

    try {
      const response = await projectApi.getProjectAnalytics(
        workspaceId,
        projectId,
      );

      const analytics = response.data;

      set((current) => ({
        analyticsByProjectId: {
          ...current.analyticsByProjectId,
          [projectId]: analytics,
        },
        failedAnalyticsFetchIds: removeValue(
          current.failedAnalyticsFetchIds,
          projectId,
        ),
      }));

      return analytics;
    } catch (error) {
      set((current) => ({
        failedAnalyticsFetchIds: addUniqueValue(
          current.failedAnalyticsFetchIds,
          projectId,
        ),
        error: getErrorMessage(error, 'Unable to load analytics.'),
      }));
      return null;
    } finally {
      set((current) => ({
        analyticsLoadingIds: removeValue(
          current.analyticsLoadingIds,
          projectId,
        ),
      }));
    }
  },

  resetProjectStore: (): void => {
    set({
      projectsByWorkspace: {},
      loadingWorkspaceIds: [],
      initializedWorkspaceIds: [],
      creatingWorkspaceIds: [],
      updatingProjectIds: [],
      deletingProjectIds: [],
      analyticsByProjectId: {},
      analyticsLoadingIds: [],
      failedAnalyticsFetchIds: [],
      error: null,
    });
  },
}));
