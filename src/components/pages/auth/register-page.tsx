import { Eye, EyeOff, Lock, Mail, User, Users } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import { useRegister, useAuth } from '@/features/auth/hooks';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const register = useRegister();

  if (isAuthenticated) return <Navigate to="/app" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    register.mutate({ fullname, email, password });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2.5">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-slate-800"
              >
                Fullname
              </label>
              <div className="relative">
                <div className="absolute inset-0 -left-1 flex items-center pl-4 pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Jhon Doe"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-sm text-slate-800  transition-all duration-200 bg-slate-50 border border-gray-200 rounded-md outline-none focus:bg-white focus:ring-4 focus:ring-[#d81b27]/15 focus:border-[#d81b27]"
                />
              </div>
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
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-sm text-slate-800  transition-all duration-200 bg-slate-50 border border-gray-200 rounded-md outline-none focus:bg-white focus:ring-4 focus:ring-[#d81b27]/15 focus:border-[#d81b27]"
                />
              </div>
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-sm text-slate-800  transition-all duration-200 bg-slate-50 border border-gray-200 rounded-md outline-none focus:bg-white focus:ring-4 focus:ring-[#d81b27]/15 focus:border-[#d81b27]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
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
                  type={showPasswordConfirm ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-sm text-slate-800  transition-all duration-200 bg-slate-50 border border-gray-200 rounded-md outline-none focus:bg-white focus:ring-4 focus:ring-[#d81b27]/15 focus:border-[#d81b27]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {register.isError && (
              <p className="text-sm text-red-600">
                Registration failed. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={register.isPending}
              className="w-full cursor-pointer px-4 py-3.5 mt-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 bg-[#d81b27] rounded-xl hover:bg-[#b3121d] hover:shadow-lg hover:shadow-[#d81b27]/25 focus:outline-none focus:ring-4 focus:ring-[#d81b27]/30 active:scale-[0.98] disabled:opacity-50"
            >
              {register.isPending ? 'Creating Account...' : 'Create Account'}
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
