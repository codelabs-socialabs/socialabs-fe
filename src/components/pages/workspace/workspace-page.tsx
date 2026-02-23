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
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const WorkspacePage = () => {
  // State Spaces
  // const [workspaces, setWorkspaces] = useState([]);
  // const [projects, setProjects] = useState([]);

  // --- UI State ---
  // const [workspaces, setWorkspaces] = useState([]);
  // const [activeWorkspaceId, setActiveWorkspaceId] = useState(null);

  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <div className="flex h-screen max-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200">
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
              className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2 text-left hover:border-slate-300 focus:outline-none group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                  S
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                    Workspace
                  </span>
                  <span className="text-sm font-semibold text-slate-800 truncate leading-tight">
                    Select Workspace
                  </span>
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
                <div className="px-4 py-2 text-sm text-slate-500 italic text-center">
                  No worksapce yet
                </div>
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
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg"
            >
              <Folder size={16} className="text-red-600" />
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
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              <Settings
                size={16}
                className="text-slate-400 hover:text-slate-600"
              />
              Workspace Settings
            </Link>
          </div>
        </div>
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
          <div className="flex flex-col h-full items-center justify-center max-w-md mx-auto text-center space-y-5 pb-10">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-2">
              <Briefcase size={28} className="text-slate-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                Welcome to Socialabs
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Start analyzing public conversations by creating a new
                workspace. Workspaces act as containers for managing your
                research projects and team.
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 shadow-sm transition-colors mt-2">
              <Plus size={16} />
              Create First Workspace
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkspacePage;
