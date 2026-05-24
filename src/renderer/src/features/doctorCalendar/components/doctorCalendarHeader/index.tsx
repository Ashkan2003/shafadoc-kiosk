// src/renderer/src/features/doctorCalendar/components/doctorCalendarHeader/index.tsx
import { Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Previously this component called useCalendar() itself, creating an ISOLATED
// month state that had nothing to do with CalendarBody's month state.
// Now it receives the shared state from DoctorCalendarContainer as props.
interface Props {
  currMonth: string;
  isSameMonth: boolean;
  onPrevMonth: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNextMonth: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DoctorCalendarHeader = ({
  currMonth,
  isSameMonth,
  onPrevMonth,
  onNextMonth,
}: Props) => {
  return (
    <Stack sx={{ p: { xs: 2, md: 3 }, gap: 2.5 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="warning"
          startIcon={<ArrowForwardIcon />}
          sx={{ fontSize: 24 }}
          onClick={onPrevMonth}
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
          onClick={onNextMonth}
        >
          ماه بعد
        </Button>
      </Stack>
    </Stack>
  );
};

export default DoctorCalendarHeader;
