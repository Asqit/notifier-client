"use client";

import { Button } from "@/components/ui/button";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "@/lib/redux/features/notification/notification-api";
import { EyeClosed } from "lucide-react";

export function NotificationList() {
  const { data, isLoading, isError } = useGetNotificationsQuery();
  const [markAsRead, _metadata] = useReadNotificationMutation();

  if (isLoading) {
    return <>loading...</>;
  }

  if (isError || !data) {
    return <>error</>;
  }

  return (
    <ul className="space-y-4">
      {data.items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-center p-2 border rounded-lg hover:bg-white transition-colors group"
        >
          <div className="flex-grow">
            <h3>{item.content}</h3>
            <h4>{new Date(item.created_at).toLocaleString()}</h4>
          </div>
          {item.is_open && (
            <Button
              className="hidden group-hover:block"
              size={"sm"}
              onClick={() => markAsRead(item.id)}
            >
              <EyeClosed />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
