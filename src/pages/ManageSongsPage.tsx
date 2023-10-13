import { ChangeEvent, DragEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import ProgressBar from "@/components/ProgressBar";
import EditSongDetails from "@/components/EditSongDetails";

import useCurrentUser from "@/hooks/useCurrentUser";
import { getUserSongDocs } from "@/utils/firebase/db.songs.firebase";

import { Upload, Disc3 } from "lucide-react";

const ManageSongsPage = () => {
  const user = useCurrentUser();

  const { data: songs } = useQuery({
    queryKey: ["songsByUser"],
    queryFn: () => getUserSongDocs(user?.uid as string),
  });
  const [songList, setSongList] = useState<File[]>([]);
  // const [songsByUser, setSongsByUser] = useState<DocumentData[]>([]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const fileList = e.dataTransfer.files;
    if (fileList.length > 0) setSongList([...fileList]);
  };

  const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files!;
    if (fileList.length > 0) setSongList([...fileList]);
  };

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p>Upload</p>
            <Upload />
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex items-center justify-between mt-5">
          <div
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
            className="flex items-center justify-center w-full text-sm border-2 border-dashed rounded-md h-60 hover:bg-muted"
          >
            Drop your files here
          </div>
        </CardContent>

        <Separator />

        <CardContent className="flex items-center justify-between mt-5">
          <Input
            id="song"
            type="file"
            multiple
            onChange={handleFileEvent}
            accept="audio/mpeg"
          />
        </CardContent>

        {songList.length > 0 && (
          <CardContent className="mt-1">
            <Separator className="mb-2" />

            {songList.map((file) => (
              <ProgressBar key={file.name} file={file} />
            ))}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p>My Songs</p>
            <Disc3 />
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col items-center justify-between gap-5 mt-5">
          {songs &&
            songs.map((song) => (
              <EditSongDetails key={song.name} song={song} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSongsPage;
