import React from "react";
import { Box, CircularProgress } from "@mui/material";

const FullPageSpinner = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="warning" size={60} thickness={4} />
    </Box>
  );
};

export default FullPageSpinner;
