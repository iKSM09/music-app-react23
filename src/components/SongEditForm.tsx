import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const schema = z.object({
  name: z.string(),
  genre: z.string(),
});

export type SongDetailTypes = z.infer<typeof schema>;

const SongEditForm = () => {
  const form = useForm<SongDetailTypes>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      genre: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmitSuccess = async (data: SongDetailTypes) => {
    console.log({ data });
  };

  const onSubmitError = (errors: FieldErrors<SongDetailTypes>) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Title:</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Song Title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Genre:</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Song Genre" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button>Submit</Button>
          <Button variant="secondary">Go Back</Button>
        </div>
      </form>
    </Form>
  );
};

export default SongEditForm;
