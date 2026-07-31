import {
  BadgeCheck,
  Eye,
  EyeOff,
  KeyRound,
  Laptop,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  type: 'desktop' | 'mobile';
  current?: boolean;
}

const initialSessions: Session[] = [
  {
    id: 'current-session',
    device: 'MacBook Pro',
    browser: 'Chrome on macOS',
    location: 'Bandung, Indonesia',
    lastActive: 'Active now',
    type: 'desktop',
    current: true,
  },
  {
    id: 'mobile-session',
    device: 'iPhone 15',
    browser: 'Safari on iOS',
    location: 'Bandung, Indonesia',
    lastActive: '2 hours ago',
    type: 'mobile',
  },
  {
    id: 'windows-session',
    device: 'Windows PC',
    browser: 'Chrome on Windows',
    location: 'Jakarta, Indonesia',
    lastActive: '3 days ago',
    type: 'desktop',
  },
];

const inputClassName = `
  w-full rounded-xl border border-slate-200 bg-white
  px-3.5 py-2.5 text-sm text-slate-900 outline-none
  transition placeholder:text-slate-400
  hover:border-slate-300
  focus:border-red-400 focus:ring-4 focus:ring-red-50
`;

const SecuritySettingsPage = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwordError, setPasswordError] = useState('');

  const handleSignOutSession = (sessionId: string): void => {
    setSessions((currentSessions) =>
      currentSessions.filter((session) => session.id !== sessionId),
    );
  };

  const handleSignOutOtherSessions = (): void => {
    setSessions((currentSessions) =>
      currentSessions.filter((session) => session.current),
    );
  };

  const closePasswordModal = (): void => {
    if (isChangingPassword) {
      return;
    }

    setIsChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setIsCurrentPasswordVisible(false);
    setIsNewPasswordVisible(false);
  };

  const handleChangePassword = async (): Promise<void> => {
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Enter your current password.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('The new password must contain at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('The password confirmation does not match.');
      return;
    }

    setIsChangingPassword(true);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 600);
      });

      closePasswordModal();
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
            User settings
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Security
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
            Manage sign-in protection, authentication methods, and active
            account sessions.
          </p>
        </header>

        <main className="mt-8">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.025]">
            {/* Password */}
            <div className="flex flex-col justify-between gap-5 px-5 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <KeyRound size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-950">
                    Password
                  </h2>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                    Use a strong, unique password to protect your account.
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Last changed three months ago
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(true)}
                className="shrink-0 self-start rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-auto"
              >
                Change Password
              </button>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* 2FA */}
            <div className="flex flex-col justify-between gap-5 px-5 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-950">
                    Two-factor authentication
                  </h2>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                    Require a second verification method whenever you sign in.
                  </p>

                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      isTwoFactorEnabled
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {isTwoFactorEnabled ? (
                      <BadgeCheck size={13} />
                    ) : (
                      <LockKeyhole size={13} />
                    )}

                    {isTwoFactorEnabled ? 'Enabled' : 'Not enabled'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTwoFactorEnabled((current) => !current)}
                className={`shrink-0 self-start rounded-lg px-4 py-2.5 text-sm font-medium transition sm:self-auto ${
                  isTwoFactorEnabled
                    ? 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isTwoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* Sessions */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    Active sessions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Devices currently signed in to your account.
                  </p>
                </div>

                {sessions.length > 1 && (
                  <button
                    type="button"
                    onClick={handleSignOutOtherSessions}
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <LogOut size={14} />
                    Sign Out Other Sessions
                  </button>
                )}
              </div>

              <div className="mt-6 divide-y divide-slate-100">
                {sessions.map((session) => {
                  const Icon = session.type === 'mobile' ? Smartphone : Laptop;

                  return (
                    <div
                      key={session.id}
                      className="flex flex-col justify-between gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <Icon size={18} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-medium text-slate-900">
                              {session.device}
                            </p>

                            {session.current && (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                                Current session
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            {session.browser}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {session.location} · {session.lastActive}
                          </p>
                        </div>
                      </div>

                      {!session.current && (
                        <button
                          type="button"
                          onClick={() => handleSignOutSession(session.id)}
                          className="self-start text-xs font-medium text-red-600 transition hover:text-red-700 sm:self-auto"
                        >
                          Sign Out
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* Activity */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <h2 className="text-base font-semibold text-slate-950">
                Security activity
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 px-4 py-4">
                  <p className="text-xs font-medium text-slate-500">
                    Last successful login
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-900">
                    Today at 10:42 PM
                  </p>

                  <p className="mt-1 text-xs text-slate-400">Chrome on macOS</p>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-4">
                  <p className="text-xs font-medium text-slate-500">
                    Last security change
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-900">
                    Password updated
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Three months ago
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Change password modal */}
      {isChangePasswordOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePasswordModal();
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 px-5 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
                  Account security
                </p>

                <h2 className="mt-1.5 text-lg font-semibold text-slate-950">
                  Change password
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a strong password you do not use elsewhere.
                </p>
              </div>

              <button
                type="button"
                onClick={closePasswordModal}
                disabled={isChangingPassword}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 border-y border-slate-100 px-5 py-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-800">
                  Current password
                </span>

                <div className="relative mt-2">
                  <input
                    type={isCurrentPasswordVisible ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className={`${inputClassName} pr-11`}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setIsCurrentPasswordVisible((current) => !current)
                    }
                    className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    {isCurrentPasswordVisible ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-800">
                  New password
                </span>

                <div className="relative mt-2">
                  <input
                    type={isNewPasswordVisible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className={`${inputClassName} pr-11`}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setIsNewPasswordVisible((current) => !current)
                    }
                    className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    {isNewPasswordVisible ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Use at least 8 characters.
                </p>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-800">
                  Confirm new password
                </span>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={`${inputClassName} mt-2`}
                  autoComplete="new-password"
                />
              </label>

              {passwordError && (
                <p className="rounded-xl bg-red-50 px-3.5 py-3 text-xs leading-relaxed text-red-700">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 px-5 py-4">
              <button
                type="button"
                onClick={closePasswordModal}
                disabled={isChangingPassword}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleChangePassword()}
                disabled={isChangingPassword}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isChangingPassword ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    Updating
                  </>
                ) : (
                  <>
                    <KeyRound size={15} />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecuritySettingsPage;
