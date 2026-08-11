import { useCallback, useEffect, useState } from 'react';
import { projectApi } from '@/lib/api/project-api';
import { tokenStorage } from '@/lib/auth/token-storage';
import type {
  ChatMessageItem,
  ChatMessageSource,
  ChatProcessingType,
  ConversationSession,
  FallacyAnalysisResult,
} from '@/types/chatbot';

export interface UseProjectChatbotOptions {
  workspaceId: string;
  projectId: string;
}

export function useProjectChatbot({
  workspaceId,
  projectId,
}: UseProjectChatbotOptions) {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [processingType, setProcessingType] =
    useState<ChatProcessingType>('full');
  const [conversations, setConversations] = useState<ConversationSession[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const fetchConversations = useCallback(async () => {
    if (!workspaceId || !projectId) return;
    try {
      const res = await projectApi.getConversations(workspaceId, projectId);
      if (res.status && res.data) {
        setConversations(res.data);
      }
    } catch {
      // ignore fetch failure silent fallback
    }
  }, [workspaceId, projectId]);

  const selectConversation = useCallback(
    async (conversationId: string) => {
      if (!workspaceId || !projectId) return;
      setIsLoading(true);
      try {
        const res = await projectApi.getConversation(
          workspaceId,
          projectId,
          conversationId,
        );
        if (res.status && res.data) {
          setActiveConversationId(res.data.id);
          setMessages(res.data.messages || []);
        }
      } catch {
        // ignore error
      } finally {
        setIsLoading(false);
      }
    },
    [workspaceId, projectId],
  );

  const createNewChat = useCallback(() => {
    setActiveConversationId(null);
    setMessages([]);
  }, []);

  const deleteConversation = useCallback(
    async (conversationId: string) => {
      if (!workspaceId || !projectId) return;
      try {
        const res = await projectApi.deleteConversation(
          workspaceId,
          projectId,
          conversationId,
        );
        if (res.status) {
          setConversations((prev) =>
            prev.filter((item) => item.id !== conversationId),
          );
          if (activeConversationId === conversationId) {
            createNewChat();
          }
        }
      } catch {
        // ignore error
      }
    },
    [workspaceId, projectId, activeConversationId, createNewChat],
  );

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !workspaceId || !projectId || isStreaming) return;

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        processingType,
        createdAt: new Date().toISOString(),
      };

      const assistantId = `asst-${Date.now()}`;
      const assistantMsg: ChatMessageItem = {
        id: assistantId,
        role: 'assistant',
        content: '',
        processingType,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);

      try {
        const token = tokenStorage.getAccessToken();
        const streamUrl = projectApi.getChatStreamUrl(workspaceId, projectId);

        const response = await fetch(streamUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: text,
            processing_type: processingType,
            conversation_id: activeConversationId || undefined,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error('Streaming failed');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;

            const jsonStr = trimmed.replace(/^data:\s*/, '');
            if (!jsonStr) continue;

            try {
              const payload = JSON.parse(jsonStr) as {
                token?: string;
                conversation_id?: string;
                sources?: ChatMessageSource[];
                fallacy?: FallacyAnalysisResult;
                done?: boolean;
              };

              if (payload.conversation_id && !activeConversationId) {
                setActiveConversationId(payload.conversation_id);
                fetchConversations();
              }

              if (payload.token) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: msg.content + payload.token }
                      : msg,
                  ),
                );
              }

              if (payload.sources || payload.fallacy) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? {
                          ...msg,
                          sources: payload.sources || msg.sources,
                          fallacy: payload.fallacy || msg.fallacy,
                        }
                      : msg,
                  ),
                );
              }
            } catch {
              // ignore malformed chunk
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId && !msg.content
              ? {
                  ...msg,
                  content:
                    'Maaf, terjadi kesalahan saat menghubungi server AI. Silakan coba lagi.',
                }
              : msg,
          ),
        );
      } finally {
        setIsStreaming(false);
        void fetchConversations();
      }
    },
    [
      workspaceId,
      projectId,
      isStreaming,
      processingType,
      activeConversationId,
      fetchConversations,
    ],
  );

  return {
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
  };
}
