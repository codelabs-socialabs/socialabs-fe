/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShieldCheck } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';

interface ToggleFieldProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

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
        disabled ? 'opacity-60' : ''
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
        className={`relative mt-0.5 h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-red-100 ${
          checked ? 'bg-red-600' : 'bg-slate-200'
        } disabled:cursor-not-allowed`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

const NotificationSettingsPage = () => {
  const [inApp, setInApp] = useState(true);

  const [email, setEmail] = useState(true);

  const [workspaceInvitations, setWorkspaceInvitations] = useState(true);

  const [roleChanges, setRoleChanges] = useState(true);

  const [projectInvitations, setProjectInvitations] = useState(true);

  const [processingCompleted, setProcessingCompleted] = useState(true);

  const [processingFailed, setProcessingFailed] = useState(true);

  const [productUpdates, setProductUpdates] = useState(false);

  const [newsletter, setNewsletter] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const updateSetting = (
    setter: Dispatch<SetStateAction<boolean>>,
    value: boolean,
  ): void => {
    setter(value);
    setHasChanges(true);
    setSavedSuccessfully(false);
  };

  const handleSave = async (): Promise<void> => {
    if (!hasChanges || isSaving) {
      return;
    }

    setIsSaving(true);
    setSavedSuccessfully(false);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      setHasChanges(false);
      setSavedSuccessfully(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
            User settings
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Notifications
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
            Choose how and when SociaLabs should notify you about workspace,
            project, and product activity.
          </p>
        </div>
      </header>

      <main className="mt-8 space-y-5">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.025]">
          {/* Channels */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-slate-950">
                Notification channels
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose where account and project updates should be delivered.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <ToggleField
                title="In-app notifications"
                description="Show notifications in the SociaLabs notification center."
                checked={inApp}
                onChange={(checked) => updateSetting(setInApp, checked)}
              />

              <ToggleField
                title="Email notifications"
                description="Send important notifications to your verified email address."
                checked={email}
                onChange={(checked) => updateSetting(setEmail, checked)}
              />
            </div>
          </div>

          <div className="mx-5 border-t border-slate-100 sm:mx-8" />

          {/* Workspace */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-slate-950">
                Workspace activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Updates related to workspace membership and permissions.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <ToggleField
                title="Workspace invitations"
                description="Notify when you are invited to join a workspace."
                checked={workspaceInvitations}
                onChange={(checked) =>
                  updateSetting(setWorkspaceInvitations, checked)
                }
              />

              <ToggleField
                title="Role and access changes"
                description="Notify when your workspace role or permissions change."
                checked={roleChanges}
                onChange={(checked) => updateSetting(setRoleChanges, checked)}
              />
            </div>
          </div>

          <div className="mx-5 border-t border-slate-100 sm:mx-8" />

          {/* Project */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-slate-950">
                Project activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Default notification preferences for projects you can access.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <ToggleField
                title="Project invitations"
                description="Notify when you are added to a project."
                checked={projectInvitations}
                onChange={(checked) =>
                  updateSetting(setProjectInvitations, checked)
                }
              />

              <ToggleField
                title="Processing completed"
                description="Notify when collection and analysis finish successfully."
                checked={processingCompleted}
                onChange={(checked) =>
                  updateSetting(setProcessingCompleted, checked)
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
          </div>

          <div className="mx-5 border-t border-slate-100 sm:mx-8" />

          {/* Security */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Security alerts
                    </p>

                    <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                      Receive notifications for new logins, password changes,
                      email updates, and suspicious activity.
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Always enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product communication */}
        <section className="rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-sm shadow-slate-950/[0.025] sm:px-8 sm:py-8">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-950">
              Product communication
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Optional updates about SociaLabs and social intelligence
              resources.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <ToggleField
              title="Product updates"
              description="Receive announcements about new features and platform improvements."
              checked={productUpdates}
              onChange={(checked) => updateSetting(setProductUpdates, checked)}
            />

            <ToggleField
              title="Newsletter"
              description="Receive research tips, use cases, and social intelligence resources."
              checked={newsletter}
              onChange={(checked) => updateSetting(setNewsletter, checked)}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotificationSettingsPage;
