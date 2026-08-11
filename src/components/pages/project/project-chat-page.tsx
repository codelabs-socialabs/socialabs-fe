import { useEffect, useRef, useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useParams } from 'react-router';

import ChatHeaderContext from '@/components/fragments/chatbot/chat-header-context';
import ChatInputBar from '@/components/fragments/chatbot/chat-input-bar';
import ChatMessageWindow from '@/components/fragments/chatbot/chat-message-window';
import SidebarChatbot from '@/components/fragments/chatbot/sidebar-chatbot';
import SmartSuggestionGrid from '@/components/fragments/chatbot/smart-suggestion-grid';
import { useProjectChatbot } from '@/hooks/use-project-chatbot';
import type { ChatProcessingType } from '@/types/chatbot';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const ProjectChatbotPage = () => {
  const { workspaceId = '', projectId = '' } = useParams<ProjectRouteParams>();

  const {
    messages,
    isLoading,
    isStreaming,
    processingType,
    setProcessingType,
    conversations,
    activeConversationId,
    selectConversation,
    createNewChat,
    deleteConversation,
    sendMessage,
  } = useProjectChatbot({ workspaceId, projectId });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, isLoading]);

  const handleSendMessage = (text: string, mode?: ChatProcessingType): void => {
    if (mode && mode !== processingType) {
      setProcessingType(mode);
    }
    sendMessage(text);
  };

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-white">
      {/* Chat history sidebar */}
      <div
        className={`h-full shrink-0 overflow-hidden bg-white transition-[width] duration-300 ease-in-out ${
          isSidebarOpen ? 'w-60' : 'w-0'
        }`}
      >
        <div
          className={`h-full w-60 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarChatbot
            isOpen={isSidebarOpen}
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={selectConversation}
            onNewChat={createNewChat}
            onDeleteConversation={deleteConversation}
          />
        </div>
      </div>

      {/* Main chat area */}
      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Sidebar toggle */}
        <div className="absolute left-4 top-4 z-20">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((current) => !current)}
            aria-label={
              isSidebarOpen ? 'Close chat sidebar' : 'Open chat sidebar'
            }
            title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            className="rounded-lg border border-slate-200 bg-white/90 p-2 text-slate-400 shadow-sm backdrop-blur-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={19} />
            ) : (
              <PanelLeftOpen size={19} />
            )}
          </button>
        </div>

        {/* Scrollable messages */}
        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-6 pb-40 pt-16 sm:px-8">
            {messages.length === 0 ? (
              <div className="flex w-full flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Greeting */}
                <div className="mt-12 flex shrink-0 flex-col items-center justify-center text-center">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white">
                    S
                  </div>

                  <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
                    Hello, I&apos;m SociaBot
                  </h1>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    Ask questions about your project dataset, explore trends,
                    inspect sentiment, and discover the actors shaping the
                    conversation.
                  </p>
                </div>

                {/* Context */}
                <div className="mt-8 w-full">
                  <ChatHeaderContext />
                </div>

                {/* Suggestions */}
                <div className="mt-8 w-full">
                  <SmartSuggestionGrid onSelectPrompt={handleSendMessage} />
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col py-6">
                {messages.map((message, index) => {
                  const isLastAssistantMessage =
                    index === messages.length - 1 &&
                    message.role === 'assistant';

                  return (
                    <ChatMessageWindow
                      key={message.id}
                      message={message}
                      isTyping={isLastAssistantMessage && isStreaming}
                    />
                  );
                })}

                {isLoading && (
                  <div className="mb-8 flex w-full animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        S
                      </div>

                      <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3">
                        <span className="size-1.5 animate-pulse rounded-full bg-slate-400" />

                        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:100ms]" />

                        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:200ms]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-12">
          <div className="pointer-events-auto mx-auto w-full max-w-3xl px-6 sm:px-8">
            <ChatInputBar
              onSendMessage={handleSendMessage}
              isLoading={isLoading || isStreaming}
              mode={processingType}
              onModeChange={setProcessingType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChatbotPage;
