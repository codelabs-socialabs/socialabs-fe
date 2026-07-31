import {
  BadgeCheck,
  Camera,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
  Save,
  Send,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';

interface ProfileForm {
  fullName: string;
  username: string;
  jobTitle: string;
  organization: string;
  bio: string;
  location: string;
  website: string;
}

interface ChangeEmailForm {
  newEmail: string;
  password: string;
}

type EmailVerificationStatus = 'verified' | 'unverified';

const MAX_BIO_LENGTH = 300;
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const initialProfile: ProfileForm = {
  fullName: 'Rafi Asshiddiqie Tanujaya',
  username: 'rafitanujaya',
  jobTitle: 'Social Media Analyst',
  organization: 'SociaLabs',
  bio: 'Interested in social media analytics, artificial intelligence, and digital product development.',
  location: 'Bandung, Indonesia',
  website: 'https://rafitanujaya.dev',
};

const inputClassName = `
  w-full rounded-xl border border-slate-200 bg-white
  px-3.5 py-2.5 text-sm text-slate-900 outline-none
  transition placeholder:text-slate-400
  hover:border-slate-300
  focus:border-red-400 focus:ring-4 focus:ring-red-50
  disabled:cursor-not-allowed disabled:bg-slate-50
  disabled:text-slate-500
`;

const ProfileSettingsPage = () => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileForm>(initialProfile);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [avatarError, setAvatarError] = useState('');

  const [email, setEmail] = useState('rafi@socialabs.id');

  const [emailVerificationStatus, setEmailVerificationStatus] =
    useState<EmailVerificationStatus>('verified');

  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);

  const [changeEmailForm, setChangeEmailForm] = useState<ChangeEmailForm>({
    newEmail: '',
    password: '',
  });

  const [changeEmailError, setChangeEmailError] = useState('');

  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const [isResendingVerification, setIsResendingVerification] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const markAsChanged = (): void => {
    setHasChanges(true);
    setSavedSuccessfully(false);
  };

  const updateProfileField = <Key extends keyof ProfileForm>(
    field: Key,
    value: ProfileForm[Key],
  ): void => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));

    markAsChanged();
  };

  const updateChangeEmailField = (
    field: keyof ChangeEmailForm,
    value: string,
  ): void => {
    setChangeEmailForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setChangeEmailError('');
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarError('');

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError('Please choose a JPG, PNG, or WebP image.');

      event.target.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('The image must be smaller than 2 MB.');

      event.target.value = '';
      return;
    }

    const nextAvatarUrl = URL.createObjectURL(file);

    setAvatarUrl((currentAvatarUrl) => {
      if (currentAvatarUrl) {
        URL.revokeObjectURL(currentAvatarUrl);
      }

      return nextAvatarUrl;
    });

    markAsChanged();
    event.target.value = '';
  };

  const handleRemoveAvatar = (): void => {
    setAvatarUrl((currentAvatarUrl) => {
      if (currentAvatarUrl) {
        URL.revokeObjectURL(currentAvatarUrl);
      }

      return null;
    });

    setAvatarError('');
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
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const openChangeEmailModal = (): void => {
    setChangeEmailForm({
      newEmail: '',
      password: '',
    });

    setChangeEmailError('');
    setIsPasswordVisible(false);
    setIsChangeEmailModalOpen(true);
  };

  const closeChangeEmailModal = (): void => {
    if (isChangingEmail) {
      return;
    }

    setIsChangeEmailModalOpen(false);

    setChangeEmailForm({
      newEmail: '',
      password: '',
    });

    setChangeEmailError('');
    setIsPasswordVisible(false);
  };

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleChangeEmail = async (): Promise<void> => {
    const normalizedEmail = changeEmailForm.newEmail.trim().toLowerCase();

    if (!normalizedEmail) {
      setChangeEmailError('Enter your new email address.');
      return;
    }

    if (!validateEmail(normalizedEmail)) {
      setChangeEmailError('Enter a valid email address.');
      return;
    }

    if (normalizedEmail === email.toLowerCase()) {
      setChangeEmailError(
        'The new email must be different from your current email.',
      );
      return;
    }

    if (!changeEmailForm.password) {
      setChangeEmailError('Enter your current password.');
      return;
    }

    setIsChangingEmail(true);
    setChangeEmailError('');

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setPendingEmail(normalizedEmail);
      setIsChangeEmailModalOpen(false);

      setChangeEmailForm({
        newEmail: '',
        password: '',
      });

      setIsPasswordVisible(false);
    } catch (error) {
      console.error('Failed to request email change:', error);

      setChangeEmailError(
        'Unable to change the email right now. Please try again.',
      );
    } finally {
      setIsChangingEmail(false);
    }
  };

  const handleResendVerification = async (): Promise<void> => {
    if (
      isResendingVerification ||
      (!pendingEmail && emailVerificationStatus === 'verified')
    ) {
      return;
    }

    setIsResendingVerification(true);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleCancelPendingEmail = (): void => {
    setPendingEmail(null);
  };

  const handleMockVerifyEmail = (): void => {
    if (!pendingEmail) {
      return;
    }

    setEmail(pendingEmail);
    setPendingEmail(null);

    setEmailVerificationStatus('verified');
  };

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
            User settings
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Profile
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
            Manage your personal information, identity, and the email associated
            with your SociaLabs account.
          </p>
        </header>

        <main className="mt-8">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.025]">
            {/* Profile identity */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="group relative shrink-0">
                  <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-100 to-red-50 text-2xl font-semibold text-red-600 ring-4 ring-white shadow-sm">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={`${profile.fullName} profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={34} />
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    aria-label="Change profile photo"
                    className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-white shadow-sm transition hover:bg-red-600"
                  >
                    <Camera size={15} />
                  </button>

                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-xl font-semibold tracking-tight text-slate-950">
                    {profile.fullName || 'Your name'}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    @{profile.username || 'username'}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Camera size={14} />
                      Change Photo
                    </button>

                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    JPG, PNG, or WebP. Maximum file size 2 MB.
                  </p>

                  {avatarError && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <CircleAlert size={13} />

                      {avatarError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* Personal information */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-slate-950">
                  Personal information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Information visible to members you collaborate with.
                </p>
              </div>

              <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Full name
                  </span>

                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(event) =>
                      updateProfileField('fullName', event.target.value)
                    }
                    className={`${inputClassName} mt-2`}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Username
                  </span>

                  <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-50">
                    <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-400">
                      @
                    </span>

                    <input
                      type="text"
                      value={profile.username}
                      onChange={(event) =>
                        updateProfileField(
                          'username',
                          event.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9._-]/g, ''),
                        )
                      }
                      className="min-w-0 flex-1 px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                      placeholder="username"
                      autoComplete="username"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-slate-400">
                    Used to identify you inside SociaLabs.
                  </p>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Job title
                  </span>

                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={(event) =>
                      updateProfileField('jobTitle', event.target.value)
                    }
                    className={`${inputClassName} mt-2`}
                    placeholder="Your professional role"
                    autoComplete="organization-title"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Organization
                  </span>

                  <input
                    type="text"
                    value={profile.organization}
                    onChange={(event) =>
                      updateProfileField('organization', event.target.value)
                    }
                    className={`${inputClassName} mt-2`}
                    placeholder="Company or organization"
                    autoComplete="organization"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-800">
                      Bio
                    </span>

                    <span
                      className={`text-xs ${
                        profile.bio.length > MAX_BIO_LENGTH
                          ? 'font-medium text-red-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {profile.bio.length}/{MAX_BIO_LENGTH}
                    </span>
                  </div>

                  <textarea
                    value={profile.bio}
                    onChange={(event) =>
                      updateProfileField(
                        'bio',
                        event.target.value.slice(0, MAX_BIO_LENGTH),
                      )
                    }
                    rows={4}
                    className={`${inputClassName} mt-2 resize-none leading-relaxed`}
                    placeholder="Tell other members a little about yourself"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Location
                  </span>

                  <input
                    type="text"
                    value={profile.location}
                    onChange={(event) =>
                      updateProfileField('location', event.target.value)
                    }
                    className={`${inputClassName} mt-2`}
                    placeholder="City, country"
                    autoComplete="address-level2"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Website
                  </span>

                  <input
                    type="url"
                    value={profile.website}
                    onChange={(event) =>
                      updateProfileField('website', event.target.value)
                    }
                    className={`${inputClassName} mt-2`}
                    placeholder="https://example.com"
                    autoComplete="url"
                  />
                </label>
              </div>

              {/* Save profile action */}
              <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Save profile changes
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                    Updates apply to your profile photo and personal
                    information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={!hasChanges || isSaving}
                  className={`inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-medium transition sm:self-auto ${
                    savedSuccessfully && !hasChanges
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  } disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400`}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
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
              </div>
            </div>

            <div className="mx-5 border-t border-slate-100 sm:mx-8" />

            {/* Email address */}
            <div className="px-5 py-7 sm:px-8 sm:py-8">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-slate-950">
                  Email address
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Used for signing in, account recovery, and important security
                  notifications.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200">
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {email}
                      </p>

                      <div className="mt-1.5">
                        {emailVerificationStatus === 'verified' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <BadgeCheck size={14} />
                            Verified email
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
                            <CircleAlert size={14} />
                            Not verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {emailVerificationStatus === 'unverified' && (
                      <button
                        type="button"
                        onClick={() => void handleResendVerification()}
                        disabled={isResendingVerification}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isResendingVerification ? (
                          <LoaderCircle size={14} className="animate-spin" />
                        ) : (
                          <Send size={14} />
                        )}
                        Resend Verification
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={openChangeEmailModal}
                      className="rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-red-600 ring-1 ring-slate-200 transition hover:bg-red-50 hover:ring-red-200"
                    >
                      Change Email
                    </button>
                  </div>
                </div>

                {pendingEmail && (
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs font-medium text-slate-700">
                          Verification pending
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          We sent a verification link to{' '}
                          <span className="font-medium text-slate-700">
                            {pendingEmail}
                          </span>
                          . Your current email remains active until the new
                          address is verified.
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => void handleResendVerification()}
                          disabled={isResendingVerification}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                          {isResendingVerification ? (
                            <LoaderCircle size={13} className="animate-spin" />
                          ) : (
                            <Send size={13} />
                          )}
                          Resend
                        </button>

                        <button
                          type="button"
                          onClick={handleMockVerifyEmail}
                          className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-700"
                        >
                          Mock Verify
                        </button>

                        <button
                          type="button"
                          onClick={handleCancelPendingEmail}
                          className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Change email modal */}
      {isChangeEmailModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeChangeEmailModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-email-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
          >
            <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
                  Account security
                </p>

                <h2
                  id="change-email-title"
                  className="mt-1.5 text-lg font-semibold text-slate-950"
                >
                  Change email address
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Your current email remains active until the new address is
                  verified.
                </p>
              </div>

              <button
                type="button"
                onClick={closeChangeEmailModal}
                disabled={isChangingEmail}
                aria-label="Close change email modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-y border-slate-100 px-5 py-5 sm:px-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">
                  Current email
                </p>

                <div className="mt-1.5 flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {email}
                  </p>

                  {emailVerificationStatus === 'verified' && (
                    <BadgeCheck
                      size={15}
                      className="shrink-0 text-emerald-600"
                    />
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    New email address
                  </span>

                  <input
                    type="email"
                    value={changeEmailForm.newEmail}
                    onChange={(event) =>
                      updateChangeEmailField('newEmail', event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        closeChangeEmailModal();
                      }

                      if (event.key === 'Enter') {
                        void handleChangeEmail();
                      }
                    }}
                    className={`${inputClassName} mt-2`}
                    placeholder="newemail@example.com"
                    autoComplete="email"
                    autoFocus
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    Current password
                  </span>

                  <div className="relative mt-2">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={changeEmailForm.password}
                      onChange={(event) =>
                        updateChangeEmailField('password', event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          closeChangeEmailModal();
                        }

                        if (event.key === 'Enter') {
                          void handleChangeEmail();
                        }
                      }}
                      className={`${inputClassName} pr-11`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setIsPasswordVisible((current) => !current)
                      }
                      aria-label={
                        isPasswordVisible ? 'Hide password' : 'Show password'
                      }
                      className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </label>

                {changeEmailError && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-xs leading-relaxed text-red-700">
                    <CircleAlert size={15} className="mt-0.5 shrink-0" />

                    {changeEmailError}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={closeChangeEmailModal}
                disabled={isChangingEmail}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleChangeEmail()}
                disabled={isChangingEmail}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingEmail ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Continue
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

export default ProfileSettingsPage;
