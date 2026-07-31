export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  personalWorkspaceId: string | null;
  lastActiveWorkspaceId: string | null;
}

export interface RegisterInput {
  fullname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  user: AuthData;
}

export interface RegisterResponse {
  message: string;
  data: AuthData;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export interface CurrentUserResponse {
  message: string;
  data: AuthUser;
}
