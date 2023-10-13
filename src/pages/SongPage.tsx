import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

import {
  addCommentDoc,
  getCommentsDocs,
  getSongDoc,
  updateSongDoc,
} from "@/utils/firebase/db.songs.firebase";
import useCurrentUser from "@/hooks/useCurrentUser";

import { PlayCircle, MessagesSquare } from "lucide-react";

const SongPage = () => {
  const { data: user } = useCurrentUser();
  const { songId } = useParams();
  const queryClient = useQueryClient();

  const [postComment, setPostComment] = useState({
    sid: songId,
    content: "",
    datePosted: "",
    commentor_name: "",
    commentor_id: "",
  });

  const { data: song } = useQuery({
    queryKey: ["song", songId],
    queryFn: () => getSongDoc(songId!),
  });

  const { data: comments } = useQuery({
    queryKey: ["song", songId, "comments"],
    queryFn: () => getCommentsDocs(songId!),
  });

  const [sortedComments, setSortedComments] = useState(comments);
  const [sortBy, setSortBy] = useState("latest");

  const mutation = useMutation({
    mutationFn: () => {
      setPostComment((prev) => ({
        ...prev,
        datePosted: new Date().toString(),
      }));

      return addCommentDoc(postComment);
    },
    onSuccess: () => {
      setPostComment((prev) => ({ ...prev, content: "" }));

      updateSongDoc(songId!, { comment_count: song?.comment_count + 1 });
      queryClient.invalidateQueries({ queryKey: ["song", songId] });
      queryClient.invalidateQueries({ queryKey: ["song", songId, "comments"] });
    },
  });

  useEffect(() => {
    setPostComment((prev) => ({
      ...prev,
      commentor_name: user?.displayName as string,
      commentor_id: user?.uid as string,
    }));
  }, [user]);

  useEffect(() => {
    const getTime = (date: string) => {
      const newDate = new Date(date);
      return newDate != null ? newDate.getTime() : 0;
    };

    const sorted = () =>
      comments?.sort((a, b) => {
        return sortBy == "latest"
          ? getTime(b.datePosted) - getTime(a.datePosted)
          : getTime(a.datePosted) - getTime(b.datePosted);
      });

    setSortedComments(sorted());
  }, [sortBy, comments]);

  return (
    <>
      <div className="flex items-center gap-5 mb-7">
        <PlayCircle size={56} className="mt-2" />
        <h1 className="text-5xl font-bold">{song?.modified_name}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessagesSquare />
              <p>
                {song?.comment_count === 0
                  ? "No comment"
                  : `${song?.comment_count} comments`}
              </p>
            </div>

            <Select
              defaultValue="latest"
              onValueChange={(val) => setSortBy(val)}
            >
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
          <Textarea
            value={postComment.content}
            onChange={(e) =>
              setPostComment((prev) => ({
                ...prev,
                content: e.target.value,
                datePosted: new Date().toString(),
              }))
            }
            placeholder="Your comment here..."
          />
          <Button onClick={() => mutation.mutateAsync()} className="w-fit">
            Submit
          </Button>
        </CardContent>

        {sortedComments &&
          sortedComments.map((comment) => (
            <>
              <Separator />

              <CardContent key={comment.id} className="mt-5">
                <h3 className="text-lg font-bold">{comment.commentor_name}</h3>
                <small>{comment.datePosted}</small>

                <p className="mt-4">{comment.content}</p>
              </CardContent>
            </>
          ))}
      </Card>
    </>
  );
};

export default SongPage;
