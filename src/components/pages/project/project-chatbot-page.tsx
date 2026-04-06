import { useState, useRef, useEffect } from 'react';
import logo from '@/assets/socialabs-logo.png';
import ChatHeaderContext from '@/components/fragments/chatbot/chat-header-context';
import SmartSuggestionGrid from '@/components/fragments/chatbot/smart-suggestion-grid';
import ChatMessageWindow from '@/components/fragments/chatbot/chat-message-window';
import type { ChatMessage } from '@/components/fragments/chatbot/chat-message-window';
import SidebarChatbot from '@/components/fragments/chatbot/sidebar-chatbot';
import ChatInputBar from '@/components/fragments/chatbot/chat-input-bar';
import {
  ArrowLeft,
  BrainCircuit,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Smile,
  TrendingUp,
  User,
} from 'lucide-react';

const MOCK_AI_RESPONSES: Record<string, Omit<ChatMessage, 'id' | 'role'>> = {
  // Insight
  'Apa insight utama dari data ini?': {
    content: `### Executive Summary\nPercakapan didominasi oleh keluhan terkait **kenaikan harga** dan **lamban-nya respon kebijakan public**.\n\n### Key Data Points\n- Topik "Harga Produk" menyumbang **28%** dari total percakapan (terbesar).\n- **Sentimen negatif mencapai 62%**, yang merupakan lonjakan 15% dari bulan sebelumnya.\n- **Puncak Interaksi** terjadi pada 12 Februari pasca pengumuman APBN.\n\n### Recommendation\nFokuskan mitigasi komunikasi pada klaster audiens menengah ke bawah yang paling merespon isu harga sembako.`,
    sources: ['Topic Modeling', 'Sentiment Trend', 'Community Clustering'],
  },
  'Siapa influencer utama dalam diskusi ini?': {
    content: `### Top Structural Influencers\nBerdasarkan perhitungan _Betweenness Centrality_, influencer paling berdampak bukanlah yang memiliki followers terbanyak, melainkan **@AktivisLokal**.\n\n### Why Important?\n- **Role:** Bridge (Penghubung)\n- **Impact:** Menggabungkan diskusi antara "*Klaster Mahasiswa*" dan "*Klaster Pekerja Publik*".\n- **Engagement Level:** 12.5% (Sangat Tinggi)\n\nAkun dengan follower terbesar (**@BeritaUpdate**) hanya memiliki peran _Amplifier_ dengan degree centrality menengah.`,
    sources: ['Influencer Analysis', 'Network Density'],
  },
  // Exploration
  'Topik apa yang meningkat pada minggu kedua Februari?': {
    content: `Pada minggu kedua Februari (8-14 Feb), terdapat lonjakan anomali pada topik **"Kualitas Infrastruktur Jalan"** yang naik tajam sebesar **+412%**.\n\nHal ini dipicu oleh cuitan viral dari klaster *Regional Sumatera* yang mendapat amplifikasi masif secara organik.`,
    sources: ['Topic Modeling', 'Timeline Trends'],
  },
  DEFAULT: {
    content: `### Analisis Diproses\nSaya telah memindai dataset (35.420 dokumen). Namun pertanyaan Anda terlalu spesifik atau berada di luar cakupan data yang saat ini terindeks dalam struktur analisis kami.\n\nMohon pertimbangkan untuk menyesuaikan pertanyaan, atau gunakan salah satu **Smart Suggestions** yang disediakan.`,
  },
};

const ProjectChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = (text: string) => {
    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate AI Processing (1.5s delay)
    setTimeout(() => {
      const responseTemplate =
        MOCK_AI_RESPONSES[text] || MOCK_AI_RESPONSES['DEFAULT'];

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        ...responseTemplate,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
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

        <div className="flex h-full bg-white relative overflow-hidden">
          {/* Sidebar */}
          <div
            className={`transition-all duration-300 ease-in-out shrink-0 h-full ${isSidebarOpen ? 'w-56 translate-x-0' : 'w-0 -translate-x-full'}`}
          >
            <SidebarChatbot isOpen={isSidebarOpen} />
          </div>

          {/* Main Chat Canvas */}
          <div className="flex-1 flex flex-col h-full relative z-0 min-w-0 transition-all duration-300">
            {/* Header Toggle Button */}
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors bg-white/50 backdrop-blur-sm border border-transparent hover:border-slate-200"
                title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose size={20} />
                ) : (
                  <PanelLeftOpen size={20} />
                )}
              </button>
            </div>

            {/* Scrollable Chat Area */}
            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative">
              <div className="max-w-3xl mx-auto w-full px-8 pt-16 pb-40">
                {/* Empty State / Suggestions */}
                {messages.length === 0 && (
                  <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Greeting */}
                    <div className="flex flex-col items-center justify-center text-center mt-12 mb-8 shrink-0">
                      <h2 className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-500 bg-clip-text text-transparent tracking-tight mb-2">
                        Hello, I&apos;m SociaBot.
                      </h2>
                      <p className="text-slate-500 text-[15px] max-w-md">
                        I'm your intelligent dataset assistant. I can help you
                        explore trends, analyze sentiment, and summarize key
                        insights effortlessly.
                      </p>
                    </div>

                    {/* Context Awareness Bar */}
                    <div className="w-full mb-12">
                      <ChatHeaderContext />
                    </div>

                    <SmartSuggestionGrid onSelectPrompt={handleSendMessage} />
                  </div>
                )}

                {/* Conversation History */}
                {messages.length > 0 && (
                  <div className="flex flex-col w-full py-6">
                    {messages.map((msg, index) => (
                      <ChatMessageWindow
                        key={msg.id}
                        message={msg}
                        // Only trigger typing animation for the very last assistant message
                        isTyping={
                          index === messages.length - 1 &&
                          msg.role === 'assistant'
                        }
                      />
                    ))}

                    {/* Elegant Loading Indicator */}
                    {isLoading && (
                      <div className="flex w-full mb-8 animate-in fade-in duration-500">
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-1.5 py-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-75"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-150"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>

            {/* Input Bar */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 shrink-0 z-10 pointer-events-none">
              <div className="max-w-3xl mx-auto w-full px-8 pointer-events-auto">
                <ChatInputBar
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChatbotPage;
