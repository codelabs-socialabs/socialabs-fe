import React, { useMemo, useState } from 'react';
import type { Topic } from '@/types/project';

interface Props {
  onSelectPrompt: (prompt: string) => void;
  topics?: Topic[] | null;
  projectKeyword?: string;
}

const SmartSuggestionGrid: React.FC<Props> = ({
  onSelectPrompt,
  topics,
  projectKeyword = '',
}) => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);

  const suggestions = useMemo(() => {
    if (topics && topics.length > 0) {
      return topics.slice(0, 4).map((t) => ({
        topic: `Topic ${t.topicId}: ${t.context}`,
        keywords: t.words.slice(0, 5),
        questions: [
          `Apa keluhan atau narasi utama terkait ${t.context}?`,
          `Tolong buat ringkasan eksekutif dari percakapan topik ${t.context}.`,
        ],
      }));
    }

    const keyword = projectKeyword || 'dataset';
    return [
      {
        topic: `Topic 1: Percakapan ${keyword}`,
        keywords: [keyword, 'diskusi', 'publik', 'opini'],
        questions: [
          `Apa insight utama dari data percakapan ${keyword}?`,
          `Siapa aktor atau influencer paling dominan dalam isu ${keyword}?`,
        ],
      },
    ];
  }, [topics, projectKeyword]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-8">
      <h3 className="text-sm font-semibold text-slate-800 mb-4 px-2">
        Suggested Topics from Dataset
      </h3>

      <div className="flex flex-col gap-2">
        {suggestions.map((item, index) => {
          const isExpanded = expandedTopic === index;

          return (
            <div
              key={index}
              className="flex flex-col bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all"
            >
              {/* Accordion Header (Click to toggle) */}
              <button
                type="button"
                onClick={() => setExpandedTopic(isExpanded ? null : index)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left ${isExpanded ? 'bg-slate-50 border border-slate-200' : 'bg-transparent'}`}
              >
                <div className="flex flex-col gap-1 pr-4">
                  <h4
                    className={`text-[15px] font-semibold transition-colors ${isExpanded ? 'text-slate-900' : 'text-slate-700'}`}
                  >
                    {item.topic}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {item.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-slate-500 bg-slate-100/80 px-2 py-[2px] rounded-md"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-slate-400">
                  {isExpanded ? (
                    <span className="text-xl font-light leading-none">-</span>
                  ) : (
                    <span className="text-xl font-light leading-none">+</span>
                  )}
                </div>
              </button>

              {/* Sub-prompts (Show when expanded) */}
              {isExpanded && (
                <div className="flex flex-col gap-1.5 p-3.5 pt-0 animate-in fade-in duration-200">
                  {item.questions.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => onSelectPrompt(q)}
                      className="group flex items-center gap-2.5 w-full p-2.5 rounded-lg text-left text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-all border border-slate-100/60"
                    >
                      <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                        →
                      </span>
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartSuggestionGrid;

export default SmartSuggestionGrid;
