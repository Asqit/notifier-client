"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginValidationSchema, LoginSchemaType } from "../validation";
import { useLoginMutation } from "@/lib/redux/features/auth/auth-api";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function Login() {
  const [mutation, metadata] = useLoginMutation();
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit = async ({ username, password }: LoginSchemaType) => {
    try {
      const payload = new FormData();
      payload.append("username", username);
      payload.append("password", password);

      await mutation(payload).unwrap();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[380px]"
        >
          {metadata.isSuccess && (
            <Alert className="bg-green-400">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                shortly, you will be redirected!
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input disabled={metadata.isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={metadata.isLoading}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={metadata.isLoading}
          >
            {metadata.isLoading && <LoaderCircle className="animate-spin" />}
            Login
          </Button>

          <div>
            Not a member yet? Create your own account{" "}
            <Link href="/register">here</Link>.
          </div>
        </form>
      </Form>
    </div>
  );
}
