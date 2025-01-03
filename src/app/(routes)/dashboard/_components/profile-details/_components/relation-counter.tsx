"use client";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/redux/hooks";

export function RelationCounter() {
  const { followers, following } = useAppSelector((store) => store.auth);

  return (
    <div className="space-x-4 text-sm flex">
      <p>
        <span className="font-bold">{followers?.length ?? 0}</span> followers
      </p>
      <Separator orientation="vertical" />
      <p>
        <span className="font-bold">{following?.length ?? 0}</span> following
      </p>
    </div>
  );
}
