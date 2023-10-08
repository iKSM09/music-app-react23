import { useEffect, useState } from "react";

import PuffLoader from "react-spinners/PuffLoader";
import { Check, X } from "lucide-react";
import {
  createUploadTask,
  getDownloadURLForFile,
} from "@/utils/firebase/storage.firebase";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  addSongDoc,
  getSongDoc,
  setSongDoc,
} from "@/utils/firebase/db.songs.firebase";

type ProgressBarTypes = {
  file: File;
};

type StatusType = "ideal" | "loading" | "success" | "error";

const progressBarColor = {
  ideal: "bg-blue-400",
  loading: "bg-blue-400",
  success: "bg-green-400",
  error: "bg-red-400",
};

const textColor = {
  ideal: "",
  loading: "",
  success: "text-green-400",
  error: "text-red-400",
};

const ProgressBar = ({ file }: ProgressBarTypes) => {
  const user = useCurrentUser();
  const [song, setSong] = useState({
    uploader: user?.displayName,
    uploader_id: user?.uid,
    name: file.name,
    modified_name: "",
    genre: "",
    comment_count: 0,
    like_count: 0,
    url: "",
  });
  // const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<StatusType>("ideal");

  // console.log("progressBar", user?.displayName, user?.email);

  useEffect(() => {
    setSong((prev) => ({
      ...prev,
      uploader: user?.displayName,
      uploader_id: user?.uid,
    }));
  }, [user]);

  useEffect(() => {
    if (file.type !== "audio/mpeg") return;
    if (!navigator.onLine) {
      setProgress(100);
      setStatus("error");
    }

    // console.log("progressBar:useEffect", user?.displayName, user?.email);

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
        const downloadURL = (await getDownloadURLForFile(
          uploadTask.snapshot
        )) as string;

        setSong((prev) => ({
          ...prev,
          modified_name: uploadTask.snapshot.ref.name,
          url: downloadURL,
        }));

        setUrl(downloadURL);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const songRef = await addSongDoc(song);
      const songSnapshot = await getSongDoc(songRef.id);

      // addSong(songSnapshot);
      console.log("songSnapshot", songSnapshot.data());

      setStatus("success");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className="w-full my-7">
      {/* File Name */}
      <div
        className={`mb-1 text-sm font-bold flex gap-1 items-center ${textColor[status]}`}
      >
        {status == "error" ? (
          <X size={18} />
        ) : status == "success" ? (
          <Check size={18} />
        ) : (
          <PuffLoader
            color={"#60A5FA"}
            size={16}
            aria-label="Puff Loader"
            data-testid="loader"
          />
        )}
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
