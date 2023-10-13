import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

import { CardContent } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";

import useCurrentUser from "@/hooks/useCurrentUser";
import {
  addLikeDoc,
  deleteLikeDoc,
  getUserLikeDoc,
  updateSongDoc,
} from "@/utils/firebase/db.songs.firebase";

import { Heart, MessagesSquare, PauseCircle, PlayCircle } from "lucide-react";

type SongsListItem = {
  song: DocumentData;
};

const SongsListItem = ({ song }: SongsListItem) => {
  const user = useCurrentUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getUserLikeDoc(song.id, user?.uid as string).then((likeStatus) =>
      setLiked(likeStatus)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeSong = async () => {
    if (liked) {
      await updateSongDoc(song.id, { like_count: song.like_count - 1 });
      await deleteLikeDoc(song.id, user?.uid as string);
      setLiked(false);
    } else {
      const data = {
        uid: user?.uid,
        displayName: user?.displayName,
      };

      await updateSongDoc(song.id, { like_count: song.like_count + 1 });
      await addLikeDoc(song.id, data);
      setLiked(true);
    }
  };

  return (
    <>
      <Separator />

      <CardContent
        key={song.id}
        className="flex items-center justify-between mt-5"
      >
        <div className="flex items-start gap-3">
          <div className="my-[3px]">
            {true ? <PlayCircle /> : <PauseCircle />}
          </div>
          <div>
            <Link to={`song/${song.id}`} className="text-lg font-bold">
              {song.modified_name}
            </Link>
            <p>{song.uploader_name}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-1 cursor-pointer">
            <Heart
              onClick={() => handleLikeSong()}
              color={liked ? "#ff5e5e" : "#fff"}
            />
            <p>{song.like_count}</p>
          </div>
          <div className="flex gap-1">
            <MessagesSquare />
            <p>
              {song.comment_count === 0 ? "No Comments" : song.comment_count}
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default SongsListItem;
