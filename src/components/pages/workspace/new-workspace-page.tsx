import logo from '@/assets/socialabs-logo.png';

import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronRight,
  LoaderCircle,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { workspaceApi } from '@/lib/api/workspace-api';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { ApiError } from '@/types/api';
import { WorkspacePlan, type CreateWorkspaceInput } from '@/types/workspace';

interface WorkspaceFormState {
  name: string;
  description: string;
  plan: WorkspacePlan;
}

interface WorkspaceFormErrors {
  name?: string;
  description?: string;
  plan?: string;
  general?: string;
}

interface WorkspacePlanOption {
  value: WorkspacePlan;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  badge?: string;
  features: string[];
}

const WORKSPACE_NAME_MIN_LENGTH = 3;
const WORKSPACE_NAME_MAX_LENGTH = 80;
const WORKSPACE_DESCRIPTION_MAX_LENGTH = 300;

const initialFormState: WorkspaceFormState = {
  name: '',
  description: '',
  plan: WorkspacePlan.PRO,
};

const workspacePlanOptions: WorkspacePlanOption[] = [
  {
    value: WorkspacePlan.FREE,
    name: 'Free',
    description: 'For individuals and early research projects.',
    price: 'Free',
    features: ['Essential analytics', 'Standard project limits'],
  },
  {
    value: WorkspacePlan.PRO,
    name: 'Pro',
    description: 'For professionals and growing research teams.',
    price: '$49',
    priceSuffix: '/ month',
    badge: 'Recommended',
    features: ['Advanced AI insights', 'Higher data limits'],
  },
  {
    value: WorkspacePlan.ENTERPRISE,
    name: 'Enterprise',
    description: 'For organizations with large-scale analysis needs.',
    price: 'Custom',
    features: ['Custom data volume', 'Priority support'],
  },
];

const delay = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const NewWorkspacePage = () => {
  const navigate = useNavigate();

  const workspaceNameRef = useRef<HTMLInputElement>(null);
  const workspaceDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const firstPlanRef = useRef<HTMLInputElement>(null);

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const isWorkspaceInitialized = useWorkspaceStore(
    (state) => state.isInitialized,
  );

  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  const [form, setForm] = useState<WorkspaceFormState>(initialFormState);

  const [errors, setErrors] = useState<WorkspaceFormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasExistingWorkspace = isWorkspaceInitialized && workspaces.length > 0;

  useEffect(() => {
    workspaceNameRef.current?.focus();
  }, []);

  const validateWorkspaceName = (value = form.name): string | undefined => {
    const workspaceName = value.trim();

    if (!workspaceName) {
      return 'Workspace name is required.';
    }

    if (workspaceName.length < WORKSPACE_NAME_MIN_LENGTH) {
      return `Workspace name must contain at least ${WORKSPACE_NAME_MIN_LENGTH} characters.`;
    }

    if (workspaceName.length > WORKSPACE_NAME_MAX_LENGTH) {
      return `Workspace name cannot exceed ${WORKSPACE_NAME_MAX_LENGTH} characters.`;
    }

    return undefined;
  };

  const validateWorkspaceDescription = (
    value = form.description,
  ): string | undefined => {
    const description = value.trim();

    if (description.length > WORKSPACE_DESCRIPTION_MAX_LENGTH) {
      return `Description cannot exceed ${WORKSPACE_DESCRIPTION_MAX_LENGTH} characters.`;
    }

    return undefined;
  };

  const validateWorkspacePlan = (value = form.plan): string | undefined => {
    if (!Object.values(WorkspacePlan).includes(value)) {
      return 'Select a valid workspace plan.';
    }

    return undefined;
  };

  const validateForm = (): WorkspaceFormErrors => {
    const validationErrors: WorkspaceFormErrors = {
      name: validateWorkspaceName(),
      description: validateWorkspaceDescription(),
      plan: validateWorkspacePlan(),
    };

    return Object.fromEntries(
      Object.entries(validationErrors).filter(([, value]) => Boolean(value)),
    ) as WorkspaceFormErrors;
  };

  const focusFirstInvalidField = (
    validationErrors: WorkspaceFormErrors,
  ): void => {
    if (validationErrors.name) {
      workspaceNameRef.current?.focus();
      return;
    }

    if (validationErrors.description) {
      workspaceDescriptionRef.current?.focus();
      return;
    }

    if (validationErrors.plan) {
      firstPlanRef.current?.focus();
    }
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      general: undefined,
    }));
  };

  const handleFieldBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;

    if (name === 'name') {
      setErrors((currentErrors) => ({
        ...currentErrors,
        name: validateWorkspaceName(value),
      }));

      return;
    }

    if (name === 'description') {
      setErrors((currentErrors) => ({
        ...currentErrors,
        description: validateWorkspaceDescription(value),
      }));
    }
  };

  const handlePlanChange = (plan: WorkspacePlan): void => {
    setForm((currentForm) => ({
      ...currentForm,
      plan,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      plan: undefined,
      general: undefined,
    }));
  };

  const applyBackendErrors = (error: ApiError): void => {
    if (!error.errors) {
      setErrors({
        general: error.message,
      });

      return;
    }

    const backendErrors: WorkspaceFormErrors = {
      name: error.errors.name?.[0],
      description: error.errors.description?.[0],
      plan: error.errors.plan?.[0],
    };

    const hasFieldError = Object.values(backendErrors).some(Boolean);

    setErrors({
      ...backendErrors,
      general: hasFieldError ? undefined : error.message,
    });

    window.requestAnimationFrame(() => {
      focusFirstInvalidField(backendErrors);
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstInvalidField(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const payload: CreateWorkspaceInput = {
      name: form.name.trim(),
      description: form.description.trim(),
      plan: form.plan,
    };

    const minimumLoadingDelay = import.meta.env.DEV
      ? delay(700)
      : Promise.resolve();

    try {
      const [response] = await Promise.all([
        workspaceApi.createWorkspace(payload),
        minimumLoadingDelay,
      ]);

      addWorkspace(response.data);

      toast.success('Workspace created successfully.', {
        description: `Opening ${response.data.name}...`,
        duration: 2400,
      });

      await delay(600);

      navigate(`/workspaces/${response.data.id}/overview`, {
        replace: true,
      });
    } catch (error) {
      await minimumLoadingDelay;

      if (error instanceof ApiError) {
        applyBackendErrors(error);
        return;
      }

      setErrors({
        general:
          'Unable to create your workspace. Check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-dvh min-h-[680px] flex-col overflow-hidden bg-slate-50">
      <header className="flex h-16 shrink-0 items-center border-b border-slate-200/80 bg-white px-6 lg:px-10">
        <Link
          to={hasExistingWorkspace ? '/workspace' : '/'}
          aria-label="Socialabs"
          className="flex items-center gap-2"
        >
          <img src={logo} alt="Socialabs" className="h-7 w-7 object-contain" />

          <span className="text-xl font-semibold tracking-tight text-slate-950">
            Socialabs
          </span>
        </Link>

        {hasExistingWorkspace && (
          <Link
            to="/workspace"
            className="ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to workspace
          </Link>
        )}
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-full w-full max-w-5xl items-center justify-center">
          <div className="w-full">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3">
                  <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 text-xs font-semibold text-[#d81b27]">
                    <Sparkles className="h-3.5 w-3.5" />

                    {hasExistingWorkspace ? 'New workspace' : 'Workspace setup'}
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                  {hasExistingWorkspace
                    ? 'Create another workspace'
                    : 'Create your first workspace'}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Organize projects, datasets, team members, and research
                  insights within one dedicated workspace.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                <LockKeyhole className="h-3.5 w-3.5" />
                Your workspace data stays private
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <form noValidate onSubmit={handleSubmit} className="p-6 sm:p-8">
                {errors.general && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        Workspace could not be created
                      </p>

                      <p className="mt-1 text-sm leading-5 text-red-700">
                        {errors.general}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="workspace-name"
                      className="mb-2 block text-sm font-medium text-slate-800"
                    >
                      Workspace name <span className="text-[#d81b27]">*</span>
                    </label>

                    <input
                      ref={workspaceNameRef}
                      id="workspace-name"
                      name="name"
                      type="text"
                      value={form.name}
                      placeholder="e.g., UNIKOM Research Team"
                      autoComplete="organization"
                      disabled={isSubmitting}
                      maxLength={WORKSPACE_NAME_MAX_LENGTH}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name
                          ? 'workspace-name-error'
                          : 'workspace-name-hint'
                      }
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70 ${
                        errors.name
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-slate-200 focus:border-[#d81b27] focus:ring-[#d81b27]/10'
                      }`}
                    />

                    {errors.name ? (
                      <p
                        id="workspace-name-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-600"
                      >
                        {errors.name}
                      </p>
                    ) : (
                      <p
                        id="workspace-name-hint"
                        className="mt-2 text-xs text-slate-400"
                      >
                        Use a recognizable team, company, or research name.
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label
                        htmlFor="workspace-description"
                        className="text-sm font-medium text-slate-800"
                      >
                        Description{' '}
                        <span className="font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>

                      <span className="text-xs tabular-nums text-slate-400">
                        {form.description.length}/
                        {WORKSPACE_DESCRIPTION_MAX_LENGTH}
                      </span>
                    </div>

                    <textarea
                      ref={workspaceDescriptionRef}
                      id="workspace-description"
                      name="description"
                      rows={3}
                      value={form.description}
                      placeholder="Describe what this workspace will be used for."
                      disabled={isSubmitting}
                      maxLength={WORKSPACE_DESCRIPTION_MAX_LENGTH}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={
                        errors.description
                          ? 'workspace-description-error'
                          : 'workspace-description-hint'
                      }
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70 ${
                        errors.description
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-slate-200 focus:border-[#d81b27] focus:ring-[#d81b27]/10'
                      }`}
                    />

                    {errors.description ? (
                      <p
                        id="workspace-description-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-600"
                      >
                        {errors.description}
                      </p>
                    ) : (
                      <p
                        id="workspace-description-hint"
                        className="mt-2 text-xs text-slate-400"
                      >
                        Briefly explain the purpose of this workspace.
                      </p>
                    )}
                  </div>
                </div>

                <fieldset className="mt-7">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <legend className="text-sm font-medium text-slate-800">
                        Workspace plan
                      </legend>

                      <p className="mt-1 text-xs text-slate-400">
                        Select the plan that matches your workspace needs.
                      </p>
                    </div>

                    <Link
                      to="/pricing"
                      target="_blank"
                      className="shrink-0 text-xs font-medium text-[#d81b27] hover:underline"
                    >
                      Compare plans
                    </Link>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {workspacePlanOptions.map((option, index) => {
                      const isSelected = form.plan === option.value;

                      return (
                        <label
                          key={option.value}
                          className={`group relative flex min-h-[190px] cursor-pointer flex-col rounded-2xl border p-5 transition duration-200 ${
                            isSelected
                              ? 'border-[#d81b27] bg-red-50/60 shadow-[0_0_0_3px_rgba(216,27,39,0.08)]'
                              : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
                          } ${
                            isSubmitting ? 'pointer-events-none opacity-70' : ''
                          }`}
                        >
                          <input
                            ref={index === 0 ? firstPlanRef : undefined}
                            type="radio"
                            name="plan"
                            value={option.value}
                            checked={isSelected}
                            disabled={isSubmitting}
                            onChange={() => handlePlanChange(option.value)}
                            className="sr-only"
                          />

                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base font-semibold text-slate-900">
                                  {option.name}
                                </span>

                                {option.badge && (
                                  <span className="rounded-full bg-[#d81b27] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                                    {option.badge}
                                  </span>
                                )}
                              </div>

                              <p className="mt-2 text-xs leading-5 text-slate-500">
                                {option.description}
                              </p>
                            </div>

                            <span
                              aria-hidden="true"
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                                isSelected
                                  ? 'border-[#d81b27] bg-[#d81b27] text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="h-3 w-3" />}
                            </span>
                          </div>

                          <div className="mt-5">
                            <span className="text-2xl font-semibold tracking-tight text-slate-950">
                              {option.price}
                            </span>

                            {option.priceSuffix && (
                              <span className="ml-1 text-xs text-slate-400">
                                {option.priceSuffix}
                              </span>
                            )}
                          </div>

                          <div className="mt-auto space-y-2 pt-5">
                            {option.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-center gap-2 text-xs text-slate-500"
                              >
                                <Check className="h-3.5 w-3.5 shrink-0 text-[#d81b27]" />

                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {errors.plan && (
                    <p
                      role="alert"
                      className="mt-2 text-xs font-medium text-red-600"
                    >
                      {errors.plan}
                    </p>
                  )}
                </fieldset>

                <div
                  className={`mt-8 flex items-center border-t border-slate-100 pt-6 ${
                    hasExistingWorkspace ? 'justify-between' : 'justify-end'
                  }`}
                >
                  {hasExistingWorkspace && (
                    <Link
                      to="/workspace"
                      aria-disabled={isSubmitting}
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 ${
                        isSubmitting ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      Cancel
                    </Link>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="flex min-w-[176px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#d81b27] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#b81622] hover:shadow-lg hover:shadow-red-600/15 focus:outline-none focus:ring-4 focus:ring-[#d81b27]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#d81b27] disabled:hover:shadow-none disabled:active:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Creating workspace...
                      </>
                    ) : (
                      <>
                        Create workspace
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewWorkspacePage;
