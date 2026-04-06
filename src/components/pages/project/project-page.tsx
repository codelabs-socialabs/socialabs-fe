import logo from '@/assets/socialabs-logo.png';
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  BrainCircuit,
  Calendar,
  ChevronDown,
  Database,
  Download,
  Globe,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  MessageSquare,
  Network,
  Search,
  Settings,
  Share2,
  Smile,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const ProjectPage = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const project = {
    workspaceName: 'Public Policy Tracker',
    name: 'MBG Jatinangor Evaluation',
    description:
      'Monitoring public reaction, complaints, and overall sentiment regarding the implementation of the Makan Bergizi Gratis (MBG) program in the Jatinangor area.',
    query: 'mbg jatinangor viral', // Natural search query
    language: 'Indonesian (ID)',
    dateRange: 'Feb 01, 2026 - Feb 15, 2026',

    snapshots: {
      totalVolume: '24,850',
      uniqueAccounts: '8,120',
      dominantMood: 'Negative',
      dominantPercentage: '58%',
      topTopic: 'Food Quality & Menu',
      topInfluencer: '@unpadfess',
    },

    topics: [
      {
        name: 'Food Quality & Portion Complaints',
        description:
          'Keluhan dominan mengenai porsi lauk yang sedikit dan sayur yang sudah tidak segar/dingin saat dibagikan ke siswa.',
        share: 34,
        count: '8.4K',
        sentiment: 'Negative',
      },
      {
        name: 'Logistics & Distribution Delays',
        description:
          'Banyak sekolah melaporkan makanan baru tiba setelah jam istirahat siang selesai, sehingga mengganggu jadwal KBM.',
        share: 22,
        count: '5.4K',
        sentiment: 'Negative',
      },
      {
        name: 'Local Vendor Empowerment',
        description:
          'Sentimen positif terkait pelibatan ibu-ibu PKK dan vendor katering lokal Jatinangor dalam penyediaan makanan.',
        share: 18,
        count: '4.4K',
        sentiment: 'Positive',
      },
      {
        name: 'Packaging Waste Concerns',
        description:
          'Kekhawatiran mahasiswa dan aktivis lingkungan kampus terkait penumpukan sampah kotak makan plastik sekali pakai.',
        share: 12,
        count: '2.9K',
        sentiment: 'Neutral',
      },
    ],

    influencers: [
      {
        name: 'UNPAD Fess',
        handle: '@unpadfess',
        role: 'Community Hub',
        impact: '1.2M Views',
      },
      {
        name: 'Info Jatinangor',
        handle: '@info_jatinangor',
        role: 'News Amplifier',
        impact: '850K Views',
      },
      {
        name: 'BEM Kema Unpad',
        handle: '@bem_unpad',
        role: 'Opinion Leader',
        impact: '420K Views',
      },
      {
        name: 'Lokal Reviewer',
        handle: '@jajanjatinangor',
        role: 'Viral Source',
        impact: '310K Views',
      },
    ],

    // Mock chart data simulating a viral event lifecycle
    chartData: [
      { date: 'Feb 01', volume: 120 },
      { date: 'Feb 02', volume: 150 },
      { date: 'Feb 03', volume: 210 },
      { date: 'Feb 04', volume: 180 },
      { date: 'Feb 05', volume: 450 },
      { date: 'Feb 06', volume: 1200 }, // Start of viral thread
      { date: 'Feb 07', volume: 5400 },
      { date: 'Feb 08', volume: 8200 }, // Peak viral
      { date: 'Feb 09', volume: 4100 },
      { date: 'Feb 10', volume: 2200 }, // Clarification
      { date: 'Feb 11', volume: 1100 },
      { date: 'Feb 12', volume: 800 },
      { date: 'Feb 13', volume: 550 },
      { date: 'Feb 14', volume: 420 },
      { date: 'Feb 15', volume: 350 },
    ],
  };

  const maxVolume = Math.max(...project.chartData.map((d) => d.volume));

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

          {/* Current Project */}
          <div className="p-5 border-b border-slate-50">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Current Project
            </div>
            <div className="text-sm font-bold text-slate-800 leading-tight line-clamp-2">
              {project.name}
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Dashboard */}
            <div className="px-3 space-y-0.5">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Dashboard
              </div>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all bg-red-50 text-red-700 shadow-sm border border-red-100/50`}
              >
                <LayoutDashboard size={18} className={'text-red-600'} />
                Overview
              </button>
            </div>
            {/* AI Analyst */}
            <div className="px-3 space-y-0.5 mt-6">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                AI ANALYTICS
              </div>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <BrainCircuit size={18} className={'text-slate-400'} />
                Topic Modeling
              </button>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <TrendingUp size={18} className={'text-slate-400'} />
                Sentiment Trend
              </button>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <Smile size={18} className={'text-slate-400'} />
                Emotion Analysis
              </button>
            </div>
            {/* Network And Actor */}
            <div className="px-3 space-y-0.5 mt-6">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                NETWORK & ACTOR
              </div>
              <button
                className={`w-full flex text-start items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <User size={18} className={'text-slate-400'} />
                Influencer Recommendation
              </button>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <Network size={18} className={'text-slate-400'} />
                Community Detection
              </button>
            </div>
            {/* Assistant */}
            <div className="px-3 space-y-0.5 mt-6">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                ASSISTANT
              </div>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <MessageSquare size={18} className={'text-slate-400'} />
                Chatbot
              </button>
            </div>
          </div>
        </div>
        {/* Back Workspace */}
        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors group shadow-sm">
            <ArrowLeft
              size={16}
              className="text-slate-400 group-hover:text-slate-600 group-hover:-translate-x-1 transition-transform"
            />
            Back to Workspace
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 overflow-y flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">
              {project.workspaceName}
            </span>
            <span className="text-slate-300 font-medium">/</span>
            <span className="font-medium text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">
              {project.name}
            </span>
            <span className="text-slate-300 font-medium">/</span>
            <span className="font-semibold text-slate-900 capitalize">
              Overview
            </span>
          </div>
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
          <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
            {/* PAGE HEADER: Minimalist, Descriptive & Elegant */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {project.name}
                </h1>
                {project.description && (
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {/* Natural Query Badge */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Search size={14} className="text-slate-400" />
                    <span className="font-medium text-slate-500">Query:</span>
                    <span className="font-bold text-slate-700">
                      "{project.query}"
                    </span>
                  </div>
                  {/* Period Badge */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="font-medium text-slate-500">Period:</span>
                    <span className="font-bold text-slate-700">
                      {project.dateRange}
                    </span>
                  </div>
                  {/* Language Badge */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Globe size={14} className="text-slate-400" />
                    <span className="font-medium text-slate-500">
                      Language:
                    </span>
                    <span className="font-bold text-slate-700">
                      {project.language}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 mt-2 md:mt-0">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  <Share2 size={16} /> Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 shadow-md transition-all">
                  <Download size={16} /> Export Report
                </button>
              </div>
            </div>

            {/* 1. THE 5 KPI CARDS (Simple, Clean, Easy to Read) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Card: Total Posts */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Database size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Total Tweets
                  </span>
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {project.snapshots.totalVolume}
                </span>
              </div>

              {/* Card: Unique Accounts */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Users size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Unique Accounts
                  </span>
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {project.snapshots.uniqueAccounts}
                </span>
              </div>

              {/* Card: Dominant Mood */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Smile size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Dominant Mood
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-red-600 tracking-tight">
                    {project.snapshots.dominantMood}
                  </span>
                  <span className="text-xs font-bold text-red-400">
                    {project.snapshots.dominantPercentage}
                  </span>
                </div>
              </div>

              {/* Card: Top Topic */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <BrainCircuit size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Top Topic
                  </span>
                </div>
                <span
                  className="text-sm font-bold text-slate-800 leading-tight line-clamp-2"
                  title={project.snapshots.topTopic}
                >
                  {project.snapshots.topTopic}
                </span>
              </div>

              {/* Card: Top Influencer */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <AtSign size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Top Influencer
                  </span>
                </div>
                <span
                  className="text-sm font-bold text-slate-800 leading-tight truncate"
                  title={project.snapshots.topInfluencer}
                >
                  {project.snapshots.topInfluencer}
                </span>
              </div>
            </div>

            {/* 2. FULL BAR CHART: Conversation Velocity */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Conversation Volume Trend
                  </h3>
                  <p className="text-sm text-slate-500">
                    Visualizing the lifecycle of the conversation to identify
                    viral peaks and narrative decay.
                  </p>
                </div>
                <button className="text-sm font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors shrink-0 group">
                  View Analytics{' '}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              {/* Informative Insight Banner */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mb-8 flex gap-3 items-start">
                <Lightbulb
                  size={18}
                  className="text-blue-500 mt-0.5 shrink-0"
                />
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Key Event:</strong> Massive
                  spike detected between{' '}
                  <span className="font-bold text-slate-900">
                    Feb 07 - Feb 08
                  </span>
                  , contributing to over 50% of the total volume. This
                  correlates highly with a viral video exposing food quality
                  issues distributed by a local campus community account.
                </p>
              </div>

              {/* Interactive Bar Chart Area */}
              <div className="relative h-[240px] w-full flex items-end justify-between gap-1 sm:gap-2 pb-6 border-b border-slate-100">
                {/* Subtle Grid Lines behind */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 opacity-30">
                  <div className="w-full h-[1px] bg-slate-200"></div>
                  <div className="w-full h-[1px] bg-slate-200"></div>
                  <div className="w-full h-[1px] bg-slate-200"></div>
                  <div className="w-full h-[1px] bg-slate-200"></div>
                </div>

                {/* Data Bars */}
                {project.chartData.map((data, i) => {
                  // Calculate height percentage relative to max volume
                  const heightPercent = (data.volume / maxVolume) * 100;
                  const isPeak = heightPercent === 100;

                  return (
                    <div
                      key={i}
                      className="flex-1 flex justify-center relative h-full group z-10 cursor-pointer"
                    >
                      {/* Interactive Tooltip on Hover */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        <span className="font-bold">{data.date}:</span>{' '}
                        {data.volume.toLocaleString()} Tweets
                        {/* Triangle pointer */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-slate-900 border-t-4 border-x-transparent border-x-4 border-b-0"></div>
                      </div>

                      {/* The Bar */}
                      <div
                        className={`w-full max-w-[48px] rounded-t-sm transition-colors duration-200 mt-auto ${
                          isPeak
                            ? 'bg-red-500 group-hover:bg-red-600'
                            : 'bg-slate-200 group-hover:bg-slate-300'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Labels (Simplified display for key dates) */}
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 px-2">
                <span>{project.chartData[0].date}</span>
                <span>
                  {
                    project.chartData[Math.floor(project.chartData.length / 4)]
                      .date
                  }
                </span>
                <span className="text-red-600 font-bold">
                  {project.chartData[7].date} (Peak)
                </span>
                <span>
                  {
                    project.chartData[
                      Math.floor((project.chartData.length / 4) * 3)
                    ].date
                  }
                </span>
                <span>
                  {project.chartData[project.chartData.length - 1].date}
                </span>
              </div>
            </div>

            {/* 3. SNAPSHOTS: TOPICS & ACTORS (2 Columns, Clean Data-Table Look) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Snapshot Topics */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Topics Snapshot
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      Categorization of what people are discussing.
                    </p>
                  </div>
                  <button className="text-sm font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors shrink-0 group">
                    Explore{' '}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                <div className="space-y-6 mb-8">
                  {project.topics.map((topic, i) => (
                    <div key={i} className="group/topic">
                      <div className="flex justify-between items-start mb-2.5 gap-4">
                        <div className="flex-1">
                          <span className="block text-sm font-bold text-slate-800 leading-tight mb-1">
                            {topic.name}
                          </span>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {topic.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-sm font-bold text-slate-600">
                            {topic.share}%
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            {topic.count} Posts
                          </span>
                        </div>
                      </div>
                      {/* Custom Progress Bar showing Sentiment */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${topic.sentiment === 'Negative' ? 'bg-red-500' : topic.sentiment === 'Positive' ? 'bg-emerald-500' : 'bg-slate-400'}`}
                          style={{ width: `${topic.share}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-auto w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg transition-colors border border-slate-200">
                  Explore All Topics →
                </button>
              </div>

              {/* Snapshot Actors (Clean List Design) */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Key Actors
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      Accounts driving the highest engagement and reach.
                    </p>
                  </div>
                  <button className="text-sm font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors shrink-0 group">
                    View All{' '}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                <div className="flex-1">
                  {project.influencers.map((inf, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors -mx-2 px-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {/* Minimalist Avatar */}
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
                          {inf.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-tight">
                            {inf.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {inf.handle}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-800">
                          {inf.impact}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          {inf.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
