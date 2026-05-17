import type { JSX } from "react";

import { Box, Stack, Typography, Paper } from "@mui/material";

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
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 4,
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid #ECEFF1",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <Stack
        spacing={2}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            backgroundColor: "#B388FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontSize: {
                xs: "1.5rem",
                md: "2.3rem",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "#aeb1b7",
              fontSize: {
                xs: "1rem",
                md: "1.4rem",
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
        p: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1500,
          borderRadius: 4,
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Stack spacing={3}>
          <HomeMenuItem
            title="درمانگاه"
            description="جهت دریافت نوبت حضوری لمس کنید."
            icon={<LocalHospitalRoundedIcon fontSize="large" />}
            onClick={() => {
              console.log("Clinic clicked");
            }}
          />

          <HomeMenuItem
            title="خدمات (سیتی اسکن، رادیولوژی و ...)"
            description="جهت دریافت خدمت لمس کنید."
            icon={<MedicalServicesRoundedIcon fontSize="large" />}
            onClick={() => {
              console.log("Services clicked");
            }}
          />

          <HomeMenuItem
            title="دریافت قبض برای نوبت‌های اینترنتی / تلفنی"
            description="جهت دریافت نوبت اینترنتی لمس کنید."
            icon={<ReceiptLongRoundedIcon fontSize="large" />}
            onClick={() => {
              console.log("Receipt clicked");
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
