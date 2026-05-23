import { format, getDate, isSameDay, parse } from "date-fns-jalali";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setSelectedAppointmentDetail } from "@renderer/lib/redux/slices/reservationSlice";
import { toast } from "sonner";
import { goToSelectedDaySlide } from "../../utils/calendarUi";
interface CalendarBodyProps {
  daysInMonth: Date[];
  isLoading?: boolean;
  defaultDate: Date;
  onScrollToTimes: () => void;
  setCurrMonth: Dispatch<SetStateAction<string>>;
}

const CalendarBody = ({
  daysInMonth,
  defaultDate,
  onScrollToTimes,
  setCurrMonth,
}: CalendarBodyProps) => {
  const carouselRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const { calendarData, selectedAppointmentDetail } = useAppSelector(
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
      handleSelect(defaultDate);
    }
  }, [defaultDate, handleSelect, selectedAppointmentDetail.selectedDay]);
  // this is for auto scroll carousel to the first empty date in the page initial rendering
  useEffect(() => {
    const gregorianDate = new Date(selectedAppointmentDetail?.selectedDay!);
    goToSelectedDaySlide(gregorianDate, carouselRef, daysInMonth);
  }, [daysInMonth, defaultDate, selectedAppointmentDetail.selectedDay]);

  const goToFirstemptyDaySide = () => {
    handleSelect(defaultDate);
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
              <Card
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
                  bgcolor: isSelected ? "#012ef484" : "background.paper",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: isActive ? "error.light" : "text.primary",
                  }}
                >
                  {format(day, "EEEE")}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    fontSize: 34,
                    color: isActive ? "error.light" : "background",
                  }}
                >
                  {getDate(day)}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: isActive ? "error.light" : "text.secondary",
                    fontSize: 20,
                  }}
                >
                  {isActive ? emptyCount + " " + `نوبت خالی` : ` روز غیر کاری`}
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
          onClick={goToFirstemptyDaySide}
        >
          اولین نوبت خالی
        </Button>
      </Stack>
    </Box>
  );
};

export { CalendarBody };
