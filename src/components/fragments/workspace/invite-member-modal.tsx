import { Mail, Send, X } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { useWorkspaceMemberStore } from '@/stores/workspace-member-store';
import type { WorkspaceMemberRole } from '@/types/workspace-member';

interface InviteMemberModalProps {
  isOpen: boolean;
  workspaceId: string;
  onClose: () => void;
}

interface InviteFormState {
  email: string;
  role: Exclude<WorkspaceMemberRole, 'OWNER'>;
}

const initialForm: InviteFormState = {
  email: '',
  role: 'ANALYST',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const InviteMemberModal = ({
  isOpen,
  workspaceId,
  onClose,
}: InviteMemberModalProps) => {
  const [form, setForm] = useState<InviteFormState>(initialForm);
  const [error, setError] = useState<string | null>(null);

  const inviteMember = useWorkspaceMemberStore((state) => state.inviteMember);

  const resetForm = (): void => {
    setForm(initialForm);
    setError(null);
  };

  const handleClose = (): void => {
    resetForm();
    onClose();
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setForm((current) => ({
      ...current,
      email: event.target.value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleRoleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setForm((current) => ({
      ...current,
      role: event.target.value as InviteFormState['role'],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();

    if (!emailPattern.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    const member = inviteMember({
      workspaceId,
      email,
      role: form.role,
    });

    if (!member) {
      setError('This person is already a member or has a pending invitation.');
      return;
    }

    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-member-title"
        aria-describedby="invite-member-description"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2
                id="invite-member-title"
                className="text-lg font-semibold text-slate-950"
              >
                Invite member
              </h2>

              <p
                id="invite-member-description"
                className="mt-1 text-sm text-slate-500"
              >
                Invite someone to collaborate in this workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close invite modal"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5">
            <div>
              <label
                htmlFor="invite-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="invite-email"
                  type="email"
                  value={form.email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  autoFocus
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'invite-member-error' : undefined}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="invite-role"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Workspace role
              </label>

              <select
                id="invite-role"
                value={form.role}
                onChange={handleRoleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              >
                <option value="ADMIN">Admin</option>
                <option value="ANALYST">Analyst</option>
                <option value="VIEWER">Viewer</option>
              </select>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                You can change the member role later from the members table.
              </p>
            </div>

            {error && (
              <p
                id="invite-member-error"
                role="alert"
                className="mt-4 text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2.5 border-t border-slate-100 px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Send size={15} aria-hidden="true" />
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
