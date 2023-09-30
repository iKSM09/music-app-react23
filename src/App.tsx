import MusicPlayer from "./components/MusicPlayer";
import Navigation from "./components/Navigation";
import SongsList from "./components/SongsList";

import ThemeProvider from "./context/theme.provider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navigation />

        <SongsList />

        <MusicPlayer />
      </div>
    </ThemeProvider>
  );
}

export default App;
