"use client";

import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  DarkModeRounded,
  LightModeRounded,
  PaletteRounded,
  SettingsRounded,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@renderer/lib/redux/store";
import { setThemeMode } from "@renderer/lib/redux/slices/themeSlice";

const SettingsPage = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootState) => state.themeMode);

  const isDarkMode = mode === "dark";

  const handleToggleTheme = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(setThemeMode(event.target.checked ? "dark" : "light"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        p: 4,
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 6,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(25,118,210,0.12), rgba(156,39,176,0.08))",
            backdropFilter: "blur(12px)",
          }}
        >
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: "primary.main",
                }}
              >
                <SettingsRounded
                  sx={{
                    fontSize: 36,
                  }}
                />
              </Avatar>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  تنظیمات
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  تنظیمات کلی کیوسک برای ویرایش روند نوبت گیری
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 6,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                  }}
                >
                  <PaletteRounded />
                </Avatar>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    تنظیمات ظاهری کیوسک
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    ویرایش روند ظاهری کیوسک
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              {/* Theme Mode */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Stack direction="row">
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Dark Mode
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Switch between light and dark themes.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Chip
                      color={isDarkMode ? "primary" : "default"}
                      icon={
                        isDarkMode ? <DarkModeRounded /> : <LightModeRounded />
                      }
                      label={isDarkMode ? "Dark" : "Light"}
                    />

                    <FormControlLabel
                      label=""
                      control={
                        <Switch
                          checked={isDarkMode}
                          onChange={handleToggleTheme}
                        />
                      }
                    />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default SettingsPage;
