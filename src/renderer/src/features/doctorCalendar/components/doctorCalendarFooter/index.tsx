import { Chip, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import {
  setSelectedAppointmentDetail,
  setStep,
} from "@renderer/lib/redux/slices/reservationSlice";
import { RootState } from "@renderer/lib/redux/store";
import { Routes } from "@renderer/lib/routes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CalendarAppointmentType } from "src/shared/types/common";

interface CalendarFooterProps {
  targetRef: any;
  initialAppointments: CalendarAppointmentType[];
}

const CalendarFooter = ({
  targetRef,
  initialAppointments,
}: CalendarFooterProps) => {
  const { selectedAppointmentDetail } = useAppSelector(
    (state: RootState) => state.reservation,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const timeToMinutes = (timeString: string): number => {
    const startTime = timeString.includes(" - ")
      ? timeString.split(" - ")[0].trim()
      : timeString.trim();
    const [hours, minutes] = startTime.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const sortedTimes = selectedAppointmentDetail?.selectedDayTimes
    ? [...selectedAppointmentDetail.selectedDayTimes].sort((a, b) => {
        const timeA = timeToMinutes(a.time || "");
        const timeB = timeToMinutes(b.time || "");
        return timeA - timeB;
      })
    : null;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1.5,
        p: 2.5,
        justifyContent: "center",
      }}
      ref={targetRef}
    >
      {sortedTimes !== null ? (
        <>
          {sortedTimes.map((item, index: number) => {
            const isReserved =
              !item.is_available || item.status !== "AVAILABLE";

            return (
              <Chip
                onClick={() => {
                  if (!isReserved) {
                    const matchedAppointment = initialAppointments?.find(
                      (appointment: any) =>
                        appointment.id == item?.appointment_id,
                    );

                    dispatch(
                      setSelectedAppointmentDetail({
                        selectedService: matchedAppointment?.service_info,
                        selectedAppointment: matchedAppointment,
                        selectedTime: item.time,
                      }),
                    );

                    dispatch(setStep(3));
                    navigate(Routes.REVIEW);
                  } else {
                    toast.error("این ساعت رزرو شده است");
                  }
                }}
                key={index}
                label={item.time}
                sx={{
                  minWidth: 110,
                  py: 2.5,
                  fontSize: 28,
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: isReserved ? "error.light" : "#00C45A",
                  color: isReserved ? "error.light" : "#00B050",
                  bgcolor: "transparent",
                  cursor: isReserved ? "not-allowed" : "pointer",
                  opacity: isReserved ? 0.5 : 1,
                }}
              />
            );
          })}
        </>
      ) : (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            py: 3,
          }}
        >
          لطفا روز را انتخاب کنید
        </Typography>
      )}
    </Stack>
  );
};

export { CalendarFooter };
