import { Database, X } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useProjectStore } from '@/stores/project-store';
import {
  ProjectCategory,
  ProjectLanguage,
  type CreateProjectInput,
  type NewProjectForm,
} from '@/types/project';

interface CreateProjectModalProps {
  isOpen: boolean;
  workspaceId: string;
  onClose: () => void;
}

interface CreateProjectModalContentProps {
  workspaceId: string;
  onClose: () => void;
}

const initialForm: NewProjectForm = {
  name: '',
  description: '',

  category: ProjectCategory.MARKETING,
  language: ProjectLanguage.ID,

  keyword: '',
  startDate: '',
  endDate: '',
};

const CreateProjectModalContent = ({
  workspaceId,
  onClose,
}: CreateProjectModalContentProps) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<NewProjectForm>(initialForm);

  const createProject = useProjectStore((state) => state.createProject);

  const creatingWorkspaceIds = useProjectStore(
    (state) => state.creatingWorkspaceIds,
  );

  const isCreating = creatingWorkspaceIds.includes(workspaceId);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ): void => {
    setForm((current) => ({
      ...current,
      category: event.target.value as ProjectCategory,
    }));
  };

  const handleLanguageChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ): void => {
    setForm((current) => ({
      ...current,
      language: event.target.value as ProjectLanguage,
    }));
  };

  const handleClose = (): void => {
    if (isCreating) {
      return;
    }

    onClose();
  };

  const normalizedName = form.name.trim();

  const normalizedDescription = form.description.trim();

  const normalizedKeyword = form.keyword.trim();

  const startDateTimestamp =
    form.startDate.length > 0 ? new Date(form.startDate).getTime() : Number.NaN;

  const endDateTimestamp =
    form.endDate.length > 0 ? new Date(form.endDate).getTime() : Number.NaN;

  const isDateRangeValid =
    Number.isFinite(startDateTimestamp) &&
    Number.isFinite(endDateTimestamp) &&
    endDateTimestamp >= startDateTimestamp;

  const isFormValid =
    normalizedName.length >= 1 &&
    normalizedKeyword.length >= 1 &&
    isDateRangeValid;

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!isFormValid || isCreating) {
      return;
    }

    const payload: CreateProjectInput = {
      name: normalizedName,

      category: form.category,

      keyword: normalizedKeyword,

      startDate: form.startDate,
      endDate: form.endDate,

      language: form.language,

      ...(normalizedDescription
        ? {
            description: normalizedDescription,
          }
        : {}),
    };

    try {
      const createdProject = await createProject(workspaceId, payload);

      if (!createdProject) {
        return;
      }

      onClose();

      toast.success('Project created successfully.');

      navigate(
        `/workspaces/${workspaceId}/projects/${createdProject.id}/processing`,
      );
    } catch (error) {
      toast.error('Project could not be created.', {
        description:
          error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-slate-50/50 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Create New Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure the data and research parameters for this analysis.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form
          id="create-project-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto p-5"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Project Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleInputChange}
                disabled={isCreating}
                placeholder="Example: Public Sentiment Analysis"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Description
                <span className="ml-1 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleInputChange}
                disabled={isCreating}
                placeholder="Describe the objective of this project"
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleCategoryChange}
                  disabled={isCreating}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                >
                  <option value={ProjectCategory.MARKETING}>Marketing</option>

                  <option value={ProjectCategory.EDUCATION}>Education</option>

                  <option value={ProjectCategory.HEALTH}>Health</option>

                  <option value={ProjectCategory.OTHER}>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Language
                </label>

                <select
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleLanguageChange}
                  disabled={isCreating}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                >
                  <option value={ProjectLanguage.ID}>Indonesian</option>

                  <option value={ProjectLanguage.EN}>English</option>
                </select>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Data extraction parameters
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="keyword"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Search Topic
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="keyword"
                    name="keyword"
                    type="text"
                    value={form.keyword}
                    onChange={handleInputChange}
                    disabled={isCreating}
                    placeholder="Example: Artificial intelligence Indonesia"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Start Date
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={handleInputChange}
                      disabled={isCreating}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      End Date
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      min={form.startDate || undefined}
                      value={form.endDate}
                      onChange={handleInputChange}
                      disabled={isCreating}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>
                </div>

                {form.startDate && form.endDate && !isDateRangeValid && (
                  <p className="text-xs font-medium text-red-600">
                    End date must be greater than or equal to start date.
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="flex shrink-0 justify-end gap-2.5 border-t border-slate-100 bg-white p-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="create-project-form"
            disabled={!isFormValid || isCreating}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Database size={16} />
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateProjectModal = ({
  isOpen,
  workspaceId,
  onClose,
}: CreateProjectModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <CreateProjectModalContent
      key={workspaceId}
      workspaceId={workspaceId}
      onClose={onClose}
    />
  );
};

export default CreateProjectModal;
