"use client";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/lib/redux/features/users/users-api";
import { MiniProfile } from "../../mini-profile/mini-profile";

export function RelationCounter() {
  const { followers, following } = useAppSelector((store) => store.auth);
  const { data: followersData } = useGetFollowersQuery();
  const { data: followingData } = useGetFollowingQuery();

  return (
    <div className="space-x-4 text-sm flex">
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <span className="font-bold">{followers?.length ?? 0}</span>{" "}
            followers
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Followers</DialogTitle>
          </DialogHeader>
          {followersData?.map((follower) => (
            <MiniProfile key={follower.id} {...follower} />
          ))}
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <button>
            <span className="font-bold">{following?.length ?? 0}</span>{" "}
            following
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>People you follow</DialogTitle>
          </DialogHeader>
          {followingData?.map((follow) => (
            <MiniProfile key={follow.id} {...follow} />
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
