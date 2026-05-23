import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setStep } from "@renderer/lib/redux/slices/reservationSlice";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Avatar,
  Chip,
  alpha,
  useTheme,
  Button,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { format } from "date-fns-jalali";

// ─── Small reusable detail row ───────────────────────────────────────────────
interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: alpha(theme.palette.info.main, 0.12),
          color: "info.main",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 0.25 }}
        >
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const ReviewContainer = () => {
  const reservationDetail = useAppSelector((state) => state.reservation);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    dispatch(setStep(3));
  }, [dispatch]);

  const { selectedDoctor, selectedAppointmentDetail } = reservationDetail;

  const { selectedDay, selectedTime, selectedService, selectedAppointment } =
    selectedAppointmentDetail;

  // Format the Jalali date for display
  const formattedDate = selectedDay
    ? (() => {
        try {
          return format(new Date(selectedDay), "EEEE، d MMMM yyyy");
        } catch {
          return selectedDay;
        }
      })()
    : "—";

  const cardGradient = isDark
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.22)}, ${alpha(theme.palette.background.paper, 0.9)})`
    : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)}, ${alpha(theme.palette.background.paper, 1)})`;

  const cardShadow = isDark
    ? `0 4px 24px ${alpha(theme.palette.common.black, 0.3)}`
    : `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}`;

  return (
    <Stack sx={{ gap: 3 }}>
      {/* ── Confirmation banner ── */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: alpha(theme.palette.success.main, 0.4),
          background: isDark
            ? alpha(theme.palette.success.dark, 0.15)
            : alpha(theme.palette.success.light, 0.12),
          backdropFilter: "blur(12px)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <CheckCircleRoundedIcon
              sx={{ color: "success.main", fontSize: 40, flexShrink: 0 }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "success.main" }}
              >
                اطلاعات نوبت انتخابی
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                لطفاً اطلاعات زیر را بررسی کرده و نوبت خود را تأیید کنید.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* ── Doctor info card ── */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: cardGradient,
          boxShadow: cardShadow,
          backdropFilter: "blur(12px)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(theme.palette.info.main, 0.12),
                color: "info.main",
              }}
            >
              <PersonRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              اطلاعات پزشک
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2.5 }}>
            <Avatar
              src={selectedDoctor?.profile_picture || ""}
              alt={selectedDoctor?.full_name}
              sx={{
                width: 72,
                height: 72,
                border: "2px solid",
                borderColor: alpha(theme.palette.info.main, 0.3),
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedDoctor ? `دکتر ${selectedDoctor.full_name}` : "—"}
              </Typography>
              {(selectedDoctor?.speciality?.label ||
                selectedDoctor?.fellowship?.label) && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 0.5 }}
                >
                  {selectedDoctor.speciality?.label ||
                    selectedDoctor.fellowship?.label}
                </Typography>
              )}
              {selectedDoctor?.proficiency?.label && (
                <Chip
                  label={`فوق تخصص: ${selectedDoctor.proficiency.label}`}
                  size="small"
                  sx={{
                    mt: 0.75,
                    bgcolor: alpha(theme.palette.warning.main, 0.12),
                    color: "warning.main",
                    fontWeight: 600,
                    fontSize: "0.72rem",
                  }}
                />
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* ── Appointment details card ── */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: cardGradient,
          boxShadow: cardShadow,
          backdropFilter: "blur(12px)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(theme.palette.info.main, 0.12),
                color: "info.main",
              }}
            >
              <CalendarMonthRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              جزئیات نوبت
            </Typography>
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <DetailRow
            icon={<CalendarMonthRoundedIcon fontSize="small" />}
            label="تاریخ"
            value={formattedDate}
          />

          <Divider sx={{ opacity: 0.5 }} />

          <DetailRow
            icon={<AccessTimeRoundedIcon fontSize="small" />}
            label="ساعت"
            value={selectedTime ?? "—"}
          />

          {selectedService && (
            <>
              <Divider sx={{ opacity: 0.5 }} />

              <DetailRow
                icon={<MedicalServicesRoundedIcon fontSize="small" />}
                label="نوع خدمت"
                value={
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{selectedService.name}</span>
                    {selectedService.price && (
                      <Chip
                        label={`${Number(selectedService.price).toLocaleString("fa-IR")} تومان`}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.success.main, 0.12),
                          color: "success.main",
                          fontWeight: 600,
                          fontSize: "0.72rem",
                        }}
                      />
                    )}
                  </Stack>
                }
              />

              {selectedService.desc && (
                <>
                  <Divider sx={{ opacity: 0.5 }} />
                  <Box sx={{ pt: 1.5, pb: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      توضیحات خدمت
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.8 }}
                    >
                      {selectedService.desc}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Confirm button ── */}
      <Box>
        <Button
          variant="contained"
          size="large"
          color="success"
          fullWidth
          sx={{
            borderRadius: 3,
            py: 1.8,
            fontWeight: 700,
            fontSize: "1.1rem",
            boxShadow: `0 6px 20px ${alpha(theme.palette.success.main, 0.3)}`,
            "&:hover": {
              boxShadow: `0 8px 28px ${alpha(theme.palette.success.main, 0.4)}`,
            },
          }}
        >
          تأیید و ثبت نوبت
        </Button>
      </Box>
    </Stack>
  );
};

export default ReviewContainer;
