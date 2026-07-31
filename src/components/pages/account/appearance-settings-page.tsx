import {
  Check,
  Clock3,
  Laptop,
  LayoutPanelTop,
  Moon,
  PanelLeft,
  Rows3,
  Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

type InterfaceDensity = 'comfortable' | 'compact';

interface ThemeOption {
  id: Theme;
  label: string;
  description: string;
  icon: typeof Laptop;
  disabled?: boolean;
}

interface DensityOption {
  id: InterfaceDensity;
  label: string;
  description: string;
  icon: typeof LayoutPanelTop;
  disabled?: boolean;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'system',
    label: 'System',
    description: 'Follow the appearance setting of your device.',
    icon: Laptop,
  },
  {
    id: 'light',
    label: 'Light',
    description: 'Use a bright interface across SociaLabs.',
    icon: Sun,
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Use a darker interface across SociaLabs.',
    icon: Moon,
    disabled: true,
  },
];

const densityOptions: DensityOption[] = [
  {
    id: 'comfortable',
    label: 'Comfortable',
    description: 'More spacing for easier reading and exploration.',
    icon: LayoutPanelTop,
  },
  {
    id: 'compact',
    label: 'Compact',
    description: 'Display more rows and information within the same space.',
    icon: Rows3,
    disabled: true,
  },
];

const AppearanceSettingsPage = () => {
  const [theme, setTheme] = useState<Theme>('system');

  const [density, setDensity] = useState<InterfaceDensity>('comfortable');

  const [rememberSidebarState, setRememberSidebarState] = useState(true);

  /*
   * Sinkronkan pilihan theme React dengan DOM.
   * Effect digunakan karena document merupakan sistem eksternal.
   */
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'light') {
      root.classList.remove('dark');
      return;
    }

    if (theme === 'dark') {
      root.classList.add('dark');
      return;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    /*
     * Dark mode belum tersedia.
     *
     * Saat user memilih "System", sementara tetap
     * gunakan light mode apabila device sedang dark.
     * Nanti bagian ini dapat diganti menjadi:
     *
     * root.classList.toggle(
     *   'dark',
     *   prefersDark,
     * );
     */
    if (prefersDark) {
      root.classList.remove('dark');
      return;
    }

    root.classList.remove('dark');
  }, [theme]);

  /*
   * Sinkronkan pilihan density React dengan DOM.
   */
  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  const applyTheme = (nextTheme: Theme): void => {
    const selectedOption = themeOptions.find(
      (option) => option.id === nextTheme,
    );

    if (!selectedOption || selectedOption.disabled) {
      return;
    }

    setTheme(nextTheme);
  };

  const handleDensityChange = (nextDensity: InterfaceDensity): void => {
    const selectedOption = densityOptions.find(
      (option) => option.id === nextDensity,
    );

    if (!selectedOption || selectedOption.disabled) {
      return;
    }

    setDensity(nextDensity);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
          User settings
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          Appearance
        </h1>

        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
          Personalize the application theme, information density, and sidebar
          behavior. Available changes are applied immediately.
        </p>
      </header>

      <main className="mt-8">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.025]">
          {/* Theme */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-slate-950">Theme</h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose the color scheme used throughout SociaLabs.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;

                const isActive = theme === option.id;

                const isDisabled = Boolean(option.disabled);

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => applyTheme(option.id)}
                    aria-label={
                      isDisabled
                        ? `${option.label} theme coming soon`
                        : `Use ${option.label} theme`
                    }
                    className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                      isDisabled
                        ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-65'
                        : isActive
                          ? 'border-red-300 ring-1 ring-red-200'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div
                      className={`relative h-28 overflow-hidden border-b ${
                        option.id === 'dark'
                          ? 'border-slate-700 bg-slate-900'
                          : 'border-slate-100 bg-slate-50'
                      }`}
                    >
                      <div
                        className={`absolute left-3 top-3 h-20 w-8 rounded-md ${
                          option.id === 'dark' ? 'bg-slate-800' : 'bg-white'
                        }`}
                      />

                      <div
                        className={`absolute left-14 right-3 top-3 h-3 rounded ${
                          option.id === 'dark' ? 'bg-slate-700' : 'bg-white'
                        }`}
                      />

                      <div
                        className={`absolute left-14 right-12 top-9 h-3 rounded ${
                          option.id === 'dark' ? 'bg-slate-800' : 'bg-white'
                        }`}
                      />

                      <div
                        className={`absolute bottom-3 left-14 right-3 top-[60px] rounded-md ${
                          option.id === 'dark' ? 'bg-slate-800' : 'bg-white'
                        }`}
                      />

                      {option.id === 'system' && (
                        <div className="absolute inset-y-0 right-0 w-1/2 bg-slate-900/95">
                          <div className="absolute left-3 top-3 h-20 w-8 rounded-md bg-slate-800" />

                          <div className="absolute left-14 right-3 top-3 h-3 rounded bg-slate-700" />

                          <div className="absolute left-14 right-12 top-9 h-3 rounded bg-slate-800" />

                          <div className="absolute bottom-3 left-14 right-3 top-[60px] rounded-md bg-slate-800" />
                        </div>
                      )}

                      {isActive && !isDisabled && (
                        <span className="absolute right-3 top-3 z-10 flex size-6 items-center justify-center rounded-full bg-red-600 text-white shadow-sm">
                          <Check size={13} />
                        </span>
                      )}

                      {isDisabled && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-[1px]">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                            <Clock3 size={13} />
                            Soon
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Icon
                            size={17}
                            className={
                              isDisabled
                                ? 'text-slate-400'
                                : isActive
                                  ? 'text-red-600'
                                  : 'text-slate-400'
                            }
                          />

                          <p
                            className={`text-sm font-medium ${
                              isDisabled ? 'text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {option.label}
                          </p>
                        </div>

                        {isDisabled && (
                          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                            Soon
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-2 text-xs leading-relaxed ${
                          isDisabled ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-800">
              <Clock3 size={15} className="mt-0.5 shrink-0" />

              <p>
                Dark mode is still under development and will be available in a
                future update.
              </p>
            </div>
          </div>

          <div className="mx-5 border-t border-slate-100 sm:mx-8" />

          {/* Density */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-slate-950">
                Interface density
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Control how much information appears within data-heavy pages.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {densityOptions.map((option) => {
                const Icon = option.icon;

                const isActive = density === option.id;

                const isDisabled = Boolean(option.disabled);

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDensityChange(option.id)}
                    aria-label={
                      isDisabled
                        ? `${option.label} density coming soon`
                        : `Use ${option.label} density`
                    }
                    className={`relative flex items-start gap-4 overflow-hidden rounded-xl border p-4 text-left transition ${
                      isDisabled
                        ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-65'
                        : isActive
                          ? 'border-red-300 bg-red-50/50 ring-1 ring-red-200'
                          : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                        isDisabled
                          ? 'bg-slate-200 text-slate-400'
                          : isActive
                            ? 'bg-red-100 text-red-600'
                            : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 pr-14">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-medium ${
                            isDisabled ? 'text-slate-500' : 'text-slate-900'
                          }`}
                        >
                          {option.label}
                        </p>

                        {isActive && !isDisabled && (
                          <Check size={15} className="text-red-600" />
                        )}
                      </div>

                      <p
                        className={`mt-1 text-xs leading-relaxed ${
                          isDisabled ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>

                    {isDisabled && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        <Clock3 size={11} />
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-800">
              <Clock3 size={15} className="mt-0.5 shrink-0" />

              <p>
                Compact interface density is coming soon. Comfortable mode is
                currently used across SociaLabs.
              </p>
            </div>
          </div>

          <div className="mx-5 border-t border-slate-100 sm:mx-8" />

          {/* Sidebar behavior */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <PanelLeft size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Remember sidebar state
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                    Keep the application sidebar collapsed or expanded between
                    visits.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={rememberSidebarState}
                onClick={() => setRememberSidebarState((current) => !current)}
                className={`relative mt-0.5 h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-red-100 ${
                  rememberSidebarState ? 'bg-red-600' : 'bg-slate-200'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                    rememberSidebarState ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AppearanceSettingsPage;
