import logo from '@/assets/socialabs-logo.png';
import {
  Briefcase,
  ChevronDown,
  Folder,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const SettingWorkspacePage = () => {
  // State Spaces
  // const [workspaces, setWorkspaces] = useState([
  //   {
  //     id: 1,
  //     name: 'Socia Org',
  //     description: 'Socia Description',
  //     plan: 'pro', // default
  //   },
  //   {
  //     id: 2,
  //     name: 'Socia Org 1',
  //     description: 'Socia Description',
  //     plan: 'pro', // default
  //   },
  // ]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [settingsTab, setSettingsTab] = useState('general'); // 'general' | 'usage'

  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <div className="flex h-screen max-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 justify-between">
        <div>
          {/* Brand Socialabs */}
          <div className="flex items-center justify-center h-16 border-b border-slate-100 w-full">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" className="w-7 h-7" />
              <div className="text-2xl font-semibold tracking-wider">
                Socialabs
              </div>
            </div>
          </div>

          {/* Workspace Selector */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <button
                onClick={() =>
                  setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)
                }
                className="w-full flex bg-white border border-slate-200 rounded-lg px-3 py-2 text-left hover:border-slate-300 focus:outline-none group"
              >
                <div className="flex w-full justify-between items-center gap-2.5 overflow-hidden">
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                      {activeWorkspace
                        ? activeWorkspace.name.charAt(0).toUpperCase()
                        : 'S'}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                        Workspace
                      </span>
                      <span className="text-sm font-semibold text-slate-800 truncate leading-tight">
                        {activeWorkspace
                          ? activeWorkspace.name
                          : 'Select Workspace'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${isWorkspaceDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Workspace Dropdown */}
              {isWorkspaceDropdownOpen && (
                <div className="absolute top-full w-full mt-1.5 border border-slate-200 bg-white rounded-lg py-1.5 z-30">
                  {workspaces.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-slate-500 italic text-center">
                      No workspaces yet
                    </div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto px-1.5 space-y-0.5">
                      {workspaces.map((ws) => (
                        <button
                          key={ws.id}
                          onClick={() => {
                            setActiveWorkspace(ws);
                            setIsWorkspaceDropdownOpen(false);
                          }}
                          className={`w-full cursor-pointer text-left px-2.5 py-2 rounded-md text-sm flex items-center gap-2.5 transition-colors ${activeWorkspace?.id === ws.id ? 'bg-red-50 text-red-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          <Briefcase
                            size={14}
                            className={
                              activeWorkspace?.id === ws.id
                                ? 'text-red-500'
                                : 'text-slate-400'
                            }
                          />
                          <span className="truncate">{ws.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-slate-100 mt-1.5 pt-1.5 px-1.5">
                    <button className="w-full cursor-pointer text-left px-2.5 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
                      <Plus size={14} className="text-slate-500" />
                      <span className="font-medium">Create Workspace</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigasi Link */}
          <div className="w-full overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Main Menu
              </div>
              <Link
                to={'/dashboard'}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <Folder
                  size={16}
                  className="text-slate-400 hover:text-slate-600"
                />
                Research Project
              </Link>

              <Link
                to={'/dashboard'}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <LayoutDashboard
                  size={16}
                  className="text-slate-400 hover:text-slate-600"
                />
                Global Analytics
              </Link>

              <Link
                to={'/dashboard'}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <Users
                  size={16}
                  className="text-slate-400 hover:text-slate-600"
                />
                Team Members
              </Link>

              <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">
                Settings
              </div>

              <Link
                to={'/dashboard'}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg"
              >
                <Settings size={16} className="text-red-600" />
                Workspace Settings
              </Link>
            </div>
          </div>
        </div>

        {activeWorkspace && (
          <div className="p-4 m-4 bg-slate-50 border border-slate-200 rounded-xl shrink-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-700">
                Data Quota
              </span>
              <span className="text-[10px] font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 uppercase tracking-wide">
                {activeWorkspace.plan}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
              <div className="bg-red-500 h-1.5 w-45/100 rounded-full"></div>
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>22.5k used</span>
              <span>50k limit</span>
            </div>
          </div>
        )}
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0">
          <h2 className="text-base font-semibold text-slate-800">Overview</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center mr-2 border-r border-slate-200 pr-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none">
                <HelpCircle size={18} />
              </button>
            </div>
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 hover:bg-slate-50 rounded-lg p-1.5 border border-transparent hover:border-slate-200 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white">
                  <span className="text-xs font-semibold">UA</span>
                </div>
                <div className="flex flex-col items-start px-1">
                  <span className="text-sm font-medium text-slate-800 leading-none mb-1">
                    User Analyst
                  </span>
                  <span className="text-[10px] text-slate-500 leading-none">
                    Free Plan
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Modal Open Menu User */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100 mb-1 bg-slate-50/50">
                    <p className="text-sm font-semibold text-slate-900">
                      User Analyst
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      user@socialabs.id
                    </p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors">
                    <User size={14} className="text-slate-400" />
                    My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors">
                    <Settings size={14} className="text-slate-400" />
                    Account Settings
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors">
                      <LogOut size={14} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Settings Sidebar Navigation */}
            <div className="w-full md:w-56 border-r border-r-slate-100 pr-2">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">
                Settings Menu
              </h3>
              <nav className="flex flex-col gap-1">
                <button
                  onClick={() => setSettingsTab('general')}
                  className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${settingsTab === 'general' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  General
                </button>
                <button
                  onClick={() => setSettingsTab('usage')}
                  className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${settingsTab === 'usage' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  Plan & Usage
                </button>
              </nav>
            </div>

            {/* Settings Content Area */}
            <div className="flex-1">
              {/* --- SETTINGS TAB: GENERAL --- */}
              {settingsTab === 'general' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      General Settings
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Manage the core details of your workspace environment.
                    </p>
                  </div>

                  {/* General Form Card */}
                  <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                    <div className="p-6 space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Workspace Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-colors text-slate-900"
                          defaultValue={activeWorkspace?.name}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          rows="3"
                          className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-colors text-slate-900 resize-none"
                          defaultValue={activeWorkspace?.description}
                        />
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-end">
                      <button className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone Card */}
                  <div className="border border-red-200 rounded-xl bg-white overflow-hidden mt-8 shadow-sm">
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          Delete Workspace
                        </h3>
                        <p className="text-sm text-slate-500 max-w-sm">
                          Permanently delete this workspace, all of its
                          projects, and scraped data. This action cannot be
                          undone.
                        </p>
                      </div>
                      <button className="shrink-0 px-5 py-2.5 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors self-start md:self-auto">
                        Delete Workspace
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SETTINGS TAB: PLAN & USAGE --- */}
              {settingsTab === 'usage' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Plan & Usage
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Monitor your workspace limits and inherited plan details.
                    </p>
                  </div>

                  {/* Info Banner */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 shadow-sm">
                    <HelpCircle
                      className="text-blue-500 shrink-0 mt-0.5"
                      size={18}
                      strokeWidth={2.5}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-blue-900 mb-1">
                        Billing is managed at the account level
                      </h4>
                      <p className="text-sm text-blue-700/90 leading-relaxed">
                        This workspace inherits your personal{' '}
                        <strong>Pro Plan</strong> limits. To view your past
                        invoices, manage payment methods, or upgrade your plan,
                        please visit your{' '}
                        <button className="font-bold underline hover:text-blue-900 transition-colors">
                          User Account Settings
                        </button>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Plan Details Card */}
                  <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">
                          Active Plan
                        </span>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                            Pro Plan
                          </h3>
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-slate-600">
                        <li className="flex items-center gap-2.5">
                          <Shield size={16} className="text-red-500" /> Up to 5
                          research projects
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Shield size={16} className="text-red-500" /> 50,000
                          data limits per project
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Shield size={16} className="text-red-500" /> Advanced
                          AI Summary Analytics
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Shield size={16} className="text-red-500" /> Network
                          Graph Interactivity
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Usage Card */}
                  <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-6">
                      Current Workspace Usage
                    </h3>

                    <div className="space-y-7">
                      {/* Projects Quota */}
                      <div>
                        <div className="flex justify-between items-end mb-2.5">
                          <div>
                            <span className="text-sm font-bold text-slate-800 block mb-0.5">
                              Active Projects
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              Research projects created this month
                            </span>
                          </div>
                          <span className="text-sm font-bold text-slate-800">
                            3{' '}
                            <span className="text-slate-400 font-medium">
                              / 5
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-1.5 overflow-hidden">
                          <div
                            className="bg-slate-800 h-2 rounded-full"
                            style={{ width: '60%' }}
                          ></div>
                        </div>
                      </div>

                      {/* Data Quota */}
                      <div>
                        <div className="flex justify-between items-end mb-2.5">
                          <div>
                            <span className="text-sm font-bold text-slate-800 block mb-0.5">
                              Data Extracted
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              Total historical tweets processed
                            </span>
                          </div>
                          <span className="text-sm font-bold text-slate-800">
                            22.5k{' '}
                            <span className="text-slate-400 font-medium">
                              / 50k
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-1.5 overflow-hidden">
                          <div
                            className="bg-red-500 h-2 rounded-full relative"
                            style={{ width: '45%' }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingWorkspacePage;
