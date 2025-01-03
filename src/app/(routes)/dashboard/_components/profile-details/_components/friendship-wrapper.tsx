"use client";
import { Button } from "@/components/ui/button";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/redux/features/users/users-api";
import { useAppSelector } from "@/lib/redux/hooks";
import { Loader, UserRoundMinus, UserRoundPlus } from "lucide-react";
import { PeerProps } from "./common";

export function FriendshipWrapper({ userId }: PeerProps) {
  const [follow, followData] = useFollowUserMutation();
  const [unfollow, unfollowData] = useUnfollowUserMutation();
  const { following, id } = useAppSelector((store) => store.auth);
  const relation = following?.find(
    (relation) => relation.following_id === userId,
  );
  if (userId === id) return;

  if (relation) {
    return (
      <Button size={"sm"} onClick={() => unfollow(userId)}>
        {unfollowData.isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <UserRoundMinus />
        )}
        unfollow
      </Button>
    );
  }

  return (
    <Button size={"sm"} variant={"link"} onClick={() => follow(userId)}>
      {followData.isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <UserRoundPlus />
      )}
      follow
    </Button>
  );
}
