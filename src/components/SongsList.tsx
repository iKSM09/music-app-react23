import { useQuery } from "@tanstack/react-query";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import SongsListItem from "./SongsListItem";

import { getAllSongDocs } from "@/utils/firebase/db.songs.firebase";

import { Headphones } from "lucide-react";

const SongsList = () => {
  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getAllSongDocs(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>Songs</p>
          <Headphones />
        </CardTitle>
      </CardHeader>

      {songs?.map((song) => (
        <SongsListItem key={song.id} song={song} />
      ))}
    </Card>
  );
};

export default SongsList;
