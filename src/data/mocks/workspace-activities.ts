import type { WorkspaceActivity } from '@/types/workspace-activity';

export const dummyWorkspaceActivities: WorkspaceActivity[] = [
  {
    id: 'act_001',
    workspaceId: 'ws_socialabs_001',
    type: 'PROJECT_CREATED',
    actorName: 'User Analyst',
    description: 'created MBG Policy Response Sentiment',
    createdAt: '2025-02-20T10:30:00',
  },
  {
    id: 'act_002',
    workspaceId: 'ws_socialabs_001',
    type: 'ANALYSIS_COMPLETED',
    actorName: 'User Analyst',
    description: 'completed MBG Prabowo Trend Monitoring',
    createdAt: '2025-02-20T09:15:00',
  },
  {
    id: 'act_003',
    workspaceId: 'ws_socialabs_001',
    type: 'MEMBER_JOINED',
    actorName: 'Deriel Raditya',
    description: 'joined the workspace',
    createdAt: '2025-02-19T15:45:00',
  },
  {
    id: 'act_004',
    workspaceId: 'ws_socialabs_001',
    type: 'DATASET_EXPORTED',
    actorName: 'User Analyst',
    description: 'exported the MBG Prabowo dataset',
    createdAt: '2025-02-19T13:20:00',
  },
  {
    id: 'act_005',
    workspaceId: 'ws_personal_001',
    type: 'PROJECT_CREATED',
    actorName: 'User Analyst',
    description: 'created Public Transportation Discussion',
    createdAt: '2025-03-01T09:00:00',
  },
];

export const getActivitiesByWorkspaceId = (
  workspaceId: string,
): WorkspaceActivity[] => {
  return dummyWorkspaceActivities
    .filter((activity) => activity.workspaceId === workspaceId)
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    );
};
