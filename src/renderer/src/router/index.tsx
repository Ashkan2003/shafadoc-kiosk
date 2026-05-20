import MainLayout from "@renderer/layouts/mainLayout";
import { Routes } from "@renderer/lib/routes";
import CenterDoctors from "@renderer/pages/centerDoctors";
import HomePage from "@renderer/pages/home";
import SettingsPage from "@renderer/pages/settings";
import NotFoundPage from "@renderer/pages/notFound";
import ErrorBoundary from "@renderer/components/ErrorBoundary";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RouteErrorPage from "@renderer/components/ErrorBoundary/RouteErrorPage";

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: Routes.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: Routes.CENTER_DOCTORS,
        element: <CenterDoctors />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function AppRouter(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
