"use client";
import { Input } from "@/components/ui/input";
import { useLazySearchUserQuery } from "@/lib/redux/features/users/users-api";
import { useCallback, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [search, metadata] = useLazySearchUserQuery();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = useCallback(async () => {
    try {
      await search(searchValue);
    } catch (error) {
      console.log(error);
    }
  }, [search, searchValue]);

  useEffect(() => {
    if (searchValue.length > 0) {
      handleSearch();
    }
  }, [handleSearch, searchValue]);

  return (
    <section className="p-8 container mx-auto max-w-screen-lg space-y-4">
      <h1 className="text-2xl font-bold">Search</h1>
      <div className="space-y-4">
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ul className="space-y-4">
          {metadata.isLoading && <LoaderCircle className="animate-spin" />}
          {metadata.data?.map((user) => (
            <li key={user.id}>
              <Link
                href={`/dashboard/users/${user.id}`}
                className="flex items-center space-x-4 border rounded-lg p-1 hover:bg-white transition-colors"
              >
                <div className="w-0 p-4 rounded-full bg-zinc-400" />
                <div>
                  <p className="text-lg font-semibold">{user.username}</p>
                  <p>{user.email}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
