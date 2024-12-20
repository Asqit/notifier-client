import type { ReactNode } from "react";
import { Navigation } from "./_components";

interface Props {
  children: Readonly<ReactNode>;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
