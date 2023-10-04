import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { PlayCircle, MessagesSquare } from "lucide-react";

const SongPage = () => {
  return (
    <>
      <div className="flex items-center gap-5 mb-7">
        <PlayCircle size={56} className="mt-2" />
        <h1 className="text-5xl font-bold">Song Title</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessagesSquare />
              <p>Comments</p>
            </div>

            <Select defaultValue="latest">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-5 mt-5">
          <Textarea placeholder="Your comment here..." />
          <Button className="w-fit">Submit</Button>
        </CardContent>

        <Separator />

        <CardContent className="mt-5">
          <h3 className="text-lg font-bold">John Doe</h3>
          <small>5 mins ago</small>

          <p className="mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium der doloremque laudantium.
          </p>
        </CardContent>

        <Separator />

        <CardContent className="mt-5">
          <h3 className="text-lg font-bold">John Doe</h3>
          <small>5 mins ago</small>

          <p className="mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium der doloremque laudantium.
          </p>
        </CardContent>

        <Separator />

        <CardContent className="mt-5">
          <h3 className="text-lg font-bold">John Doe</h3>
          <small>5 mins ago</small>

          <p className="mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium der doloremque laudantium.
          </p>
        </CardContent>

        <Separator />

        <CardContent className="mt-5">
          <h3 className="text-lg font-bold">John Doe</h3>
          <small>5 mins ago</small>

          <p className="mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium der doloremque laudantium.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SongPage;
