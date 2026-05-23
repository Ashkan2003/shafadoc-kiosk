import MainLayout from "@renderer/layouts/mainLayout";
import StepperLayout from "@renderer/layouts/stepperLayout";
import { Routes } from "@renderer/lib/routes";
import CenterDoctors from "@renderer/pages/doctorsPage";
import HomePage from "@renderer/pages/home";
import SettingsPage from "@renderer/pages/settings";
import NotFoundPage from "@renderer/pages/notFound";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RouteErrorPage from "@renderer/lib/providers/ErrorBoundary/RouteErrorPage";
import DoctorCalendarPage from "@renderer/pages/doctorCalendarPage";
import ReviewPage from "@renderer/pages/reviewPage";

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

      // ── Reservation flow — wrapped in StepperLayout ──
      {
        element: <StepperLayout />,
        children: [
          {
            path: Routes.CENTER_DOCTORS,
            element: <CenterDoctors />,
          },
          {
            path: `${Routes.DOCTOR_CALENDAR}/:id`,
            element: <DoctorCalendarPage />,
          },
          {
            path: `${Routes.REVIEW}`,
            element: <ReviewPage />,
          },
        ],
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
