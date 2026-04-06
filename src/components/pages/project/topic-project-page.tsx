import logo from '@/assets/socialabs-logo.png';
import {
  AlignLeft,
  ArrowLeft,
  BadgeCheck,
  BrainCircuit,
  ChevronDown,
  Download,
  Hash,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Minus,
  Network,
  Settings,
  Share2,
  Smile,
  TrendingDown,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';

const TopicProjectPage = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState('t1');

  const project = {
    workspaceName: 'Public Policy Tracker',
    name: 'MBG Jatinangor Evaluation',
    query: 'mbg jatinangor viral',
    dateRange: 'Feb 01, 2026 - Feb 15, 2026',
  };

  // --- Detailed Topic Modeling Data (Cleaned & Minimalist) ---
  const topics = [
    {
      id: 't1',
      name: 'Food Quality & Portion Complaints',
      volume: '8,452',
      trend: 'up',
      trendLabel: 'Trending Up',
      keywords: [
        'basi',
        'keras',
        'porsi dikit',
        'sayur layu',
        'gak layak',
        'kualitas',
        'ayam',
      ],
      aiSummary:
        'Klaster terbesar ini didominasi oleh keluhan siswa dan mahasiswa terkait lauk ayam yang keras dan sayur yang sudah tidak segar saat dibagikan. Terdapat korelasi kuat antara keluhan ini dengan pendistribusian di area spesifik Jatinangor.',
      samplePosts: [
        {
          name: 'Mahasiswa Unpad',
          handle: '@mahasiswakeren',
          time: '10:42 AM · Feb 12, 2026',
          verified: false,
          text: 'Hari ini dapet jatah mbg tapi ayamnya keras banget, sayurnya juga udah layu. Tolong dong evaluasi vendornya! Gak layak makan ini mah. #MBGJatinangor',
        },
        {
          name: 'Warga Lokal',
          handle: '@warga_jatinangor',
          time: '08:15 AM · Feb 12, 2026',
          verified: false,
          text: 'Porsi hari ini mendingan sih, tapi tetep aja nasinya agak lembek. Semoga besok evaluasi lagi ya. Semangat terus buat yang masak di dapur umum.',
        },
      ],
    },
    {
      id: 't2',
      name: 'Logistics & Distribution Delays',
      volume: '5,420',
      trend: 'stable',
      trendLabel: 'Stable',
      keywords: [
        'telat',
        'jam istirahat',
        'lapar',
        'nunggu lama',
        'distribusi kacau',
        'kurir',
        'koordinasi',
      ],
      aiSummary:
        'Percakapan berpusat pada masalah operasional di mana makanan sering tiba setelah jam istirahat siang usai. Hal ini menyebabkan keluhan jadwal yang terganggu.',
      samplePosts: [
        {
          name: 'Guru SMP 1',
          handle: '@guru_smpn1',
          time: '01:30 PM · Feb 11, 2026',
          verified: true,
          text: 'Anak-anak udah pada nunggu dari jam 12, makanan baru dateng jam 13.30. Kasihan pada kelaparan, padahal jam 1 udah mulai masuk kelas lagi. Mohon perbaiki sistem distribusinya.',
        },
      ],
    },
    {
      id: 't3',
      name: 'Packaging Waste Concerns',
      volume: '4,410',
      trend: 'up',
      trendLabel: 'Trending Up',
      keywords: [
        'sampah plastik',
        'kotak makan',
        'numpuk',
        'lingkungan',
        'daur ulang',
        'BEM',
      ],
      aiSummary:
        'Kekhawatiran yang disuarakan oleh mahasiswa dan aktivis lingkungan terkait lonjakan volume sampah plastik dari kotak makan sekali pakai yang mulai menumpuk.',
      samplePosts: [
        {
          name: 'BEM Kema Unpad',
          handle: '@bem_unpad',
          time: '04:20 PM · Feb 10, 2026',
          verified: true,
          text: 'Kami mendukung program pemenuhan gizi, namun pemerintah juga harus memikirkan solusi waste management-nya. Sampah plastik kotak MBG mulai menumpuk tak terkendali di sekitar kampus.',
        },
      ],
    },
    {
      id: 't4',
      name: 'Local Vendor Empowerment',
      volume: '2,980',
      trend: 'down',
      trendLabel: 'Declining',
      keywords: [
        'ibu pkk',
        'katering lokal',
        'terbantu',
        'ekonomi',
        'pemberdayaan',
        'dapur umum',
      ],
      aiSummary:
        'Percakapan mengenai pelibatan ibu-ibu PKK dan katering lokal di Jatinangor. Walaupun positif, volume percakapan topik ini mulai menurun tergantikan oleh isu operasional.',
      samplePosts: [
        {
          name: 'Katering Teh Euceu',
          handle: '@katering_teh_euceu',
          time: '09:00 AM · Feb 08, 2026',
          verified: false,
          text: 'Alhamdulillah, sejak ada program MBG ini ibu-ibu di RW 04 jadi punya penghasilan tambahan buat bantu suami. Semangat terus puas-puasin masaknya! Berkah buat semua.',
        },
      ],
    },
  ];

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

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
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`}
              >
                <LayoutDashboard size={18} className={'text-slate-400'} />
                Overview
              </button>
            </div>
            {/* AI Analyst */}
            <div className="px-3 space-y-0.5 mt-6">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                AI ANALYTICS
              </div>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all bg-red-50 text-red-700 shadow-sm border border-red-100/50`}
              >
                <BrainCircuit size={18} className={'text-red-600'} />
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
      <div className="flex-1 flex flex-col overflow-hidden relative">
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
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
            {/* HEADER */}
            <div className="flex flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Topic Modeling
                </h1>
                <p className="text-sm text-slate-500 max-w-2xl">
                  Discover the primary narratives driving the conversation.
                  Automatically clustered by AI to show you what matters most.
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm shrink-0 outline-none">
                <Download size={16} /> Export
              </button>
            </div>

            {/* OVERVIEW SUMMARY CARDS (Enhanced Premium Look) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-bl from-slate-100 to-transparent rounded-full opacity-50 transition-transform group-hover:scale-110"></div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 relative z-10">
                  Total Clusters
                </span>
                <span className="text-3xl font-black text-slate-900 leading-none relative z-10">
                  {topics.length}
                </span>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-bl from-red-50 to-transparent rounded-full opacity-50 transition-transform group-hover:scale-110"></div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 relative z-10">
                  Dominant Topic
                </span>
                <span className="text-lg font-bold text-slate-900 leading-tight truncate relative z-10">
                  {topics[0].name}
                </span>
                <span className="text-xs font-semibold text-slate-500 mt-1 relative z-10">
                  Highest discussion volume
                </span>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-full opacity-50 transition-transform group-hover:scale-110"></div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 relative z-10">
                  Fastest Growing
                </span>
                <span className="text-lg font-bold text-slate-900 leading-tight truncate relative z-10">
                  {topics.find((t) => t.trend === 'up').name}
                </span>
                <span className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1 relative z-10">
                  <TrendingUp size={12} strokeWidth={3} /> Volume spiking
                </span>
              </div>
            </div>

            {/* TWO COLUMN LAYOUT: List & Deep Dive */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: TOPIC LIST */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">
                  Detected Narratives
                </div>

                {topics.map((topic) => {
                  const isSelected = selectedTopicId === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopicId(topic.id)}
                      className={`relative p-5 rounded-2xl cursor-pointer transition-all border outline-none overflow-hidden ${
                        isSelected
                          ? 'bg-red-50/40 border-red-200 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Active Accent Line */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                      )}

                      <h3
                        className={`text-base font-bold leading-tight mb-4 ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}
                      >
                        {topic.name}
                      </h3>

                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="flex items-center gap-1.5 text-slate-600 font-semibold bg-white border border-slate-200/60 px-2 py-1 rounded-md">
                          <AlignLeft size={14} className="text-slate-400" />{' '}
                          {topic.volume} posts
                        </span>

                        {/* Clean Trend Indicator */}
                        <span
                          className={`flex items-center gap-1 font-bold ${
                            topic.trend === 'up'
                              ? 'text-emerald-600'
                              : topic.trend === 'down'
                                ? 'text-slate-400'
                                : 'text-slate-500'
                          }`}
                        >
                          {topic.trend === 'up' && (
                            <TrendingUp size={14} strokeWidth={2.5} />
                          )}
                          {topic.trend === 'down' && (
                            <TrendingDown size={14} strokeWidth={2.5} />
                          )}
                          {topic.trend === 'stable' && (
                            <Minus size={14} strokeWidth={2.5} />
                          )}
                          {topic.trendLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT: TOPIC DEEP DIVE */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                {selectedTopic ? (
                  <div className="flex flex-col h-full animate-in fade-in duration-300">
                    {/* Deep Dive Header */}
                    <div className="p-8 border-b border-slate-100">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Hash size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest">
                            Topic Details
                          </span>
                        </div>
                        <span
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            selectedTopic.trend === 'up'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50'
                              : selectedTopic.trend === 'down'
                                ? 'bg-slate-100 text-slate-500 border border-slate-200'
                                : 'bg-slate-50 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {selectedTopic.trendLabel}
                        </span>
                      </div>

                      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                        {selectedTopic.name}
                      </h2>

                      {/* Minimalist AI Summary */}
                      <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6 flex gap-4 items-start shadow-[inset_0_2px_10px_rgba(0,0,0,0.01)]">
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {selectedTopic.aiSummary}
                        </p>
                      </div>

                      {/* Clean Keywords */}
                      <div className="mt-8">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                          Top Keywords
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedTopic.keywords.map((kw, idx) => (
                            <span
                              key={idx}
                              className="bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm transition-all cursor-default text-xs font-semibold px-3.5 py-1.5 rounded-full"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* X (TWITTER) EMBED STYLE POSTS */}
                    <div className="p-8 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          Representative Posts
                        </h4>
                      </div>

                      <div className="space-y-6">
                        {selectedTopic.samplePosts.map((post, idx) => (
                          /* Embed Card Concept - Refined */
                          <div
                            key={idx}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 max-w-xl mx-auto lg:mx-0"
                          >
                            {/* Embed Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm border border-slate-200">
                                  {post.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-900 text-[15px] hover:underline cursor-pointer tracking-tight">
                                      {post.name}
                                    </span>
                                    {post.verified && (
                                      <BadgeCheck
                                        size={16}
                                        className="text-blue-500 fill-current"
                                      />
                                    )}
                                  </div>
                                  <span className="text-slate-500 text-sm">
                                    {post.handle}
                                  </span>
                                </div>
                              </div>
                              <div className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer">
                                <X />
                              </div>
                            </div>

                            {/* Embed Text */}
                            <p className="text-slate-900 text-[15px] leading-relaxed mb-4 whitespace-pre-wrap">
                              {post.text}
                            </p>

                            {/* Embed Footer (Time & Platform) */}
                            <div className="text-slate-500 text-[13px] font-medium pb-4 border-b border-slate-100">
                              {post.time}
                            </div>

                            {/* Clean minimalist interaction hint */}
                            <div className="pt-4 flex items-center gap-6 text-slate-500 text-[13px] font-semibold">
                              <div className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors">
                                <Heart size={16} /> Like
                              </div>
                              <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors">
                                <MessageSquare size={16} /> Reply
                              </div>
                              <div className="flex items-center gap-2 hover:text-slate-800 cursor-pointer transition-colors">
                                <Share2 size={16} /> Copy link
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopicProjectPage;
