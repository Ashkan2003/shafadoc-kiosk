import type { JSX, ReactNode } from "react";

import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

interface Props {
  children: ReactNode;
}

const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default function ThemeProvider({ children }: Props): JSX.Element {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />

      {children}
    </MuiThemeProvider>
  );
}
