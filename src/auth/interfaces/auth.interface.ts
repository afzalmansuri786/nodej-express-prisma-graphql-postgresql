export interface UserCreateInput {
  email: string;
  password: string;
  username?: string | null;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface SingupResponse {
  message: string;
  token: string;
}
