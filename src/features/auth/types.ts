export interface User {
  id: string;
  email: string;
  fullname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
}

export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
}
