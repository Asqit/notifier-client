"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { registerValidationSchema, RegisterSchemaType } from "../validation";
import { useRegisterMutation } from "@/lib/redux/features/auth/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [mutation, metadata] = useRegisterMutation();
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      password: "",
      username: "",
      email: "",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    try {
      await mutation(values).unwrap();
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={metadata.isLoading}
                    {...field}
                  />
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
                    type="password"
                    disabled={metadata.isLoading}
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
            Create Account
          </Button>
          <div>
            Already a member? Quickly, login <Link href="/login">here</Link>.
          </div>
        </form>
      </Form>
    </div>
  );
}
