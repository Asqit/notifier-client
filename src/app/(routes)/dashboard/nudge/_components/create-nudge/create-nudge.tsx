"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetFollowingQuery } from "@/lib/redux/features/users/users-api";
import { z } from "zod";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  message: z.string().nonempty(),
  friend: z.string().nonempty(),
});

export function CreateNudge() {
  const { data, isLoading, isError } = useGetFollowingQuery();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed bottom-24 right-4 bg-foreground text-background rounded-full p-2 transition-transform hover:scale-75">
          <Plus size={32} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new nudge 👈</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="friend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Select {...field} disabled={isLoading || isError}>
                      <SelectTrigger>
                        <SelectValue placeholder="Friend" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data && data.length > 0 ? (
                            data?.map((friend) => (
                              <SelectItem
                                key={friend.id}
                                value={String(friend.id)}
                              >
                                {friend.username}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectLabel>No friends found</SelectLabel>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
