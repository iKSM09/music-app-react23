import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import { authDialogAtom } from "@/context/atoms";
import { LoginSchema } from "./Auth";
import type { LoginTypes } from "./Auth";
import { login } from "@/utils/firebase/auth.firebase";

const AuthLoginForm = () => {
  const setAuthDialogOpen = useSetAtom(authDialogAtom);

  const form = useForm<LoginTypes>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmitSuccess = async ({ email, password }: LoginTypes) => {
    try {
      await login(email, password);
      form.reset();
      setAuthDialogOpen(false);
    } catch (error) {
      console.error("login submit error", error);
    }
  };

  const onSubmitError = (errors: FieldErrors<LoginTypes>) => {
    console.error({ errors });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitSuccess, onSubmitError)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Email:</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Email Id" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Password:</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default AuthLoginForm;
