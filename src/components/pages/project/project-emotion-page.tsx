import {
  Activity,
  AlertCircle,
  Database,
  Download,
  Share2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TwitterTweetEmbed } from 'react-twitter-embed';

type EmotionName =
  | 'Anger'
  | 'Joy'
  | 'Sadness'
  | 'Fear'
  | 'Surprise'
  | 'Disgust';

interface EmotionChartItem {
  name: EmotionName;
  value: number;
  count: number;
  fill: string;
}

interface EmotionTrendItem {
  date: string;
  Anger: number;
  Joy: number;
  Sadness: number;
  Fear: number;
  Surprise: number;
  Disgust: number;
}

interface EmotionTooltipPayload {
  name: EmotionName;
  value: number;
  count: number;
  fill: string;
}

const deepEmotionStats = {
  total: 35400,
  dominant: 'Anger' as EmotionName,
  dominantValue: 38,
  volatile: 'Surprise' as EmotionName,
  growing: 'Fear' as EmotionName,
};

const deepEmotionChartData: EmotionChartItem[] = [
  {
    name: 'Anger',
    value: 38,
    count: 13452,
    fill: '#ef4444',
  },
  {
    name: 'Joy',
    value: 20,
    count: 7080,
    fill: '#eab308',
  },
  {
    name: 'Sadness',
    value: 15,
    count: 5310,
    fill: '#3b82f6',
  },
  {
    name: 'Fear',
    value: 12,
    count: 4248,
    fill: '#a855f7',
  },
  {
    name: 'Surprise',
    value: 9,
    count: 3186,
    fill: '#f97316',
  },
  {
    name: 'Disgust',
    value: 6,
    count: 2124,
    fill: '#22c55e',
  },
];

const deepEmotionTrendData: EmotionTrendItem[] = [
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
  },
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

const deepEmotionTweets: Record<EmotionName, string[]> = {
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

const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const ProjectEmotionPage = () => {
  const [activeDeepEmotionTab, setActiveDeepEmotionTab] =
    useState<EmotionName>('Anger');

  const activeTweets = deepEmotionTweets[activeDeepEmotionTab];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-6 pb-10">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Emotion Analysis
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Explore the emotional drivers shaping public conversations across
              anger, joy, sadness, fear, surprise, and disgust.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Share2 size={16} />
              Share
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </header>

        {/* Emotion snapshot */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Total Detected
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {deepEmotionStats.total.toLocaleString('en-US')}
                </p>
              </div>

              <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Database size={17} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Emotion-classified posts
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Dominant Emotion
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-2xl font-semibold tracking-tight text-red-600">
                    {deepEmotionStats.dominant}
                  </p>

                  <span className="text-sm font-medium text-red-400">
                    {deepEmotionStats.dominantValue}%
                  </span>
                </div>
              </div>

              <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Sparkles size={17} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Largest emotional share
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Most Volatile
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {deepEmotionStats.volatile}
                </p>
              </div>

              <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <Activity size={17} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Highest fluctuation over time
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Fastest Growing
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {deepEmotionStats.growing}
                </p>
              </div>

              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp size={17} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Strongest recent increase
            </p>
          </article>
        </section>

        {/* Distribution and timeline */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          {/* Emotion distribution */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Emotion Distribution
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Breakdown of six core emotional categories.
              </p>
            </div>

            <div className="relative mt-5 h-64 w-full">
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
                    {deepEmotionChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.fill}
                        className="transition-opacity hover:opacity-80"
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) {
                        return null;
                      }

                      const data = payload[0].payload as EmotionTooltipPayload;

                      return (
                        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
                          <div className="flex items-center gap-2">
                            <span
                              className="size-2.5 rounded-full"
                              style={{
                                backgroundColor: data.fill,
                              }}
                            />

                            <span className="font-semibold text-slate-900">
                              {data.name}
                            </span>
                          </div>

                          <div className="mt-3 space-y-1.5 text-slate-500">
                            <div className="flex min-w-40 items-center justify-between gap-6">
                              <span>Distribution</span>

                              <span className="font-semibold text-slate-800">
                                {data.value}%
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-6">
                              <span>Posts</span>

                              <span className="font-semibold text-slate-800">
                                {data.count.toLocaleString('en-US')}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold tracking-tight text-slate-950">
                  {deepEmotionStats.dominant}
                </span>

                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Dominant
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {deepEmotionChartData.map((item) => (
                <div
                  key={item.name}
                  className="flex min-w-0 items-center gap-2"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: item.fill,
                    }}
                  />

                  <span className="truncate text-xs font-medium text-slate-600">
                    {item.name}
                  </span>

                  <span className="ml-auto text-xs font-semibold text-slate-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Emotion timeline */}
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Emotion Trend Timeline
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
                  Observe emotional movement, volatility, and sudden spikes over
                  time.
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/10">
                <AlertCircle size={14} />
                Spike detected on 24 Feb
              </span>
            </div>

            <div className="mt-6 h-[340px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={deepEmotionTrendData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: '#64748b',
                      fontWeight: 500,
                    }}
                    dy={10}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: '#64748b',
                      fontWeight: 500,
                    }}
                    tickFormatter={formatCompactNumber}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
                      padding: '12px',
                    }}
                    labelStyle={{
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '8px',
                    }}
                    formatter={(value: number, name: string) => [
                      value.toLocaleString('en-US'),
                      name,
                    ]}
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
                      strokeWidth={2.25}
                      dot={false}
                      activeDot={{
                        r: 5,
                        stroke: '#ffffff',
                        strokeWidth: 2,
                      }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Representative posts */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5 lg:p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Representative Posts
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Examples categorized by the core emotions detected in the
                conversation.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
              {deepEmotionChartData.map((emotion) => {
                const isActive = activeDeepEmotionTab === emotion.name;

                return (
                  <button
                    key={emotion.name}
                    type="button"
                    onClick={() => setActiveDeepEmotionTab(emotion.name)}
                    className={`inline-flex min-w-24 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-50'
                      }`}
                      style={{
                        backgroundColor: emotion.fill,
                      }}
                    />

                    {emotion.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50/60 p-5 lg:p-6">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activeTweets.map((tweetId, index) => (
                <div
                  key={`${activeDeepEmotionTab}-${tweetId}-${index}`}
                  className="flex min-w-0 justify-center"
                >
                  <div className="w-full max-w-[420px]">
                    <TwitterTweetEmbed
                      tweetId={tweetId}
                      options={{
                        width: '100%',
                        align: 'center',
                        dnt: true,
                        theme: 'light',
                        conversation: 'none',
                      }}
                      placeholder={
                        <div className="h-48 w-full animate-pulse rounded-xl border border-slate-200 bg-white" />
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectEmotionPage;
