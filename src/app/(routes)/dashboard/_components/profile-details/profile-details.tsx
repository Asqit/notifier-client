"use client";
import { useGetUserQuery } from "@/lib/redux/features/users/users-api";
import { Bio } from "./_components/bio";
import { FriendshipWrapper } from "./_components/friendship-wrapper";
import { RelationCounter } from "./_components/relation-counter";
import Image from "next/image";
import { MiscDetails } from "./_components/misc-details";
import clsx from "clsx";
import { UpdateUserModal } from "./_components/update-user-modal";

interface Props {
  userId: number;
}

export function ProfileDetails({ userId }: Props) {
  const { data, isLoading, isError } = useGetUserQuery(userId); // fetch latest update

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || data === undefined) {
    return <div>Error</div>;
  }

  return (
    <div className="border rounded-lg">
      <div
        className={clsx(
          "p-8 rounded-t-lg flex items-center space-x-4 border-b",
        )}
        style={data.color ? { backgroundColor: data.color } : undefined}
      >
        <Image
          src=""
          alt=""
          width={96}
          height={96}
          className={`border-2 rounded-full object-cover`}
          style={data.color ? { backgroundColor: data.color } : undefined}
        />
        <div className="flex-grow">
          <h2 className="text-2xl font-bold">{data.username}</h2>
          <RelationCounter />
        </div>
        <div>
          <FriendshipWrapper userId={data.id} />
        </div>
      </div>
      <div className="p-8 space-y-4">
        <Bio userId={data.id} bio={data.bio} />
        <MiscDetails
          web={data.web}
          location={data.location}
          createdAt={data.created_at}
        />
        <UpdateUserModal
          username={data.username}
          bio={data.bio}
          web={data.web}
          location={data.location}
          color={data.color}
        />
      </div>
    </div>
  );
}
