import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCurrentUser from "@/hooks/useCurrentUser";
import { addSongDoc } from "@/utils/firebase/db.songs.firebase";
import {
  createUploadTask,
  getDownloadURLForFile,
} from "@/utils/firebase/storage.firebase";

import { Check, X } from "lucide-react";
import PuffLoader from "react-spinners/PuffLoader";

type ProgressBarTypes = {
  file: File;
};

type StatusType = "idle" | "loading" | "success" | "error";

const progressBarColor = {
  idle: "bg-blue-400",
  loading: "bg-blue-400",
  success: "bg-green-400",
  error: "bg-red-400",
};

const textColor = {
  idle: "",
  loading: "",
  success: "text-green-400",
  error: "text-red-400",
};

const ProgressBar = ({ file }: ProgressBarTypes) => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const [song, setSong] = useState({
    uploader: user?.displayName,
    uploader_id: user?.uid,
    name: file.name,
    modified_name: file.name,
    genre: "",
    comment_count: 0,
    like_count: 0,
    url: "",
  });
  const [downloadURL, setDownloadURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<StatusType>("idle");

  const { mutateAsync } = useMutation({
    mutationKey: [file.name],
    mutationFn: async () => {
      return await addSongDoc(song);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["songsByUser"] });
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    retry: true,
  });

  useEffect(() => {
    if (file.type !== "audio/mpeg") return;
    if (!navigator.onLine) {
      setProgress(100);
      setStatus("error");
    }

    const uploadTask = createUploadTask(file);
    setStatus("loading");

    uploadTask.on(
      "state_changed",
      ({ bytesTransferred, totalBytes }) => {
        setProgress((bytesTransferred / totalBytes) * 100);
      },
      (error) => {
        setStatus("error");
        console.error("uploading failed", error);
      },
      async () => {
        const url = (await getDownloadURLForFile(
          uploadTask.snapshot
        )) as string;

        setSong((prev) => ({
          ...prev,
          url,
        }));

        setStatus("success");
        setDownloadURL(url);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    setSong((prev) => ({
      ...prev,
      url: downloadURL,
    }));

    console.log({ song });

    mutateAsync();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadURL]);

  return (
    <div className="w-full my-7">
      {/* File Name */}
      <div
        className={`mb-1 text-sm font-bold flex gap-1 items-center ${textColor[status]}`}
      >
        {status == "error" ? <X size={18} /> : null}
        {status == "success" ? <Check size={18} /> : null}
        {status == "loading" ? (
          <PuffLoader
            color={"#60A5FA"}
            size={16}
            aria-label="Puff Loader"
            data-testid="loader"
          />
        ) : null}
        {song.name}
      </div>
      <div className="flex h-4 overflow-hidden bg-gray-200 rounded">
        {/* Inner Progress Bar */}
        <div
          className={`transition-all bg-blue-400 progress-bar ${progressBarColor[status]}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
