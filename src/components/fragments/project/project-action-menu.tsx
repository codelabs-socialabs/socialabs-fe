import {
  Archive,
  ArchiveRestore,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useProjectStore } from '@/stores/project-store';
import type { Project } from '@/types/project';

interface ProjectActionMenuProps {
  project: Project;
}

const getProjectTarget = (project: Project): string => {
  const targetPage = project.status === 'COMPLETED' ? 'overview' : 'processing';

  return (
    `/workspaces/${project.workspaceId}` +
    `/projects/${project.id}/${targetPage}`
  );
};

const ProjectActionMenu = ({ project }: ProjectActionMenuProps) => {
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);

  const duplicateProject = useProjectStore((state) => state.duplicateProject);

  const archiveProject = useProjectStore((state) => state.archiveProject);

  const restoreProject = useProjectStore((state) => state.restoreProject);

  const deleteProject = useProjectStore((state) => state.deleteProject);

  const isUpdating = useProjectStore((state) =>
    state.updatingProjectIds.includes(project.id),
  );

  const isDeleting = useProjectStore((state) =>
    state.deletingProjectIds.includes(project.id),
  );

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);

        if (!isDeleting) {
          setIsDeleteConfirmationOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);

      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDeleting]);

  const stopCardNavigation = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleOpenProject = (event: MouseEvent<HTMLButtonElement>): void => {
    stopCardNavigation(event);
    setIsOpen(false);

    navigate(getProjectTarget(project));
  };

  const handleDuplicate = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    stopCardNavigation(event);

    if (isUpdating) {
      return;
    }

    setIsOpen(false);

    try {
      const duplicated = await duplicateProject(
        project.workspaceId,
        project.id,
      );

      if (!duplicated) {
        return;
      }

      toast.success('Project duplicated successfully.');
    } catch (error) {
      toast.error('Project could not be duplicated.', {
        description:
          error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const handleArchive = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    stopCardNavigation(event);

    if (isUpdating) {
      return;
    }

    setIsOpen(false);

    try {
      const result = project.isArchived
        ? await restoreProject(project.workspaceId, project.id)
        : await archiveProject(project.workspaceId, project.id);

      if (!result) {
        return;
      }

      toast.success(
        project.isArchived
          ? 'Project restored successfully.'
          : 'Project archived successfully.',
      );
    } catch (error) {
      toast.error('Project could not be updated.', {
        description:
          error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const handleOpenDeleteConfirmation = (
    event: MouseEvent<HTMLButtonElement>,
  ): void => {
    stopCardNavigation(event);

    setIsOpen(false);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    stopCardNavigation(event);

    if (isDeleting) {
      return;
    }

    try {
      const success = await deleteProject(project.workspaceId, project.id);

      if (!success) {
        return;
      }

      setIsDeleteConfirmationOpen(false);

      toast.success('Project deleted successfully.');
    } catch (error) {
      toast.error('Project could not be deleted.', {
        description:
          error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  return (
    <>
      <div ref={menuRef} className="relative" onClick={stopCardNavigation}>
        <button
          type="button"
          aria-label={`Open actions for ${project.name}`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={(event) => {
            stopCardNavigation(event);

            setIsOpen((current) => !current);
          }}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <MoreHorizontal size={18} />
        </button>

        {isOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-40 mt-1.5 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleOpenProject}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <ExternalLink size={15} className="text-slate-400" />
              Open project
            </button>

            <button
              type="button"
              role="menuitem"
              disabled={isUpdating}
              onClick={handleDuplicate}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <Copy size={15} className="text-slate-400" />
              Duplicate
            </button>

            <button
              type="button"
              role="menuitem"
              disabled={isUpdating}
              onClick={handleArchive}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              {project.isArchived ? (
                <ArchiveRestore size={15} className="text-slate-400" />
              ) : (
                <Archive size={15} className="text-slate-400" />
              )}

              {project.isArchived ? 'Restore project' : 'Archive project'}
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              role="menuitem"
              onClick={handleOpenDeleteConfirmation}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={15} />
              Delete project
            </button>
          </div>
        )}
      </div>

      {isDeleteConfirmationOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={(event) => {
            stopCardNavigation(event);

            if (event.target === event.currentTarget && !isDeleting) {
              setIsDeleteConfirmationOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-project-${project.id}`}
            className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl"
            onClick={stopCardNavigation}
          >
            <div className="p-5">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={19} />
              </div>

              <h2
                id={`delete-project-${project.id}`}
                className="mt-4 text-lg font-semibold text-slate-950"
              >
                Delete project?
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                This will permanently delete{' '}
                <strong className="font-medium text-slate-700">
                  {project.name}
                </strong>
                , including its dataset and analysis results. This action cannot
                be undone.
              </p>
            </div>

            <div className="flex justify-end gap-2.5 border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                disabled={isDeleting}
                onClick={(event) => {
                  stopCardNavigation(event);

                  setIsDeleteConfirmationOpen(false);
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectActionMenu;
