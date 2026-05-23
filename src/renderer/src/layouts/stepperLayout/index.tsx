import type { JSX } from "react";

import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import {
  resetReservation,
  setStep,
} from "@renderer/lib/redux/slices/reservationSlice";
import { Routes } from "@renderer/lib/routes";
import BackBtn from "@renderer/components/backBtn";

interface ReservationStep {
  label: string;
  description: string;
}

const RESERVATION_STEPS: ReservationStep[] = [
  { label: "انتخاب پزشک", description: "پزشک مورد نظر خود را انتخاب کنید" },
  { label: "انتخاب نوبت", description: "زمان مناسب خود را رزرو کنید" },
  {
    label: "مرور اطلاعات",
    description: "پزشک و نوبتی که انتخاب کردید را  مرور کنید",
  },
];

export default function StepperLayout(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentStep = useAppSelector((state) => state.reservation.step);

  // MUI Stepper is 0-indexed; our step state is 1-indexed
  const activeStep = currentStep - 1;

  const isDark = theme.palette.mode === "dark";

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      dispatch(setStep(prevStep));

      if (prevStep === 1) {
        navigate(Routes.CENTER_DOCTORS);
      }
    } else {
      dispatch(resetReservation());
      navigate(Routes.HOME);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        minHeight: "100%",
      }}
    >
      {/* ── Stepper Card ── */}
      <Box
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          backdropFilter: "blur(12px)",
          background: isDark
            ? `linear-gradient(135deg,
                ${alpha(theme.palette.primary.dark, 0.22)},
                ${alpha(theme.palette.background.paper, 0.9)})`
            : `linear-gradient(135deg,
                ${alpha(theme.palette.primary.light, 0.15)},
                ${alpha(theme.palette.background.paper, 1)})`,
          boxShadow: isDark
            ? `0 4px 24px ${alpha(theme.palette.common.black, 0.3)}`
            : `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        {/* Back button row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 3,
            pt: 2.5,
          }}
        >
          <BackBtn label="بازگشت" onClick={handleBack} />
        </Box>

        {/* Stepper */}
        <Box sx={{ px: { xs: 2, md: 6 }, pb: 3, pt: 1.5 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {RESERVATION_STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;

              return (
                <Step key={step.label} completed={isCompleted}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-label": {
                        mt: 1,
                        fontFamily: "IRANSans, sans-serif",
                        fontWeight: isActive ? 700 : 500,
                        fontSize: { xs: "0.78rem", md: "0.9rem" },
                        color: isActive
                          ? "info.main"
                          : isCompleted
                            ? "success.main"
                            : "text.disabled",
                        transition: "color 0.3s ease",
                      },
                      "& .MuiStepLabel-label.Mui-active": {
                        color: "info.main",
                      },
                      "& .MuiStepLabel-label.Mui-completed": {
                        color: "success.main",
                      },
                      "& .MuiStepIcon-root": {
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                        color: "text.disabled",
                        transition: "color 0.3s ease, transform 0.3s ease",
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "info.main",
                        transform: "scale(1.15)",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "success.main",
                      },
                      "& .MuiStepIcon-text": {
                        fontFamily: "IRANSans, sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.25,
                      }}
                    >
                      <span>{step.label}</span>
                      {isActive && (
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            color: "text.secondary",
                            fontFamily: "IRANSans, sans-serif",
                          }}
                        >
                          {step.description}
                        </Typography>
                      )}
                    </Box>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>

      {/* ── Page Content ── */}
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
