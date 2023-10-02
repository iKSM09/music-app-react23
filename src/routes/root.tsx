import { Outlet } from "react-router-dom";

import MusicPlayer from "@/components/MusicPlayer";
import Navigation from "@/components/Navigation";

const Root = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-5 max-w-screen">
        <Navigation />
        <div className="w-[calc(100%-6rem)] mx-12 max-w-3xl mb-28">
          <Outlet />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Root;
