import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const MiniSpinner = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <CircularProgress color="warning" size={20} thickness={5} />

      <Typography variant="body2" color="text.secondary">
        در حال بارگذاری...
      </Typography>
    </Box>
  );
};

export default MiniSpinner;
