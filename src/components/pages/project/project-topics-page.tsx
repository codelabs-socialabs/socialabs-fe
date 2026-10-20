import {
  AlignLeft,
  BrainCircuit,
  Database,
  ExternalLink,
  Hash,
  Heart,
  LoaderCircle,
  MessageSquare,
  Play,
  Share2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import { projectApi } from '@/lib/api/project-api';
import { useProjectProgress } from '@/hooks/use-project-progress';
import { useProjectStore } from '@/stores/project-store';
import { useProjectTopics } from '@/hooks/use-project-topics';
import { useTopicDocuments } from '@/hooks/use-topic-documents';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const formatNumber = (value: number): string => value.toLocaleString('en-US');

const ProjectTopicsPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();
  const { topics, isLoading, error, refetch } = useProjectTopics(
    workspaceId ?? '',
    projectId ?? '',
  );

  const project = useProjectStore((state) => {
    const projects = state.projectsByWorkspace[workspaceId ?? ''] ?? [];
    return projects.find((p) => p.id === projectId) ?? null;
  });

  useProjectProgress(workspaceId ?? '', projectId ?? '');

  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [isTriggering, setIsTriggering] = useState(false);

  const selectedTopic =
    topics?.find((t) => t.topicId === selectedTopicId) ?? null;

  const {
    documents,
    isLoading: docsLoading,
    error: docsError,
  } = useTopicDocuments(
    workspaceId ?? '',
    projectId ?? '',
    selectedTopic?.topicId,
  );

  const isModeling =
    project?.processing?.status === 'MODELING' ||
    project?.processing?.stage === 'MODELING';

  const isFailed = project?.processing?.status === 'FAILED';
  const failedStage = project?.processing?.error?.stage;

  useEffect(() => {
    if (project?.processing?.status === 'COMPLETED' && !topics) {
      refetch();
    }
  }, [project?.processing?.status, topics, refetch]);

  useEffect(() => {
    if (topics && topics.length > 0 && selectedTopicId === null) {
      setSelectedTopicId(topics[0].topicId);
    }
  }, [topics, selectedTopicId]);

  const handleTriggerModeling = async () => {
    if (!workspaceId || !projectId) return;
    setIsTriggering(true);
    try {
      await projectApi.processTopics(workspaceId, projectId);
      toast.success('Topic modeling started.', {
        description: 'Results will appear when processing completes.',
      });
    } catch {
      toast.error('Failed to start topic modeling.');
    } finally {
      setIsTriggering(false);
    }
  };

  if (isLoading && !topics) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-sm text-slate-500">Loading topics…</p>
      </div>
    );
  }

  if (error && !topics) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-800">
            Unable to load topics
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
              onClick={handleTriggerModeling}
              disabled={isTriggering}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              Run Topic Modeling
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (
    (!topics || topics.length === 0) &&
    isFailed &&
    failedStage === 'MODELING'
  ) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="space-y-6 pb-10">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Topic Modeling
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the primary narratives driving the conversation.
            </p>
          </header>

          <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <BrainCircuit size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Topic modeling gagal
            </h3>
            <p className="mt-1 max-w-sm mx-auto text-sm leading-relaxed text-red-700">
              {project?.processing?.error?.message ??
                'Terjadi kesalahan saat proses topic modeling.'}
            </p>
            <button
              type="button"
              onClick={handleTriggerModeling}
              disabled={isTriggering}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              Run Topic Modeling
            </button>
          </div>
        </div>
      </div>
    );
  }

  if ((!topics || topics.length === 0) && isModeling) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="space-y-6 pb-10">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Topic Modeling
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the primary narratives driving the conversation.
            </p>
          </header>

          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BrainCircuit size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Topic modeling sedang berjalan
            </h3>
            <p className="mt-1 max-w-sm mx-auto text-sm leading-relaxed text-slate-500">
              Proses ETM training sedang berlangsung. Halaman ini akan otomatis
              menampilkan hasil setelah selesai.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!topics || topics.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="space-y-6 pb-10">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Topic Modeling
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the primary narratives driving the conversation.
            </p>
          </header>

          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <Database size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Tidak ada topics ditemukan
            </h3>
            <p className="mt-1 max-w-sm mx-auto text-sm leading-relaxed text-slate-500">
              Topic modeling belum dijalankan untuk project ini. Jalankan secara
              manual atau tunggu hingga crawling selesai.
            </p>
            <button
              type="button"
              onClick={handleTriggerModeling}
              disabled={isTriggering}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              Run Topic Modeling
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-8 pb-10">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Topic Modeling
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the primary narratives driving the conversation. Topics
              are automatically clustered by AI to reveal the discussion
              patterns that matter most.
            </p>
          </div>
        </header>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Total clusters</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {topics.length}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Detected conversation groups
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Dominant topic</p>
            <p className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-slate-900">
              {topics[0]?.context ?? 'No topic'}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Highest discussion volume
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">
              Total documents
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {formatNumber(documents.length)}
            </p>
            <p className="mt-2 text-xs text-slate-400">Across all topics</p>
          </div>
        </section>

        {/* Topic list and deep dive */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          {/* Topic list */}
          <aside className="min-w-0">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Detected Narratives
              </h2>
              <span className="text-xs text-slate-400">
                {topics.length} topics
              </span>
            </div>

            <div className="space-y-2.5">
              {topics.map((topic) => {
                const isSelected = selectedTopicId === topic.topicId;

                return (
                  <button
                    key={topic.topicId}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.topicId)}
                    className={`relative w-full overflow-hidden rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? 'border-red-200 bg-red-50/70'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute inset-y-0 left-0 w-1 bg-red-500" />
                    )}

                    <h3
                      className={`line-clamp-2 pr-2 text-sm font-semibold leading-snug ${
                        isSelected ? 'text-slate-950' : 'text-slate-800'
                      }`}
                    >
                      {topic.context}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <AlignLeft size={13} className="text-slate-400" />
                        {topic.words.length} keywords
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Topic detail */}
          <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {selectedTopic ? (
              <>
                <div className="p-6 lg:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Hash size={15} />
                      <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                        Topic {selectedTopic.topicId}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {selectedTopic.context}
                  </h2>

                  {/* AI summary */}
                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-md bg-white text-xs font-semibold text-red-600 ring-1 ring-slate-200">
                        AI
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Topic Summary
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {selectedTopic.context}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="mt-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Top Keywords
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopic.words.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Representative posts */}
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 lg:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Representative Posts
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Examples that best represent this topic.
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {docsLoading
                        ? 'Loading…'
                        : `${documents.length} ${documents.length === 1 ? 'post' : 'posts'}`}
                    </span>
                  </div>

                  {docsError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-700">{docsError}</p>
                    </div>
                  )}

                  {!docsLoading && !docsError && documents.length === 0 && (
                    <p className="text-sm text-slate-500">
                      No documents found for this topic.
                    </p>
                  )}

                  <div className="space-y-4">
                    {documents.slice(0, 10).map((doc) => (
                      <article
                        key={doc.id}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-600">
                              {(doc.username || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {doc.username || 'Unknown'}
                                </p>
                              </div>
                              <p className="truncate text-xs text-slate-500">
                                @{doc.username || 'unknown'}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-slate-400">
                            {(doc.probability * 100).toFixed(0)}% match
                          </span>
                        </div>

                        <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">
                          {doc.rawText || doc.fullText}
                        </p>

                        {doc.tweetUrl && (
                          <a
                            href={doc.tweetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                          >
                            <ExternalLink size={12} />
                            View original
                          </a>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-4">
                          <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Heart size={15} />
                            Like
                          </span>
                          <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                            <MessageSquare size={15} />
                            Reply
                          </span>
                          <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Share2 size={15} />
                            Copy link
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>

                  {documents.length > 10 && (
                    <p className="mt-4 text-xs text-slate-400">
                      Showing 10 of {formatNumber(documents.length)} documents
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex min-h-96 items-center justify-center p-8 text-center">
                <div>
                  <Hash size={24} className="mx-auto text-slate-400" />
                  <h2 className="mt-3 text-sm font-semibold text-slate-900">
                    Select a topic
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose a narrative to view its details.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectTopicsPage;
