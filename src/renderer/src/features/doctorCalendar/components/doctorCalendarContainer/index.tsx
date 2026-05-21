import { useParams } from "react-router-dom";
import { useCenterDoctorAppointmentQuery } from "../../service/query";
import { useAppSelector } from "@renderer/lib/redux/hooks";
import FullPageSpinner from "@renderer/components/fullPageSpinner";
import CustomError from "@renderer/components/customError";

const DoctorCalendarContainer = () => {
  const { id } = useParams();
  const settings = useAppSelector((state) => state.settings.data);
  const {
    data: doctorCalendarData,
    isLoading,
    isError,
    error,
  } = useCenterDoctorAppointmentQuery({
    doctorId: id,
    centerId: settings?.centerId,
  });

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }

  if (!settings?.centerId) {
    return <CustomError title="شناسه مرکز یافت نشد" />;
  }

  return <div>DoctorCalendarContainersssssssssssssssss</div>;
};

export default DoctorCalendarContainer;
