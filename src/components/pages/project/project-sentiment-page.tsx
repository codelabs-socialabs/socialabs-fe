import { useState } from 'react';
import logo from '@/assets/socialabs-logo.png';
import {
  Share2,
  Download,
  PieChart,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  BrainCircuit,
  LayoutDashboard,
  MessageSquare,
  Network,
  Smile,
  TrendingUp,
  User,
} from 'lucide-react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useWordCloud, defaultFontSize } from '@isoterik/react-word-cloud';
import type { Word, WordCloudProps } from '@isoterik/react-word-cloud';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const sentimentTrendStats = {
  total: 35400,
  positive: { percentage: 35, count: 12390, color: '#10b981' }, // Emerald
  negative: { percentage: 65, count: 23010, color: '#ef4444' }, // Red
};

const sentimentTrendChartData = [
  {
    name: 'Positive',
    value: sentimentTrendStats.positive.percentage,
    count: sentimentTrendStats.positive.count,
    fill: sentimentTrendStats.positive.color,
  },
  {
    name: 'Negative',
    value: sentimentTrendStats.negative.percentage,
    count: sentimentTrendStats.negative.count,
    fill: sentimentTrendStats.negative.color,
  },
];

const positiveWords: Word[] = [
  { text: 'senang', value: 140 },
  { text: 'bangga', value: 110 },
  { text: 'solusi', value: 95 },
  { text: 'bagus', value: 80 },
  { text: 'dukung', value: 60 },
  { text: 'harapan', value: 130 },
  { text: 'maju', value: 100 },
];

const negativeWords: Word[] = [
  { text: 'marah', value: 180 },
  { text: 'kecewa', value: 150 },
  { text: 'buruk', value: 120 },
  { text: 'lambat', value: 90 },
  { text: 'kacau', value: 85 },
  { text: 'korupsi', value: 200 },
  { text: 'bohong', value: 160 },
  { text: 'gagal', value: 170 },
];

const emotionRepresentativeTweets = {
  negative: [
    '1460323737035677698',
    '933354946111705097',
    '1853634123518382405',
  ],
  positive: [
    '1460323737035677698',
    '933354946111705097',
    '1853634123518382405',
  ],
};

const resolveFontWeight: WordCloudProps['fontWeight'] = (word) => {
  if (word.value < 100) return 'normal';
  if (word.value < 180) return 'bold';
  return '900';
};

const rotationWeights = [0, 0, 0, 90, -90];
const resolveRotate: WordCloudProps['rotate'] = (_word, index) => {
  return rotationWeights[index % rotationWeights.length];
};

const resolveRandom = () => 0.42;

const CustomWordCloud = ({
  words,
  type,
}: {
  words: Word[];
  type: 'positive' | 'negative';
}) => {
  const [hoveredWord, setHoveredWord] = useState<Word | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const WIDTH = 400;
  const HEIGHT = 300;

  const positiveColors = [
    '#059669',
    '#10b981',
    '#34d399',
    '#047857',
    '#065f46',
  ];
  const negativeColors = [
    '#dc2626',
    '#ef4444',
    '#f87171',
    '#b91c1c',
    '#991b1b',
  ];
  const colors = type === 'positive' ? positiveColors : negativeColors;

  const { computedWords } = useWordCloud({
    words,
    width: WIDTH,
    height: HEIGHT,
    font: 'Inter, sans-serif',
    fontWeight: resolveFontWeight,
    fontSize: defaultFontSize,
    rotate: resolveRotate,
    fontStyle: 'normal',
    spiral: 'rectangular',
    padding: 5,
    timeInterval: 1,
    random: resolveRandom,
  });

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-default"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full overflow-visible"
      >
        <g transform={`translate(${WIDTH / 2},${HEIGHT / 2})`}>
          {computedWords.map((word, index) => (
            <text
              key={index}
              textAnchor="middle"
              className="transition-all duration-300"
              onMouseEnter={() => setHoveredWord(word)}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                fontSize: word.size,
                fontFamily: word.font,
                fontWeight: word.weight,
                fill: colors[index % colors.length],
                opacity: hoveredWord
                  ? hoveredWord.text === word.text
                    ? 1
                    : 0.2
                  : 1,
                transform: `translate(${word.x}px, ${word.y}px) rotate(${word.rotate}deg)`,
              }}
            >
              {word.text}
            </text>
          ))}
        </g>
      </svg>

      {hoveredWord && (
        <div
          className="absolute z-50 pointer-events-none bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl font-medium whitespace-nowrap"
          style={{
            left: mousePos.x,
            top: mousePos.y - 30,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="font-bold mr-1.5">{hoveredWord.text}:</span>
          <span
            className={
              type === 'positive' ? 'text-emerald-400' : 'text-red-400'
            }
          >
            {hoveredWord.value} mentions
          </span>
        </div>
      )}
    </div>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
  percent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
  const formattingCount =
    payload.count >= 1000
      ? (payload.count / 1000).toFixed(1) + 'k'
      : payload.count;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="font-bold text-[10px]"
      style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.6)' }}
    >
      {`${formattingCount} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const ProjectSentimentPage = () => {
  const [activeTweetTab, setActiveTweetTab] = useState<'positive' | 'negative'>(
    'positive',
  );

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
      <div className="max-w-6xl flex-1 overflow-y-auto mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Sentiment Trend
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Monitor the broad positive vs critical alignment of public
              perception. Discover the most frequent emotionally charged words
              and the specific posts driving them.
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Stats & Donut Chart */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:col-span-2 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-slate-100/80 to-transparent rounded-full blur-3xl -mx-20 -my-20 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                <PieChart size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Sentiment Distribution
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  Breakdown of {sentimentTrendStats.total.toLocaleString()}{' '}
                  parsed documents based on contextual keyword analysis.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              {/* Elegant Donut Chart */}
              <div className="w-full md:w-1/2 h-[320px] shrink-0 relative bg-slate-50/50 rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sentimentTrendChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={125}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={12}
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {sentimentTrendChartData.map((entry, index) => (
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
                                  {data.name} State
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
                                    {data.count.toLocaleString()}
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
                  <div className="w-36 h-36 bg-white rounded-full shadow-sm flex flex-col items-center justify-center ring-1 ring-slate-100">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {sentimentTrendStats.total >= 1000
                        ? (sentimentTrendStats.total / 1000).toFixed(1) + 'k'
                        : sentimentTrendStats.total}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-0.5">
                      Total Data
                    </span>
                    <span className="text-[9px] font-medium text-slate-300 uppercase tracking-wider">
                      Jan - Feb 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* State Indicators */}
              <div className="w-full md:w-1/2 flex flex-col justify-center gap-5">
                {sentimentTrendChartData.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{
                        backgroundColor: `${item.fill}15`,
                        color: item.fill,
                      }}
                    >
                      {item.name === 'Positive' ? (
                        <ThumbsUp size={20} strokeWidth={2.5} />
                      ) : (
                        <ThumbsDown size={20} strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 text-lg">
                          {item.name} Activity
                        </h4>
                        <span
                          className="font-black text-xl"
                          style={{ color: item.fill }}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.fill,
                          }}
                        />
                      </div>
                      <p className="text-sm font-medium text-slate-500">
                        Detected in{' '}
                        <strong className="text-slate-700">
                          {item.count.toLocaleString()}
                        </strong>{' '}
                        captured instances.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Word Clouds */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
            <div className="mb-10 text-center">
              <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-2">
                Keyword Discourse Themes
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Most frequently mentioned terms across positive and critical
                affective states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Positive Keywords */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <ThumbsUp
                    size={18}
                    className="text-emerald-600"
                    strokeWidth={2.5}
                  />
                  <h4 className="text-[15px] font-bold text-slate-900 tracking-wide uppercase">
                    Positive Sentiments
                  </h4>
                </div>
                <div className="w-full h-[300px]">
                  <CustomWordCloud words={positiveWords} type="positive" />
                </div>
              </div>

              {/* Negative Keywords */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <ThumbsDown
                    size={18}
                    className="text-red-600"
                    strokeWidth={2.5}
                  />
                  <h4 className="text-[15px] font-bold text-slate-900 tracking-wide uppercase">
                    Critical Sentiments
                  </h4>
                </div>
                <div className="w-full h-[300px]">
                  <CustomWordCloud words={negativeWords} type="negative" />
                </div>
              </div>
            </div>
          </div>

          {/* Representative Tweets */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full lg:col-span-2 relative">
            <div className="p-6 border-b border-slate-100 bg-white relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-slate-900 text-xl tracking-tight">
                  Top Representative Engagements
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Live contextual samples from specific affective states
                </p>
              </div>
              <div className="flex bg-slate-100/70 p-1.5 rounded-xl shrink-0">
                <button
                  onClick={() => setActiveTweetTab('positive')}
                  className={`flex items-center justify-center gap-2 py-2 px-6 rounded-lg text-sm font-bold transition-all ${activeTweetTab === 'positive' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                >
                  <ThumbsUp size={16} />
                  Positive Feedback
                </button>
                <button
                  onClick={() => setActiveTweetTab('negative')}
                  className={`flex items-center justify-center gap-2 py-2 px-6 rounded-lg text-sm font-bold transition-all ${activeTweetTab === 'negative' ? 'bg-white text-red-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                >
                  <ThumbsDown size={16} />
                  Critical Feedback
                </button>
              </div>
            </div>
            <div className="p-8 flex-1 bg-slate-50/50 overflow-y-auto w-full custom-scrollbar min-h-[500px] flex justify-center">
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pb-4">
                {activeTweetTab === 'positive' &&
                  emotionRepresentativeTweets.positive.map((tweetId, idx) => (
                    <div
                      key={`pos-${idx}`}
                      className="w-full flex justify-center self-start"
                    >
                      <div className="w-full max-w-[350px]">
                        <TwitterTweetEmbed
                          tweetId={tweetId}
                          options={{ theme: 'light', conversation: 'none' }}
                          placeholder={
                            <div className="h-40 bg-slate-100/50 animate-pulse rounded-xl w-full" />
                          }
                        />
                      </div>
                    </div>
                  ))}
                {activeTweetTab === 'negative' &&
                  emotionRepresentativeTweets.negative.map((tweetId, idx) => (
                    <div
                      key={`neg-${idx}`}
                      className="w-full flex justify-center self-start"
                    >
                      <div className="w-full max-w-[350px]">
                        <TwitterTweetEmbed
                          tweetId={tweetId}
                          options={{ theme: 'light', conversation: 'none' }}
                          placeholder={
                            <div className="h-40 bg-slate-100/50 animate-pulse rounded-xl w-full" />
                          }
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSentimentPage;
