import React, { Component, ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "@renderer/lib/routes";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundaryComponent extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={() =>
            this.setState({ hasError: false, error: null, errorInfo: null })
          }
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) {
  const navigate = useNavigate();

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
        متاسفیم! مشکلی در بارگذاری صفحه پیش آمد.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" color="info" onClick={onReset}>
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
      {error && (
        <Typography
          sx={{
            color: "error.main",
            pt: "3rem",
            maxWidth: "500px",
            wordBreak: "break-word",
            fontSize: "0.875rem",
          }}
        >
          {error.message}
        </Typography>
      )}
    </Box>
  );
}

export default ErrorBoundaryComponent;
