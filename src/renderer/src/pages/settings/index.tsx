"use client";

import React from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import {
  ApartmentRounded,
  DarkModeRounded,
  LightModeRounded,
  PaletteRounded,
  SaveRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { KioskSettingsType } from "src/shared/types/common";
const SettingsPage = (): React.JSX.Element => {
  const theme = useTheme();

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const [settings, setSettings] = React.useState<KioskSettingsType>({
    centerId: "",
    themeMode: "light",
  });

  const isDarkMode = settings.themeMode === "dark";

  const handleToggleTheme = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSettings((prev) => ({
      ...prev,
      themeMode: event.target.checked ? "dark" : "light",
    }));
  };

  const handleSaveSettings = async (): Promise<void> => {
    try {
      setIsSaving(true);

      await window.electronAPI.settings.setKioskSettings(settings);
    } catch (error) {
      console.error("Failed to save kiosk settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  React.useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const kioskSettings =
          await window.electronAPI.settings.getKioskSettings();

        if (!mounted) return;

        setSettings({
          centerId: kioskSettings?.centerId ?? "",
          themeMode: kioskSettings?.themeMode ?? "light",
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
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

            background: `linear-gradient(
              135deg,
              ${alpha(theme.palette.primary.main, 0.14)},
              ${alpha(theme.palette.secondary.main, 0.08)}
            )`,

            backdropFilter: "blur(12px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,

                  background: `linear-gradient(
                    135deg,
                    ${theme.palette.primary.main},
                    ${theme.palette.secondary.main}
                  )`,
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
                  تنظیمات کلی کیوسک برای مدیریت ظاهر و مرکز درمانی
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 6,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",

            background: `linear-gradient(
              135deg,
              ${alpha(theme.palette.primary.main, 0.14)},
              ${alpha(theme.palette.secondary.main, 0.08)}
            )`,

            backdropFilter: "blur(12px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              {/* Section Header */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                }}
              >
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
                    تنظیمات ظاهری
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    مدیریت ظاهر و تم نرم افزار
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
                  bgcolor: "background.default",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",

                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      حالت شب
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      تغییر ظاهر برنامه به حالت روشن یا تاریک
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                    }}
                  >
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

        {/* Center Settings */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 6,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",

            background: `linear-gradient(
              135deg,
              ${alpha(theme.palette.primary.main, 0.14)},
              ${alpha(theme.palette.secondary.main, 0.08)}
            )`,

            backdropFilter: "blur(12px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              {/* Section Header */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                  }}
                >
                  <ApartmentRounded />
                </Avatar>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    تنظیمات مرکز درمانی
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    شناسه مرکز درمانی را وارد کنید
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              {/* Center ID */}
              <TextField
                fullWidth
                label="شناسه مرکز"
                placeholder="مثال: 1001"
                value={settings.centerId}
                onChange={(event) => {
                  setSettings((prev) => ({
                    ...prev,
                    centerId: event.target.value,
                  }));
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Global Save Button */}
        <Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveRounded />}
            onClick={() => {
              void handleSaveSettings();
            }}
            disabled={isSaving}
            sx={{
              borderRadius: 3,

              px: 4,

              py: 1.2,

              fontWeight: 700,

              boxShadow: "none",

              background: `linear-gradient(
                135deg,
                ${theme.palette.primary.main},
                ${theme.palette.secondary.main}
              )`,

              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {isSaving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SettingsPage;
