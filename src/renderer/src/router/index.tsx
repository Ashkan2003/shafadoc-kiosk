import MainLayout from "@renderer/layouts/mainLayout";
import DashboardPage from "@renderer/pages/dashboard";
import PatientsPage from "@renderer/pages/patients";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
    ],
  },
]);
export default function AppRouter(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
