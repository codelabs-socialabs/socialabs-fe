import {
  AlertCircle,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  TrendingUp,
} from 'lucide-react';
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { authApi } from '@/lib/api/auth-api';
import { tokenStorage } from '@/lib/auth/token-storage';
import { useAuthStore } from '@/stores/auth-store';
import { ApiError } from '@/types/api';

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginLocationState {
  from?: string;
}

const REMEMBERED_EMAIL_KEY = 'socialabs_remembered_email';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const delay = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const emailInputRef = useRef<HTMLInputElement>(null);

  const setAuthenticatedUser = useAuthStore(
    (state) => state.setAuthenticatedUser,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  /*
   * Mengambil email yang sebelumnya disimpan.
   * Password tidak pernah disimpan.
   */
  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);

    if (rememberedEmail) {
      setForm((currentForm) => ({
        ...currentForm,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }

    emailInputRef.current?.focus();
  }, []);

  const validateEmail = (emailValue = form.email): string | undefined => {
    const email = emailValue.trim();

    if (!email) {
      return 'Email is required.';
    }

    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    return undefined;
  };

  const validatePassword = (
    passwordValue = form.password,
  ): string | undefined => {
    if (!passwordValue) {
      return 'Password is required.';
    }

    return undefined;
  };

  const validateForm = (): LoginFormErrors => {
    const nextErrors: LoginFormErrors = {
      email: validateEmail(),
      password: validatePassword(),
    };

    return Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => Boolean(value)),
    ) as LoginFormErrors;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, type, value, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      general: undefined,
    }));
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const fieldName = event.target.name;

    if (fieldName === 'email') {
      setErrors((currentErrors) => ({
        ...currentErrors,
        email: validateEmail(event.target.value),
      }));
    }

    if (fieldName === 'password') {
      setErrors((currentErrors) => ({
        ...currentErrors,
        password: validatePassword(event.target.value),
      }));
    }
  };

  const focusFirstInvalidField = (validationErrors: LoginFormErrors): void => {
    if (validationErrors.email) {
      emailInputRef.current?.focus();
      return;
    }

    if (validationErrors.password) {
      document.getElementById('password')?.focus();
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstInvalidField(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    /*
     * Delay minimum hanya untuk development agar animasi
     * loading tidak terlihat berkedip terlalu cepat.
     */
    const minimumLoadingDelay = delay(2500);

    try {
      const [response] = await Promise.all([
        authApi.login({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
        minimumLoadingDelay,
      ]);

      tokenStorage.setAccessToken(response.data.token);

      setAuthenticatedUser(response.data.user);

      if (form.rememberMe) {
        localStorage.setItem(
          REMEMBERED_EMAIL_KEY,
          form.email.trim().toLowerCase(),
        );
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      toast.success('Welcome back!', {
        description: 'Redirecting to your workspace...',
        duration: 2500,
      });

      /*
       * Beri waktu singkat agar pengguna melihat feedback
       * bahwa proses login berhasil.
       */
      await delay(700);

      const locationState = location.state as LoginLocationState | null;

      navigate(locationState?.from ?? '/workspaces', {
        replace: true,
      });
    } catch (error) {
      await minimumLoadingDelay;

      if (error instanceof ApiError) {
        /*
         * Untuk login, sebaiknya jangan membedakan apakah
         * email atau password yang salah demi keamanan.
         */
        if (error.status === 401 || error.status === 403) {
          setErrors({
            general: 'The email or password you entered is incorrect.',
          });

          document.getElementById('password')?.focus();
          return;
        }

        if (error.status === 422 && error.errors) {
          setErrors({
            email: error.errors.email?.[0],
            password: error.errors.password?.[0],
            general:
              !error.errors.email && !error.errors.password
                ? error.message
                : undefined,
          });

          return;
        }

        setErrors({
          general: error.message,
        });

        return;
      }

      setErrors({
        general: 'Unable to sign in. Check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (
    hasError: boolean,
    hasPasswordToggle = false,
  ): string => {
    const paddingRight = hasPasswordToggle ? 'pr-12' : 'pr-4';

    const stateClassName = hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
      : 'border-gray-200 focus:ring-[#d81b27]/15 focus:border-[#d81b27]';

    return [
      'w-full pl-11 py-3.5 text-sm text-slate-800',
      'transition-all duration-200 bg-slate-50 border rounded-md',
      'outline-none focus:bg-white focus:ring-4',
      'disabled:cursor-not-allowed disabled:opacity-70',
      paddingRight,
      stateClassName,
    ].join(' ');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Panel kiri kamu tetap sama persis */}
      <div className="w-1/2 bg-red-600 relative overflow-hidden p-16 flex flex-col justify-between">
        <div className=" relative z-10 w-full max-w-sm p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>

            <div>
              <p className="text-sm font-medium text-white/80">
                Avg. Engagement Rate
              </p>

              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-white">+24.8%</p>

                <span className="text-xs font-medium text-green-300">
                  ↑ this week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gunakan ketiga SVG milikmu di sini tanpa perubahan */}

        <div className="relative z-10 mt-auto mb-4">
          <h2 className="mb-4 text-4xl font-semibold leading-tight text-white">
            Master your{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 ">
              Social Presence.
            </span>
          </h2>

          <p className="max-w-md text-base leading-relaxed text-white/80">
            Turn social data into actionable insights. Track engagement, measure
            campaign success, and grow your audience faster.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-120">
          <div className="mb-10 ">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Login to your account
            </h1>

            <p className="mt-2.5 text-sm text-slate-600 font-medium">
              Welcome back! Let's track your social performance today.
            </p>
          </div>

          {errors.general && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

              <p className="text-sm font-medium leading-relaxed text-red-700">
                {errors.general}
              </p>
            </div>
          )}

          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            <div className="space-y-2.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                Email
              </label>

              <div className="relative">
                <div className="absolute inset-0 -left-1 flex items-center pl-4 pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>

                <input
                  ref={emailInputRef}
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="Enter your email"
                  autoComplete="email"
                  inputMode="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'login-email-error' : undefined
                  }
                  className={getInputClassName(Boolean(errors.email))}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </div>

              {errors.email && (
                <p
                  id="login-email-error"
                  role="alert"
                  className="text-xs font-medium text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-800"
              >
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-0 -left-1 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'login-password-error' : undefined
                  }
                  className={getInputClassName(Boolean(errors.password), true)}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />

                <button
                  type="button"
                  disabled={isSubmitting}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="login-password-error"
                  role="alert"
                  className="text-xs font-medium text-red-600"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  disabled={isSubmitting}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-700 bg-gray-50 border-gray-300 cursor-pointer focus:ring-[#d81b27] disabled:cursor-not-allowed"
                />

                <label
                  htmlFor="remember-me"
                  className="ml-2.5 text-sm text-gray-700 cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full cursor-pointer px-4 py-3.5 mt-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 bg-[#d81b27] rounded-xl hover:bg-[#b3121d] hover:shadow-lg hover:shadow-[#d81b27]/25 focus:outline-none focus:ring-4 focus:ring-[#d81b27]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#d81b27] disabled:hover:shadow-none disabled:active:scale-100"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}

                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </span>
            </button>
          </form>

          <p className="pt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#d81b27] hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
