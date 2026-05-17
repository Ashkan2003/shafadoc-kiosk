import type { JSX } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";

export default function HomePage(): JSX.Element {
  return (
    <Box>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">Homeboard</Typography>

        <Button variant="contained" sx={{ mt: 2 }}>
          Test Button
        </Button>
      </Paper>
    </Box>
  );
}
