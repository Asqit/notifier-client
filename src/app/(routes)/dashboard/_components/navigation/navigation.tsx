"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { URLs } from "./common";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/65 backdrop-blur-2xl container mx-auto max-w-screen-lg">
      <div className="flex justify-around">
        {URLs.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center p-2 ${
              pathname === item.href ? "text-zinc-800" : "text-zinc-400"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
