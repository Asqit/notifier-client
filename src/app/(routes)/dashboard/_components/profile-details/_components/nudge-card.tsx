import type { Nudge } from "@/lib/redux/features/nudge/nudges-types";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { useGetUserQuery } from "@/lib/redux/features/users/users-api";

interface Props {
  data: Nudge;
  isNudgeSent: boolean;
}

export function NudgeCard({ data, isNudgeSent }: Props) {
  const { message, created_at, recipient_id, sender_id } = data;

  return (
    <Card className="w-full">
      <CardHeader></CardHeader>
      <CardContent>
        <p className="text-lg">{message}</p>
      </CardContent>
      <CardFooter>
        {!isNudgeSent && (
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-1 h-4 w-4" />
            Reply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
