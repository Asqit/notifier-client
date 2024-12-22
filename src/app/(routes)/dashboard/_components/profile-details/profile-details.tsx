"use client";
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/lib/redux/features/users/users-api";
import { useRequestFriendshipMutation } from "@/lib/redux/features/users/users-api";

interface Props {
  userId: number;
}

export function ProfileDetails({ userId }: Props) {
  const [requestFriendship] = useRequestFriendshipMutation();
  const { data, isLoading, isError } = useGetUserQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || data === undefined) {
    return <div>Error</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-zinc-400 p-9 w-0 rounded-full" />
        <h2 className="text-xl font-semibold">{data.username}</h2>
        <p>member since {new Date(data.created_at).toLocaleString()}</p>
        <Button onClick={() => requestFriendship(userId)}>
          Request Friendship
        </Button>
      </div>
      <hr />
    </div>
  );
}
