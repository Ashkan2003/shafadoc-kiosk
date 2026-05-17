import type { JSX } from "react";

import { Box, alpha, useTheme } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "@renderer/components/sidebar";

import logoImage from "@renderer/assets/imgs/logo.svg";

export default function MainLayout(): JSX.Element {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        background: isDark
          ? `
            radial-gradient(
              circle at top left,
              ${alpha(theme.palette.primary.dark, 0.22)},
              transparent 28%
            ),
            radial-gradient(
              circle at bottom right,
              ${alpha(theme.palette.secondary.dark, 0.18)},
              transparent 30%
            ),
            ${theme.palette.background.default}
          `
          : `
            radial-gradient(
              circle at top left,
              ${alpha(theme.palette.primary.light, 0.18)},
              transparent 28%
            ),
            radial-gradient(
              circle at bottom right,
              ${alpha(theme.palette.secondary.light, 0.14)},
              transparent 30%
            ),
            ${theme.palette.grey[50]}
          `,
      }}
    >
      {/* Top Gradient Glow */}
      <Box
        sx={{
          position: "absolute",

          top: -220,
          left: -220,

          width: 520,
          height: 520,

          borderRadius: "50%",

          background: isDark
            ? alpha(theme.palette.primary.main, 0.18)
            : alpha(theme.palette.primary.light, 0.25),

          filter: "blur(90px)",

          zIndex: 0,
        }}
      />

      {/* Bottom Gradient Glow */}
      <Box
        sx={{
          position: "absolute",

          bottom: -180,
          right: -180,

          width: 480,
          height: 480,

          borderRadius: "50%",

          background: isDark
            ? alpha(theme.palette.secondary.main, 0.15)
            : alpha(theme.palette.secondary.light, 0.22),

          filter: "blur(90px)",

          zIndex: 0,
        }}
      />

      {/* Center Accent Glow */}
      <Box
        sx={{
          position: "absolute",

          top: "40%",
          left: "50%",

          transform: "translate(-50%, -50%)",

          width: 320,
          height: 320,

          borderRadius: "50%",

          background: alpha(theme.palette.primary.main, isDark ? 0.08 : 0.06),

          filter: "blur(120px)",

          zIndex: 0,
        }}
      />

      {/* Watermark Logo */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backgroundImage: `url(${logoImage})`,

          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",

          backgroundSize: {
            xs: "70%",
            md: "35%",
          },

          opacity: isDark ? 0.3 : 0.1,

          zIndex: 0,

          pointerEvents: "none",

          userSelect: "none",
        }}
      />

      {/* Sidebar */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,

          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
