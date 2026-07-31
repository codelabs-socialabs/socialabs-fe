import {
  AlertCircle,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  User,
  Users,
} from 'lucide-react';
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { authApi } from '@/lib/api/auth-api';
import { ApiError } from '@/types/api';

interface RegisterFormState {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  agreeTerms: boolean;
}

type RegisterFieldName = keyof RegisterFormState;

interface RegisterFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  agreeTerms?: string;
  general?: string;
}

const initialFormState: RegisterFormState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  agreeTerms: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const navigate = useNavigate();

  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<RegisterFormState>(initialFormState);

  const [errors, setErrors] = useState<RegisterFormErrors>({});

  useEffect(() => {
    fullNameInputRef.current?.focus();
  }, []);

  const validateField = (
    fieldName: RegisterFieldName,
    currentForm: RegisterFormState = form,
  ): string | undefined => {
    switch (fieldName) {
      case 'fullName': {
        const fullName = currentForm.fullName.trim();

        if (!fullName) {
          return 'Fullname is required.';
        }

        if (fullName.length < 3) {
          return 'Fullname must contain at least 3 characters.';
        }

        if (fullName.length > 100) {
          return 'Fullname cannot contain more than 100 characters.';
        }

        return undefined;
      }

      case 'email': {
        const email = currentForm.email.trim();

        if (!email) {
          return 'Email is required.';
        }

        if (!emailPattern.test(email)) {
          return 'Please enter a valid email address.';
        }

        return undefined;
      }

      case 'password': {
        const password = currentForm.password;

        if (!password) {
          return 'Password is required.';
        }

        if (password.length < 8) {
          return 'Password must contain at least 8 characters.';
        }

        return undefined;
      }

      case 'passwordConfirmation': {
        if (!currentForm.passwordConfirmation) {
          return 'Password confirmation is required.';
        }

        if (currentForm.passwordConfirmation !== currentForm.password) {
          return 'Password confirmation does not match.';
        }

        return undefined;
      }

      case 'agreeTerms': {
        if (!currentForm.agreeTerms) {
          return 'You must agree to the Terms of Service and Privacy Policy.';
        }

        return undefined;
      }

      default:
        return undefined;
    }
  };

  const validateForm = (): RegisterFormErrors => {
    const nextErrors: RegisterFormErrors = {
      fullName: validateField('fullName'),
      email: validateField('email'),
      password: validateField('password'),
      passwordConfirmation: validateField('passwordConfirmation'),
      agreeTerms: validateField('agreeTerms'),
    };

    return Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => Boolean(value)),
    ) as RegisterFormErrors;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, type, value, checked } = event.target;
    const fieldName = name as RegisterFieldName;

    const nextForm: RegisterFormState = {
      ...form,
      [fieldName]: type === 'checkbox' ? checked : value,
    };

    setForm(nextForm);

    setErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
        [fieldName]: undefined,
        general: undefined,
      };

      /*
       * Ketika password berubah, validasi ulang confirm password
       * jika sebelumnya sudah memiliki error.
       */
      if (fieldName === 'password' && currentErrors.passwordConfirmation) {
        nextErrors.passwordConfirmation = validateField(
          'passwordConfirmation',
          nextForm,
        );
      }

      return nextErrors;
    });
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const fieldName = event.target.name as RegisterFieldName;
    const fieldError = validateField(fieldName);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: fieldError,
    }));
  };

  const applyBackendErrors = (error: ApiError): void => {
    if (!error.errors) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        general: error.message,
      }));

      return;
    }

    const backendErrors: RegisterFormErrors = {};

    const fullNameError =
      error.errors.fullName?.[0] ??
      error.errors.full_name?.[0] ??
      error.errors.name?.[0];

    const emailError = error.errors.email?.[0];

    const passwordError = error.errors.password?.[0];

    const passwordConfirmationError =
      error.errors.passwordConfirmation?.[0] ??
      error.errors.password_confirmation?.[0] ??
      error.errors.passwordConfirm?.[0];

    if (fullNameError) {
      backendErrors.fullName = fullNameError;
    }

    if (emailError) {
      backendErrors.email = emailError;
    }

    if (passwordError) {
      backendErrors.password = passwordError;
    }

    if (passwordConfirmationError) {
      backendErrors.passwordConfirmation = passwordConfirmationError;
    }

    /*
     * General error tetap ditampilkan jika backend hanya
     * memberikan message umum.
     */
    if (Object.keys(backendErrors).length === 0) {
      backendErrors.general = error.message;
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      ...backendErrors,
    }));
  };

  const focusFirstInvalidField = (
    validationErrors: RegisterFormErrors,
  ): void => {
    const fieldOrder: Array<keyof RegisterFormErrors> = [
      'fullName',
      'email',
      'password',
      'passwordConfirmation',
      'agreeTerms',
    ];

    const firstInvalidField = fieldOrder.find(
      (fieldName) => validationErrors[fieldName],
    );

    if (!firstInvalidField) {
      return;
    }

    const fieldId =
      firstInvalidField === 'passwordConfirmation'
        ? 'passwordConfirm'
        : firstInvalidField === 'agreeTerms'
          ? 'terms'
          : firstInvalidField;

    document.getElementById(fieldId)?.focus();
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

    try {
      await authApi.register({
        fullname: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
      });

      toast.success('Account created successfully.', {
        description: 'Redirecting you to the login page...',
        duration: 3000,
      });

      navigate('/login', {
        replace: true,
      });
    } catch (error) {
      console.info(error);
      if (error instanceof ApiError) {
        applyBackendErrors(error);
        return;
      }

      setErrors({
        general: 'Unable to create your account. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (
    hasError: boolean,
    hasPasswordToggle = false,
  ): string => {
    const baseClassName =
      'w-full pl-11 py-3.5 text-sm text-slate-800 transition-all duration-200 bg-slate-50 border rounded-md outline-none focus:bg-white focus:ring-4';

    const horizontalPadding = hasPasswordToggle ? 'pr-12' : 'pr-4';

    const stateClassName = hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
      : 'border-gray-200 focus:ring-[#d81b27]/15 focus:border-[#d81b27]';

    return `${baseClassName} ${horizontalPadding} ${stateClassName}`;
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 bg-red-600 relative overflow-hidden p-16 flex flex-col justify-between">
        <div className=" relative z-10 w-full max-w-sm p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/80">
                Audience Growth
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-white">+12.4k</p>
                <span className="text-xs font-medium text-green-300">
                  ↑ this month
                </span>
              </div>
            </div>
          </div>
        </div>

        <svg
          width={567}
          height={806}
          viewBox="0 0 567 806"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-70 top-0"
        >
          <rect
            x="-288.903"
            y="402.844"
            width={640}
            height={640}
            rx={120}
            transform="rotate(-45 -288.903 402.844)"
            fill="url(#paint0_linear_246_12039)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_246_12039"
              x1="-64.6599"
              y1="626.623"
              x2="351.119"
              y2="1042.4"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity={0} />
              <stop offset={1} stopColor="white" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width={567}
          height={806}
          viewBox="0 0 567 806"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-10 top-0"
        >
          <rect
            x="-288.903"
            y="402.844"
            width={640}
            height={640}
            rx={120}
            transform="rotate(-45 -288.903 402.844)"
            fill="url(#paint0_linear_246_12039)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_246_12039"
              x1="-64.6599"
              y1="626.623"
              x2="351.119"
              y2="1042.4"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity={0} />
              <stop offset={1} stopColor="white" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width={567}
          height={806}
          viewBox="0 0 567 806"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-50 top-0"
        >
          <rect
            x="-288.903"
            y="402.844"
            width={640}
            height={640}
            rx={120}
            transform="rotate(-45 -288.903 402.844)"
            fill="url(#paint0_linear_246_12039)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_246_12039"
              x1="-64.6599"
              y1="626.623"
              x2="351.119"
              y2="1042.4"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity={0} />
              <stop offset={1} stopColor="white" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 mt-auto mb-4">
          <h2 className="mb-4 text-4xl font-semibold leading-tight text-white">
            Supercharge your{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 ">
              Social Strategy.
            </span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/80">
            Join thousands of creators and brands. Create an account to track
            analytics, measure campaign ROI, and grow your audience
            effortlessly.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-120">
          <div className="mb-10 ">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Create an account
            </h1>
            <p className="mt-2.5 text-sm text-slate-600 font-medium">
              Join Socialab and start analyzing your performance.
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
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-800"
              >
                Fullname
              </label>

              <div className="relative">
                <div className="absolute inset-0 -left-1 flex items-center pl-4 pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>

                <input
                  ref={fullNameInputRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  placeholder="Jhon Doe"
                  autoComplete="name"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? 'fullName-error' : undefined
                  }
                  className={getInputClassName(Boolean(errors.fullName))}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </div>

              {errors.fullName && (
                <p
                  id="fullName-error"
                  role="alert"
                  className="text-xs font-medium text-red-600"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

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
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="Enter your email"
                  autoComplete="email"
                  inputMode="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={getInputClassName(Boolean(errors.email))}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </div>

              {errors.email && (
                <p
                  id="email-error"
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
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
                  onClick={() => setShowPassword((current) => !current)}
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
                  id="password-error"
                  role="alert"
                  className="text-xs font-medium text-red-600"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-slate-800"
              >
                Confirm Password
              </label>

              <div className="relative">
                <div className="absolute inset-0 -left-1 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>

                <input
                  id="passwordConfirm"
                  name="passwordConfirmation"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={form.passwordConfirmation}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.passwordConfirmation)}
                  aria-describedby={
                    errors.passwordConfirmation
                      ? 'passwordConfirmation-error'
                      : undefined
                  }
                  className={getInputClassName(
                    Boolean(errors.passwordConfirmation),
                    true,
                  )}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />

                <button
                  type="button"
                  disabled={isSubmitting}
                  aria-label={
                    showPasswordConfirm
                      ? 'Hide password confirmation'
                      : 'Show password confirmation'
                  }
                  aria-pressed={showPasswordConfirm}
                  onClick={() => setShowPasswordConfirm((current) => !current)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none disabled:cursor-not-allowed"
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.passwordConfirmation && (
                <p
                  id="passwordConfirmation-error"
                  role="alert"
                  className="text-xs font-medium text-red-600"
                >
                  {errors.passwordConfirmation}
                </p>
              )}
            </div>

            <div className="pt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={form.agreeTerms}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.agreeTerms)}
                    aria-describedby={
                      errors.agreeTerms ? 'agreeTerms-error' : undefined
                    }
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-4 h-4 text-[#d81b27] bg-gray-50 border-gray-300 rounded cursor-pointer focus:ring-[#d81b27] disabled:cursor-not-allowed"
                  />
                </div>

                <label
                  htmlFor="terms"
                  className="ml-2.5 text-xs font-medium text-gray-600 cursor-pointer select-none leading-relaxed"
                >
                  By signing up, you agree to our{' '}
                  <Link
                    to="#terms"
                    className="font-bold text-[#d81b27] hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="#privacy"
                    className="font-bold text-[#d81b27] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {errors.agreeTerms && (
                <p
                  id="agreeTerms-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-red-600"
                >
                  {errors.agreeTerms}
                </p>
              )}
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

                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </span>
            </button>
          </form>

          <p className="pt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#d81b27] hover:underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
