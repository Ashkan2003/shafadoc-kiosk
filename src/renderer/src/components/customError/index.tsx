import { Box, Button, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";

interface CustomErrorProps {
  title?: string;
  description?: string;
  showBackBtn?: boolean;
  showRefreshBtn?: boolean;
  onBack?: () => void;
  onRefresh?: () => void;
}

export default function CustomError({
  title = "Something went wrong",
  description = "خطای غیر منتظره ای رخ داد. لطفا با مسول مربوطه هماهنگی لازم را انجام دهید",
  showBackBtn = true,
  showRefreshBtn = true,
  onBack,
  onRefresh,
}: CustomErrorProps) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%",
        minHeight: "100%",
        px: 3,
        py: 6,
        textAlign: "center",
      }}
    >
      <ReportProblemRoundedIcon sx={{ fontSize: 48, color: "error.main" }} />

      <Typography variant="h6" sx={{ color: "error.main", fontWeight: 700 }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: "error.light", maxWidth: 420 }}>
        {description}
      </Typography>

      {(showBackBtn || showRefreshBtn) && (
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mt: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {showBackBtn && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
            >
              برگشت
            </Button>
          )}
          {showRefreshBtn && (
            <Button
              variant="contained"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              تلاش دوباره
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
