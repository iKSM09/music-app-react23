import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage.tsx";

import ThemeProvider from "./context/theme.provider";
import HomePage from "./pages/HomePage.tsx";
import Root from "./routes/root.tsx";
import ManageSongsPage from "./pages/ManageSongsPage.tsx";

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
