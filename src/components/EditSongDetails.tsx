import { useState } from "react";
import { DocumentData } from "firebase/firestore";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

import SongEditForm from "./SongEditForm";

import { deleteSongDoc } from "@/utils/firebase/db.songs.firebase";
import { deleteFile } from "@/utils/firebase/storage.firebase";

import { Pencil, Trash } from "lucide-react";

type EditSongDetailsType = {
  song: DocumentData;
};

const EditSongDetails = ({ song }: EditSongDetailsType) => {
  const [formOpen, setFormOpen] = useState(false);

  const deleteSong = () => {
    deleteSongDoc(song.id);
    deleteFile(song.name);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-xl font-bold">{song.modified_name}</p>

          <div className="flex gap-4">
            <Button onClick={() => setFormOpen(true)}>
              <Pencil size={18} />
            </Button>
            <Button variant="destructive" onClick={deleteSong}>
              <Trash size={18} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      {formOpen && (
        <CardContent>
          <SongEditForm song={song} closeForm={() => setFormOpen(false)} />
        </CardContent>
      )}
    </Card>
  );
};

export default EditSongDetails;
