import React from 'react';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

import type { ConversationSession } from '@/types/chatbot';

interface SidebarProps {
  isOpen: boolean;
  conversations?: ConversationSession[];
  activeConversationId?: string | null;
  onSelectConversation?: (id: string) => void;
  onNewChat?: () => void;
  onDeleteConversation?: (id: string) => void;
}

const SidebarChatbot: React.FC<SidebarProps> = ({
  isOpen,
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}) => {
  return (
    <div
      className={`flex h-full w-56 shrink-0 flex-col border-r border-slate-200 bg-slate-50/50 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <div className="mt-2 p-4">
        <span className="ml-1 text-[12px] font-bold uppercase tracking-widest text-slate-800 opacity-80">
          Chat History
        </span>
      </div>

      {/* History List */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-4">
        {/* Floating New Chat Action */}
        <button
          type="button"
          onClick={onNewChat}
          className="group mb-6 flex w-full items-center gap-2.5 px-3 py-2.5 font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <div className="flex size-6 items-center justify-center rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
            <Plus size={14} className="text-slate-700" />
          </div>
          <span className="text-[14px]">New Chat</span>
        </button>

        {conversations.length === 0 ? (
          <div className="px-3 text-xs text-slate-400">No chat history yet</div>
        ) : (
          <div className="flex flex-col gap-1">
            {conversations.map((room) => {
              const isActive = room.id === activeConversationId;
              return (
                <div
                  key={room.id}
                  className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-2 transition-colors ${
                    isActive
                      ? 'bg-slate-200/70 font-semibold text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectConversation?.(room.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <MessageSquare
                      size={14}
                      className={`shrink-0 ${
                        isActive
                          ? 'text-blue-600'
                          : 'text-slate-400 group-hover:text-slate-500'
                      }`}
                    />
                    <span className="truncate text-[13px]">{room.title}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation?.(room.id);
                    }}
                    title="Delete chat"
                    className="ml-1 rounded p-1 text-slate-400 opacity-0 transition hover:bg-slate-200 hover:text-rose-600 group-hover:opacity-100"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarChatbot;
