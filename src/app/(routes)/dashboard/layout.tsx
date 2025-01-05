"use client";
import { useEffect, type ReactNode } from "react";
import { AuthWrapper, Navigation, TopBar } from "./_components";
import { useGetMeQuery } from "@/lib/redux/features/auth/auth-api";
import { useRegisterWorker } from "@/app/_hooks/useRegisterWorker";

interface Props {
  children: Readonly<ReactNode>;
}

export default function DashboardLayout({ children }: Props) {
  const [registration] = useRegisterWorker("sw.js");
  const { data } = useGetMeQuery();

  useEffect(() => {
    if (registration) {
      const userId = data?.id;

      if (userId) {
        registration.active?.postMessage({
          type: "SET_USER_ID",
          userId,
        });
      }
    }
  }, [data?.id, registration]);

  return (
    <AuthWrapper>
      <div className="p-2 w-full bg-zinc-100 min-h-screen">
        <div className="container mx-auto max-w-screen-lg space-y-4">
          <TopBar />
          {children}
          <Navigation />
        </div>
      </div>
    </AuthWrapper>
  );
}
