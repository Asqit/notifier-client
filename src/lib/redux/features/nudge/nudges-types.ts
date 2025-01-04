export interface Nudge {
  id: number;
  type: string;
  message: string;
  created_at: string;
  sender_id: number;
  recipient_id: number;
}

export interface CreateNudge {
  type: string;
  message: string;
  recipient_id: number;
}
