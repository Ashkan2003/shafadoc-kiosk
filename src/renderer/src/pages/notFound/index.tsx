import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "@renderer/lib/routes";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        px: 3,
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", sm: "8rem" },
          fontWeight: 700,
          color: "info.main",
          animation: "bounce 1.5s infinite",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 500,
        }}
      >
        صفحه مورد نظر پیدا نشد
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(Routes.HOME)}
          color="info"
        >
          بازگشت به خانه
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate(-1)}
          sx={{ minWidth: 150 }}
        >
          بازگشت به صفحه قبل
        </Button>
      </Box>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
}
