import type { Nudge } from "../nudge/nudges-types";

export interface Relationship {
  id: number;
  follower_id: number;
  following_id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  bio: string;
  web: string;
  location: string;
  color: string;

  followers: Relationship[];
  following: Relationship[];
  nudges_send: Nudge[];
  nudges_received: Nudge[];
}

export interface UpdateUser {
  username?: string;
  bio?: string;
  web?: string;
  location?: string;
  color?: string;
}
