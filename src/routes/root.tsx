import { Outlet } from "react-router-dom";

import MusicPlayer from "@/components/MusicPlayer";
import Navigation from "@/components/Navigation";

const Root = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <MusicPlayer />
    </>
  );
};

export default Root;
