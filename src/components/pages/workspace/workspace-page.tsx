import logo from '@/assets/socialabs-logo.png';
import {
  BarChart2,
  Briefcase,
  ChevronDown,
  Clock,
  Database,
  Folder,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Tag,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const WorkspacePage = () => {
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
  // const [projects, setProjects] = useState([
  //   {
  //     id: 1,
  //     name: 'MBG Prabowo Trend Monitoring',
  //     description:
  //       'Monitoring public sentiment and conversation spike related to MBG Prabowo across Twitter and online forums.',
  //     createdAt: '2025-02-01',
  //     keyword: 'mbg prabowo',
  //     category: 'Politics',
  //     language: 'id',
  //     startDate: '2025-01-25',
  //     endDate: '2025-02-05',
  //     process: 'COMPLETED',
  //     dataLimit: 30000,
  //     tweetsRetrieved: 28432,
  //     topicsCount: 18,
  //   },
  //   {
  //     id: 2,
  //     name: 'MBG Jatinangor Local Buzz Analysis',
  //     description:
  //       'Analyzing local buzz and viral conversation regarding MBG event in Jatinangor.',
  //     createdAt: '2025-02-10',
  //     keyword: 'mbg jatinangor',
  //     category: 'Regional Issue',
  //     language: 'id',
  //     startDate: '2025-02-08',
  //     endDate: '2025-02-20',
  //     process: 'CRAWLING',
  //     dataLimit: 20000,
  //   },
  //   {
  //     id: 3,
  //     name: 'MBG Policy Response Sentiment',
  //     description:
  //       'Tracking public reaction to MBG-related government policy discussions.',
  //     createdAt: '2025-02-12',
  //     keyword: 'mbg kebijakan pemerintah',
  //     category: 'Public Policy',
  //     language: 'id',
  //     startDate: '2025-02-10',
  //     endDate: '2025-02-25',
  //     process: 'MODELING',
  //     dataLimit: 25000,
  //   },
  //   {
  //     id: 4,
  //     name: 'MBG Social Media Trend Spike',
  //     description:
  //       'Identifying unusual spikes in mentions and engagement rate for MBG-related hashtags.',
  //     createdAt: '2025-02-15',
  //     keyword: 'mbg viral',
  //     category: 'Trend Analysis',
  //     language: 'mixed',
  //     startDate: '2025-02-14',
  //     endDate: '2025-02-28',
  //     process: 'COMPLETED',
  //     dataLimit: 40000,
  //     tweetsRetrieved: 37620,
  //     topicsCount: 22,
  //   },
  //   {
  //     id: 5,
  //     name: 'MBG Economic Impact Discussion',
  //     description:
  //       'Evaluating discussions on economic impact tied to MBG-related announcements.',
  //     createdAt: '2025-02-18',
  //     keyword: 'mbg ekonomi indonesia',
  //     category: 'Economy',
  //     language: 'id',
  //     startDate: '2025-02-17',
  //     endDate: '2025-03-01',
  //     process: 'FAILED',
  //     dataLimit: 15000,
  //   },
  //   {
  //     id: 6,
  //     name: 'MBG Campus Movement Monitoring',
  //     description:
  //       'Tracking university student reactions and activism trends regarding MBG.',
  //     createdAt: '2025-02-20',
  //     keyword: 'mbg mahasiswa bandung',
  //     category: 'Education',
  //     language: 'id',
  //     startDate: '2025-02-19',
  //     endDate: '2025-03-05',
  //     process: 'CREATED',
  //     dataLimit: 18000,
  //   },
  // ]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);

  // --- UI State ---
  // const [workspaces, setWorkspaces] = useState([]);
  // const [activeWorkspaceId, setActiveWorkspaceId] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // FORM
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    category: 'Brand Analysis',
    language: 'id',
    keyword: '',
    startDate: '',
    endDate: '',
    dataLimit: '10000',
  });

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
                to={'/app/workspace/setting'}
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
          {/* <div className="flex flex-col h-full items-center justify-center max-w-md mx-auto text-center space-y-5 pb-10">
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
          </div> */}

          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Project in {activeWorkspace?.name}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage and explore public opinion data to generate insights.
                </p>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 shadow-sm"
              >
                <Plus size={16} />
                New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-xl p-32 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-4 border border-slate-100">
                  <Folder size={24} className="text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                  No projects yet
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">
                  Create your first research project to start collecting data,
                  identifying trends, and getting AI-driven insights.
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {projects.map((project) => {
                  // Dynamic Process Badge Setup
                  let badgeStyles = '';
                  let processLabel = '';
                  let isProcessing = true;

                  switch (project.process) {
                    case 'CREATED':
                      badgeStyles =
                        'bg-slate-100 text-slate-600 border-slate-200';
                      processLabel = 'Created';
                      break;
                    case 'CRAWLING':
                      badgeStyles =
                        'bg-blue-50 text-blue-600 border-blue-200 animate-pulse';
                      processLabel = 'Crawling Data';
                      break;
                    case 'MODELING':
                      badgeStyles =
                        'bg-purple-50 text-purple-600 border-purple-200 animate-pulse';
                      processLabel = 'AI Modeling';
                      break;
                    case 'COMPLETED':
                      badgeStyles =
                        'bg-emerald-50 text-emerald-700 border-emerald-200';
                      processLabel = 'Completed';
                      isProcessing = false;
                      break;
                    case 'FAILED':
                      badgeStyles = 'bg-red-50 text-red-700 border-red-200';
                      processLabel = 'Failed';
                      isProcessing = false;
                      break;
                    default:
                      badgeStyles = 'bg-slate-100 text-slate-600';
                      processLabel = 'Unknown';
                  }

                  return (
                    <div
                      key={project.id}
                      className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col h-full cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-3">
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 leading-tight group-hover:text-red-700 transition-colors mb-1">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2 font-medium">
                            <Clock size={12} />
                            Created{' '}
                            {new Date(project.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              },
                            )}
                          </div>
                          {project.description && (
                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3">
                              {project.description}
                            </p>
                          )}
                        </div>

                        {/* Option Button */}
                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors shrink-0">
                          <MoreVertical size={18} />
                        </button>
                      </div>

                      <div className="space-y-3 mt-auto">
                        {/* Metadata Row 1: Category & Language */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                            <Tag size={12} className="text-slate-400" />
                            {project.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200 uppercase">
                            <Globe size={12} className="text-slate-400" />
                            {project.language === 'id'
                              ? 'Indonesian'
                              : project.language === 'en'
                                ? 'English'
                                : 'Mixed'}
                          </span>
                        </div>

                        {/* Metadata Row 2: Search Topic */}
                        <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2.5 flex items-start gap-2.5">
                          <Search
                            size={14}
                            className="text-slate-400 mt-0.5 shrink-0"
                          />
                          <div>
                            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                              Search Topic / Trend
                            </span>
                            <span className="block text-sm font-medium text-slate-800 line-clamp-1">
                              {project.keyword}
                            </span>
                          </div>
                        </div>

                        {/* Metadata Row 3: Period & Status */}
                        <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-medium text-slate-500">
                              Data Period
                            </span>
                            <span className="text-xs font-medium text-slate-800">
                              {new Date(project.startDate).toLocaleDateString(
                                'en-US',
                                { day: 'numeric', month: 'short' },
                              )}{' '}
                              -{' '}
                              {new Date(project.endDate).toLocaleDateString(
                                'en-US',
                                { day: 'numeric', month: 'short' },
                              )}
                            </span>
                          </div>
                          <div className="text-right flex flex-col items-end gap-1.5">
                            {/* Status Badge */}
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeStyles}`}
                            >
                              {processLabel}
                            </span>
                            {project.process === 'COMPLETED' ? (
                              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                <span>
                                  <strong className="text-slate-800">
                                    {project.tweetsRetrieved?.toLocaleString(
                                      'en-US',
                                    )}
                                  </strong>{' '}
                                  Tweets
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>
                                  <strong className="text-slate-800">
                                    {project.topicsCount}
                                  </strong>{' '}
                                  Topics
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] font-medium text-slate-400">
                                Target:{' '}
                                {parseInt(project.dataLimit).toLocaleString(
                                  'en-US',
                                )}{' '}
                                Tweets
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay Button */}
                      {!isProcessing && project.process === 'COMPLETED' && (
                        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-100 p-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex justify-center shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.05)]">
                          <span className="text-sm font-bold text-red-600 flex items-center gap-1.5">
                            <BarChart2 size={16} />
                            View Dashboard Analytics
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        {/* Render Modals */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <h2 className="text-lg font-semibold text-slate-900">
                  Create New Project
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Set up parameters to extract and analyze public opinion data.
                </p>
              </div>
              <div className="overflow-y-auto p-5">
                <form id="project-form" className="space-y-5">
                  {/* Project Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Project Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900"
                        placeholder="e.g., 2024 Election Sentiment Analysis"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject({ ...newProject, name: e.target.value })
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
                        rows="2"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900 resize-none"
                        placeholder="Briefly describe the objective of this project..."
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Category
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900 cursor-pointer"
                          value={newProject.category}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="Brand Analysis">Brand Analysis</option>
                          <option value="Political Issue">
                            Political Issue
                          </option>
                          <option value="Market Research">
                            Market Research
                          </option>
                          <option value="General Trend">General Trend</option>
                          <option value="Crisis Management">
                            Crisis Management
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Language
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900 cursor-pointer"
                          value={newProject.language}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              language: e.target.value,
                            })
                          }
                        >
                          <option value="id">Indonesian (ID)</option>
                          <option value="en">English (EN)</option>
                          <option value="mix">Mixed / Any</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-5 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Data Extraction Parameters
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Search Topic / Trend Keyword{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900"
                        placeholder="What trend do you want to track? e.g., 'Artificial Intelligence in Healthcare'"
                        value={newProject.keyword}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            keyword: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs text-slate-500 mt-1.5">
                        This query will be used to scrape historical
                        conversations.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-700"
                          value={newProject.startDate}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              startDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-700"
                          value={newProject.endDate}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              endDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Max Limit Data Tweets{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-slate-900"
                        placeholder="100"
                        value={newProject.dataLimit}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            dataLimit: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs text-slate-500 mt-1.5">
                        Pro Plan 10.000 data tweets
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex justify-end gap-2.5 p-5 border-t border-slate-100 shrink-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="project-form"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                  disabled={
                    !newProject.name.trim() ||
                    !newProject.keyword.trim() ||
                    !newProject.startDate ||
                    !newProject.endDate
                  }
                >
                  <Database size={16} />
                  Start Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspacePage;
