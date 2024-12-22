import type { ReactNode } from "react";
import { AuthWrapper, Navigation, TopBar } from "./_components";

interface Props {
  children: Readonly<ReactNode>;
}

export default function DashboardLayout({ children }: Props) {
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
