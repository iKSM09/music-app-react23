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
import { DocumentData } from "firebase/firestore";
import { updateSongDoc } from "@/utils/firebase/db.songs.firebase";

const schema = z.object({
  modified_name: z.string(),
  genre: z.string(),
});

export type SongDetailTypes = z.infer<typeof schema>;

type SongEditFormTypes = {
  song: DocumentData;
  closeForm: () => void;
};

const SongEditForm = ({ song, closeForm }: SongEditFormTypes) => {
  console.log(song);

  const form = useForm<SongDetailTypes>({
    mode: "onBlur",
    defaultValues: {
      modified_name: "",
      genre: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmitSuccess = async (data: SongDetailTypes) => {
    updateSongDoc(song.id, data);
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
          name="modified_name"
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
          <Button variant="secondary" onClick={closeForm}>
            Go Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SongEditForm;
