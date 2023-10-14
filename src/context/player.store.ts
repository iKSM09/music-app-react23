import { create } from "zustand";
import { Howl } from "howler";
import { DocumentData } from "firebase/firestore";
import formatTime from "@/lib/formatTime";

type State = {
  currentSong: DocumentData;
  sound: Howl;
  playing: boolean;
  repeat: boolean;
  seek: string | number;
  duration: string;
  playerProgress: number;
};

type Action = {
  newSong: (song: DocumentData) => void;
  toggleAudio: () => void;
  toggleRepeat: () => void;
  progress: () => void;
  updateSeek: (value: number[]) => void;
};

type Store = State & Action;

const initialState: State = {
  currentSong: {},
  sound: {} as Howl,
  playing: false,
  repeat: false,
  seek: "00:00",
  duration: "00:00",
  playerProgress: 0,
};

export const playerStore = create<Store>()((set, get) => ({
  ...initialState,

  newSong: async (song) => {
    if (get().sound instanceof Howl) get().sound.unload();

    set(() => ({
      currentSong: song,
      sound: new Howl({
        src: [song.url],
        html5: true,
      }),
    }));

    if (get().repeat) get().sound.loop();

    get().sound.play();
    set(() => ({ playing: true }));

    get().sound.on("play", () => {
      requestAnimationFrame(get().progress);
    });
  },
  toggleAudio: async () => {
    if (!get().sound.playing) return;

    if (get().sound.playing()) {
      get().sound.pause();
      set(() => ({ playing: false }));
    } else {
      get().sound.play();
      set(() => ({ playing: true }));
    }
  },
  toggleRepeat: () => set(({ repeat }) => ({ repeat: !repeat })),
  progress: () => {
    set(({ sound }) => ({
      seek: formatTime(sound.seek()),
      duration: formatTime(sound.duration()),
      playerProgress: (sound.seek() / sound.duration()) * 100,
    }));

    if (get().repeat) get().sound.loop();
    if (get().sound.playing()) requestAnimationFrame(get().progress);
  },
  updateSeek: (value) => {
    if (!get().sound.playing) return;

    get().sound.seek(get().sound.duration() * (value[0] / 100));
    get().sound.once("seek", get().progress);
  },
}));
