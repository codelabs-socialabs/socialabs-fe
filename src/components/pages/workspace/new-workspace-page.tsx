import logo from '@/assets/socialabs-logo.png';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function NewWorkspacePage() {
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    plan: 'pro', // default
  });
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
        <Link to={'/app'} className="flex items-center gap-1.5">
          <img src={logo} alt="" className="w-7 h-7" />
          <div className="text-2xl font-semibold tracking-wider">Socialabs</div>
        </Link>
      </header>

      <main className="flex-1 flex justify-center py-12 px-4 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Create a new workspace
            </h1>
            <p className="text-slate-500 text-base">
              Workspaces are shared environments where teams can organize
              projects, research, and insights.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <form className="p-8 space-y-8">
              {/* General Info */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  General Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Workspace Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900"
                    placeholder="e.g., Marketing Team, Academic Research"
                    value={newWorkspace.name}
                    onChange={(e) =>
                      setNewWorkspace({ ...newWorkspace, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Description{' '}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900 resize-none"
                    placeholder="What is this workspace for?"
                    value={newWorkspace.description}
                    onChange={(e) =>
                      setNewWorkspace({
                        ...newWorkspace,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Plan Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  Select a Plan
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  {/* Basic Plan */}
                  <label
                    className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${newWorkspace.plan === 'basic' ? 'border-red-600 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value="basic"
                      className="sr-only"
                      onChange={() =>
                        setNewWorkspace({ ...newWorkspace, plan: 'basic' })
                      }
                      checked={newWorkspace.plan === 'basic'}
                    />
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-slate-900">
                        Basic
                      </span>
                      {newWorkspace.plan === 'basic' && (
                        <Check size={16} className="text-red-600" />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 mb-4">
                      Perfect for individuals and small research.
                    </span>
                    <div className="mt-auto">
                      <span className="text-lg font-bold text-slate-900">
                        Free
                      </span>
                      <ul className="mt-3 space-y-1.5">
                        <li className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <Check size={12} className="text-slate-400" /> 1-2
                          projects / mo
                        </li>
                        <li className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <Check size={12} className="text-slate-400" /> 10k
                          data limit
                        </li>
                      </ul>
                    </div>
                  </label>

                  {/* Pro Plan */}
                  <label
                    className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${newWorkspace.plan === 'pro' ? 'border-red-600 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    {newWorkspace.plan === 'pro' && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </div>
                    )}
                    <input
                      type="radio"
                      name="plan"
                      value="pro"
                      className="sr-only"
                      onChange={() =>
                        setNewWorkspace({ ...newWorkspace, plan: 'pro' })
                      }
                      checked={newWorkspace.plan === 'pro'}
                    />
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-slate-900">
                        Pro
                      </span>
                      {newWorkspace.plan === 'pro' && (
                        <Check size={16} className="text-red-600" />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 mb-4">
                      For professionals and agencies.
                    </span>
                    <div className="mt-auto">
                      <span className="text-lg font-bold text-slate-900">
                        $49
                        <span className="text-xs font-normal text-slate-500">
                          /mo
                        </span>
                      </span>
                      <ul className="mt-3 space-y-1.5">
                        <li className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <Check size={12} className="text-slate-400" /> 5+
                          projects / mo
                        </li>
                        <li className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <Check size={12} className="text-slate-400" /> 50k
                          data limit
                        </li>
                      </ul>
                    </div>
                  </label>

                  {/* Enterprise Plan */}
                  <label
                    className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${newWorkspace.plan === 'enterprise' ? 'border-red-600 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value="enterprise"
                      className="sr-only"
                      onChange={() =>
                        setNewWorkspace({ ...newWorkspace, plan: 'enterprise' })
                      }
                      checked={newWorkspace.plan === 'enterprise'}
                    />
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-slate-900">
                        Enterprise
                      </span>
                      {newWorkspace.plan === 'enterprise' && (
                        <Check size={16} className="text-red-600" />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 mb-4">
                      For large scale data operations.
                    </span>
                    <div className="mt-auto">
                      <span className="text-lg font-bold text-slate-900">
                        Custom
                      </span>
                      <ul className="mt-3 space-y-1.5">
                        <li className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <Check size={12} className="text-slate-400" /> Custom
                          volume
                        </li>
                        <li className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <Check size={12} className="text-slate-400" />{' '}
                          Priority support
                        </li>
                      </ul>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <Link
                  to={'/app'}
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 cursor-pointer py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
