import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { CombinedAppointmentsByDateType } from "src/shared/types/common";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  calendarData: CombinedAppointmentsByDateType[];
}
const DoctorCalendarHeader = ({ calendarData }: Props) => {
  const {
    setCurrMonth,
    currMonth,
    daysInMonth,
    isSameMonth,
    getNextMonth,
    getPrevMonth,
    firstEmptyDate,
  } = useCalendar({ calendarData });
  return (
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
  );
};

export default DoctorCalendarHeader;
