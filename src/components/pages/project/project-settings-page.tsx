import {
  Activity,
  Archive,
  Bell,
  Check,
  Copy,
  Database,
  Info,
  Lock,
  RefreshCcw,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useMemo,
  useState,
} from 'react';

type SettingsTab =
  | 'general'
  | 'collection'
  | 'analysis'
  | 'access'
  | 'notifications';

type ProjectVisibility = 'private' | 'workspace';

type ProjectRole = 'Admin' | 'Editor' | 'Viewer';

type AnalysisMode = 'recommended' | 'advanced';

interface SettingsNavigationItem {
  id: SettingsTab;
  label: string;
  icon: typeof Settings2;
}

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: ProjectRole;
  isCurrentUser?: boolean;
}

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

interface ToggleFieldProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

interface SettingsRowProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const settingsNavigation: SettingsNavigationItem[] = [
  {
    id: 'general',
    label: 'General',
    icon: Settings2,
  },
  {
    id: 'collection',
    label: 'Data Collection',
    icon: Database,
  },
  {
    id: 'analysis',
    label: 'Analysis',
    icon: Sparkles,
  },
  {
    id: 'access',
    label: 'Access',
    icon: Users,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
  },
];

const initialMembers: ProjectMember[] = [
  {
    id: 'member-001',
    name: 'User Analyst',
    email: 'user@socialabs.id',
    initials: 'UA',
    role: 'Admin',
    isCurrentUser: true,
  },
  {
    id: 'member-002',
    name: 'Rafi Tanujaya',
    email: 'rafi@socialabs.id',
    initials: 'RT',
    role: 'Editor',
  },
  {
    id: 'member-003',
    name: 'Data Reviewer',
    email: 'reviewer@socialabs.id',
    initials: 'DR',
    role: 'Viewer',
  },
];

const inputClassName =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-red-400 focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500';

const selectClassName =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-red-400 focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500';

const SettingsSection = ({
  title,
  description,
  children,
  footer,
}: SettingsSectionProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="px-5 py-5 sm:px-6">
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>

        {description && (
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="border-t border-slate-100 px-5 py-6 sm:px-6">
        {children}
      </div>

      {footer && (
        <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
          {footer}
        </div>
      )}
    </section>
  );
};

const SettingsRow = ({ title, description, children }: SettingsRowProps) => {
  return (
    <div className="grid gap-4 py-5 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:items-start">
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>

        {description && (
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
};

const ToggleField = ({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: ToggleFieldProps) => {
  return (
    <div
      className={`flex items-start justify-between gap-5 py-4 first:pt-0 last:pb-0 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <div className="min-w-0 pr-4">
        <p className="text-sm font-medium text-slate-900">{title}</p>

        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-100 ${
          checked ? 'bg-red-600' : 'bg-slate-200'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          aria-hidden="true"
          className={`absolute left-0.5 top-0.5 block size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

const ProjectSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const [projectName, setProjectName] = useState('MBG Jatinangor Evaluation');

  const [description, setDescription] = useState(
    'Monitoring public reaction, complaints, and sentiment regarding the implementation of the Makan Bergizi Gratis program in Jatinangor.',
  );

  const [category, setCategory] = useState('Public Policy');

  const [language, setLanguage] = useState('id');

  const [visibility, setVisibility] = useState<ProjectVisibility>('workspace');

  const [query, setQuery] = useState('mbg jatinangor viral');

  const [includedKeywords, setIncludedKeywords] = useState(
    'mbg, makan bergizi gratis, jatinangor',
  );

  const [excludedKeywords, setExcludedKeywords] = useState(
    'giveaway, promo, iklan',
  );

  const [startDate, setStartDate] = useState('2026-02-01');

  const [endDate, setEndDate] = useState('2026-02-15');

  const [dataLimit, setDataLimit] = useState('50000');

  const [includeReposts, setIncludeReposts] = useState(true);

  const [includeReplies, setIncludeReplies] = useState(true);

  const [includeQuotes, setIncludeQuotes] = useState(true);

  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('recommended');

  const [topicModeling, setTopicModeling] = useState(true);

  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);

  const [emotionAnalysis, setEmotionAnalysis] = useState(true);

  const [influencerAnalysis, setInfluencerAnalysis] = useState(true);

  const [communityDetection, setCommunityDetection] = useState(true);

  const [botFiltering, setBotFiltering] = useState(true);

  const [duplicateFiltering, setDuplicateFiltering] = useState(true);

  const [topicCount, setTopicCount] = useState('auto');

  const [members, setMembers] = useState<ProjectMember[]>(initialMembers);

  const [inAppNotifications, setInAppNotifications] = useState(true);

  const [emailNotifications, setEmailNotifications] = useState(true);

  const [processingComplete, setProcessingComplete] = useState(true);

  const [processingFailed, setProcessingFailed] = useState(true);

  const [conversationSpike, setConversationSpike] = useState(true);

  const [sentimentChange, setSentimentChange] = useState(false);

  const [weeklySummary, setWeeklySummary] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const activeNavigation = useMemo(
    () => settingsNavigation.find((item) => item.id === activeTab),
    [activeTab],
  );

  const markAsChanged = (): void => {
    setHasChanges(true);
    setSavedSuccessfully(false);
  };

  const updateSetting = <T,>(
    setter: Dispatch<SetStateAction<T>>,
    value: T,
  ): void => {
    setter(value);
    markAsChanged();
  };

  const handleSave = async (): Promise<void> => {
    if (!hasChanges || isSaving) {
      return;
    }

    setIsSaving(true);
    setSavedSuccessfully(false);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 600);
      });

      setHasChanges(false);
      setSavedSuccessfully(true);
    } catch (error) {
      console.error('Failed to save project settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyProjectId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText('prj_mbg_jatinangor_001');
    } catch {
      console.warn('Clipboard is unavailable in this environment.');
    }
  };

  const handleChangeMemberRole = (
    memberId: string,
    role: ProjectRole,
  ): void => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              role,
            }
          : member,
      ),
    );

    markAsChanged();
  };

  const handleRemoveMember = (memberId: string): void => {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== memberId),
    );

    markAsChanged();
  };

  const handleDeleteProject = (): void => {
    if (deleteConfirmation.trim() !== projectName.trim()) {
      return;
    }

    console.log('Delete project');

    setIsDeleteModalOpen(false);
    setDeleteConfirmation('');
  };

  const closeDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation('');
  };

  return (
    <>
      <div className="h-full overflow-y-auto bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
          {/* Page header */}
          <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                Project Settings
              </h1>

              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
                Manage this project&apos;s identity, data source, analysis
                configuration, access, and notifications.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                savedSuccessfully && !hasChanges
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 text-white hover:bg-red-700'
              } disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400`}
            >
              {isSaving ? (
                <>
                  <RefreshCcw size={16} className="animate-spin" />
                  Saving
                </>
              ) : savedSuccessfully && !hasChanges ? (
                <>
                  <Check size={16} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </header>

          {/* Settings navigation */}
          <div className="mt-8 border-b border-slate-200">
            <nav
              aria-label="Project settings"
              className="-mb-px flex gap-1 overflow-x-auto"
            >
              {settingsNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeTab;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-7">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                Project settings
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-950">
                {activeNavigation?.label}
              </h2>
            </div>

            {/* General */}
            {activeTab === 'general' && (
              <div className="space-y-5">
                <SettingsSection
                  title="Project information"
                  description="Basic information used throughout the project and exported reports."
                >
                  <div className="divide-y divide-slate-100">
                    <SettingsRow
                      title="Project name"
                      description="Choose a clear name that helps workspace members identify this project."
                    >
                      <input
                        type="text"
                        value={projectName}
                        onChange={(event) =>
                          updateSetting(setProjectName, event.target.value)
                        }
                        className={inputClassName}
                      />
                    </SettingsRow>

                    <SettingsRow
                      title="Description"
                      description="Explain what this project monitors and why it exists."
                    >
                      <textarea
                        value={description}
                        onChange={(event) =>
                          updateSetting(setDescription, event.target.value)
                        }
                        rows={4}
                        className={`${inputClassName} resize-none`}
                      />
                    </SettingsRow>

                    <SettingsRow
                      title="Category"
                      description="Used to organize projects and improve default recommendations."
                    >
                      <select
                        value={category}
                        onChange={(event) =>
                          updateSetting(setCategory, event.target.value)
                        }
                        className={selectClassName}
                      >
                        <option value="Public Policy">Public Policy</option>

                        <option value="Brand Monitoring">
                          Brand Monitoring
                        </option>

                        <option value="Political Analysis">
                          Political Analysis
                        </option>

                        <option value="Market Research">Market Research</option>

                        <option value="Crisis Monitoring">
                          Crisis Monitoring
                        </option>
                      </select>
                    </SettingsRow>

                    <SettingsRow
                      title="Default language"
                      description="Used for labels, reports, and AI-generated summaries."
                    >
                      <select
                        value={language}
                        onChange={(event) =>
                          updateSetting(setLanguage, event.target.value)
                        }
                        className={selectClassName}
                      >
                        <option value="id">Indonesian</option>

                        <option value="en">English</option>
                      </select>
                    </SettingsRow>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Project visibility"
                  description="Choose who can discover this project inside the workspace."
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => updateSetting(setVisibility, 'private')}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                        visibility === 'private'
                          ? 'border-red-300 bg-red-50/60 ring-1 ring-red-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Lock
                        size={18}
                        className={
                          visibility === 'private'
                            ? 'mt-0.5 shrink-0 text-red-600'
                            : 'mt-0.5 shrink-0 text-slate-400'
                        }
                      />

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Private
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Only explicitly added project members can access this
                          project.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateSetting(setVisibility, 'workspace')}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                        visibility === 'workspace'
                          ? 'border-red-300 bg-red-50/60 ring-1 ring-red-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Users
                        size={18}
                        className={
                          visibility === 'workspace'
                            ? 'mt-0.5 shrink-0 text-red-600'
                            : 'mt-0.5 shrink-0 text-slate-400'
                        }
                      />

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Workspace members
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Every member in the workspace can discover and open
                          this project.
                        </p>
                      </div>
                    </button>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="System information"
                  description="Read-only technical information about this project."
                >
                  <div className="divide-y divide-slate-100">
                    <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Project ID
                        </p>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                          prj_mbg_jatinangor_001
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyProjectId}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                      >
                        <Copy size={14} />
                        Copy
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Workspace
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Public Policy Tracker
                        </p>
                      </div>

                      <span className="text-xs text-slate-400">
                        Workspace project
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Status
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Collection and analysis are completed.
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                        Completed
                      </span>
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Project actions"
                  description="Non-destructive actions for managing the project lifecycle."
                >
                  <div className="divide-y divide-slate-100">
                    <div className="flex flex-col justify-between gap-4 py-4 first:pt-0 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Duplicate project
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Create another project with the same collection and
                          analysis configuration.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:self-auto"
                      >
                        <Copy size={15} />
                        Duplicate
                      </button>
                    </div>

                    <div className="flex flex-col justify-between gap-4 py-4 last:pb-0 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Archive project
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Remove the project from the active list while
                          preserving its data.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:self-auto"
                      >
                        <Archive size={15} />
                        Archive
                      </button>
                    </div>
                  </div>
                </SettingsSection>

                <section className="overflow-hidden rounded-xl border border-red-200 bg-white">
                  <div className="px-5 py-5 sm:px-6">
                    <h2 className="text-base font-semibold text-red-700">
                      Danger Zone
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Permanent actions that cannot be recovered.
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-5 border-t border-red-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Delete this project
                      </p>

                      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
                        Permanently delete the project, its dataset, analysis,
                        reports, and access configuration.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-auto"
                    >
                      <Trash2 size={15} />
                      Delete Project
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* Data collection */}
            {activeTab === 'collection' && (
              <div className="space-y-5">
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                  <Info size={18} className="mt-0.5 shrink-0 text-amber-600" />

                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      Collection already completed
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
                      Changing the query or collection period may require
                      creating a new collection run.
                    </p>
                  </div>
                </div>

                <SettingsSection
                  title="Search configuration"
                  description="Define the query and keyword rules used to collect posts."
                >
                  <div className="divide-y divide-slate-100">
                    <SettingsRow
                      title="Search query"
                      description="The primary natural-language query used by the crawler."
                    >
                      <input
                        type="text"
                        value={query}
                        onChange={(event) =>
                          updateSetting(setQuery, event.target.value)
                        }
                        className={inputClassName}
                      />
                    </SettingsRow>

                    <SettingsRow
                      title="Included keywords"
                      description="Separate multiple keywords using commas."
                    >
                      <textarea
                        value={includedKeywords}
                        onChange={(event) =>
                          updateSetting(setIncludedKeywords, event.target.value)
                        }
                        rows={3}
                        className={`${inputClassName} resize-none`}
                      />
                    </SettingsRow>

                    <SettingsRow
                      title="Excluded keywords"
                      description="Posts containing these terms will be ignored."
                    >
                      <textarea
                        value={excludedKeywords}
                        onChange={(event) =>
                          updateSetting(setExcludedKeywords, event.target.value)
                        }
                        rows={3}
                        className={`${inputClassName} resize-none`}
                      />
                    </SettingsRow>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Collection scope"
                  description="Control the language, time range, and maximum amount of data."
                >
                  <div className="divide-y divide-slate-100">
                    <SettingsRow
                      title="Language"
                      description="Only collect posts matching this language."
                    >
                      <select
                        value={language}
                        onChange={(event) =>
                          updateSetting(setLanguage, event.target.value)
                        }
                        className={selectClassName}
                      >
                        <option value="id">Indonesian</option>

                        <option value="en">English</option>

                        <option value="all">All languages</option>
                      </select>
                    </SettingsRow>

                    <SettingsRow
                      title="Collection period"
                      description="The date range covered by this project."
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(event) =>
                            updateSetting(setStartDate, event.target.value)
                          }
                          className={inputClassName}
                        />

                        <input
                          type="date"
                          value={endDate}
                          onChange={(event) =>
                            updateSetting(setEndDate, event.target.value)
                          }
                          className={inputClassName}
                        />
                      </div>
                    </SettingsRow>

                    <SettingsRow
                      title="Maximum data"
                      description="Maximum number of posts collected for this project."
                    >
                      <select
                        value={dataLimit}
                        onChange={(event) =>
                          updateSetting(setDataLimit, event.target.value)
                        }
                        className={selectClassName}
                      >
                        <option value="10000">10,000 posts</option>

                        <option value="25000">25,000 posts</option>

                        <option value="50000">50,000 posts</option>

                        <option value="100000">100,000 posts</option>
                      </select>
                    </SettingsRow>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Content types"
                  description="Choose which post relationships should be included."
                >
                  <div className="divide-y divide-slate-100">
                    <ToggleField
                      title="Include reposts"
                      description="Useful for measuring amplification and reach."
                      checked={includeReposts}
                      onChange={(checked) =>
                        updateSetting(setIncludeReposts, checked)
                      }
                    />

                    <ToggleField
                      title="Include replies"
                      description="Useful for understanding direct public responses."
                      checked={includeReplies}
                      onChange={(checked) =>
                        updateSetting(setIncludeReplies, checked)
                      }
                    />

                    <ToggleField
                      title="Include quoted posts"
                      description="Collect quoted posts containing additional context."
                      checked={includeQuotes}
                      onChange={(checked) =>
                        updateSetting(setIncludeQuotes, checked)
                      }
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Collection summary"
                  description="Current data usage for this project."
                >
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-slate-500">Collected posts</p>

                      <p className="mt-1 text-xl font-semibold text-slate-950">
                        35,400
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Storage used</p>

                      <p className="mt-1 text-xl font-semibold text-slate-950">
                        128 MB
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Last collected</p>

                      <p className="mt-1 text-sm font-semibold text-slate-950">
                        February 15, 2026
                      </p>
                    </div>
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* Analysis */}
            {activeTab === 'analysis' && (
              <div className="space-y-5">
                <SettingsSection
                  title="Analysis mode"
                  description="Use SociaLabs recommendations or configure advanced parameters."
                >
                  <div className="inline-flex max-w-full overflow-x-auto rounded-lg bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateSetting(setAnalysisMode, 'recommended')
                      }
                      className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition ${
                        analysisMode === 'recommended'
                          ? 'bg-white text-red-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Recommended
                    </button>

                    <button
                      type="button"
                      onClick={() => updateSetting(setAnalysisMode, 'advanced')}
                      className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition ${
                        analysisMode === 'advanced'
                          ? 'bg-white text-red-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Advanced
                    </button>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Analysis modules"
                  description="Choose which AI capabilities should be available in this project."
                >
                  <div className="divide-y divide-slate-100">
                    <ToggleField
                      title="Topic modeling"
                      description="Group posts into topics and narrative clusters."
                      checked={topicModeling}
                      onChange={(checked) =>
                        updateSetting(setTopicModeling, checked)
                      }
                    />

                    <ToggleField
                      title="Sentiment analysis"
                      description="Classify public responses by sentiment."
                      checked={sentimentAnalysis}
                      onChange={(checked) =>
                        updateSetting(setSentimentAnalysis, checked)
                      }
                    />

                    <ToggleField
                      title="Emotion analysis"
                      description="Detect anger, joy, fear, sadness, surprise, and disgust."
                      checked={emotionAnalysis}
                      onChange={(checked) =>
                        updateSetting(setEmotionAnalysis, checked)
                      }
                    />

                    <ToggleField
                      title="Influencer analysis"
                      description="Identify originators, amplifiers, and bridge accounts."
                      checked={influencerAnalysis}
                      onChange={(checked) =>
                        updateSetting(setInfluencerAnalysis, checked)
                      }
                    />

                    <ToggleField
                      title="Community detection"
                      description="Discover connected account clusters and echo chambers."
                      checked={communityDetection}
                      onChange={(checked) =>
                        updateSetting(setCommunityDetection, checked)
                      }
                    />
                  </div>
                </SettingsSection>

                {analysisMode === 'advanced' && (
                  <SettingsSection
                    title="Advanced configuration"
                    description="Fine-tune how the dataset is prepared and analyzed."
                  >
                    <div className="divide-y divide-slate-100">
                      <SettingsRow
                        title="Topic count"
                        description="Automatic mode is recommended for most datasets."
                      >
                        <select
                          value={topicCount}
                          onChange={(event) =>
                            updateSetting(setTopicCount, event.target.value)
                          }
                          className={selectClassName}
                        >
                          <option value="auto">Automatic</option>

                          <option value="5">5 topics</option>

                          <option value="10">10 topics</option>

                          <option value="15">15 topics</option>
                        </select>
                      </SettingsRow>

                      <ToggleField
                        title="Bot and spam filtering"
                        description="Remove suspected automated and low-quality accounts."
                        checked={botFiltering}
                        onChange={(checked) =>
                          updateSetting(setBotFiltering, checked)
                        }
                      />

                      <ToggleField
                        title="Duplicate filtering"
                        description="Remove duplicate content before the analysis pipeline runs."
                        checked={duplicateFiltering}
                        onChange={(checked) =>
                          updateSetting(setDuplicateFiltering, checked)
                        }
                      />
                    </div>
                  </SettingsSection>
                )}

                <SettingsSection
                  title="Processing"
                  description="Information about the most recent analysis run."
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Activity size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Analysis completed
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Last processed on February 15, 2026 at 14:24.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-auto"
                    >
                      <RefreshCcw size={15} />
                      Re-run Analysis
                    </button>
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* Access */}
            {activeTab === 'access' && (
              <div className="space-y-5">
                <SettingsSection
                  title="Project members"
                  description="Only existing workspace members can be added to this project."
                  footer={
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck
                        size={14}
                        className="shrink-0 text-red-500"
                      />
                      Project permissions do not override workspace permissions.
                    </div>
                  }
                >
                  <div className="mb-5 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      <UserPlus size={15} />
                      Add Member
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex flex-col justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                            {member.initials}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-medium text-slate-900">
                                {member.name}
                              </p>

                              {member.isCurrentUser && (
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                                  You
                                </span>
                              )}
                            </div>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {member.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={member.role}
                            disabled={member.isCurrentUser}
                            onChange={(event) =>
                              handleChangeMemberRole(
                                member.id,
                                event.target.value as ProjectRole,
                              )
                            }
                            className="min-w-28 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                          >
                            <option value="Admin">Admin</option>

                            <option value="Editor">Editor</option>

                            <option value="Viewer">Viewer</option>
                          </select>

                          {!member.isCurrentUser && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(member.id)}
                              aria-label={`Remove ${member.name}`}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <SettingsSection
                  title="Notification channels"
                  description="Choose where SociaLabs should send project updates."
                >
                  <div className="divide-y divide-slate-100">
                    <ToggleField
                      title="In-app notifications"
                      description="Display alerts in the SociaLabs notification center."
                      checked={inAppNotifications}
                      onChange={(checked) =>
                        updateSetting(setInAppNotifications, checked)
                      }
                    />

                    <ToggleField
                      title="Email notifications"
                      description="Send notifications to user@socialabs.id."
                      checked={emailNotifications}
                      onChange={(checked) =>
                        updateSetting(setEmailNotifications, checked)
                      }
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Processing updates"
                  description="Receive status updates about collection and analysis jobs."
                >
                  <div className="divide-y divide-slate-100">
                    <ToggleField
                      title="Processing completed"
                      description="Notify when collection and analysis finish successfully."
                      checked={processingComplete}
                      onChange={(checked) =>
                        updateSetting(setProcessingComplete, checked)
                      }
                    />

                    <ToggleField
                      title="Processing failed"
                      description="Notify when collection or analysis requires attention."
                      checked={processingFailed}
                      onChange={(checked) =>
                        updateSetting(setProcessingFailed, checked)
                      }
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Insight alerts"
                  description="Receive alerts when SociaLabs detects important changes."
                >
                  <div className="divide-y divide-slate-100">
                    <ToggleField
                      title="Conversation spike"
                      description="Notify when conversation volume increases significantly."
                      checked={conversationSpike}
                      onChange={(checked) =>
                        updateSetting(setConversationSpike, checked)
                      }
                    />

                    <ToggleField
                      title="Significant sentiment change"
                      description="Notify when public sentiment shifts beyond the configured threshold."
                      checked={sentimentChange}
                      onChange={(checked) =>
                        updateSetting(setSentimentChange, checked)
                      }
                    />

                    <ToggleField
                      title="Weekly project summary"
                      description="Receive a weekly overview of project changes and insights."
                      checked={weeklySummary}
                      onChange={(checked) =>
                        updateSetting(setWeeklySummary, checked)
                      }
                    />
                  </div>
                </SettingsSection>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete project modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 px-5 py-5">
              <div>
                <h2
                  id="delete-project-title"
                  className="text-lg font-semibold text-slate-950"
                >
                  Delete Project
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                aria-label="Close delete project modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-y border-slate-100 px-5 py-5">
              <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">
                <p className="text-sm leading-relaxed text-red-800">
                  All project data, analysis results, reports, and member access
                  will be permanently removed.
                </p>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-medium text-slate-800">
                  Type{' '}
                  <span className="font-semibold text-slate-950">
                    {projectName}
                  </span>{' '}
                  to confirm
                </span>

                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(event) =>
                    setDeleteConfirmation(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      closeDeleteModal();
                    }

                    if (
                      event.key === 'Enter' &&
                      deleteConfirmation.trim() === projectName.trim()
                    ) {
                      handleDeleteProject();
                    }
                  }}
                  className={`${inputClassName} mt-2`}
                  placeholder={projectName}
                  autoFocus
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 px-5 py-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteConfirmation.trim() !== projectName.trim()}
                onClick={handleDeleteProject}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={15} />
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectSettingsPage;
