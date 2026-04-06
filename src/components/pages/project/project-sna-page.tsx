import React from 'react';
import logo from '@/assets/socialabs-logo.png';
import {
  Share2,
  Download,
  LayoutDashboard,
  BrainCircuit,
  TrendingUp,
  Smile,
  User,
  Network,
  MessageSquare,
  ArrowLeft,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import SNASnapshot from '@/components/fragments/sna/sna-snapshot';
import SNACommunitySummary from '@/components/fragments/sna/sna-community-summary';
import SNANetworkGraph from '@/components/fragments/sna/sna-nework-grap';
import SNACentralNode from '@/components/fragments/sna/sna-central-node';
import SNAConversation from '@/components/fragments/sna/sna-conversation';

const SNAPage: React.FC = () => {
  const snapshotMetrics = {
    totalNodes: 12430,
    totalConnections: 28115,
    networkDensity: 0.018,
    largestCommunity: 'Cluster A (34%)',
    centralNode: '@dimsum_politik',
  };

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
              {'Project A'}
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
      <div className="flex-1  overflow-y flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">
              {'Project Workspace'}
            </span>
            <span className="text-slate-300 font-medium">/</span>
            <span className="font-medium text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">
              {'Project Name'}
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
              <button className="flex items-center gap-2 hover:bg-slate-50 rounded-lg p-1.5 border border-transparent hover:border-slate-200 focus:outline-none">
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
                <ChevronDown size={14} className={`text-slate-400`} />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto p-8 space-y-8 animate-in fade-in duration-500 pb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Deep Social Network Analysis (SNA)
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl">
                Explore the structural flow of conversation. Discover
                ideological communities, central echo chambers, and the nodes
                algorithmically bridging the gaps.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-transparent text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                <span>Export Graph Data</span>
              </button>
            </div>
          </div>

          {/* 1. Network Snapshot Overview */}
          <SNASnapshot metrics={snapshotMetrics} />

          {/* 2. Interactive Graph & Community Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <SNANetworkGraph />
            </div>
            <div className="xl:col-span-1">
              <SNACommunitySummary />
            </div>
          </div>

          {/* 3. Central Nodes Ranking */}
          <SNACentralNode />

          {/* 4. Conversation Reality Check */}
          <SNAConversation />
        </div>
      </div>
    </div>
  );
};

export default SNAPage;
