import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface Props {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInputBar: React.FC<Props> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="relative flex flex-col w-full bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:ring-1 focus-within:ring-slate-300 border border-slate-200/60 hover:border-slate-300 focus-within:border-slate-300 transition-all p-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SociaBot anything about this dataset..."
          disabled={isLoading}
          rows={1}
          className="w-full bg-transparent px-3 py-2 text-slate-900 text-[15px] font-medium outline-none disabled:opacity-50 placeholder:text-slate-500 resize-none max-h-[200px] custom-scrollbar overflow-y-auto"
        />

        {/* Bottom Tools Row */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors outline-none"
              title="Attach context"
            >
              <Paperclip size={18} />
            </button>
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors outline-none"
              title="Voice input"
            >
              <Mic size={18} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all outline-none ${
              input.trim() && !isLoading
                ? 'bg-slate-900 hover:bg-black text-white shadow-sm scale-100'
                : 'bg-slate-200 text-slate-400 scale-95'
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

      <div className="text-center mt-3 mb-1">
        <span className="text-[11px] text-slate-400 font-medium">
          SociaBot can make mistakes. Consider verifying important information.
        </span>
      </div>
    </form>
  );
};

export default ChatInputBar;
