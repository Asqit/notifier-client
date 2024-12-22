import Link from "next/link";

export function TopBar() {
  return (
    <header className="space-y-2">
      <Link href="/dashboard" className="text-2xl font-bold">
        😙 P0k3
      </Link>
      <hr />
    </header>
  );
}
