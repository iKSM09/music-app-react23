import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  MoreHorizontal,
} from "lucide-react";

const MusicPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-20 p-0 m-0 border bg-muted text-muted-foreground">
      <div className="w-full h-1 bg-primary"></div>
      <div className="flex items-center justify-between h-full px-6 ">
        <div className="flex items-center gap-2">
          <span className="w-12 h-12 rounded-md bg-primary"></span>
          <div className="">
            <h2 className="font-bold text-foreground">Music Title</h2>
            <p className="text-sm">Music Artists</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {true ? <Repeat /> : <Repeat1 />}
          <SkipBack />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background">
            <div className="w-[32px] flex justify-end">
              {true ? <Play size={28} /> : <Pause />}
            </div>
          </div>
          <SkipForward />
          <Shuffle />
          <div className="w-[1px] h-12 bg-background"></div>
          <MoreHorizontal />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
