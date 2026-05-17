import MainLayout from "@renderer/layouts/mainLayout";
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
        path: "patients",
        element: <SettingsPage />,
      },
    ],
  },
]);
export default function AppRouter(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
