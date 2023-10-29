import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Root from "./routes/root.tsx";
import HomePage from "./pages/HomePage.tsx";
import ManageSongsPage from "./pages/ManageSongsPage.tsx";
import SongPage from "./pages/SongPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import ThemeProvider from "./context/theme.provider";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: "/*",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                // element: <HomePage />,
                Component: HomePage,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/manage",
                        Component: ManageSongsPage,
                    },
                ],
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
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
