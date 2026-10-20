# Chatbot (CRAG + Fallacy + SSE Streaming) Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate AI Chatbot (CRAG, Fallacy Analysis, and Real-Time SSE Token Streaming) from FastAPI AI Service through NestJS Gateway to React Frontend, with persistent project chat sessions and mode selection.

**Architecture:** Add FastAPI SSE stream endpoint for chatbot responses. Extend NestJS `AiBackendClient` and `ProjectController` to proxy SSE streaming responses and conversation session history. Create frontend `useProjectChatbot` hook that parses token-by-token ReadableStream and updates UI in real-time while rendering Mode Selector and Sidebar History.

**Tech Stack:** FastAPI, LangChain, NestJS 11, TypeScript 5.7, React 19, `fetch` ReadableStream, Tailwind CSS.

## Global Constraints

- Do not add extra dependencies.
- Follow existing NestJS DTO and AI client patterns.
- Follow existing Zustand store and custom hook patterns.
- Ensure streaming errors are handled gracefully without breaking the UI.

---

### Task 1: FastAPI AI Backend Chatbot SSE Stream Endpoint

**Files:**
- Modify: `socialabs-be-ai/app/domains/chatbot/api.py`
- Modify: `socialabs-be-ai/app/domains/chatbot/services.py`

**Interfaces:**
- Consumes: Chat query payload `{ project_id, message, processing_type, conversation_id }`.
- Produces: `POST /chatbot/chat/stream` SSE stream (`EventSourceResponse` or chunked text/event-stream).

- [ ] **Step 1: Implement streaming helper in `services.py`**

Add `stream_chat(query, project_id, processing_type, conversation_id)` generator in `ChatService` that yields JSON SSE chunks:
`data: {"token": "...", "done": false}\n\n`
and final metadata event:
`data: {"sources": [...], "fallacy": {...}, "done": true}\n\n`

- [ ] **Step 2: Add `POST /chatbot/chat/stream` endpoint in `api.py`**

Add endpoint using `EventSourceResponse(service.stream_chat(...))` from `sse_starlette.sse`.

- [ ] **Step 3: Verify AI service syntax and ruff check**

Run: `uv run poe check` (in `socialabs-be-ai`)
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add app/domains/chatbot/api.py app/domains/chatbot/services.py
git commit -m "feat(chatbot): add SSE stream endpoint for chatbot responses"
```

---

### Task 2: NestJS AI Backend Client & Chatbot Proxy Methods

**Files:**
- Modify: `socialabs-be-nest/src/modules/project/ai-backend.client.ts`
- Test: `socialabs-be-nest/src/modules/project/ai-backend.client.spec.ts`

**Interfaces:**
- Consumes: FastAPI `/chatbot/chat/stream` and `/chatbot/conversations/*`.
- Produces: `streamChat`, `getConversations`, `getConversation`, `deleteConversation` in `AiBackendClient`.

- [ ] **Step 1: Write failing unit test in `ai-backend.client.spec.ts`**

```ts
it('fetches chatbot conversations and proxies stream safely', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue({
      data: [{ id: 'conv-1', title: 'Test Chat' }],
    }),
  });

  const res = await client.getConversations('proj-1');
  expect(global.fetch).toHaveBeenCalledWith(
    'http://ai.test/chatbot/conversations?project_id=proj-1',
  );
  expect(res).toEqual([{ id: 'conv-1', title: 'Test Chat' }]);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test -- ai-backend.client.spec.ts` (in `socialabs-be-nest`)
Expected: FAIL with "client.getConversations is not a function"

- [ ] **Step 3: Implement Chatbot methods in `ai-backend.client.ts`**

Implement `getConversations`, `getConversation`, `deleteConversation`, and `streamChat`.

- [ ] **Step 4: Run test to verify pass**

Run: `npm test -- ai-backend.client.spec.ts` (in `socialabs-be-nest`)
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/modules/project/ai-backend.client.ts src/modules/project/ai-backend.client.spec.ts
git commit -m "feat: add chatbot proxy methods to AiBackendClient"
```

---

### Task 3: NestJS Gateway Chatbot Endpoints & Streaming Controller

**Files:**
- Modify: `socialabs-be-nest/src/modules/project/project.service.ts`
- Modify: `socialabs-be-nest/src/modules/project/project.controller.ts`

**Interfaces:**
- Consumes: Client HTTP & SSE requests for chatbot.
- Produces: `POST /:projectId/chatbot/chat/stream`, `GET /:projectId/chatbot/conversations`, `GET /:projectId/chatbot/conversations/:id`, `DELETE /:projectId/chatbot/conversations/:id`.

- [ ] **Step 1: Add chatbot service methods in `project.service.ts`**

Implement `getConversations`, `getConversation`, `deleteConversation`, and `streamChat`.

- [ ] **Step 2: Add chatbot controller endpoints in `project.controller.ts`**

Implement `@Post('/:projectId/chatbot/chat/stream')` with Express `@Res() res: Response` piping SSE stream:
```ts
@Post('/:projectId/chatbot/chat/stream')
@UseGuards(JwtAuthGuard)
async streamChat(
  @CurrentUser() user: IPayloadToken,
  @Param('workspaceId') workspaceId: string,
  @Param('projectId') projectId: string,
  @Body() body: { message: string; processingType?: string; conversationId?: string },
  @Res() res: Response,
) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  await this.projectService.pipeChatStream(workspaceId, user.id, projectId, body, res);
}
```

- [ ] **Step 3: Run build**

Run: `npm run build` (in `socialabs-be-nest`)
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/modules/project/project.service.ts src/modules/project/project.controller.ts
git commit -m "feat: add chatbot SSE stream and conversation proxy endpoints"
```

---

### Task 4: Frontend Chatbot Types, API Client, and Custom Hook

**Files:**
- Create: `socialabs-fe/src/types/chatbot.ts`
- Modify: `socialabs-fe/src/lib/api/project-api.ts`
- Create: `socialabs-fe/src/hooks/use-project-chatbot.ts`

**Interfaces:**
- Consumes: NestJS Gateway Chatbot SSE stream & session endpoints.
- Produces: `useProjectChatbot` React hook providing `{ messages, sendMessage, isStreaming, mode, setMode, conversations, activeConversationId, selectConversation, createNewChat, deleteConversation }`.

- [ ] **Step 1: Create `src/types/chatbot.ts`**

Define `ChatProcessingType`, `ChatMessageSource`, `FallacyAnalysisResult`, `ChatMessageItem`, `ConversationSession`.

- [ ] **Step 2: Add Chatbot API methods in `src/lib/api/project-api.ts`**

Add `getConversations`, `getConversation`, `deleteConversation`, `getChatStreamUrl`.

- [ ] **Step 3: Create `src/hooks/use-project-chatbot.ts`**

Implement `useProjectChatbot` hook that uses `fetch` and `ReadableStream` reader to parse `data: {"token": ...}` events, updating assistant content in real-time.

- [ ] **Step 4: Run linter**

Run: `bun lint` (in `socialabs-fe`)
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/chatbot.ts src/lib/api/project-api.ts src/hooks/use-project-chatbot.ts
git commit -m "feat: add chatbot types, API methods, and useProjectChatbot SSE hook"
```

---

### Task 5: Frontend UI Integration for Mode Selector, History Sidebar, and Real-Time Chat

**Files:**
- Modify: `socialabs-fe/src/components/pages/project/project-chat-page.tsx`
- Modify: `socialabs-fe/src/components/fragments/chatbot/sidebar-chatbot.tsx`
- Modify: `socialabs-fe/src/components/fragments/chatbot/chat-input-bar.tsx`
- Modify: `socialabs-fe/src/components/fragments/chatbot/chat-message-window.tsx`

**Interfaces:**
- Consumes: `useProjectChatbot` hook.
- Produces: Complete real-time streaming chatbot page with mode dropdown & per-project history sidebar.

- [ ] **Step 1: Update `chat-input-bar.tsx` with Mode Selector Dropdown**

Add Mode Selector (`Full Pipeline`, `CRAG RAG Only`, `Fallacy Detector Only`, `Simple Chat`).

- [ ] **Step 2: Update `sidebar-chatbot.tsx` with real project history sessions**

Render `conversations` list, handle session selection and new chat creation.

- [ ] **Step 3: Update `chat-message-window.tsx` with sources badges & fallacy warnings**

Render live typing animation, sources badges, and fallacy analysis warning cards.

- [ ] **Step 4: Connect `project-chat-page.tsx` to `useProjectChatbot` hook**

Replace `MOCK_AI_RESPONSES` with real `useProjectChatbot` data and event handlers.

- [ ] **Step 5: Run linter**

Run: `bun lint` (in `socialabs-fe`)
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/pages/project/project-chat-page.tsx src/components/fragments/chatbot/sidebar-chatbot.tsx src/components/fragments/chatbot/chat-input-bar.tsx src/components/fragments/chatbot/chat-message-window.tsx
git commit -m "feat: integrate real-time SSE streaming chatbot UI, mode selector, and history sidebar"
```
