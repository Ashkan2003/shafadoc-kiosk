import CustomError from "@renderer/components/customError";
import FullPageSpinner from "@renderer/components/fullPageSpinner";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import {
  setCalendarData,
  setInitialAppointments,
  setSelectedAppointmentDetail,
  setStep,
} from "@renderer/lib/redux/slices/reservationSlice";

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
import DoctorCalendarHeader from "../doctorCalendarHeader";

const DoctorCalendarContainer = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
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
  }, [dispatch]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error || !settings?.centerId) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }

  const calendarData = getCombinedAppointmentsByDate(data?.appointments);
  console.log(data, "calendarAppointments");
  console.log(calendarData, "combinedAppointmentsByDate");

  const onScrollToTimes = () => {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",

      block: "nearest",
      inline: "end",
    });
  };

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
      <DoctorCalendarHeader calendarData={calendarData} />
      <CalendarBody
        calendarData={calendarData}
        onScrollToTimes={onScrollToTimes}
      />

      <CalendarFooter targetRef={targetRef} initialAppointments={data} />
    </Card>
  );
};

export default DoctorCalendarContainer;
