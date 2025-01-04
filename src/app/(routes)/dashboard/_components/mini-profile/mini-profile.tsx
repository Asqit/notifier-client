import type { User } from "@/lib/redux/features/users/users-type";
import Link from "next/link";

type Props = Partial<User>;

export function MiniProfile(props: Props) {
  return (
    <Link href={`/dashboard/users/${props.id}`}>
      <div className="flex items-center space-x-4 border rounded-lg p-1 hover:bg-white transition-colors">
        <div className="w-0 p-4 rounded-full bg-zinc-400" />
        <div>
          <p className="text-lg font-semibold">{props.username}</p>
          <p>{props.email}</p>
        </div>
      </div>
    </Link>
  );
}
