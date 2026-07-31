export type WorkspaceActivityType =
  | 'PROJECT_CREATED'
  | 'ANALYSIS_COMPLETED'
  | 'MEMBER_JOINED'
  | 'DATASET_EXPORTED'
  | 'PROJECT_ARCHIVED';

export interface WorkspaceActivity {
  id: string;
  workspaceId: string;
  type: WorkspaceActivityType;
  actorName: string;
  description: string;
  createdAt: string;
}
