import CustomError from "@renderer/components/customError";
import FullPageSpinner from "@renderer/components/fullPageSpinner";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import {
  setCalendarData,
  setInitialAppointments,
  setSelectedAppointmentDetail,
  setStep,
} from "@renderer/lib/redux/slices/reservationSlice";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCenterDoctorAppointmentQuery } from "../../service/query";
import { getCombinedAppointmentsByDate } from "../../utils/calendarUi";
import { useCalendar } from "../../hooks/useCalendar";
import { CalendarBody } from "../doctorCalendarBody";
import { CalendarFooter } from "../doctorCalendarFooter";

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

  useEffect(() => {
    dispatch(setStep(2));
  }, [dispatch]);

  // if (isLoading) {
  //   return <FullPageSpinner />;
  // }

  // if (error || !settings?.centerId) {
  //   return <CustomError title="شناسه مرکز یافت نشد" />;
  // }

  const combinedAppointmentsByDate = getCombinedAppointmentsByDate(data);
  console.log(data, "calendarAppointments");
  console.log(combinedAppointmentsByDate, "combinedAppointmentsByDate");
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    // if you only want to init once:
    if (isInitialized || isLoading) return; // i done this for fixing the redux-state going back to initial state issue
    dispatch(setInitialAppointments(data.appointments));
    dispatch(setCalendarData(combinedAppointmentsByDate));
    //
    dispatch(
      setSelectedAppointmentDetail({
        selectedAppointment: null,
        selectedDay: null,
        selectedDayTimes: null,
        selectedService: null,
        selectedTime: null,
        timeFrame: {
          start_time: null,
          end_time: null,
        },
      }),
    );
    setIsInitialized(true); // only after all dispatches
  }, [data, combinedAppointmentsByDate, dispatch, isInitialized, isLoading]);

  const {
    setCurrMonth,
    currMonth,
    daysInMonth,
    isSameMonth,
    getNextMonth,
    getPrevMonth,
    firstEmptyDate,
  } = useCalendar({ calendardata: combinedAppointmentsByDate });
  const targetRef = useRef<HTMLDivElement | null>(null);
  const onScrollToTimes = () => {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",

      block: "nearest",
      inline: "end",
    });
  };
  if (isLoading) {
    return <FullPageSpinner />;
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
      {/* header */}
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
            onClick={(e) => getPrevMonth(e)}
            disabled={isSameMonth}
          >
            ماه قبل
          </Button>
          <Typography sx={{ fontWeight: 700, fontSize: 32 }}>
            {currMonth}
          </Typography>
          <Button
            color="warning"
            endIcon={<ArrowBackIcon />}
            sx={{ fontSize: 24 }}
            onClick={(e) => getNextMonth(e)}
          >
            ماه بعد
          </Button>
        </Stack>
      </Stack>
      <CalendarBody
        daysInMonth={daysInMonth}
        setCurrMonth={setCurrMonth}
        onScrollToTimes={onScrollToTimes}
        defaultDate={firstEmptyDate}
      />

      <CalendarFooter targetRef={targetRef} />
    </Card>
  );
};

export default DoctorCalendarContainer;
