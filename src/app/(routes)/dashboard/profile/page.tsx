"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { ProfileDetails } from "../_components";

export default function ProfilePage() {
  const { id } = useAppSelector((store) => store.auth);

  return (
    <div className="p-8">
      <ProfileDetails userId={id!} />
    </div>
  );
}
