import { http } from "@renderer/lib/http";

export const getCenterDoctorAppointmentsApi = async ({
  doctorId,
  centerId,
}: {
  doctorId: string;
  centerId: string;
}) => {
  try {
    const response = await http.get(`/appointments/v1/calendar/appointments`, {
      params: {
        include_relations: true,
        doctor_id: doctorId,
        center_id: centerId,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error(error, "error in getCenterDoctorAppointmentsApi");
    throw error;
  }
};
