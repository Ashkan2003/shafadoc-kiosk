import { toast } from "sonner";
import { getCenterDoctorAppointmentsApi } from "../api";
import { useQueryWithHandlers } from "@renderer/lib/customUseQuery";

export function useCenterDoctorAppointmentQuery({
  centerId,
  doctorId,
}: {
  centerId: string | undefined;
  doctorId: string | undefined;
}) {
  return useQueryWithHandlers({
    queryFn: () =>
      getCenterDoctorAppointmentsApi({
        centerId: centerId!,
        doctorId: doctorId!,
      }),
    // refetchInterval: 1000 * 10, // 10 second
    queryKey: ["doctor-appointments", centerId, doctorId],
    onError(error: any) {
      toast.error("در در یافت نوبت های پزشک مورد نظر خطایی رخ داد", {
        description: error,
      });
    },
  });
}
