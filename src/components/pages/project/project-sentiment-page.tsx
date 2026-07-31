import { Download, PieChart, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

import { defaultFontSize, useWordCloud } from '@isoterik/react-word-cloud';
import type { Word, WordCloudProps } from '@isoterik/react-word-cloud';
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const sentimentTrendStats = {
  total: 35400,
  positive: {
    percentage: 35,
    count: 12390,
    color: '#10b981',
  },
  negative: {
    percentage: 65,
    count: 23010,
    color: '#ef4444',
  },
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
  {
    text: 'senang',
    value: 140,
  },
  {
    text: 'bangga',
    value: 110,
  },
  {
    text: 'solusi',
    value: 95,
  },
  {
    text: 'bagus',
    value: 80,
  },
  {
    text: 'dukung',
    value: 60,
  },
  {
    text: 'harapan',
    value: 130,
  },
  {
    text: 'maju',
    value: 100,
  },
];

const negativeWords: Word[] = [
  {
    text: 'marah',
    value: 180,
  },
  {
    text: 'kecewa',
    value: 150,
  },
  {
    text: 'buruk',
    value: 120,
  },
  {
    text: 'lambat',
    value: 90,
  },
  {
    text: 'kacau',
    value: 85,
  },
  {
    text: 'korupsi',
    value: 200,
  },
  {
    text: 'bohong',
    value: 160,
  },
  {
    text: 'gagal',
    value: 170,
  },
];

const representativeTweets = {
  positive: [
    '1460323737035677698',
    '933354946111705097',
    '1853634123518382405',
  ],
  negative: [
    '1460323737035677698',
    '933354946111705097',
    '1853634123518382405',
  ],
};

const resolveFontWeight: WordCloudProps['fontWeight'] = (word) => {
  if (word.value < 100) {
    return 'normal';
  }

  if (word.value < 180) {
    return 'bold';
  }

  return '900';
};

const rotationWeights = [0, 0, 0, 90, -90];

const resolveRotate: WordCloudProps['rotate'] = (_word, index) => {
  return rotationWeights[index % rotationWeights.length];
};

const resolveRandom = (): number => {
  return 0.42;
};

interface CustomWordCloudProps {
  words: Word[];
  type: 'positive' | 'negative';
}

const CustomWordCloud = ({ words, type }: CustomWordCloudProps) => {
  const [hoveredWord, setHoveredWord] = useState<Word | null>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const width = 400;
  const height = 300;

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
    width,
    height,
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
      className="relative flex h-full w-full cursor-default items-center justify-center"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
      >
        <g transform={`translate(${width / 2},${height / 2})`}>
          {computedWords.map((word, index) => (
            <text
              key={`${word.text}-${index}`}
              textAnchor="middle"
              onMouseEnter={() => setHoveredWord(word)}
              onMouseLeave={() => setHoveredWord(null)}
              className="transition-all duration-300"
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
          className="pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl"
          style={{
            left: mousePosition.x,
            top: mousePosition.y - 30,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="mr-1.5 font-semibold">{hoveredWord.text}:</span>

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

interface PieLabelPayload {
  count: number;
}

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  payload: PieLabelPayload;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
  percent,
}: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;

  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);

  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  const formattedCount =
    payload.count >= 1000
      ? `${(payload.count / 1000).toFixed(1)}K`
      : payload.count.toString();

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[10px] font-semibold"
      style={{
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
      }}
    >
      {`${formattedCount} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const ProjectSentimentPage = () => {
  const [activeTweetTab, setActiveTweetTab] = useState<'positive' | 'negative'>(
    'positive',
  );

  const activeTweets = representativeTweets[activeTweetTab];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-6 pb-10">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Sentiment Trend
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Monitor positive and critical public perception, discover
              frequently used sentiment keywords, and review the posts driving
              each sentiment.
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

        {/* Sentiment distribution */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
          <div className="mb-7 flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <PieChart size={18} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Sentiment Distribution
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
                Breakdown of {sentimentTrendStats.total.toLocaleString('en-US')}{' '}
                analyzed posts based on contextual sentiment classification.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            {/* Donut chart */}
            <div className="relative h-80 min-w-0 rounded-xl border border-slate-100 bg-slate-50/70">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={sentimentTrendChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={125}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {sentimentTrendChartData.map((entry) => (
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

                      const data = payload[0].payload;

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
                            <div className="flex min-w-40 justify-between gap-5">
                              <span>Distribution</span>

                              <span className="font-semibold text-slate-800">
                                {data.value}%
                              </span>
                            </div>

                            <div className="flex justify-between gap-5">
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
                <span className="text-3xl font-semibold tracking-tight text-slate-950">
                  {sentimentTrendStats.total >= 1000
                    ? `${(sentimentTrendStats.total / 1000).toFixed(1)}K`
                    : sentimentTrendStats.total}
                </span>

                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Total posts
                </span>
              </div>
            </div>

            {/* Sentiment details */}
            <div className="space-y-3">
              {sentimentTrendChartData.map((item) => (
                <article
                  key={item.name}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${item.fill}12`,
                        color: item.fill,
                      }}
                    >
                      {item.name === 'Positive' ? (
                        <ThumbsUp size={18} />
                      ) : (
                        <ThumbsDown size={18} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </h3>

                        <span
                          className="text-lg font-semibold"
                          style={{
                            color: item.fill,
                          }}
                        >
                          {item.value}%
                        </span>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.fill,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        Detected in{' '}
                        <span className="font-medium text-slate-700">
                          {item.count.toLocaleString('en-US')}
                        </span>{' '}
                        captured posts.
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Word clouds */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-950">
              Keyword Discourse Themes
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Terms most frequently associated with positive and critical
              sentiment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Positive word cloud */}
            <div className="min-w-0">
              <div className="flex items-center justify-center gap-2">
                <ThumbsUp size={17} className="text-emerald-600" />

                <h3 className="text-sm font-semibold text-slate-900">
                  Positive Keywords
                </h3>
              </div>

              <div className="mt-3 h-72 overflow-hidden rounded-xl border border-emerald-100/60 bg-emerald-50/30">
                <CustomWordCloud words={positiveWords} type="positive" />
              </div>
            </div>

            {/* Negative word cloud */}
            <div className="min-w-0">
              <div className="flex items-center justify-center gap-2">
                <ThumbsDown size={17} className="text-red-600" />

                <h3 className="text-sm font-semibold text-slate-900">
                  Critical Keywords
                </h3>
              </div>

              <div className="mt-3 h-72 overflow-hidden rounded-xl border border-red-100/60 bg-red-50/30">
                <CustomWordCloud words={negativeWords} type="negative" />
              </div>
            </div>
          </div>
        </section>

        {/* Representative posts */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col justify-between gap-5 border-b border-slate-100 p-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Representative Posts
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Contextual examples representing each sentiment category.
              </p>
            </div>

            <div className="flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTweetTab('positive')}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition sm:flex-none ${
                  activeTweetTab === 'positive'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ThumbsUp size={15} />
                Positive
              </button>

              <button
                type="button"
                onClick={() => setActiveTweetTab('negative')}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition sm:flex-none ${
                  activeTweetTab === 'negative'
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ThumbsDown size={15} />
                Critical
              </button>
            </div>
          </div>

          <div className="bg-slate-50/60 p-5 sm:p-6">
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
              {activeTweets.map((tweetId, index) => (
                <div
                  key={`${activeTweetTab}-${tweetId}-${index}`}
                  className="flex min-w-0 justify-center"
                >
                  <div className="w-full max-w-[420px]">
                    <TwitterTweetEmbed
                      tweetId={tweetId}
                      options={{
                        theme: 'light',
                        conversation: 'none',
                      }}
                      placeholder={
                        <div className="h-44 w-full animate-pulse rounded-xl border border-slate-200 bg-white" />
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

export default ProjectSentimentPage;
