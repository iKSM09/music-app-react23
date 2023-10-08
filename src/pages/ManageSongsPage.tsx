import { ChangeEvent, DragEvent, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import SongEditForm from "@/components/SongEditForm";

import { Upload, Disc3, Pencil, Trash } from "lucide-react";

import ProgressBar from "@/components/ProgressBar";

const ManageSongsPage = () => {
  const [songList, setSongList] = useState<File[]>([]);
  // const [uploads, setUploads] = useState<UploadTypes[]>([]);

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

        <CardContent className="mt-1">
          <Separator className="mb-2" />

          {/* Progess Bars */}
          <div className="w-full my-7">
            {/* File Name */}
            <div className="mb-1 text-sm font-bold">Just another song.mp3</div>
            <div className="flex h-4 overflow-hidden bg-gray-200 rounded">
              {/* Inner Progress Bar */}
              <div
                className="transition-all bg-blue-400 progress-bar"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
          {songList.map((file) => (
            <ProgressBar key={file.name} file={file} />
          ))}
        </CardContent>
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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <p className="text-xl font-bold">Song Title</p>

                <div className="flex gap-4">
                  <Button>
                    <Pencil size={18} />
                  </Button>
                  <Button variant="destructive">
                    <Trash size={18} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <SongEditForm />
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <p className="text-xl font-bold">Song Title</p>

                <div className="flex gap-4">
                  <Button>
                    <Pencil size={18} />
                  </Button>
                  <Button variant="destructive">
                    <Trash size={18} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            {false && (
              <CardContent>
                <SongEditForm />
              </CardContent>
            )}
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <p className="text-xl font-bold">Song Title</p>

                <div className="flex gap-4">
                  <Button>
                    <Pencil size={18} />
                  </Button>
                  <Button variant="destructive">
                    <Trash size={18} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            {false && (
              <CardContent>
                <SongEditForm />
              </CardContent>
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSongsPage;
