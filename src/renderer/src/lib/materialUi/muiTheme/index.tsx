import { useMemo, type JSX, type ReactNode } from "react";
import {
  createTheme,
  PaletteOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import { useKioskSettings } from "@renderer/hooks/useKioskSettings";

interface Props {
  children: ReactNode;
}

const lightPalette: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#FFFFFF",
    contrastText: "#80808F",
  },

  secondary: {
    main: "#9C27B0",
  },

  info: {
    main: "#6933d5",
    light: "#7E57C2",
    dark: "#4527A0",
    contrastText: "#FFFFFF",
  },

  text: {
    primary: "#4B5563",
    secondary: "#6B7280",
  },

  warning: {
    main: "#DB9733",
  },

  background: {
    default: "#F3F6F9",
    paper: "#FFFFFF",
  },

  divider: "#E5E7EB",
};

const darkPalette: PaletteOptions = {
  mode: "dark",

  primary: {
    main: "#405056",
    contrastText: "#FFFFFF",
  },

  secondary: {
    main: "#82B1FF",
  },

  info: {
    main: "#7C4DFF",
  },

  background: {
    default: "#0B1420",
    paper: "#1E293B",
  },

  text: {
    primary: "#F3F6F9",
    secondary: "#CBD5E1",
  },

  error: {
    main: "#FF6B6B",
  },

  warning: {
    main: "#FFB74D",
  },

  success: {
    main: "#66BB6A",
  },

  divider: "#163047",
};

function createAppTheme(mode: "dark" | "light") {
  const baseTheme = createTheme({
    direction: "rtl",

    typography: {
      fontFamily: "IRANSans, sans-serif",
    },

    palette: mode === "dark" ? darkPalette : lightPalette,

    shape: {
      borderRadius: 12,
    },
  });

  return createTheme(baseTheme, {
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: baseTheme.palette.info.main,
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: baseTheme.palette.info.dark,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: baseTheme.palette.info.main,
              borderWidth: 2,
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: baseTheme.palette.info.main,
            },
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: baseTheme.palette.divider,
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
          },

          switchBase: {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",

            "&.Mui-checked": {
              transform: "translateX(16px)",

              color: "#fff",

              "& + .MuiSwitch-track": {
                backgroundColor: baseTheme.palette.info.main,

                opacity: 1,
                border: 0,
              },
            },
          },

          thumb: {
            width: 22,
            height: 22,
          },

          track: {
            borderRadius: 13,
          },
        },
      },
    },
  });
}

export default function ThemeProvider({ children }: Props) {
  const settings = useKioskSettings();

  const mode = settings?.themeMode ?? "light";
  console.log(mode, "wwwwwwwwwwwwwwwwwww");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
