/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, Copy, Link } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import type { ChatMessageItem } from '@/types/chatbot';

export type ChatMessage = ChatMessageItem;

interface Props {
  message: ChatMessageItem;
  isTyping?: boolean;
}

const ChatMessageWindow: React.FC<Props> = ({ message, isTyping = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typing effect for assistant messages
  useEffect(() => {
    if (message.role === 'assistant' && isTyping) {
      setIsAnimating(true);
      setDisplayedText('');

      let i = 0;
      const textToType = message.content;

      const intervalId = setInterval(() => {
        setDisplayedText(textToType.slice(0, i));
        i += 3; // Type 3 chars at a time for speed

        if (i > textToType.length) {
          clearInterval(intervalId);
          setDisplayedText(textToType);
          setIsAnimating(false);
        }
      }, 10);

      return () => clearInterval(intervalId);
    } else {
      setDisplayedText(message.content);
      setIsAnimating(false);
    }
  }, [message.content, message.role, isTyping]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === 'user';
  const hasFallacy = Boolean(message.fallacy?.fallacyType);

  return (
    <div
      className={`mb-8 flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Bubble Container */}
      <div
        className={`flex max-w-[85%] flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'}`}
      >
        {/* Message Content */}
        {isUser ? (
          <div className="rounded-3xl rounded-tr-sm bg-slate-100 px-5 py-3.5 text-[15px] font-medium leading-relaxed text-slate-900">
            {displayedText}
          </div>
        ) : (
          <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-800 prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-slate-900">
            <ReactMarkdown>
              {displayedText + (isAnimating ? ' ▊' : '')}
            </ReactMarkdown>
          </div>
        )}

        {/* Fallacy Warning Box */}
        {!isUser && message.fallacy && hasFallacy && (
          <div className="mt-3 flex w-full flex-col gap-1 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-semibold text-amber-800">
              <AlertTriangle size={14} className="text-amber-600" />
              <span>
                Logical Fallacy Detected: {message.fallacy.fallacyType}
              </span>
              <span className="ml-auto rounded bg-amber-200/60 px-1.5 py-0.5 text-[10px]">
                {Math.round(message.fallacy.confidence * 100)}% confidence
              </span>
            </div>
            {message.fallacy.explanation && (
              <p className="mt-1 leading-relaxed text-amber-800/90">
                {message.fallacy.explanation}
              </p>
            )}
            {message.fallacy.suggestedModification && (
              <div className="mt-1 font-medium text-amber-900">
                <span className="font-semibold">Suggestion:</span>{' '}
                {message.fallacy.suggestedModification}
              </div>
            )}
          </div>
        )}

        {/* Footer Metadata (Assistant Only) */}
        {!isUser && !isAnimating && (
          <div className="mt-2 flex items-center gap-4">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Copy response"
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
            </button>

            {/* Data Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-slate-300">•</span>
                <Link size={12} className="text-slate-400" />
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-slate-200/60 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      {source.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageWindow;
