"use client";
import { useGetUserQuery } from "@/lib/redux/features/users/users-api";
import { Bio } from "./_components/bio";
import { FriendshipWrapper } from "./_components/friendship-wrapper";
import { RelationCounter } from "./_components/relation-counter";
import { MiscDetails } from "./_components/misc-details";
import { UpdateUserModal } from "./_components/update-user-modal";
import {
  useGetReceivedNudgesQuery,
  useGetSentNudgesQuery,
} from "@/lib/redux/features/nudge/nudges-api";
import { useAppSelector } from "@/lib/redux/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import Image from "next/image";
import clsx from "clsx";
import { NudgeCard } from "./_components/nudge-card";

interface Props {
  userId: number;
}

export function ProfileDetails({ userId }: Props) {
  const { id } = useAppSelector((store) => store.auth);
  const { data, isLoading, isError } = useGetUserQuery(userId); // fetch latest update
  const { data: sentNudges } = useGetSentNudgesQuery(undefined, {
    skip: userId !== id,
  });

  const { data: receivedNudges } = useGetReceivedNudgesQuery(undefined, {
    skip: userId !== id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || data === undefined) {
    return <div>Error</div>;
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <div
          style={data.color ? { backgroundColor: data.color } : undefined}
          className={clsx(
            "p-8 rounded-t-lg flex items-center space-x-4 border-b",
          )}
        >
          {/*
          <Image
            src=""
            alt=""
            width={96}
            height={96}
            className={`border-2 rounded-full object-cover`}
            style={data.color ? { backgroundColor: data.color } : undefined}
          />
          */}
          <div
            className={`border-2 rounded-full object-cover w-[96px] aspect-square`}
            style={data.color ? { backgroundColor: data.color } : undefined}
          />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">{data.username}</h2>
            <RelationCounter />
          </div>
          <div className="flex items-center gap-1">
            <FriendshipWrapper userId={data.id} />
            <UpdateUserModal
              username={data.username}
              bio={data.bio}
              web={data.web}
              location={data.location}
              color={data.color}
            />
          </div>
        </div>
        <div className="p-8 space-y-4">
          <Bio userId={data.id} bio={data.bio} />
          <MiscDetails
            web={data.web}
            location={data.location}
            createdAt={data.created_at}
          />
          {userId === id && (
            <Tabs defaultValue="sent" className="flex-grow">
              <TabsList>
                <TabsTrigger value="sent">Sent Nudges</TabsTrigger>
                <TabsTrigger value="received">Received Nudges</TabsTrigger>
              </TabsList>
              <TabsContent value="sent" className="space-y-2">
                {sentNudges?.map((nudge) => (
                  <NudgeCard key={nudge.id} isNudgeSent={true} data={nudge} />
                ))}
              </TabsContent>
              <TabsContent value="received" className="space-y-2">
                {receivedNudges?.map((nudge) => (
                  <NudgeCard key={nudge.id} isNudgeSent={false} data={nudge} />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
