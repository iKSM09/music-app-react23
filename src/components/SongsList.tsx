import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Headphones,
  PlayCircle,
  PauseCircle,
  Heart,
  MessagesSquare,
} from "lucide-react";

const SongsList = () => {
  return (
    <Card className="mx-12 my-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>Songs</p>
          <Headphones />
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex items-center justify-between mt-5">
        <div className="flex items-start gap-3">
          <div className="my-[3px]">
            {true ? <PlayCircle /> : <PauseCircle />}
          </div>
          <div>
            <h3 className="text-lg font-bold">Song Title</h3>
            <p>Uploaded by</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-1">
            <Heart />
            <p>20k</p>
          </div>
          <div className="flex gap-1">
            <MessagesSquare />
            <p>No Comments</p>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardContent className="flex items-center justify-between mt-5">
        <div className="flex items-start gap-3">
          <div className="my-[2px]">
            {true ? <PlayCircle /> : <PauseCircle />}
          </div>
          <div>
            <h3 className="text-lg font-bold">Song Title</h3>
            <p>Uploaded by</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-1">
            <Heart />
            <p>20k</p>
          </div>
          <div className="flex gap-1">
            <MessagesSquare />
            <p>No Comments</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongsList;
