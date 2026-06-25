export interface Workspace {
  _id: string;
  name: string;
  description: string;
  userId: string;
  plan: 'FREE' | 'PREMIUM';
  createdAt: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
  plan: 'FREE' | 'PREMIUM';
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
  plan?: 'FREE' | 'PREMIUM';
}

export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
}
