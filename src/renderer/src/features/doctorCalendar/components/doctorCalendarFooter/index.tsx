import { Chip, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setSelectedAppointmentDetail } from "@renderer/lib/redux/slices/reservationSlice";
import { RootState } from "@renderer/lib/redux/store";
import { toast } from "sonner";

interface CalendarFooterProps {
  targetRef: any;
}

const CalendarFooter = ({ targetRef }: CalendarFooterProps) => {
  const { selectedAppointmentDetail, initialAppointments } = useAppSelector(
    (state: RootState) => state.reservation,
  );
  const dispatch = useAppDispatch();

  // Function to convert time string to minutes since midnight for sorting
  const timeToMinutes = (timeString: string): number => {
    // Handle time range format: "16:00 - 17:10" -> extract "16:00"
    const startTime = timeString.includes(" - ")
      ? timeString.split(" - ")[0].trim()
      : timeString.trim();

    // Parse HH:mm format
    const [hours, minutes] = startTime.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Sort times from 00:00 to 23:59
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
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1.5,
        p: 2.5,
        justifyContent: "center",
      }}
    >
      {sortedTimes !== null ? (
        <div ref={targetRef}>
          {sortedTimes.map((item: any, index: number) => {
            const isReserved =
              !item.is_available || item.status !== "AVAILABLE";

            return (
              <Chip
                onClick={() => {
                  if (!isReserved) {
                    const matchedAppointment = initialAppointments?.find(
                      (appointment: any) => {
                        return appointment.id == item?.appointment_id;
                      },
                    );
                    dispatch(
                      setSelectedAppointmentDetail({
                        selectedService: matchedAppointment?.service_info,
                        selectedAppointment: matchedAppointment,
                        selectedTime: item,
                      }),
                    );
                  } else {
                    toast.error("این ساعت رزرو شده است");
                  }
                }}
                key={item}
                label={item}
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
            );
          })}
        </div>
      ) : (
        <div className=" flex  items-center justify-center">
          لطفا روز را انتخاب کنید
        </div>
      )}
    </Stack>
  );
};

export { CalendarFooter };
