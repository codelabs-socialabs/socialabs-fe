/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Link } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

interface Props {
  message: ChatMessage;
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

  return (
    <div
      className={`flex w-full mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Bubble Container */}
      <div
        className={`flex flex-col gap-1.5 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        {/* Message Content */}
        {isUser ? (
          <div className="px-5 py-3.5 bg-slate-100 text-slate-900 rounded-3xl rounded-tr-sm text-[15px] font-medium leading-relaxed">
            {displayedText}
          </div>
        ) : (
          <div className="prose prose-slate prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900 text-slate-800">
            <ReactMarkdown>
              {displayedText + (isAnimating ? ' ▊' : '')}
            </ReactMarkdown>
          </div>
        )}

        {/* Footer Metadata (Assistant Only) */}
        {!isUser && !isAnimating && (
          <div className="flex items-center gap-4 mt-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
                <div className="flex gap-2">
                  {message.sources.map((source, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {source}
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
