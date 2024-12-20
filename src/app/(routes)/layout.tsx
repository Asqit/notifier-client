import type { Metadata } from "next";
import StoreProvider from "@/lib/redux/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poke - nudge your friends",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
