import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Mic, Paperclip, Send } from 'lucide-react';

import type { ChatProcessingType } from '@/types/chatbot';

interface Props {
  onSendMessage: (message: string, mode?: ChatProcessingType) => void;
  isLoading: boolean;
  mode?: ChatProcessingType;
  onModeChange?: (mode: ChatProcessingType) => void;
}

const MODE_OPTIONS: { id: ChatProcessingType; label: string }[] = [
  { id: 'full', label: 'Full Pipeline' },
  { id: 'crag', label: 'CRAG RAG Only' },
  { id: 'fallacy', label: 'Fallacy Detector Only' },
  { id: 'simple', label: 'Simple Chat' },
];

const ChatInputBar: React.FC<Props> = ({
  onSendMessage,
  isLoading,
  mode = 'full',
  onModeChange,
}) => {
  const [input, setInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input, mode);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const currentModeLabel =
    MODE_OPTIONS.find((m) => m.id === mode)?.label || 'Full Pipeline';

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="relative flex w-full flex-col rounded-[24px] border border-slate-200/60 bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all hover:border-slate-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-300 focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SociaChat anything about this dataset..."
          disabled={isLoading}
          rows={1}
          className="custom-scrollbar max-h-[200px] w-full resize-none overflow-y-auto bg-transparent px-3 py-2 text-[15px] font-medium text-slate-900 outline-none placeholder:text-slate-500 disabled:opacity-50"
        />

        {/* Bottom Tools Row */}
        <div className="mt-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-full p-2 text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Attach context"
            >
              <Paperclip size={18} />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Voice input"
            >
              <Mic size={18} />
            </button>

            {/* Mode Selector Dropdown */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <span>{currentModeLabel}</span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  {MODE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onModeChange?.(opt.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center px-3 py-2 text-left text-xs transition ${
                        mode === opt.id
                          ? 'bg-slate-100 font-semibold text-slate-900'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`flex h-9 w-9 items-center justify-center rounded-full outline-none transition-all ${
              input.trim() && !isLoading
                ? 'scale-100 bg-slate-900 text-white shadow-sm hover:bg-black'
                : 'scale-95 bg-slate-200 text-slate-400'
            }`}
          >
            <Send
              size={15}
              className={
                input.trim() && !isLoading
                  ? 'translate-x-[1px] translate-y-[-1px]'
                  : 'translate-x-[1px] translate-y-[-1px]'
              }
            />
          </button>
        </div>
      </div>

      <div className="mb-1 mt-3 text-center">
        <span className="text-[11px] font-medium text-slate-400">
          SociaChat can make mistakes. Consider verifying important information.
        </span>
      </div>
    </form>
  );
};

export default ChatInputBar;
