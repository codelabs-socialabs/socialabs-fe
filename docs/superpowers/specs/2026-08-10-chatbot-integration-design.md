# Chatbot (CRAG + Fallacy + SSE Streaming) Integration Design

## Goal

Integrate the AI Chatbot domain (Corrective RAG, Logical Fallacy Detection, and Real-Time SSE Token Streaming) from `socialabs-be-ai` through `socialabs-be-nest` API gateway to `socialabs-fe`. Restrict vector search retrieval strictly to the active project's dataset while enabling relevant web search fallback when project context is insufficient.

## Architecture & Data Flow

```
┌────────────────────────────────┐
│   React Frontend               │
│   - Chatbot Page & Sidebar     │ (UI Mode selector: Full, CRAG, Fallacy, Simple)
│   - SSE Token Stream Listener  │ (Reads chunk/token ReadableStream for real-time typing)
│   - History Sidebar            │ (Lists per-project chat sessions)
└───────────────┬────────────────┘
                │ POST /projects/:id/chatbot/chat/stream
                │ GET  /projects/:id/chatbot/conversations
                │ GET  /projects/:id/chatbot/conversations/:conversationId
                │ DELETE /projects/:id/chatbot/conversations/:conversationId
                ▼
┌────────────────────────────────┐
│   NestJS Gateway               │
│   - SSE Controller Endpoint    │ (Pipes text/event-stream chunks to frontend)
│   - ProjectService & AI Client │ (Proxies requests and manages project ownership)
└───────────────┬────────────────┘
                │ POST /api/chatbot/chat/stream
                │ GET  /api/chatbot/conversations
                │ GET  /api/chatbot/conversations/:id
                │ DELETE /api/chatbot/conversations/:id
                ▼
┌────────────────────────────────┐
│   FastAPI AI Service           │
│   - Vector Search (Project-Id) │ (Restricted to project's documents)
│   - CRAG & Fallacy Detection   │ (FOL extraction + SMT solver for fallacy analysis)
│   - LangChain Token Streaming  │ (Streams tokens via EventSourceResponse / chunk JSON)
└────────────────────────────────┘
```

## SSE Token Streaming Specification

### 1. Event Payload Format
NestJS gateway streams SSE events with the following structure:
```json
event: token
data: {"token": "Berikut ", "done": false}

event: token
data: {"token": "adalah ", "done": false}

event: metadata
data: {"sources": ["Topic Modeling", "Dataset"], "fallacy": {"type": "Ad Hominem", "confidence": 0.85}, "done": true}
```

### 2. Modes Supported
- `full`: Performs CRAG vector retrieval + answer generation + query & answer fallacy analysis.
- `crag`: Performs CRAG vector retrieval + answer generation only.
- `fallacy`: Performs logical fallacy detection and modification suggestions.
- `simple`: Direct LLM response based on prompt context.

## Data Models & Type Contract

```ts
export type ChatProcessingType = 'full' | 'crag' | 'fallacy' | 'simple';

export interface ChatMessageSource {
  title: string;
  url?: string;
  source?: 'project_dataset' | 'web';
}

export interface FallacyAnalysisResult {
  fallacyType: string | null;
  confidence: number;
  explanation?: string;
  suggestedModification?: string;
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  processingType?: ChatProcessingType;
  sources?: ChatMessageSource[];
  fallacy?: FallacyAnalysisResult;
  createdAt: string;
}

export interface ConversationSession {
  id: string;
  projectId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
```

## Backend Gateway Specifications (NestJS)

1. **AiBackendClient (`ai-backend.client.ts`)**:
   - `streamChat(data: { project_id, message, processing_type, conversation_id })` -> Returns ReadableStream response.
   - `getConversations(projectId: string)` -> GET `/api/chatbot/conversations?project_id=${projectId}`
   - `getConversation(conversationId: string)` -> GET `/api/chatbot/conversations/${conversationId}`
   - `deleteConversation(conversationId: string)` -> DELETE `/api/chatbot/conversations/${conversationId}`

2. **Controller Endpoints (`project.controller.ts` & `project.service.ts`)**:
   - `POST /workspaces/:workspaceId/projects/:projectId/chatbot/chat/stream` -> Header `Content-Type: text/event-stream`.
   - `GET /workspaces/:workspaceId/projects/:projectId/chatbot/conversations`
   - `GET /workspaces/:workspaceId/projects/:projectId/chatbot/conversations/:conversationId`
   - `DELETE /workspaces/:workspaceId/projects/:projectId/chatbot/conversations/:conversationId`

## Frontend Specifications (React FE)

1. **API Client & Hook (`use-project-chatbot.ts`)**:
   - Manages active messages list, sending state, active mode selection (`processingType`), active conversation ID, and conversation sessions list.
   - `sendMessage(content: string)` uses `fetch` with `ReadableStream` reader to update assistant message `content` token-by-token in real-time.
   - Appends metadata (sources and fallacy analysis) when stream completes.

2. **UI Integration (`project-chat-page.tsx` & fragments)**:
   - Removes static `MOCK_AI_RESPONSES`.
   - Header/Input bar includes Mode Selector Dropdown (`Full Pipeline`, `CRAG RAG`, `Fallacy Detection`, `Simple Chat`).
   - `SidebarChatbot` fetches and renders active project conversation history, supporting new chat creation and session switching.
   - Chat bubbles display live typing animation during stream, metadata sources badges, and fallacy warning callouts if detected.

## Verification Checklist

- [ ] FastAPI `/chatbot/chat/stream` or streaming endpoint returns readable chunks.
- [ ] NestJS `npm test` passes for AI client & chatbot proxy methods.
- [ ] NestJS `npm run build` succeeds without TS errors.
- [ ] Frontend `bun lint` passes without errors.
- [ ] Chatbot streams tokens token-by-token in real-time in the UI without freezing.
- [ ] Sidebar chatbot displays saved project conversation history correctly.
