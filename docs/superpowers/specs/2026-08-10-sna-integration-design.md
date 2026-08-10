# Social Network Analysis (SNA) Integration Design

## Goal

Integrate real Social Network Analysis (Community Detection using Louvain algorithm and Influencer/Buzzer Detection using Betweenness & Eigenvector centrality) from `socialabs-be-ai` through `socialabs-be-nest` API gateway to `socialabs-fe`.

## Architecture & Data Flow

```
┌────────────────────────────────┐
│   React Frontend               │
│   - Communities Page           │ (ForceGraph2D with real nodes/edges)
│   - Influencers Page           │ (Influencer Ranking Table with real scores/roles)
└───────────────┬────────────────┘
                │ GET /projects/:id/sna/communities
                │ GET /projects/:id/sna/influencers
                │ POST /projects/:id/sna/process
                ▼
┌────────────────────────────────┐
│   NestJS Gateway               │
│   - BullMQ Queue & Worker      │ (Chained after Sentiment/Emotion completion)
│   - AiBackendClient            │ (Proxy requests to AI service)
└───────────────┬────────────────┘
                │ GET /api/sna/community-detection/:project_id
                │ GET /api/sna/buzzer-detection/:project_id
                │ POST /api/sna/community-detection
                │ POST /api/sna/buzzer-detection
                ▼
┌────────────────────────────────┐
│   FastAPI AI Service           │
│   - Louvain Community Detection│ (Returns nodes with community IDs and edges)
│   - Centrality Scoring (BEC/EVC│ (Returns ranked influencers with final_measure)
└────────────────────────────────┘
```

## Data Models & Type Contract

### 1. Community Detection Types
```ts
export interface SNACommunityNode {
  id: string;
  name: string;
  community: number;
  val?: number;
  color?: string;
}

export interface SNACommunityEdge {
  source: string;
  target: string;
  weight?: number;
  source_community?: number;
  target_community?: number;
}

export interface SNACommunityResult {
  totalCommunities: number;
  totalNodes: number;
  totalEdges: number;
  nodes: SNACommunityNode[];
  edges: SNACommunityEdge[];
}
```

### 2. Influencer / Buzzer Types
```ts
export type InfluencerRole = 'Originator' | 'Amplifier' | 'Engager' | 'Bridge';

export interface InfluencerBuzzer {
  id: string;
  username: string;
  influenceScore: number; // 0 - 100 derived from final_measure
  role: InfluencerRole;
  betweennessCentrality: number; // BEC
  eigenvectorCentrality: number; // EVC
  finalMeasure: number;
  rank: number;
  tweetUrl?: string;
  followers?: number;
  engagementRate?: number;
  dominantTopic?: string;
}

export interface InfluencerResult {
  total: number;
  influencers: InfluencerBuzzer[];
}
```

## Centrality to Role Mapping Rule

Influencer roles are derived deterministically from centrality metrics:
- `Bridge`: `betweennessCentrality / (eigenvectorCentrality + 1e-6) > 1.5` (high bridging between clusters)
- `Amplifier`: `eigenvectorCentrality / (betweennessCentrality + 1e-6) > 1.5` (highly connected to central nodes)
- `Originator`: `rank <= 3` and not Bridge/Amplifier (top primary sources)
- `Engager`: default fallback for active participant nodes

`influenceScore` is calculated as `Math.min(100, Math.round((finalMeasure / maxFinalMeasure) * 100))`.

## Backend Gateway Specifications (NestJS)

1. **AiBackendClient (`ai-backend.client.ts`)**:
   - `getCommunityDetection(projectId: string)` -> fetches `/api/sna/community-detection/${projectId}`
   - `getBuzzerDetection(projectId: string)` -> fetches `/api/sna/buzzer-detection/${projectId}`
   - `processSNA(projectId, keyword, startDate, endDate)` -> triggers `/api/sna/community-detection` and `/api/sna/buzzer-detection`

2. **BullMQ Worker (`sna-analysis.processor.ts`)**:
   - Queue: `sna-analysis`
   - Job payload: `{ workspaceId, userId, projectId }`
   - Processing logic: Calls `AiBackendClient.processSNA` for the project ID.

3. **Proxy Endpoints (`project.controller.ts` & `project.service.ts`)**:
   - `GET /workspaces/:workspaceId/projects/:projectId/sna/communities`
   - `GET /workspaces/:workspaceId/projects/:projectId/sna/influencers`
   - `POST /workspaces/:workspaceId/projects/:projectId/sna/process`

## Frontend Specifications (React FE)

1. **API Client & Hooks**:
   - `projectApi.getProjectCommunities(workspaceId, projectId)`
   - `projectApi.getProjectInfluencers(workspaceId, projectId)`
   - `projectApi.processSNA(workspaceId, projectId)`
   - `useProjectCommunities(workspaceId, projectId)`
   - `useProjectInfluencers(workspaceId, projectId)`

2. **Communities Page (`project-communities-page.tsx` & `sna-nework-grap.tsx`)**:
   - Replaces `generateMockGraphData()` in `sna-nework-grap.tsx` with real API props (`nodes` and `edges`).
   - Assigns dynamic palette color per `community` index.
   - Includes manual "Run Community Analysis" button for 404/empty states.

3. **Influencers Page (`project-influencer-page.tsx` & `influencer-ranking-table.tsx`)**:
   - Replaces `mockInfluencerData` in `influencer-ranking-table.tsx` with real API props.
   - Computes influence score and role mapping.
   - Includes manual "Run Influencer Analysis" button for 404/empty states.

## Verification Checklist

- [ ] NestJS `npm test` passes for new client/service methods.
- [ ] NestJS `npm run build` succeeds without TS errors.
- [ ] Frontend `bun lint` passes without errors.
- [ ] Communities page renders real ForceGraph2D nodes and edges from MongoDB.
- [ ] Influencers page renders real ranked centrality table from MongoDB.
