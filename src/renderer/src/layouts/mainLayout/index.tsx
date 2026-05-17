import type { JSX } from "react";

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "@renderer/components/sidebar";

export default function MainLayout(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
       
      }}
    >
      {/* Background Gradient Blur */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 500,
          height: 500,
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          right: -150,
          width: 450,
          height: 450,
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Watermark Logo */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/images/logo.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "35%",
          opacity: 0.04,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Sidebar */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
