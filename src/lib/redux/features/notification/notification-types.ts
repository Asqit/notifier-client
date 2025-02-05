import type { User } from "../users/users-type";

export interface Notification {
  id: number;
  is_open: boolean;
  content: string;
  user_id: number;
  user: User;
  created_at: string;
}
