import {
  AlertTriangle,
  Check,
  HelpCircle,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { getProjectsByWorkspaceId } from '@/data/mocks/projects';
import { useWorkspaceStore } from '@/stores/workspace-store';
import {
  WorkspacePlan,
  WorkspaceRole,
  type WorkspaceUsage,
} from '@/types/workspace';

type SettingsTab = 'general' | 'usage';

type WorkspaceItem = ReturnType<
  typeof useWorkspaceStore.getState
>['workspaces'][number];

interface WorkspaceRouteParams {
  workspaceId: string;
}

interface WorkspaceFormState {
  name: string;
  description: string;
}

interface WorkspaceSettingsContentProps {
  workspace: WorkspaceItem;
}

const WORKSPACE_NAME_MIN_LENGTH = 2;
const WORKSPACE_NAME_MAX_LENGTH = 80;
const WORKSPACE_DESCRIPTION_MAX_LENGTH = 300;

const workspaceProjectLimits: Record<WorkspacePlan, number> = {
  [WorkspacePlan.FREE]: 2,
  [WorkspacePlan.PRO]: 5,
  [WorkspacePlan.ENTERPRISE]: 25,
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

const workspaceManagerRoles: WorkspaceRole[] = [
  WorkspaceRole.OWNER,
  WorkspaceRole.ADMIN,
];

const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const normalizeWorkspaceUsage = (
  usage: WorkspaceUsage | undefined,
  plan: WorkspacePlan,
): WorkspaceUsage => {
  const fallback = workspaceUsageFallback[plan];

  if (!usage) {
    return fallback;
  }

  const used = Number.isFinite(usage.used)
    ? Math.max(usage.used, 0)
    : fallback.used;

  const limit = Number.isFinite(usage.limit)
    ? Math.max(usage.limit, 0)
    : fallback.limit;

  return {
    used,
    limit,
  };
};

const WorkspaceSettingsContent = ({
  workspace,
}: WorkspaceSettingsContentProps) => {
  const navigate = useNavigate();

  const savedStatusTimerRef = useRef<number | null>(null);

  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState<string>('');

  const [form, setForm] = useState<WorkspaceFormState>(() => ({
    name: workspace.name,
    description: workspace.description ?? '',
  }));

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const isUpdating = useWorkspaceStore((state) => state.isUpdating);

  const isDeleting = useWorkspaceStore((state) => state.isDeleting);

  const updateWorkspace = useWorkspaceStore((state) => state.updateWorkspace);

  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);

  const personalWorkspace = useMemo(
    () => workspaces.find((item) => item.isPersonal),
    [workspaces],
  );

  useEffect(() => {
    return () => {
      if (savedStatusTimerRef.current !== null) {
        window.clearTimeout(savedStatusTimerRef.current);
      }
    };
  }, []);

  /*
   * Fallback OWNER hanya digunakan sementara jika backend
   * belum mengirim role user pada workspace.
   */
  const workspaceRole = workspace.role ?? WorkspaceRole.OWNER;

  const canManageWorkspace = workspaceManagerRoles.includes(workspaceRole);

  const canDeleteWorkspace =
    workspaceRole === WorkspaceRole.OWNER && !workspace.isPersonal;

  /*
   * Route settings seharusnya sudah disembunyikan dari sidebar
   * untuk role yang tidak memiliki izin. Guard ini mencegah
   * akses langsung melalui URL.
   */
  if (!canManageWorkspace) {
    return <Navigate to={`/workspaces/${workspace.id}/overview`} replace />;
  }

  const projects = getProjectsByWorkspaceId(workspace.id);

  const projectsLimit = workspaceProjectLimits[workspace.plan];

  const workspaceUsage = normalizeWorkspaceUsage(
    workspace.usage,
    workspace.plan,
  );

  const projectsUsed = projects.length;

  const projectPercentage =
    projectsLimit > 0
      ? Math.min(Math.max((projectsUsed / projectsLimit) * 100, 0), 100)
      : 0;

  const dataPercentage =
    workspaceUsage.limit > 0
      ? Math.min(
          Math.max((workspaceUsage.used / workspaceUsage.limit) * 100, 0),
          100,
        )
      : 0;

  const normalizedFormName = form.name.trim();

  const normalizedFormDescription = form.description.trim();

  const currentWorkspaceDescription = workspace.description?.trim() ?? '';

  const hasChanges =
    normalizedFormName !== workspace.name.trim() ||
    normalizedFormDescription !== currentWorkspaceDescription;

  const isFormValid =
    normalizedFormName.length >= WORKSPACE_NAME_MIN_LENGTH &&
    normalizedFormName.length <= WORKSPACE_NAME_MAX_LENGTH &&
    normalizedFormDescription.length <= WORKSPACE_DESCRIPTION_MAX_LENGTH;

  const isDeleteConfirmationValid = deleteConfirmation === workspace.name;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm((current) => ({
      ...current,
      name: event.target.value,
    }));

    setIsSaved(false);
  };

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setForm((current) => ({
      ...current,
      description: event.target.value,
    }));

    setIsSaved(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (isUpdating || !isFormValid || !hasChanges || !canManageWorkspace) {
      return;
    }

    try {
      const updatedWorkspace = await updateWorkspace(workspace.id, {
        name: normalizedFormName,
        description: normalizedFormDescription,
      });

      if (!updatedWorkspace) {
        return;
      }

      setForm({
        name: updatedWorkspace.name,
        description: updatedWorkspace.description ?? '',
      });

      setIsSaved(true);

      if (savedStatusTimerRef.current !== null) {
        window.clearTimeout(savedStatusTimerRef.current);
      }

      savedStatusTimerRef.current = window.setTimeout(() => {
        setIsSaved(false);
        savedStatusTimerRef.current = null;
      }, 2000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to save workspace changes.';

      toast.error('Workspace could not be updated.', {
        description: message,
      });
    }
  };

  const handleOpenDeleteModal = (): void => {
    if (!canDeleteWorkspace || isDeleting) {
      return;
    }

    setDeleteConfirmation('');
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (): void => {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
    setDeleteConfirmation('');
  };

  const handleDeleteWorkspace = async (): Promise<void> => {
    if (!canDeleteWorkspace || isDeleting || !isDeleteConfirmationValid) {
      return;
    }

    try {
      const success = await deleteWorkspace(workspace.id);

      if (!success) {
        return;
      }

      setIsDeleteModalOpen(false);
      setDeleteConfirmation('');

      toast.success('Workspace deleted successfully.');

      const nextWorkspace =
        personalWorkspace && personalWorkspace.id !== workspace.id
          ? personalWorkspace
          : workspaces.find((item) => item.id !== workspace.id);

      if (nextWorkspace) {
        navigate(`/workspaces/${nextWorkspace.id}/overview`, {
          replace: true,
        });

        return;
      }

      navigate('/workspace', {
        replace: true,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to delete this workspace.';

      toast.error('Workspace could not be deleted.', {
        description: message,
      });
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Settings Navigation */}
          <aside className="w-full shrink-0 lg:w-52">
            <div className="lg:sticky lg:top-8">
              <div className="mb-5">
                <h1 className="text-sm font-semibold text-slate-900">
                  Workspace Settings
                </h1>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Manage workspace preferences and usage.
                </p>
              </div>

              <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 pb-3 lg:flex-col lg:border-b-0 lg:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className={`shrink-0 rounded-md px-3 py-2 text-left text-sm font-medium transition lg:w-full ${
                    activeTab === 'general'
                      ? 'bg-slate-100 text-slate-950'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  General
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('usage')}
                  className={`shrink-0 rounded-md px-3 py-2 text-left text-sm font-medium transition lg:w-full ${
                    activeTab === 'usage'
                      ? 'bg-slate-100 text-slate-950'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  Plan & Usage
                </button>
              </nav>
            </div>
          </aside>

          {/* Settings Content */}
          <div className="min-w-0 flex-1 lg:border-l lg:border-slate-200 lg:pl-12">
            {activeTab === 'general' && (
              <section className="max-w-3xl">
                <header className="mb-9">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    General Settings
                  </h2>

                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    Manage the name, description, and lifecycle of this
                    workspace.
                  </p>
                </header>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-7">
                    <div>
                      <label
                        htmlFor="workspace-name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Workspace Name
                      </label>

                      <input
                        id="workspace-name"
                        type="text"
                        value={form.name}
                        onChange={handleNameChange}
                        placeholder="Workspace name"
                        maxLength={WORKSPACE_NAME_MAX_LENGTH}
                        disabled={isUpdating}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                      />

                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        This name appears in the workspace switcher and project
                        navigation.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="workspace-description"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Description
                      </label>

                      <textarea
                        id="workspace-description"
                        rows={4}
                        value={form.description}
                        onChange={handleDescriptionChange}
                        placeholder="Briefly describe this workspace"
                        maxLength={WORKSPACE_DESCRIPTION_MAX_LENGTH}
                        disabled={isUpdating}
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                    <div className="min-h-5">
                      {isSaved && (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                          <Check size={15} />
                          Changes saved
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isUpdating || !isFormValid || !hasChanges}
                      className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>

                {/* Danger Zone */}
                <section className="mt-14 border-t border-slate-200 pt-9">
                  <div className="mb-5">
                    <h2 className="text-base font-semibold text-slate-950">
                      Danger Zone
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Destructive actions related to this workspace.
                    </p>
                  </div>

                  <div className="rounded-xl border border-red-200 bg-red-50/40 p-5">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900">
                          Delete Workspace
                        </h3>

                        {workspace.isPersonal ? (
                          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                            Personal Workspace is the primary workspace for your
                            account and cannot be deleted.
                          </p>
                        ) : (
                          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                            Permanently delete this workspace, its projects, and
                            all analyzed data. This action cannot be undone.
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        disabled={!canDeleteWorkspace || isDeleting}
                        onClick={handleOpenDeleteModal}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-white"
                      >
                        <Trash2 size={15} />
                        Delete Workspace
                      </button>
                    </div>
                  </div>
                </section>
              </section>
            )}

            {activeTab === 'usage' && (
              <section className="max-w-3xl">
                <header className="mb-9">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    Plan & Usage
                  </h2>

                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    Review the plan and resource usage for this workspace.
                  </p>
                </header>

                {/* Billing Information */}
                <div className="mb-10 flex gap-3 rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-3.5">
                  <HelpCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-blue-950">
                      Billing is managed through your account
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-blue-800">
                      This workspace currently uses the{' '}
                      <strong>{workspace.plan} Plan</strong>. Payment methods,
                      upgrades, and invoices are managed through account
                      settings.
                    </p>

                    <Link
                      to="/settings/account"
                      className="mt-2 inline-flex text-sm font-semibold text-blue-800 underline underline-offset-2 transition hover:text-blue-950"
                    >
                      Open account settings
                    </Link>
                  </div>
                </div>

                {/* Active Plan */}
                <section>
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Active Plan
                      </span>

                      <div className="mt-1.5 flex items-center gap-2.5">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                          {workspace.plan} Plan
                        </h3>

                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                          Active
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/pricing"
                      className="text-sm font-medium text-red-600 transition hover:text-red-700"
                    >
                      Compare plans
                    </Link>
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <ShieldCheck
                        size={17}
                        className="shrink-0 text-red-500"
                      />
                      Up to {projectsLimit} active projects
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <ShieldCheck
                        size={17}
                        className="shrink-0 text-red-500"
                      />
                      {formatCompactNumber(workspaceUsage.limit)} data quota
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <ShieldCheck
                        size={17}
                        className="shrink-0 text-red-500"
                      />
                      AI-generated research insights
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <ShieldCheck
                        size={17}
                        className="shrink-0 text-red-500"
                      />
                      Interactive analysis visualizations
                    </div>
                  </div>
                </section>

                {/* Current Usage */}
                <section className="mt-12 border-t border-slate-200 pt-9">
                  <div className="mb-7">
                    <h3 className="text-base font-semibold text-slate-950">
                      Current Workspace Usage
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Usage values are currently generated from dummy workspace
                      and project data.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Project Usage */}
                    <div>
                      <div className="mb-3 flex items-end justify-between gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-slate-800">
                            Active Projects
                          </h4>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Research projects available in this workspace
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-semibold text-slate-800">
                          {projectsUsed}{' '}
                          <span className="font-normal text-slate-400">
                            / {projectsLimit}
                          </span>
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-800 transition-all"
                          style={{
                            width: `${projectPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Data Usage */}
                    <div>
                      <div className="mb-3 flex items-end justify-between gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-slate-800">
                            Data Extracted
                          </h4>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Total public conversations processed in this
                            workspace
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-semibold text-slate-800">
                          {formatCompactNumber(workspaceUsage.used)}{' '}
                          <span className="font-normal text-slate-400">
                            / {formatCompactNumber(workspaceUsage.limit)}
                          </span>
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-red-500 transition-all"
                          style={{
                            width: `${dataPercentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            )}
          </div>
        </div>
      </div>

      {isDeleteModalOpen && canDeleteWorkspace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 p-5">
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={20} />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Delete workspace
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                This will permanently delete{' '}
                <strong className="text-slate-700">{workspace.name}</strong>,
                all of its projects, and its analyzed data.
              </p>
            </div>

            <div className="p-5">
              <label
                htmlFor="delete-confirmation"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Type <strong>{workspace.name}</strong> to confirm
              </label>

              <input
                id="delete-confirmation"
                type="text"
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                disabled={isDeleting}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2.5 border-t border-slate-100 p-5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleCloseDeleteModal}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting || !isDeleteConfirmationValid}
                onClick={handleDeleteWorkspace}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const WorkspaceSettingsPage = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const isInitialized = useWorkspaceStore((state) => state.isInitialized);

  const isLoading = useWorkspaceStore((state) => state.isLoading);

  const workspace = useMemo(
    () => workspaces.find((item) => item.id === workspaceId),
    [workspaceId, workspaces],
  );

  if (!workspaceId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!isInitialized || isLoading) {
    return null;
  }

  if (!workspace) {
    return <Navigate to="/workspaces" replace />;
  }

  return <WorkspaceSettingsContent key={workspace.id} workspace={workspace} />;
};

export default WorkspaceSettingsPage;
