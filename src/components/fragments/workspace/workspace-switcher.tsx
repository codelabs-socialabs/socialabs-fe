import { Briefcase, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useWorkspaceStore } from '@/stores/workspace-store';

const WorkspaceSwitcher = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId,
  );

  const handleWorkspaceChange = (workspaceId: string): void => {
    const success = setActiveWorkspace(workspaceId);

    if (!success) {
      return;
    }

    setIsOpen(false);

    navigate(`/workspaces/${workspaceId}/overview`);
  };

  if (!activeWorkspace) {
    return (
      <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-500">
        Workspace unavailable
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-slate-300"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-red-600 text-xs font-semibold text-white">
            {activeWorkspace.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wide text-slate-500">
              Workspace
            </span>

            <span className="block truncate text-sm font-semibold text-slate-800">
              {activeWorkspace.name}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg">
          <div className="max-h-52 space-y-0.5 overflow-y-auto px-1.5">
            {workspaces.map((workspace) => {
              const isActive = workspace.id === activeWorkspace.id;

              return (
                <button
                  key={workspace.id}
                  type="button"
                  onClick={() => handleWorkspaceChange(workspace.id)}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-red-50 font-medium text-red-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase
                    size={14}
                    className={isActive ? 'text-red-500' : 'text-slate-400'}
                  />

                  <span className="truncate">{workspace.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-1.5 border-t border-slate-100 px-1.5 pt-1.5">
            <Link
              to="/workspaces/new"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Plus size={14} className="text-slate-500" />
              Create Workspace
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSwitcher;
