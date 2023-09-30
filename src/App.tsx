import MusicPlayer from "./components/MusicPlayer";
import Navigation from "./components/Navigation";
import ThemeProvider from "./context/theme.provider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navigation />

        <MusicPlayer />
      </div>
    </ThemeProvider>
  );
}

export default App;
