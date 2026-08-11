import { Copy, Download, Trash2, UserX, X } from 'lucide-react';
import { useState } from 'react';

const selectClassName = `
  w-full rounded-xl border border-slate-200 bg-white
  px-3.5 py-2.5 text-sm text-slate-900 outline-none
  transition hover:border-slate-300
  focus:border-red-400 focus:ring-4 focus:ring-red-50
`;

const AccountSettingsPage = () => {
  const [language, setLanguage] = useState('id');

  const [timezone, setTimezone] = useState('Asia/Jakarta');

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleCopyAccountId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText('usr_01J_SOCIALABS_001');
    } catch {
      console.warn('Clipboard is unavailable.');
    }
  };

  const closeDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation('');
  };

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
              User settings
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Account
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Manage regional preferences, account information, personal data,
              and account lifecycle.
            </p>
          </div>
        </header>

        <main className="mt-8">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.025]">
            {/* Regional preferences */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-slate-950">
                  Regional preferences
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Control the language and timezone used across SociaLabs.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Interface language
                  </span>

                  <select
                    value={language}
                    onChange={(event) => {
                      setLanguage(event.target.value);
                    }}
                    className={`${selectClassName} mt-2`}
                  >
                    <option value="id">Indonesian</option>

                    <option value="en">English</option>
                  </select>

                  <p className="mt-1.5 text-xs text-slate-400">
                    Controls labels and interface text.
                  </p>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Timezone
                  </span>

                  <select
                    value={timezone}
                    onChange={(event) => {
                      setTimezone(event.target.value);
                    }}
                    className={`${selectClassName} mt-2`}
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>

                    <option value="Asia/Makassar">Asia/Makassar (GMT+8)</option>

                    <option value="Asia/Jayapura">Asia/Jayapura (GMT+9)</option>

                    <option value="UTC">UTC</option>
                  </select>

                  <p className="mt-1.5 text-xs text-slate-400">
                    Used for datasets, reports, and notifications.
                  </p>
                </label>
              </div>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* Account information */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-slate-950">
                  Account information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Read-only technical information associated with your account.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 px-4 py-4">
                  <p className="text-xs font-medium text-slate-500">
                    Account ID
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="truncate font-mono text-xs text-slate-800">
                      usr_01J_SOCIALABS_001
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyAccountId}
                      aria-label="Copy account ID"
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-red-600"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-4">
                  <p className="text-xs font-medium text-slate-500">
                    Account created
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-900">
                    July 12, 2026
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* Account data */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-sm font-semibold text-slate-950">
                    Export account data
                  </h2>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                    Request a downloadable copy of your profile information and
                    personal account preferences.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-auto"
                >
                  <Download size={15} />
                  Request Export
                </button>
              </div>
            </div>

            <div className="mx-5 border-t border-red-100 sm:mx-8" />

            {/* Danger zone */}
            <div className="bg-red-50/25 px-5 py-7 sm:px-8 sm:py-8">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-red-700">
                  Danger zone
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Actions that affect access to your account.
                </p>
              </div>

              <div className="divide-y divide-red-100">
                <div className="flex flex-col justify-between gap-4 pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Deactivate account
                    </p>

                    <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                      Temporarily disable your account. Your personal data will
                      remain available if you return.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDeactivateModalOpen(true)}
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:self-auto"
                  >
                    <UserX size={15} />
                    Deactivate
                  </button>
                </div>

                <div className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Delete account
                    </p>

                    <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                      Permanently remove your personal account and associated
                      user data.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-auto"
                  >
                    <Trash2 size={15} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Deactivate modal */}
      {isDeactivateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsDeactivateModalOpen(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 px-5 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Deactivate account
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Your account will be disabled and you will be signed out. You
                  can reactivate it by signing in again.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDeactivateModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() => setIsDeactivateModalOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 px-5 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Delete account
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  This action is permanent. Type <strong>DELETE</strong> to
                  continue.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-y border-slate-100 px-5 py-5">
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-50"
                placeholder="DELETE"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2 px-5 py-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteConfirmation !== 'DELETE'}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountSettingsPage;
