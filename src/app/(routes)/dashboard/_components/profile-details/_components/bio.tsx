"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserMutation } from "@/lib/redux/features/users/users-api";
import { useAppSelector } from "@/lib/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PeerProps } from "./common";
import { Pencil } from "lucide-react";

const bioSchema = z.object({
  bio: z.string().max(160),
});

export function Bio({ userId, bio }: PeerProps & { bio: string }) {
  const { id } = useAppSelector((store) => store.auth);
  const [update, updateMetadata] = useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio,
    },
  });

  if (id !== userId) {
    return <p>{bio}</p>;
  }

  const onSubmit = async ({ bio }: z.infer<typeof bioSchema>) => {
    try {
      await update({ bio }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-2">
              <Button size={"sm"} type="submit">
                {updateMetadata.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Check />
                )}
                Accept
              </Button>
              <Button size={"sm"} onClick={() => setIsEditing(false)}>
                <X /> Cancel
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex gap-1 items-center flex-wrap">
          <p onDoubleClick={() => setIsEditing(true)}>{bio}</p>
          {bio && (
            <Button variant={"link"} onClick={() => setIsEditing(true)}>
              <Pencil />
              edit bio
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
