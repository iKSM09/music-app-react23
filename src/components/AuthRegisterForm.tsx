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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { authDialogAtom } from "@/context/atoms";
import { RegisterationSchema } from "./Auth";
import type { RegisterTypes } from "./Auth";
import { register } from "@/utils/firebase/auth.firebase";

const AuthRegisterForm = () => {
  const setAuthDialogOpen = useSetAtom(authDialogAtom);

  const form = useForm<RegisterTypes>({
    mode: "onBlur",
    defaultValues: {
      displayName: "",
      // username: "",
      email: "",
      // age: 0,
      // country: "",
      password: "",
      confirmPassword: "",
      tos: false,
    },
    resolver: zodResolver(RegisterationSchema),
  });

  const onSubmitSuccess = async ({
    displayName,
    email,
    password,
  }: RegisterTypes) => {
    try {
      await register(displayName, email, password);
      form.reset();
      setAuthDialogOpen(false);
    } catch (error) {
      console.error("register submit error", error);
    }
  };

  const onSubmitError = (errors: FieldErrors<RegisterTypes>) => {
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
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Full Name:</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Fullname" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

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
                <Input type="email" placeholder="Email Id" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Confirm Password:</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tos"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Accept terms and conditions</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default AuthRegisterForm;
