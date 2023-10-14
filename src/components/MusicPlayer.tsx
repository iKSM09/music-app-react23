import { Slider } from "@/components/ui/slider";

import { playerStore } from "@/context/player.store";

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
  const [
    currentSong,
    playing,
    repeat,
    seek,
    duration,
    playerProgress,
    toggleAudio,
    toggleRepeat,
    updateSeek,
  ] = playerStore((state) => [
    state.currentSong,
    state.playing,
    state.repeat,
    state.seek,
    state.duration,
    state.playerProgress,
    state.toggleAudio,
    state.toggleRepeat,
    state.updateSeek,
  ]);
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-20 p-0 m-0 border bg-muted text-muted-foreground">
      <div className="w-full h-1 bg-primary">
        <Slider
          value={[playerProgress]}
          onValueChange={(value) => updateSeek(value)}
          max={100}
          step={1}
        />
      </div>
      <div className="flex items-center justify-between h-full px-6 ">
        <div className="flex items-center gap-2">
          <span className="w-12 h-12 rounded-md bg-primary"></span>
          <div className="">
            <h2 className="font-bold text-foreground">
              {currentSong.modified_name ?? "Play Song"}
            </h2>
            <p className="text-sm">{`${seek} / ${duration}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div onClick={toggleRepeat}>{repeat ? <Repeat1 /> : <Repeat />}</div>
          <SkipBack />
          <div
            onClick={toggleAudio}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-background"
          >
            {playing ? (
              <Pause size={28} />
            ) : (
              <div className="w-[32px] flex justify-end">
                <Play size={28} />
              </div>
            )}
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
