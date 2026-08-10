import { Activity, Database, LoaderCircle, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react';
import { toast } from 'sonner';

import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { projectApi } from '@/lib/api/project-api';
import { useProjectEmotions } from '@/hooks/use-project-emotions';
import type { EmotionPercentage } from '@/types/project';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

type EmotionName = 'Anger' | 'Fear' | 'Joy' | 'Love' | 'Sad' | 'Neutral';

const EMOTION_COLORS: Record<EmotionName, string> = {
  Anger: '#ef4444',
  Fear: '#a855f7',
  Joy: '#eab308',
  Love: '#ec4899',
  Sad: '#3b82f6',
  Neutral: '#64748b',
};

const EMOTION_LIST: EmotionName[] = [
  'Anger',
  'Fear',
  'Joy',
  'Love',
  'Sad',
  'Neutral',
];

const ProjectEmotionPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();
  const { emotionResult, isLoading, error, refetch } = useProjectEmotions(
    workspaceId ?? '',
    projectId ?? '',
  );

  const [isTriggering, setIsTriggering] = useState(false);
  const [activeEmotion, setActiveEmotion] = useState<EmotionName>('Anger');

  const handleTrigger = async () => {
    if (!workspaceId || !projectId) return;
    setIsTriggering(true);
    try {
      await projectApi.processEmotions(workspaceId, projectId);
      toast.success('Emotion analysis started.', {
        description: 'Results will appear when processing completes.',
      });
    } catch {
      toast.error('Failed to start emotion analysis.');
    } finally {
      setIsTriggering(false);
    }
  };

  if (isLoading && !emotionResult) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-sm text-slate-500">Loading emotion analysis…</p>
      </div>
    );
  }

  if (error && !emotionResult) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-800">
            Unable to load emotions
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
              Run Emotion Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!emotionResult || emotionResult.total === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="space-y-6 pb-10">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Emotion Analysis
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the emotional patterns driving the conversation across
              six core emotions.
            </p>
          </header>
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <Database size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No emotion data
            </h3>
            <p className="mt-1 max-w-sm mx-auto text-sm leading-relaxed text-slate-500">
              Emotion analysis belum dijalankan. Pastikan topic modeling sudah
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
              Run Emotion Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const percentages = emotionResult.emotionPercentageCnn as EmotionPercentage;
  const total = emotionResult.total;

  const chartData = EMOTION_LIST.map((name) => ({
    name,
    value: percentages[name] ?? 0,
    count: Math.round(((percentages[name] ?? 0) / 100) * total),
    fill: EMOTION_COLORS[name],
  }));

  const dominantEmotion = chartData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    chartData[0],
  );

  const docsByEmotion: Record<string, typeof emotionResult.documents> = {};
  for (const doc of emotionResult.documents) {
    const label = doc.emotionCnn as EmotionName;
    if (!docsByEmotion[label]) docsByEmotion[label] = [];
    docsByEmotion[label].push(doc);
  }
  const activeDocs = docsByEmotion[activeEmotion] ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-8 pb-10">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Emotion Analysis
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the emotional patterns driving the conversation across
              six core emotions.
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

        {/* Snapshot cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Activity size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Total Detected
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {total.toLocaleString('en-US')}
            </p>
            <p className="mt-1 text-xs text-slate-400">Classified posts</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Sparkles size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Dominant Emotion
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {dominantEmotion.name}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {dominantEmotion.value.toFixed(1)}% of total
            </p>
          </div>
        </section>

        {/* Distribution */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Emotion Distribution
            </h2>
            <div className="relative mt-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={2}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(
                      value: number,
                      _name: string,
                      props: { payload?: { count?: number } },
                    ) => [
                      `${value.toFixed(1)}% (${(props.payload?.count ?? 0).toLocaleString('en-US')} posts)`,
                      'Emotion',
                    ]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-900">Breakdown</h2>
            <div className="mt-4 space-y-3">
              {chartData.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      {item.name}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {item.value.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Representative posts */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Representative Posts
            </h2>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {EMOTION_LIST.map((emotion) => {
              const count = (docsByEmotion[emotion] ?? []).length;
              return (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => setActiveEmotion(emotion)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    activeEmotion === emotion
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {emotion} ({count})
                </button>
              );
            })}
          </div>

          {activeDocs.length === 0 ? (
            <p className="text-sm text-slate-500">
              No posts found for this emotion.
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
                    {(
                      (doc.emotionCnnProbability[doc.emotionCnn] ?? 0) * 100
                    ).toFixed(0)}
                    % confidence · Topic {doc.topic ?? '-'}
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

export default ProjectEmotionPage;
