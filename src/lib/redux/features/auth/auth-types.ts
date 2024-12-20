export interface User {
  username: string;
  email: string;
  created_at: string;
}

export interface AuthState extends User {
  access_token: string;
  token_type: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
