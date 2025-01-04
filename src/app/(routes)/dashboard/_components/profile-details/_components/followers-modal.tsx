import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetFollowersQuery } from "@/lib/redux/features/users/users-api";
import { MiniProfile } from "../../mini-profile/mini-profile";

export function FollowersModal() {
  const { data } = useGetFollowersQuery();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Followers</DialogTitle>
        </DialogHeader>
        {data?.map((follower) => (
          <MiniProfile key={follower.id} {...follower} />
        ))}
      </DialogContent>
    </Dialog>
  );
}
