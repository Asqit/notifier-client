"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: Readonly<ReactNode>;
}

export function AuthWrapper({ children }: Props) {
  const state = useAppSelector((store) => store.auth);
  const router = useRouter();

  useEffect(() => {
    if (!state.id) {
      router.push("/login");
    }
  }, [router, state.id]);

  return children;
}
