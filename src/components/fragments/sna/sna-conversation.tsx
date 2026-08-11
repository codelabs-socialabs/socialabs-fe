import React, { useMemo, useState } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import type { SNACommunityResult } from '@/types/project';

interface SNAConversationProps {
  data?: SNACommunityResult | null;
}

const SNAConversation: React.FC<SNAConversationProps> = ({ data }) => {
  const clusterMap = useMemo(() => {
    if (!data || !data.edges) return {};

    const map: Record<
      number,
      {
        topics: Set<string>;
        interactions: Array<{
          source: string;
          target: string;
          fullText: string;
          topic: string;
          tweetUrl: string;
        }>;
      }
    > = {};

    for (const edge of data.edges) {
      const commId = edge.sourceCommunity ?? edge.source_community ?? 0;
      if (!map[commId]) {
        map[commId] = { topics: new Set(), interactions: [] };
      }
      if (edge.topic) map[commId].topics.add(edge.topic);
      if (edge.fullText || edge.source) {
        map[commId].interactions.push({
          source: edge.source,
          target: edge.target,
          fullText: edge.fullText ?? '',
          topic: edge.topic ?? '',
          tweetUrl: edge.tweetUrl ?? '',
        });
      }
    }

    return map;
  }, [data]);

  const communityIds = useMemo(
    () => Object.keys(clusterMap).map(Number),
    [clusterMap],
  );

  const [activeCommunityId, setActiveCommunityId] = useState<number | null>(
    null,
  );

  const currentCommId = activeCommunityId ?? communityIds[0] ?? 0;
  const currentCluster = clusterMap[currentCommId] ?? {
    topics: new Set(),
    interactions: [],
  };

  const topicsList = Array.from(currentCluster.topics);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
            Cluster Conversation Snapshot
          </h3>
          <p className="text-sm font-medium text-slate-500">
            View representative raw dialogue flowing within each isolated
            community partition.
          </p>
        </div>

        {/* Tabs */}
        {communityIds.length > 0 && (
          <div className="flex bg-slate-100/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto shrink-0 border border-slate-200/50">
            {communityIds.map((commId) => (
              <button
                key={commId}
                type="button"
                onClick={() => setActiveCommunityId(commId)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap outline-none ${
                  currentCommId === commId
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                Community {commId}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Cluster Context Header */}
      {communityIds.length > 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div>
            <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">
              Algorithmic Topics
            </h4>
            <span className="text-lg font-black text-slate-800 tracking-tight">
              {topicsList.length > 0
                ? topicsList.slice(0, 3).join(', ')
                : `Community ${currentCommId} Dialogue`}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topicsList.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 rounded-full"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interaction List */}
      <div className="space-y-4">
        {currentCluster.interactions.slice(0, 8).map((item, index) => (
          <article
            key={`${currentCommId}-${index}`}
            className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-slate-700">
                @{item.source || 'user'} → @{item.target || 'user'}
              </span>
              {item.topic && (
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600">
                  #{item.topic}
                </span>
              )}
            </div>
            {item.fullText && (
              <p className="text-sm text-slate-800 leading-relaxed">
                {item.fullText}
              </p>
            )}
            {item.tweetUrl && (
              <a
                href={item.tweetUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
              >
                <ExternalLink size={12} />
                View Original Interaction
              </a>
            )}
          </article>
        ))}
      </div>

      {currentCluster.interactions.length === 0 && (
        <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
          <MessageCircle size={32} className="mb-2 opacity-50" />
          <span className="text-sm font-medium">
            No representative interactions available for Community{' '}
            {currentCommId}
          </span>
        </div>
      )}
    </div>
  );
};

export default SNAConversation;
