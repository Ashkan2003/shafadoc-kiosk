import { Box, Button, Typography } from "@mui/material";
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { Routes } from "@renderer/lib/routes";

/**
 * Route-level error UI — used as the `errorElement` in the router config.
 * This renders INSIDE the router, so useNavigate and useRouteError are safe to call.
 */
export default function RouteErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  // React Router gives us structured info when available
  let message = "مشکلی در بارگذاری این صفحه پیش آمد.";
  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        gap: 2,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="error">
        خطایی رخ داد
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" color="info" onClick={() => navigate(0)}>
          دوباره تلاش کن
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate(Routes.HOME)}
        >
          بازگشت به خانه
        </Button>
      </Box>
    </Box>
  );
}
