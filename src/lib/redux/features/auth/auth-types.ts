import { User } from "../users/users-type";

export interface AuthState extends User {
  access_token: string;
  token_type: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
