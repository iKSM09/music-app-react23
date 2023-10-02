import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root.tsx";
import HomePage from "./pages/HomePage.tsx";
import ManageSongsPage from "./pages/ManageSongsPage.tsx";
import SongPage from "./pages/SongPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import ThemeProvider from "./context/theme.provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // element: <HomePage />,
        Component: HomePage,
      },
      {
        path: "/manage",
        Component: ManageSongsPage,
      },
      {
        path: "/song/:songId",
        Component: SongPage,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </ThemeProvider>
  );
}

export default App;
