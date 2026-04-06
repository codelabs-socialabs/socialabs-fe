import React, { useState } from 'react';

interface Props {
  onSelectPrompt: (prompt: string) => void;
}

// Hierarchical Topic Modeling Suggestions
const TOPIC_SUGGESTIONS = [
  {
    topic: 'Topic 1: Kenaikan Harga Sembako',
    keywords: ['harga', 'beras', 'naik', 'pasar'],
    questions: [
      'Apa keluhan utama terkait harga beras?',
      'Siapa aktor yang paling disalahkan dalam topik sembako?',
    ],
  },
  {
    topic: 'Topic 2: Infrastruktur Jalan Rusak',
    keywords: ['jalan', 'lobang', 'aspal', 'macet'],
    questions: [
      'Di daerah mana keluhan jalan rusak paling tinggi?',
      'Bagaimana perbandingan sentimen positif vs negatif di topik jalan?',
    ],
  },
  {
    topic: 'Topic 3: Bantuan Sosial (Bansos)',
    keywords: ['bansos', 'salah sasaran', 'pemerintah', 'rakyat'],
    questions: [
      'Apa narasi paling dominan terkait distribusi bansos?',
      'Tolong buat ringkasan eksekutif dari percakapan bansos.',
    ],
  },
];

const SmartSuggestionGrid: React.FC<Props> = ({ onSelectPrompt }) => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0); // Default open first topic

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-8">
      <h3 className="text-sm font-semibold text-slate-800 mb-4 px-2">
        Suggested Topics from Dataset
      </h3>

      <div className="flex flex-col gap-2">
        {TOPIC_SUGGESTIONS.map((item, index) => {
          const isExpanded = expandedTopic === index;

          return (
            <div
              key={index}
              className="flex flex-col bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all"
            >
              {/* Accordion Header (Click to toggle) */}
              <button
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
                        {kw}
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

              {/* Accordion Body (Sub-questions) */}
              {isExpanded && (
                <div className="flex flex-col gap-1.5 px-4 pb-4 pt-3 mt-1 mr-4 ml-4 rounded-b-xl border-t border-slate-100 border-dashed">
                  {item.questions.map((question, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => onSelectPrompt(question)}
                      className="text-left text-[14px] text-slate-600 hover:text-blue-700 font-medium transition-all flex items-start gap-2 group w-full outline-none py-1.5 px-2 rounded-lg hover:bg-blue-50/50"
                    >
                      <span className="text-blue-400 group-hover:text-blue-500 mt-[1px] opacity-70 group-hover:opacity-100 transition-opacity">
                        &rarr;
                      </span>
                      <span className="leading-snug">{question}</span>
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
