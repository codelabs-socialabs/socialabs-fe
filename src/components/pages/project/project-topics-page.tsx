import { BrainCircuit, Database, ExternalLink, Hash, X } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { useProjectStore } from '@/stores/project-store';
import { useProjectTopics } from '@/hooks/use-project-topics';
import { useTopicDocuments } from '@/hooks/use-topic-documents';
import type { Topic } from '@/types/project';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const formatNumber = (value: number): string => value.toLocaleString('en-US');

const formatPercent = (value: number): string => `${(value * 100).toFixed(0)}%`;

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

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

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
          <button
            type="button"
            onClick={refetch}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try again
          </button>
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
              Topics
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Topic modeling results from ETM analysis.
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
              Topics
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Topic modeling results from ETM analysis.
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
              Topic modeling belum dijalankan untuk project ini.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="space-y-6 pb-10">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Topics
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Topic modeling results from ETM analysis.
            </p>
          </header>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <BrainCircuit size={14} />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Total Topics
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {formatNumber(topics.length)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <Database size={14} />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Total Documents
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {formatNumber(documents.length)}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <button
                key={topic.topicId}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 text-left transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-sm font-semibold text-red-600">
                    {topic.topicId}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Topic {topic.topicId}
                  </span>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-700">
                  {topic.context}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {topic.words.slice(0, 5).map((word) => (
                    <span
                      key={word}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      <Hash size={10} className="text-slate-400" />
                      {word}
                    </span>
                  ))}
                  {topic.words.length > 5 && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400">
                      +{topic.words.length - 5}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </section>
        </div>
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/25">
          <button
            type="button"
            aria-label="Close topic details"
            onClick={() => setSelectedTopic(null)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-red-600">
                  Topic {selectedTopic.topicId}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">
                  Topic Detail
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="space-y-7">
                <section>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Context
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-800">
                    {selectedTopic.context}
                  </p>
                </section>

                <section>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Keywords
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTopic.words.map((word) => (
                      <span
                        key={word}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        <Hash size={11} className="text-slate-400" />
                        {word}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Sample Documents
                  </p>

                  {docsLoading && (
                    <p className="mt-3 text-sm text-slate-500">
                      Loading documents…
                    </p>
                  )}

                  {docsError && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-700">{docsError}</p>
                    </div>
                  )}

                  {!docsLoading && !docsError && documents.length === 0 && (
                    <p className="mt-3 text-sm text-slate-500">
                      No documents found for this topic.
                    </p>
                  )}

                  {!docsLoading && documents.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {documents.slice(0, 10).map((doc) => (
                        <article
                          key={doc.id}
                          className="rounded-lg border border-slate-200 p-4"
                        >
                          <p className="text-sm leading-relaxed text-slate-800">
                            {doc.rawText || doc.fullText}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                            <span>@{doc.username}</span>
                            <span>{formatPercent(doc.probability)}</span>
                          </div>
                          {doc.tweetUrl && (
                            <a
                              href={doc.tweetUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                            >
                              <ExternalLink size={12} />
                              View original
                            </a>
                          )}
                        </article>
                      ))}

                      {documents.length > 10 && (
                        <p className="text-xs text-slate-400">
                          Showing 10 of {formatNumber(documents.length)}{' '}
                          documents
                        </p>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default ProjectTopicsPage;
