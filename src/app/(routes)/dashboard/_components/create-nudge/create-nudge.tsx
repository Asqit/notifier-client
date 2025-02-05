"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetFollowingQuery } from "@/lib/redux/features/users/users-api";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { User } from "@/lib/redux/features/users/users-type";
import { Input } from "@/components/ui/input";
import {
  Smile,
  Heart,
  ThumbsUp,
  Star,
  Loader,
  ChevronsUpDown,
  LoaderCircle,
  Ban,
  Pointer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useCreatedNudgeMutation } from "@/lib/redux/features/nudge/nudges-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import clsx from "clsx";

const NUDGE_TYPES = [
  { icon: Smile, label: "Friendly wave" },
  { icon: Heart, label: "Send love" },
  { icon: ThumbsUp, label: "High five" },
  { icon: Star, label: "You're awesome" },
];

const schema = z.object({
  message: z.string().nonempty(),
  friend: z.string().nonempty(),
});

export function CreateNudge() {
  const { data, isLoading } = useGetFollowingQuery();
  const [createNudge, metadata] = useCreatedNudgeMutation();
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [selectedFriend, setSelectedFriend] = useState<User | undefined>();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "I am thinking about you 🤔",
    },
  });

  const onSubmit = async ({ friend, message }: z.infer<typeof schema>) => {
    try {
      await createNudge({
        recipient_id: Number(friend),
        message,
        type: "text",
      }).unwrap();
      setSelectedFriend(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed bottom-24 right-4 bg-foreground text-background rounded-full p-2 transition-transform hover:scale-75">
          <Pointer size={24} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new nudge <span>👉 😯</span>
          </DialogTitle>
        </DialogHeader>
        {!selectedFriend ? (
          <ul className="space-y-4">
            {metadata.isSuccess && (
              <Alert className="bg-green-400">
                <AlertTitle>Nudge has been sent!</AlertTitle>
                <AlertDescription>
                  Your nudge has been sucessfully sent.
                </AlertDescription>
              </Alert>
            )}

            {isLoading && <LoaderCircle className="animate-spin" />}
            {data && data.length > 0 ? (
              data?.map((user) => (
                <li key={user.id}>
                  <button
                    onClick={() => {
                      setSelectedFriend(user);
                      form.setValue("friend", String(user.id));
                    }}
                    className="w-full flex items-center border rounded-lg p-1 hover:bg-white transition-colors text-left gap-2"
                  >
                    <div className="w-0 p-4 rounded-full bg-zinc-400" />
                    <div>
                      <p className="text-lg font-semibold">{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li className="flex py-8 flex-col items-center justify-center border rounded-lg">
                <Ban />
                <h2>No mutual followers</h2>
              </li>
            )}
            <li className="text-sm text-muted-foreground">
              To send nudges, the people you follow must also follow you back.
            </li>
          </ul>
        ) : (
          <>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-2">
                  {NUDGE_TYPES.map(({ icon: Icon, label }) => (
                    <Card
                      key={label}
                      className={clsx(
                        `p-4 cursor-pointer transition-colors`,
                        selectedCard === label &&
                          "bg-zinc-200 scale-95 transition-all"
                      )}
                      onClick={() => {
                        form.setValue("message", label);
                        setSelectedCard(label);
                      }}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Icon className="w-6 h-6" />
                        <span className="text-sm">{label}</span>
                      </div>
                    </Card>
                  ))}
                </div>

                <Separator />

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant={"ghost"} className="w-full">
                      Custom Message <ChevronsUpDown />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                setSelectedCard("");
                                form.setValue("message", e.currentTarget.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>

                <Button type="submit" disabled={metadata.isLoading}>
                  {metadata.isLoading && <Loader className="animate-spin" />}
                  Create
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
