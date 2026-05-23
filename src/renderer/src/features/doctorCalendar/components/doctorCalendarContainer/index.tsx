import CustomError from "@renderer/components/customError";
import FullPageSpinner from "@renderer/components/fullPageSpinner";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setStep } from "@renderer/lib/redux/slices/reservationSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCenterDoctorAppointmentQuery } from "../../service/query";
import {
  extractCalendarDays,
  getFirstAvailableSlot,
  getMonthLabel,
  normalizeTimeLabel,
  toPersianNumber,
} from "../../utils/calendarUi";

const DoctorCalendarContainer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);
  const { data, isLoading, error } = useCenterDoctorAppointmentQuery({
    doctorId: id,
    centerId: settings?.centerId,
  });

  const days = useMemo(() => extractCalendarDays(data), [data]);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  // Always at step 2 when this page mounts
  useEffect(() => {
    dispatch(setStep(2));
  }, [dispatch]);

  const selectedDay =
    days.find((day) => day.id === selectedDayId) ??
    days.find((day) => day.availableSlots.length > 0) ??
    days[0];

  const firstFreeSlot = selectedDay ? getFirstAvailableSlot(selectedDay) : null;

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error || !settings?.centerId) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }

  if (days.length === 0) {
    return <CustomError title="زمانی برای این پزشک پیدا نشد" />;
  }

  return (
    <Card
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
      <Stack sx={{ p: { xs: 2, md: 3 }, gap: 2.5 }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="warning"
            startIcon={<ArrowForwardIcon />}
            sx={{ fontSize: 24 }}
          >
            ماه قبل
          </Button>
          <Typography sx={{ fontWeight: 700, fontSize: 32 }}>
            {getMonthLabel(days[0].date)}
          </Typography>
          <Button
            color="warning"
            endIcon={<ArrowBackIcon />}
            sx={{ fontSize: 24 }}
          >
            ماه بعد
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          // bgcolor: "background.default",
          // backdropFilter: "blur(1px)",
          px: { xs: 1.5, md: 2 },
          py: 3,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              overflowX: "auto",
              flex: 1,
              pb: 0.5,
            }}
          >
            {days.map((day) => {
              const isSelected = selectedDay?.id === day.id;
              const isClosed = day.availableSlots.length === 0;

              return (
                <Card
                  key={day.id}
                  onClick={() => setSelectedDayId(day.id)}
                  sx={{
                    minWidth: 150,
                    px: 2,
                    py: 2,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: isSelected ? "warning.light" : "info.main",
                    bgcolor: isSelected ? "#012ef484" : "background.paper",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: isClosed ? "error.light" : "text.primary",
                    }}
                  >
                    {day.weekdayName}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                      fontSize: 34,
                      color: isClosed ? "error.light" : "background",
                    }}
                  >
                    {toPersianNumber(day.dayOfMonth)}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      color: isClosed ? "error.light" : "text.secondary",
                      fontSize: 20,
                    }}
                  >
                    {isClosed
                      ? "روز غیر کاری"
                      : `${toPersianNumber(day.availableSlots.length)} نوبت خالی`}
                  </Typography>
                </Card>
              );
            })}
          </Stack>

          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Stack>

        <Stack sx={{ alignItems: "center", mt: 3 }}>
          <Button
            variant="outlined"
            color="info"
            sx={{ px: 4, py: 1, borderRadius: 2, fontSize: 30 }}
          >
            {firstFreeSlot
              ? `اولین نوبت خالی: ${normalizeTimeLabel(firstFreeSlot)}`
              : "اولین نوبت خالی"}
          </Button>
        </Stack>
      </Box>

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1.5,
          p: 2.5,
          justifyContent: "center",
        }}
      >
        {selectedDay.availableSlots.map((time) => (
          <Chip
            key={time}
            label={normalizeTimeLabel(time)}
            sx={{
              minWidth: 110,
              py: 2.5,
              fontSize: 28,
              borderRadius: 999,
              border: "1px solid #00C45A",
              color: "#00B050",
              bgcolor: "transparent",
            }}
          />
        ))}
      </Stack>
    </Card>
  );
};

export default DoctorCalendarContainer;
