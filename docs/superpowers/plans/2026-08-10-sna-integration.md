# SNA (Community & Influencer) Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate SNA (Community Detection & Influencer/Buzzer Centrality Analysis) from FastAPI AI Service through NestJS Gateway to React Frontend with SSE progress and fallback triggers.

**Architecture:** Extend NestJS `AiBackendClient` to fetch/trigger SNA from AI service. Add `sna-analysis` BullMQ queue & processor chained from emotion analysis. Add proxy endpoints in `project.controller.ts`. Add frontend SNA types, API methods, custom hooks (`useProjectCommunities`, `useProjectInfluencers`), and integrate real API data into `SNANetworkGraph` (`ForceGraph2D`) & `InfluencerRankingTable`.

**Tech Stack:** NestJS 11, TypeScript 5.7, BullMQ, React 19, `react-force-graph-2d`, Tailwind CSS.

## Global Constraints

- Do not add extra dependencies.
- Follow existing NestJS DTO and AI client patterns.
- Follow existing Zustand store and custom hook patterns.
- Ensure 404 responses from AI service are safely converted to empty results.
- Ensure fallback trigger buttons exist on empty/error states in FE.

---

### Task 1: NestJS AI Backend Client Methods for SNA

**Files:**
- Modify: `socialabs-be-nest/src/modules/project/ai-backend.client.ts`
- Test: `socialabs-be-nest/src/modules/project/ai-backend.client.spec.ts`

**Interfaces:**
- Consumes: FastAPI SNA endpoints `/api/sna/community-detection/*` and `/api/sna/buzzer-detection/*`.
- Produces: `getCommunityDetection(projectId: string)`, `getBuzzerDetection(projectId: string)`, `processSNA(data: { project_id, keyword, start_date, end_date })`.

- [ ] **Step 1: Write failing unit test in `ai-backend.client.spec.ts`**

```ts
it('fetches community detection and buzzer detection safely from AI backend', async () => {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        data: {
          total_communities: 2,
          nodes: [{ id: 'u1', name: 'user1', community: 1 }],
          edges: [{ source: 'u1', target: 'u2', weight: 1 }],
        },
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        data: [
          {
            node: 'user1',
            BEC: 0.5,
            EVC: 0.8,
            final_measure: 1.3,
            rank: 1,
          },
        ],
      }),
    });

  const comms = await client.getCommunityDetection('proj-1');
  const buzzers = await client.getBuzzerDetection('proj-1');

  expect(comms).toEqual({
    totalCommunities: 2,
    totalNodes: 1,
    totalEdges: 1,
    nodes: [{ id: 'u1', name: 'user1', community: 1 }],
    edges: [{ source: 'u1', target: 'u2', weight: 1 }],
  });
  expect(buzzers).toEqual([
    {
      node: 'user1',
      BEC: 0.5,
      EVC: 0.8,
      final_measure: 1.3,
      rank: 1,
    },
  ]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ai-backend.client.spec.ts` (in `socialabs-be-nest`)
Expected: FAIL with "client.getCommunityDetection is not a function"

- [ ] **Step 3: Implement SNA client methods in `ai-backend.client.ts`**

Add `getCommunityDetection`, `getBuzzerDetection`, and `processSNA` methods with 404 safe fallback and snake_case to camelCase mapping for community data.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ai-backend.client.spec.ts` (in `socialabs-be-nest`)
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/modules/project/ai-backend.client.ts src/modules/project/ai-backend.client.spec.ts
git commit -m "feat: add SNA client methods to AiBackendClient"
```

---

### Task 2: NestJS SNA BullMQ Queue and Processor

**Files:**
- Create: `socialabs-be-nest/src/queues/sna-analysis.processor.ts`
- Modify: `socialabs-be-nest/src/queues/emotion-analysis.processor.ts`
- Modify: `socialabs-be-nest/src/modules/project/project.module.ts`

**Interfaces:**
- Consumes: Emotion analysis completion event.
- Produces: BullMQ `sna-analysis` queue processor that triggers `processSNA` via `AiBackendClient`.

- [ ] **Step 1: Create `sna-analysis.processor.ts`**

Implement BullMQ worker `@Processor('sna-analysis')` extending `WorkerHost` to receive `{ workspaceId, userId, projectId }` and call `AiBackendClient.processSNA`.

- [ ] **Step 2: Chain SNA queue trigger in `emotion-analysis.processor.ts`**

Inject `@InjectQueue('sna-analysis') private readonly snaQueue: Queue` into `EmotionAnalysisProcessor` and add `await this.snaQueue.add('analyze-sna', job.data)` upon successful emotion analysis completion.

- [ ] **Step 3: Register `sna-analysis` queue & processor in `project.module.ts`**

Register `BullModule.registerQueue({ name: 'sna-analysis' })` and `SnaAnalysisProcessor` in `ProjectModule`.

- [ ] **Step 4: Build NestJS project**

Run: `npm run build` (in `socialabs-be-nest`)
Expected: PASS with 0 build errors.

- [ ] **Step 5: Commit**

```bash
git add src/queues/sna-analysis.processor.ts src/queues/emotion-analysis.processor.ts src/modules/project/project.module.ts
git commit -m "feat: add sna-analysis BullMQ queue and chained processor"
```

---

### Task 3: NestJS Gateway Endpoints for SNA

**Files:**
- Modify: `socialabs-be-nest/src/modules/project/project.service.ts`
- Modify: `socialabs-be-nest/src/modules/project/project.controller.ts`

**Interfaces:**
- Consumes: Client HTTP requests for SNA data and triggers.
- Produces: Controller endpoints `GET /:projectId/sna/communities`, `GET /:projectId/sna/influencers`, `POST /:projectId/sna/process`.

- [ ] **Step 1: Add SNA methods in `project.service.ts`**

Implement `getCommunities(workspaceId, userId, projectId)`, `getInfluencers(workspaceId, userId, projectId)`, and `triggerSnaAnalysis(workspaceId, userId, projectId)`.

- [ ] **Step 2: Add SNA proxy endpoints in `project.controller.ts`**

```ts
@Get('/:projectId/sna/communities')
@UseGuards(JwtAuthGuard)
async getCommunities(
  @CurrentUser() user: IPayloadToken,
  @Param('workspaceId') workspaceId: string,
  @Param('projectId') projectId: string,
) {
  const result = await this.projectService.getCommunities(
    workspaceId,
    user.id,
    projectId,
  );
  return { message: 'Success get communities', status: true, data: result };
}

@Get('/:projectId/sna/influencers')
@UseGuards(JwtAuthGuard)
async getInfluencers(
  @CurrentUser() user: IPayloadToken,
  @Param('workspaceId') workspaceId: string,
  @Param('projectId') projectId: string,
) {
  const result = await this.projectService.getInfluencers(
    workspaceId,
    user.id,
    projectId,
  );
  return { message: 'Success get influencers', status: true, data: result };
}

@Post('/:projectId/sna/process')
@UseGuards(JwtAuthGuard)
async processSna(
  @CurrentUser() user: IPayloadToken,
  @Param('workspaceId') workspaceId: string,
  @Param('projectId') projectId: string,
): Promise<ApiResponse<boolean>> {
  await this.projectService.triggerSnaAnalysis(
    workspaceId,
    user.id,
    projectId,
  );
  return { message: 'Success trigger SNA analysis', status: true, data: true };
}
```

- [ ] **Step 3: Run build and lint**

Run: `npm run build` (in `socialabs-be-nest`)
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/modules/project/project.service.ts src/modules/project/project.controller.ts
git commit -m "feat: add SNA proxy endpoints in ProjectController"
```

---

### Task 4: Frontend SNA Types, API Client, and Custom Hooks

**Files:**
- Modify: `socialabs-fe/src/types/project.ts`
- Modify: `socialabs-fe/src/lib/api/project-api.ts`
- Create: `socialabs-fe/src/hooks/use-project-communities.ts`
- Create: `socialabs-fe/src/hooks/use-project-influencers.ts`

**Interfaces:**
- Consumes: NestJS Gateway SNA endpoints.
- Produces: `useProjectCommunities` and `useProjectInfluencers` hooks.

- [ ] **Step 1: Add SNA types to `src/types/project.ts`**

Add `SNACommunityNode`, `SNACommunityEdge`, `SNACommunityResult`, `InfluencerRole`, `InfluencerBuzzer`, `InfluencerResult`.

- [ ] **Step 2: Add SNA API methods to `src/lib/api/project-api.ts`**

Add `getProjectCommunities`, `getProjectInfluencers`, `processSNA`.

- [ ] **Step 3: Implement custom hooks `use-project-communities.ts` & `use-project-influencers.ts`**

Implement standard SWR/useEffect fetch hooks with loading, error, data, and refetch capabilities.

- [ ] **Step 4: Run linter**

Run: `bun lint` (in `socialabs-fe`)
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/project.ts src/lib/api/project-api.ts src/hooks/use-project-communities.ts src/hooks/use-project-influencers.ts
git commit -m "feat: add SNA types, API methods, and custom React hooks"
```

---

### Task 5: Integration of Real Data into Communities Page & ForceGraph2D

**Files:**
- Modify: `socialabs-fe/src/components/fragments/sna/sna-nework-grap.tsx`
- Modify: `socialabs-fe/src/components/pages/project/project-communities-page.tsx`

**Interfaces:**
- Consumes: `useProjectCommunities` hook.
- Produces: Dynamic 2D network graph and community summary.

- [ ] **Step 1: Update `sna-nework-grap.tsx` to accept real `nodes` and `edges` props**

Replace internal `generateMockGraphData()` with props `data: SNACommunityResult`. Map nodes to include dynamic cluster colors and size based on connection count.

- [ ] **Step 2: Update `project-communities-page.tsx` with real API hook**

Fetch real community data using `useProjectCommunities(workspaceId, projectId)`. Add loading, error, empty states, and a manual "Run Community Analysis" fallback button.

- [ ] **Step 3: Run linter**

Run: `bun lint` (in `socialabs-fe`)
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/fragments/sna/sna-nework-grap.tsx src/components/pages/project/project-communities-page.tsx
git commit -m "feat: connect Communities Page and ForceGraph2D to real SNA API data"
```

---

### Task 6: Integration of Real Data into Influencers Page & Ranking Table

**Files:**
- Modify: `socialabs-fe/src/components/fragments/influencer/influencer-ranking-table.tsx`
- Modify: `socialabs-fe/src/components/pages/project/project-influencer-page.tsx`

**Interfaces:**
- Consumes: `useProjectInfluencers` hook.
- Produces: Real ranked influencer centrality table with role classification.

- [ ] **Step 1: Update `influencer-ranking-table.tsx` to accept real `influencers` array prop**

Replace `mockInfluencerData` with prop `data: InfluencerBuzzer[]`.

- [ ] **Step 2: Update `project-influencer-page.tsx` with real API hook**

Fetch real influencer data using `useProjectInfluencers(workspaceId, projectId)`. Map AI centrality scores to `influenceScore` (0-100) and `role` (Bridge, Amplifier, Originator, Engager). Add loading, error, empty states, and a manual "Run Influencer Analysis" fallback button.

- [ ] **Step 3: Run linter**

Run: `bun lint` (in `socialabs-fe`)
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/fragments/influencer/influencer-ranking-table.tsx src/components/pages/project/project-influencer-page.tsx
git commit -m "feat: connect Influencers Page and Ranking Table to real SNA API data"
```
