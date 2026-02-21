import { Eye, EyeOff, Lock, Mail, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <div className="flex min-h-screen bg-white">
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
          <form action="" className="space-y-4">
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
                  type="text"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 text-sm text-slate-800  transition-all duration-200 bg-slate-50 border border-gray-200 rounded-md outline-none focus:bg-white focus:ring-4 focus:ring-[#d81b27]/15 focus:border-[#d81b27]"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-0 -left-1 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'test' : 'password'}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-red-700 bg-gray-50 border-gray-300 cursor-pointer focus:ring-[#d81b27]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2.5 text-sm  text-gray-700 cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>

              <Link
                to={'#forgot-password'}
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer px-4 py-3.5 mt-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 bg-[#d81b27] rounded-xl hover:bg-[#b3121d] hover:shadow-lg hover:shadow-[#d81b27]/25 focus:outline-none focus:ring-4 focus:ring-[#d81b27]/30 active:scale-[0.98]"
            >
              Sign in
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
