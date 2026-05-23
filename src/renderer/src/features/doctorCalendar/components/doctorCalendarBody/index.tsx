import { format, getDate, isSameDay, parse } from "date-fns-jalali";
import { useCallback, useEffect, useRef } from "react";
import { RootState } from "@renderer/lib/redux/store";
import { CombinedAppointmentsByDateType } from "src/shared/types/common";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setSelectedAppointmentDetail } from "@renderer/lib/redux/slices/reservationSlice";
import { toast } from "sonner";
import { goToSelectedDaySlide } from "../../utils/calendarUi";
import { useCalendar } from "../../hooks/useCalendar";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
interface CalendarBodyProps {
  calendarData: CombinedAppointmentsByDateType[];
  isLoading?: boolean;
  onScrollToTimes: () => void;
}

const CalendarBody = ({ calendarData, onScrollToTimes }: CalendarBodyProps) => {
  const { setCurrMonth, daysInMonth, firstEmptyDate } = useCalendar({
    calendarData,
  });
  const carouselRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const { selectedAppointmentDetail } = useAppSelector(
    (state: RootState) => state.reservation,
  );

  const getScheduleForDay = useCallback(
    (day: Date): CombinedAppointmentsByDateType | null => {
      return (
        calendarData?.find((schedule) =>
          isSameDay(new Date(schedule.date), day),
        ) ?? null
      );
    },
    [calendarData],
  );
  const handleSelect = useCallback(
    (day: Date) => {
      const selectedSchedule = getScheduleForDay(day);
      if (selectedSchedule) {
        dispatch(
          setSelectedAppointmentDetail({
            selectedDay: day.toISOString(),
            selectedDayTimes: selectedSchedule.combinedTimeStatus,

            selectedService: null,
            selectedTime: null,
          }),
        );
      }
    },
    [getScheduleForDay, dispatch],
  );

  // this is for auto scrolling to the day that the users selected // this helps when the user selected a day and then going back to calendar-tab and see its selected day
  useEffect(() => {
    if (selectedAppointmentDetail.selectedDay) {
      setCurrMonth(
        format(new Date(selectedAppointmentDetail.selectedDay), "MMMM-yyyy"),
      );
    }
  }, [selectedAppointmentDetail.selectedDay, setCurrMonth]);
  // this is for auto selection of the first empty date in the initial page rendering
  useEffect(() => {
    if (!selectedAppointmentDetail.selectedDay) {
      handleSelect(firstEmptyDate);
    }
  }, [firstEmptyDate, handleSelect, selectedAppointmentDetail.selectedDay]);
  // this is for auto scroll carousel to the first empty date in the page initial rendering
  useEffect(() => {
    const gregorianDate = new Date(selectedAppointmentDetail.selectedDay!);
    goToSelectedDaySlide(gregorianDate, carouselRef, daysInMonth);
  }, [daysInMonth, firstEmptyDate, selectedAppointmentDetail.selectedDay]);

  const goToFirstemptyDaySide = () => {
    handleSelect(firstEmptyDate);
    if (selectedAppointmentDetail.selectedDay) {
      setCurrMonth(
        format(new Date(selectedAppointmentDetail.selectedDay), "MMMM-yyyy"),
      );
    }
  };

  return (
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
          <ArrowForwardIosRoundedIcon />
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
          {daysInMonth.map((day) => {
            const selectedSchedule = getScheduleForDay(day);
            const isSelected =
              selectedAppointmentDetail.selectedDay &&
              getDate(selectedAppointmentDetail.selectedDay) === getDate(day);
            const emptyCount =
              selectedSchedule?.totalReservationStatus?.remaining_capacity || 0;
            const isAvailable = !!selectedSchedule;
            const isFullyBooked =
              selectedSchedule?.totalReservationStatus.remaining_capacity === 0;

            const isActive = !isFullyBooked && isAvailable;
            return (
              <Box
                key={day.toISOString()}
                onClick={() => {
                  if (isActive && emptyCount > 0) {
                    onScrollToTimes();
                    handleSelect(day);
                  } else {
                    toast.error("این روز در دسترس نیست");
                  }
                }}
                sx={{
                  minWidth: 150,
                  px: 2,
                  py: 2,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: isSelected ? "warning.light" : "info.main",
                  bgcolor: isSelected ? "info.light" : "background.paper",

                  cursor: isActive ? "pointer" : "auto",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: isSelected
                      ? "info.contrastText"
                      : isActive
                        ? "text.primary"
                        : "error.main",
                  }}
                >
                  {format(day, "EEEE")}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    fontSize: 34,
                    color: isSelected
                      ? "info.contrastText"
                      : isActive
                        ? "text.primary"
                        : "error.main",
                  }}
                >
                  {getDate(day)}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: isSelected
                      ? "info.contrastText"
                      : isActive
                        ? "text.primary"
                        : "error.main",
                    fontSize: 20,
                  }}
                >
                  {isActive ? emptyCount + " " + `نوبت خالی` : `موجود نیست`}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        <IconButton>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      </Stack>

      <Stack sx={{ alignItems: "center", mt: 3 }}>
        <Button
          variant="outlined"
          color="info"
          sx={{ px: 4, py: 1, borderRadius: 2, fontSize: 30 }}
          onClick={goToFirstemptyDaySide}
        >
          اولین نوبت خالی
        </Button>
      </Stack>
    </Box>
  );
};

export { CalendarBody };
