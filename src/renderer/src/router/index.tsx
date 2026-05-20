import MainLayout from "@renderer/layouts/mainLayout";
import { Routes } from "@renderer/lib/routes";
import CenterDoctors from "@renderer/pages/centerDoctors";
import HomePage from "@renderer/pages/home";
import SettingsPage from "@renderer/pages/settings";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
]);
export default function AppRouter(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
