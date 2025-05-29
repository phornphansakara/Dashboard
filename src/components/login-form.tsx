"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { IconPassword } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { authUser } from "@/constants/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

// type LoginRequest = {
//   username: string;
//   password: string;
// }

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 chars",
    })
    .max(50, {
      message: "Username must be 50 max chars",
    }),
  password: z.string().nonempty({
    message: "Password is required",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    // register,
    handleSubmit,
    // formState: { errors },
    watch,
  } = form;

  const username = watch("username");

  const [authMessage, setAuthMessage] = useState<string>();

  // function login(){
  //   //Login logic
  //   //router.replace("/dashboard")
  //   router.push("/dashboard")
  // }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { username, password } = authUser;
    
    if (data.username === username && data.password === password) {
      // Login successful, redirect to dashboard
      router.push("/dashboard");
    }else {
      setAuthMessage("Invalid username or password");
      // console.log("Invalid credentials", authMessage);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome {username}</CardTitle>
          <p className="text-red-500">{authMessage}</p>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    Login with Google
                  </Button> */}
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
