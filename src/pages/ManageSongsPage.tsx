import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import SongEditForm from "@/components/SongEditForm";

import { Upload, Disc3, Pencil, Trash } from "lucide-react";

const ManageSongsPage = () => {
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
          <div className="flex items-center justify-center w-full text-sm border-2 border-dashed rounded-md h-60 hover:bg-muted">
            Drop your files here
          </div>
        </CardContent>

        <Separator />

        <CardContent className="flex items-center justify-between mt-5">
          <Input id="song" type="file" />
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
                <h3 className="text-xl font-bold">Song Title</h3>

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
                <h3 className="text-xl font-bold">Song Title</h3>

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
                <h3 className="text-xl font-bold">Song Title</h3>

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
