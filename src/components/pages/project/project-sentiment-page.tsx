import {
  Database,
  LoaderCircle,
  Play,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import { useWordCloud } from '@isoterik/react-word-cloud';
import type { Word, WordCloudProps } from '@isoterik/react-word-cloud';
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { useProjectSentiments } from '@/hooks/use-project-sentiments';
import { useWordFrequency } from '@/hooks/use-word-frequency';
import { projectApi } from '@/lib/api/project-api';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const SENTIMENT_COLORS = {
  positive: '#10b981',
  negative: '#ef4444',
};

const mapSentimentLabel = (label: string): string => {
  if (label === 'Positif') return 'Positive';
  if (label === 'Negatif') return 'Negative';
  return label;
};

const ProjectSentimentPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();
  const { sentimentResult, isLoading, error, refetch } = useProjectSentiments(
    workspaceId ?? '',
    projectId ?? '',
  );
  const { wordFrequency, isLoading: wordLoading } = useWordFrequency(
    workspaceId ?? '',
    projectId ?? '',
  );

  const [isTriggering, setIsTriggering] = useState(false);
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>(
    'positive',
  );

  const handleTrigger = async () => {
    if (!workspaceId || !projectId) return;
    setIsTriggering(true);
    try {
      await projectApi.processSentiments(workspaceId, projectId);
      toast.success('Sentiment analysis started.', {
        description: 'Results will appear when processing completes.',
      });
    } catch {
      toast.error('Failed to start sentiment analysis.');
    } finally {
      setIsTriggering(false);
    }
  };

  if (isLoading && !sentimentResult) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-sm text-slate-500">Loading sentiment analysis…</p>
      </div>
    );
  }

  if (error && !sentimentResult) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-800">
            Unable to load sentiments
          </p>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={refetch}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={handleTrigger}
              disabled={isTriggering}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              Run Sentiment Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sentimentResult || sentimentResult.total === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="space-y-6 pb-10">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Sentiment Trend
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Analyze the emotional tone of conversations across positive and
              negative sentiment.
            </p>
          </header>
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <Database size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No sentiment data
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-slate-500">
              Sentiment analysis belum dijalankan. Pastikan topic modeling sudah
              selesai, lalu jalankan secara manual.
            </p>
            <button
              type="button"
              onClick={handleTrigger}
              disabled={isTriggering}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              Run Sentiment Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = sentimentResult.total;
  const positivePct = sentimentResult.sentimentPercentageCnn?.positive ?? 0;
  const negativePct = sentimentResult.sentimentPercentageCnn?.negative ?? 0;
  const positiveCount = Math.round((positivePct / 100) * total);
  const negativeCount = Math.round((negativePct / 100) * total);

  const chartData = [
    {
      name: 'Positive',
      value: positivePct,
      count: positiveCount,
      fill: SENTIMENT_COLORS.positive,
    },
    {
      name: 'Negative',
      value: negativePct,
      count: negativeCount,
      fill: SENTIMENT_COLORS.negative,
    },
  ];

  const positiveWords: Word[] = (wordFrequency?.positive ?? []).map((w) => ({
    text: w.word,
    value: w.count,
  }));
  const negativeWords: Word[] = (wordFrequency?.negative ?? []).map((w) => ({
    text: w.word,
    value: w.count,
  }));

  const positiveDocs = sentimentResult.documents.filter(
    (d) => mapSentimentLabel(d.sentimentCnn) === 'Positive',
  );
  const negativeDocs = sentimentResult.documents.filter(
    (d) => mapSentimentLabel(d.sentimentCnn) === 'Negative',
  );
  const activeDocs = activeTab === 'positive' ? positiveDocs : negativeDocs;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-8 pb-10">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Sentiment Trend
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Analyze the emotional tone of conversations across positive and
              negative sentiment.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleTrigger}
              disabled={isTriggering}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Play size={16} />
              )}
              Run Analysis
            </button>
          </div>
        </header>

        {/* Distribution */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Sentiment Distribution
            </h2>
            <div className="relative mt-6 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(
                      value: unknown,
                      _name: unknown,
                      props: unknown,
                    ) => [
                      `${Number(value ?? 0).toFixed(1)}% (${(
                        (props as { payload?: { count?: number } })?.payload
                          ?.count ?? 0
                      ).toLocaleString('en-US')} posts)`,
                      'Sentiment',
                    ]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-semibold tracking-tight text-slate-950">
                  {total.toLocaleString('en-US')}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Total Posts
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ThumbsUp size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Positive
                  </p>
                  <p className="text-xs text-slate-500">
                    {positiveCount.toLocaleString('en-US')} posts
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${positivePct}%` }}
                />
              </div>
              <p className="mt-2 text-right text-sm font-semibold text-emerald-600">
                {positivePct.toFixed(1)}%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <ThumbsDown size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Negative
                  </p>
                  <p className="text-xs text-slate-500">
                    {negativeCount.toLocaleString('en-US')} posts
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{ width: `${negativePct}%` }}
                />
              </div>
              <p className="mt-2 text-right text-sm font-semibold text-red-600">
                {negativePct.toFixed(1)}%
              </p>
            </div>
          </div>
        </section>

        {/* Word cloud */}
        {!wordLoading && wordFrequency && wordFrequency.positive.length > 0 && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Positive Keywords
              </h2>
              <div className="h-[360px] w-full">
                {positiveWords.length > 0 ? (
                  <CustomWordCloud words={positiveWords} type="positive" />
                ) : (
                  <p className="text-sm text-slate-500">
                    No positive keywords.
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Negative Keywords
              </h2>
              <div className="h-[360px] w-full">
                {negativeWords.length > 0 ? (
                  <CustomWordCloud words={negativeWords} type="negative" />
                ) : (
                  <p className="text-sm text-slate-500">
                    No negative keywords.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Representative posts */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Representative Posts
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('positive')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'positive'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Positive ({positiveDocs.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('negative')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'negative'
                    ? 'bg-red-50 text-red-700'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Negative ({negativeDocs.length})
              </button>
            </div>
          </div>

          {activeDocs.length === 0 ? (
            <p className="text-sm text-slate-500">
              No posts found for this sentiment.
            </p>
          ) : (
            <div className="space-y-4">
              {activeDocs.slice(0, 10).map((doc) => (
                <article
                  key={doc.id}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <p className="text-sm leading-relaxed text-slate-800">
                    {doc.rawText}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    {(doc.sentimentCnnProbability * 100).toFixed(0)}% confidence
                    · Topic {doc.topic ?? '-'}
                  </p>
                </article>
              ))}
              {activeDocs.length > 10 && (
                <p className="text-xs text-slate-400">
                  Showing 10 of {activeDocs.length.toLocaleString('en-US')}{' '}
                  posts
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
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

  const WIDTH = 600;
  const HEIGHT = 400;

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

  const minVal = Math.min(...words.map((w) => w.value), 1);
  const maxVal = Math.max(...words.map((w) => w.value), minVal + 1);

  const resolveFontSize = (word: Word) => {
    if (minVal === maxVal) return 24;
    const normalized = (word.value - minVal) / (maxVal - minVal);
    return Math.round(16 + normalized * 32);
  };

  const { computedWords } = useWordCloud({
    words,
    width: WIDTH,
    height: HEIGHT,
    font: 'Inter, sans-serif',
    fontWeight: resolveFontWeight,
    fontSize: resolveFontSize,
    rotate: resolveRotate,
    fontStyle: 'normal',
    spiral: 'rectangular',
    padding: 6,
    timeInterval: 1,
    random: resolveRandom,
  });

  return (
    <div
      className="relative flex h-full w-full cursor-default items-center justify-center"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-full w-full overflow-visible"
      >
        <g transform={`translate(${WIDTH / 2},${HEIGHT / 2})`}>
          {computedWords.map((word, index) => (
            <text
              key={`${word.text}-${index}`}
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
          className="pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl"
          style={{
            left: mousePos.x,
            top: mousePos.y - 30,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="mr-1.5 font-bold">{hoveredWord.text}:</span>
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

export default ProjectSentimentPage;
