import type { JSX } from "react";

import { Box, Stack, Typography, Paper, useTheme, alpha } from "@mui/material";

import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

interface MenuItemProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

function HomeMenuItem({
  title,
  description,
  icon,
  onClick,
}: MenuItemProps): JSX.Element {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        position: "relative",
        overflow: "hidden",

        p: {
          xs: 2,
          md: 2.5,
        },

        borderRadius: 5,
        cursor: "pointer",

        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, isDark ? 0.25 : 0.12),

        background: isDark
          ? `
            linear-gradient(
              135deg,
              ${alpha(theme.palette.primary.dark, 0.25)},
              ${alpha(theme.palette.background.paper, 0.9)}
            )
          `
          : `
            linear-gradient(
              135deg,
              ${alpha(theme.palette.primary.light, 0.18)},
              ${alpha(theme.palette.background.paper, 1)}
            )
          `,

        backdropFilter: "blur(12px)",

        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: isDark
            ? `0 10px 30px ${alpha(theme.palette.common.black, 0.35)}`
            : `0 10px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: -80,
          right: -80,
          width: 180,
          height: 180,
          borderRadius: "50%",

          background: alpha(theme.palette.primary.main, isDark ? 0.12 : 0.08),
        },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* Icon */}
        <Box
          sx={{
            width: {
              xs: 58,
              md: 64,
            },

            height: {
              xs: 58,
              md: 64,
            },

            borderRadius: 4,

            background: `linear-gradient(
              135deg,
              ${theme.palette.primary.main},
              ${theme.palette.secondary.main}
            )`,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: "#fff",

            flexShrink: 0,

            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
          }}
        >
          {icon}
        </Box>

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,

              mb: 0.5,

              fontSize: {
                xs: "1.15rem",
                md: "1.5rem",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",

              lineHeight: 1.8,

              fontSize: {
                xs: "0.9rem",
                md: "1rem",
              },
            }}
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function HomePage(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 950,
        }}
      >
        <Stack spacing={2}>
          {/* Header */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,

                mb: 1,

                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
              }}
            >
              خوش آمدید
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",

                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },
              }}
            >
              لطفاً یکی از خدمات زیر را انتخاب کنید.
            </Typography>
          </Box>

          {/* Cards */}
          <HomeMenuItem
            title="درمانگاه"
            description="جهت دریافت نوبت حضوری لمس کنید."
            icon={
              <LocalHospitalRoundedIcon
                sx={{
                  fontSize: 30,
                }}
              />
            }
            onClick={() => {
              console.log("Clinic clicked");
            }}
          />

          <HomeMenuItem
            title="خدمات (سیتی اسکن، رادیولوژی و ...)"
            description="جهت دریافت خدمت لمس کنید."
            icon={
              <MedicalServicesRoundedIcon
                sx={{
                  fontSize: 30,
                }}
              />
            }
            onClick={() => {
              console.log("Services clicked");
            }}
          />

          <HomeMenuItem
            title="دریافت قبض برای نوبت‌های اینترنتی / تلفنی"
            description="جهت دریافت قبض لمس کنید."
            icon={
              <ReceiptLongRoundedIcon
                sx={{
                  fontSize: 30,
                }}
              />
            }
            onClick={() => {
              console.log("Receipt clicked");
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
