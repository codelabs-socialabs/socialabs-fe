/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import logo from '@/assets/socialabs-logo.png';
import {
  Share2,
  Download,
  Database,
  Sparkles,
  Activity,
  TrendingUp,
  AlertCircle,
  LayoutDashboard,
  BrainCircuit,
  Smile,
  User,
  Network,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const deepEmotionStats = {
  total: 35400,
  dominant: 'Anger',
  dominantValue: 38,
  volatile: 'Surprise',
  growing: 'Fear',
};

const deepEmotionChartData = [
  { name: 'Anger', value: 38, count: 13452, fill: '#ef4444' }, // Red
  { name: 'Joy', value: 20, count: 7080, fill: '#eab308' }, // Yellow
  { name: 'Sadness', value: 15, count: 5310, fill: '#3b82f6' }, // Blue
  { name: 'Fear', value: 12, count: 4248, fill: '#a855f7' }, // Purple
  { name: 'Surprise', value: 9, count: 3186, fill: '#f97316' }, // Orange
  { name: 'Disgust', value: 6, count: 2124, fill: '#22c55e' }, // Green
];

const deepEmotionTrendData = [
  {
    date: '21 Feb',
    Anger: 3200,
    Joy: 1800,
    Sadness: 1200,
    Fear: 800,
    Surprise: 500,
    Disgust: 400,
  },
  {
    date: '22 Feb',
    Anger: 3100,
    Joy: 1900,
    Sadness: 1100,
    Fear: 900,
    Surprise: 600,
    Disgust: 350,
  },
  {
    date: '23 Feb',
    Anger: 3500,
    Joy: 1700,
    Sadness: 1300,
    Fear: 1100,
    Surprise: 800,
    Disgust: 450,
  },
  {
    date: '24 Feb',
    Anger: 4200,
    Joy: 1500,
    Sadness: 1000,
    Fear: 1400,
    Surprise: 1200,
    Disgust: 500,
  }, // Spike
  {
    date: '25 Feb',
    Anger: 3800,
    Joy: 1600,
    Sadness: 1400,
    Fear: 1200,
    Surprise: 900,
    Disgust: 550,
  },
  {
    date: '26 Feb',
    Anger: 3400,
    Joy: 1800,
    Sadness: 1200,
    Fear: 1000,
    Surprise: 600,
    Disgust: 400,
  },
  {
    date: '27 Feb',
    Anger: 3300,
    Joy: 2000,
    Sadness: 1100,
    Fear: 800,
    Surprise: 500,
    Disgust: 350,
  },
];

const deepEmotionTweets: Record<string, string[]> = {
  Anger: ['1460323737035677698', '933354946111705097', '1853634123518382405'],
  Joy: ['1460323737035677698', '933354946111705097', '1853634123518382405'],
  Sadness: ['1460323737035677698', '933354946111705097', '1853634123518382405'],
  Fear: ['1460323737035677698', '933354946111705097', '1853634123518382405'],
  Surprise: [
    '1460323737035677698',
    '933354946111705097',
    '1853634123518382405',
  ],
  Disgust: ['1460323737035677698', '933354946111705097', '1853634123518382405'],
};

const ProjectEmotionPage = () => {
  const [activeDeepEmotionTab, setActiveDeepEmotionTab] = useState<
    'Anger' | 'Joy' | 'Sadness' | 'Fear' | 'Surprise' | 'Disgust'
  >('Anger');

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <aside className="shrink-0 w-64 bg-white border-r border-slate-200 flex flex-col z-20 justify-between">
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
              {'project a'}
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
      <div className="max-w-6x overflow-y-auto flex-1 p-8 mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        {/* Deep Emotion Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Psychological Emotion Horizon
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Uncover the deep emotional drivers shaping the discourse. Analyze
              Anger, Joy, Sadness, Fear, Surprise, and Disgust across
              conversation timelines.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 border border-transparent text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 1. Emotion Overview Snapshot (Macro Layer) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Snapshot */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Total Detected
              </span>
              <Database size={16} className="text-slate-400" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {deepEmotionStats.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Dominant */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Dominant Emotion
              </span>
              <Sparkles size={16} className="text-red-500" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-red-500 tracking-tight">
                {deepEmotionStats.dominant}
              </span>
              <span className="text-sm font-bold text-slate-400 mb-1">
                ({deepEmotionStats.dominantValue}%)
              </span>
            </div>
          </div>

          {/* Most Volatile */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Most Volatile
              </span>
              <Activity size={16} className="text-orange-500" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {deepEmotionStats.volatile}
              </span>
            </div>
          </div>

          {/* Fastest Growing */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Fastest Growing
              </span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {deepEmotionStats.growing}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 2. Emotion Distribution Chart */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 lg:col-span-1 flex flex-col items-center">
            <div className="w-full mb-2">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Emotion Distribution
              </h3>
              <p className="text-[11px] font-medium text-slate-500">
                Breakdown of 6 core psychological markers
              </p>
            </div>
            <div className="w-full h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={deepEmotionChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {deepEmotionChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        className="transition-all duration-300 hover:opacity-80 drop-shadow-sm"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white/90 backdrop-blur-md text-slate-900 text-xs rounded-2xl p-4 shadow-xl border border-slate-200/50 ring-1 ring-black/5">
                            <div className="flex items-center gap-2.5 mb-3 border-b border-slate-100 pb-2">
                              <div
                                className="w-3 h-3 rounded-full shadow-inner"
                                style={{ backgroundColor: data.fill }}
                              />
                              <span className="font-bold text-sm tracking-wide">
                                {data.name}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center gap-6">
                                <span className="text-slate-500 font-medium">
                                  Distribution
                                </span>
                                <span className="font-bold text-[15px]">
                                  {data.value}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center gap-6">
                                <span className="text-slate-500 font-medium">
                                  Est. Tweets
                                </span>
                                <span className="font-semibold text-slate-700">
                                  {data.count ? data.count.toLocaleString() : 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {deepEmotionStats.dominant}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 mb-0.5">
                  Dominant
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-2 gap-y-3 mt-4">
              {deepEmotionChartData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-xs"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium text-slate-600">
                    {item.name}
                  </span>
                  <span className="font-bold text-slate-900 ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Emotion Trend Timeline */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-start mb-6 w-full">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Timeline Dynamic Movement
                </h3>
                <p className="text-[11px] font-medium text-slate-500">
                  Identify sudden spikes, growing trends, and volatility across
                  time.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-600 rounded-full">
                <AlertCircle size={14} />
                Spike Detected (24 Feb)
              </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={deepEmotionTrendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      padding: '12px',
                    }}
                    labelStyle={{
                      fontWeight: 'bold',
                      color: '#0f172a',
                      marginBottom: '8px',
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '11px',
                      fontWeight: 500,
                      paddingTop: '20px',
                    }}
                  />

                  {deepEmotionChartData.map((emotion) => (
                    <Line
                      key={emotion.name}
                      type="monotone"
                      dataKey={emotion.name}
                      stroke={emotion.fill}
                      strokeWidth={2.5}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4. Tabbed Representative Data */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              Representative Posts Snapshot
            </h3>
            <p className="text-sm font-medium text-slate-500">
              Authentic snippets categorized by core psychological affect
              states.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
            {deepEmotionChartData.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => setActiveDeepEmotionTab(emotion.name as any)}
                className={`flex-1 min-w-[100px] flex justify-center py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  activeDeepEmotionTab === emotion.name
                    ? 'bg-white shadow-sm ring-1 ring-black/5 text-slate-900 scale-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 scale-[0.98]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${activeDeepEmotionTab === emotion.name ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: emotion.fill }}
                  />
                  {emotion.name}
                </div>
              </button>
            ))}
          </div>

          {/* Raw Tweets Grid Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepEmotionTweets[activeDeepEmotionTab].map((id, index) => (
              <div
                key={index}
                className="w-full max-w-[400px] mx-auto min-w-[280px]"
              >
                <TwitterTweetEmbed
                  tweetId={id}
                  options={{ width: '100%', align: 'center', dnt: true }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEmotionPage;
