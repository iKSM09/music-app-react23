import Navigation from "./components/Navigation";
import ThemeProvider from "./context/theme.provider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navigation />
      </div>
    </ThemeProvider>
  );
}

export default App;
